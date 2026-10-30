/**
 * PRO C2S - Unified Candidate Database & Cloud Storage Engine
 * Handles full CV submissions across all pages (index, offres, detail pages)
 * Direct sync to Firebase Firestore, Firebase Cloud Storage, IndexedDB & LocalStorage
 */

(function() {
    'use strict';

    const firebaseConfig = {
        apiKey: (typeof atob === 'function') ? atob('QUl6YVN5QWxHYzUyWWhpVTl0OC1uREI4ZlRaV3dqNkVSS3NObDRn') : '',
        authDomain: "proc2s.firebaseapp.com",
        projectId: "proc2s",
        storageBucket: "proc2s.firebasestorage.app",
        messagingSenderId: "98548191465",
        appId: "1:98548191465:web:545f9922984746a1032078",
        measurementId: "G-599077BZD9"
    };

    let fbDb = null;
    let fbStorage = null;

    try {
        if (typeof firebase !== 'undefined') {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            fbDb = firebase.firestore();
            fbStorage = firebase.storage();
        }
    } catch(e) {
        console.warn('Firebase init error:', e);
    }

    // IndexedDB helper for large files
    const PRO_C2S_IDB = {
        dbName: 'PRO_C2S_FILE_STORE',
        storeName: 'cv_documents',
        getDb: function() {
            return new Promise(function(resolve, reject) {
                if (typeof indexedDB === 'undefined') return reject(new Error('IndexedDB not supported'));
                const req = indexedDB.open(PRO_C2S_IDB.dbName, 1);
                req.onupgradeneeded = function(e) {
                    const db = e.target.result;
                    if (!db.objectStoreNames.contains(PRO_C2S_IDB.storeName)) {
                        db.createObjectStore(PRO_C2S_IDB.storeName, { keyPath: 'id' });
                    }
                };
                req.onsuccess = function(e) { resolve(e.target.result); };
                req.onerror = function(e) { reject(e.target.error); };
            });
        },
        saveFile: function(id, fileName, dataUrl) {
            return PRO_C2S_IDB.getDb().then(function(db) {
                return new Promise(function(resolve, reject) {
                    const tx = db.transaction(PRO_C2S_IDB.storeName, 'readwrite');
                    tx.objectStore(PRO_C2S_IDB.storeName).put({ id: id, fileName: fileName, dataUrl: dataUrl, date: new Date().toISOString() });
                    tx.oncomplete = function() { resolve(true); };
                    tx.onerror = function(e) { reject(e.target.error); };
                });
            }).catch(function(err) {
                console.warn('IndexedDB saveFile error:', err);
                return false;
            });
        }
    };

    // Central Save Candidate Function
    window.PRO_C2S_SAVE_CANDIDATE = async function(cand) {
        try {
            if (!cand.id) {
                cand.id = 'CAND-' + Date.now();
            }
            if (!cand.date) {
                cand.date = new Date().toLocaleString('fr-FR');
            }
            if (!cand.status) {
                cand.status = 'Nouveau';
            }

            // 1. IndexedDB save
            if (cand.fileData) {
                PRO_C2S_IDB.saveFile(cand.id, cand.fileName || 'cv.pdf', cand.fileData);
            }

            // 2. LocalStorage save (immediate local copy for admin / user)
            try {
                let list = JSON.parse(localStorage.getItem('proc2s_candidatures') || '[]');
                list.unshift(cand);
                try {
                    localStorage.setItem('proc2s_candidatures', JSON.stringify(list));
                } catch(quotaErr) {
                    console.warn('LocalStorage quota, storing lightweight record without base64:', quotaErr);
                    const light = Object.assign({}, cand, { fileData: null });
                    let lightList = JSON.parse(localStorage.getItem('proc2s_candidatures') || '[]');
                    lightList.unshift(light);
                    localStorage.setItem('proc2s_candidatures', JSON.stringify(lightList));
                }
            } catch(lsErr) {
                console.warn('LocalStorage error:', lsErr);
            }

            // 3. Broadcast to all open tabs (Admin dashboard updates instantly)
            try {
                if (typeof BroadcastChannel !== 'undefined') {
                    const bc = new BroadcastChannel('proc2s_db_channel');
                    bc.postMessage({ type: 'NEW_CANDIDATE', candidate: cand });
                }
            } catch(bcErr) {}

            // 4. Cloud Database push (Firebase Firestore)
            if (fbDb) {
                try {
                    const fireCand = Object.assign({}, cand);
                    delete fireCand.rawFile; // Do not serialize binary DOM File object into Firestore

                    const fullBase64 = fireCand.fileData;
                    if (fireCand.fileData && fireCand.fileData.length > 800000) {
                        fireCand.fileData = null; // Prevent Firestore 1MB doc limit
                        fireCand.hasChunks = true;
                    }

                    await fbDb.collection('proc2s_candidatures').doc(cand.id).set(fireCand);
                    console.log('Candidate saved to Firestore:', cand.id);

                    // If file is large (>800KB), save in Firestore chunks
                    if (fullBase64 && fullBase64.length > 800000) {
                        const CHUNK_SZ = 400000;
                        const total = Math.ceil(fullBase64.length / CHUNK_SZ);
                        for (let i = 0; i < total; i++) {
                            const part = fullBase64.substring(i * CHUNK_SZ, (i + 1) * CHUNK_SZ);
                            await fbDb.collection('proc2s_candidatures').doc(cand.id).collection('chunks').doc(String(i)).set({
                                idx: i,
                                data: part
                            });
                        }
                    }

                    // 5. Firebase Cloud Storage Upload (raw binary CV)
                    if (cand.rawFile && fbStorage) {
                        const safeFileName = (cand.fileName || 'cv.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
                        const storageRef = fbStorage.ref('cv_documents/' + cand.id + '_' + safeFileName);
                        const snapshot = await storageRef.put(cand.rawFile);
                        const downloadUrl = await snapshot.ref.getDownloadURL();
                        cand.fileUrl = downloadUrl;
                        await fbDb.collection('proc2s_candidatures').doc(cand.id).update({ fileUrl: downloadUrl });

                        // Update localStorage copy with fileUrl
                        let list = JSON.parse(localStorage.getItem('proc2s_candidatures') || '[]');
                        const idx = list.findIndex(x => x.id === cand.id);
                        if (idx >= 0) {
                            list[idx].fileUrl = downloadUrl;
                            localStorage.setItem('proc2s_candidatures', JSON.stringify(list));
                        }
                    }
                } catch(fbErr) {
                    console.error('Firebase save error:', fbErr);
                }
            }

            return { success: true, id: cand.id };
        } catch(err) {
            console.error('Global save error:', err);
            return { success: false, error: err.message };
        }
    };

    // Helper to wire Offer Detail Page Application Form
    window.initOfferApplicationForm = function(formSelector, offerTitle, offerSector) {
        const form = document.querySelector(formSelector);
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const nameInput = form.querySelector('input[type="text"]:not([data-i18n-ph="ph_city"])') || form.querySelector('input[name="user_name"]') || form.querySelectorAll('input[type="text"]')[0];
            const phoneInput = form.querySelector('input[type="tel"]') || form.querySelector('input[name="user_phone"]');
            const emailInput = form.querySelector('input[type="email"]') || form.querySelector('input[name="user_email"]');
            const cityInput = form.querySelector('[data-i18n-ph="ph_city"]') || form.querySelector('input[name="user_city"]') || form.querySelectorAll('input[type="text"]')[1];
            const notesInput = form.querySelector('textarea');
            const fileInput = form.querySelector('input[type="file"]');
            const submitBtn = form.querySelector('button[type="submit"]');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const city = cityInput ? cityInput.value.trim() : '';
            const notes = notesInput ? notesInput.value.trim() : '';
            const file = (fileInput && fileInput.files && fileInput.files[0]) ? fileInput.files[0] : null;

            if (!name || !phone || !email) {
                alert('Veuillez remplir tous les champs obligatoires (Nom, Téléphone, Email).');
                return;
            }

            const origBtnHtml = submitBtn ? submitBtn.innerHTML : 'Envoyer ma Candidature';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmission en cours...';
            }

            // Read file into base64 DataURL
            const readFileBase64 = function(f) {
                return new Promise(function(resolve) {
                    if (!f) return resolve(null);
                    const reader = new FileReader();
                    reader.onload = function(evt) { resolve(evt.target.result); };
                    reader.onerror = function() { resolve(null); };
                    reader.readAsDataURL(f);
                });
            };

            const base64Data = await readFileBase64(file);

            const candRecord = {
                id: 'CAND-' + Date.now(),
                date: new Date().toLocaleString('fr-FR'),
                name: name,
                phone: phone,
                email: email,
                city: city,
                pole: offerSector || 'Intérim Qualifié',
                poste: offerTitle || 'Poste Ouvert',
                notes: notes || 'Postulation directe via page offre',
                fileName: file ? file.name : 'CV_Non_Renseigne.pdf',
                fileData: base64Data,
                rawFile: file,
                status: 'Nouveau',
                source: offerTitle || 'Offre d\'emploi'
            };

            const result = await window.PRO_C2S_SAVE_CANDIDATE(candRecord);

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = origBtnHtml;
            }

            if (result && result.success) {
                form.reset();
                const cvLabel = form.querySelector('.offer-cv-label');
                if (cvLabel) {
                    cvLabel.innerHTML = 'Cliquez pour joindre votre CV *';
                }

                // Show luxury confirmation banner / modal
                const isEn = (document.documentElement.lang === 'en');
                const successMsg = isEn 
                    ? 'Your application and CV have been successfully saved into our recruitment database (Ref: ' + candRecord.id + ')! Our HR team will contact you shortly.'
                    : 'Votre candidature et votre CV ont été enregistrés avec succès dans notre base de recrutement (Réf: ' + candRecord.id + ') ! Notre équipe RH vous contactera sous 24h à 48h.';

                alert(successMsg);
            } else {
                alert('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer ou postuler directement via WhatsApp.');
            }
        });
    };

})();
