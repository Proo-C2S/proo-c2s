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
                    tx.objectStore(PRO_C2S_IDB.storeName).put({
                        id: id,
                        fileName: fileName,
                        fileData: dataUrl,
                        dataUrl: dataUrl,
                        date: new Date().toISOString()
                    });
                    tx.oncomplete = function() { resolve(true); };
                    tx.onerror = function(e) { reject(e.target.error); };
                });
            }).catch(function(err) {
                console.warn('IndexedDB saveFile error:', err);
                return false;
            });
        },
        getFile: function(id) {
            return PRO_C2S_IDB.getDb().then(function(db) {
                return new Promise(function(resolve, reject) {
                    const tx = db.transaction(PRO_C2S_IDB.storeName, 'readonly');
                    const req = tx.objectStore(PRO_C2S_IDB.storeName).get(id);
                    req.onsuccess = function() {
                        resolve(req.result ? (req.result.fileData || req.result.dataUrl) : null);
                    };
                    req.onerror = function() { reject(req.error); };
                });
            }).catch(function() { return null; });
        }
    };

    window.PRO_C2S_IDB = PRO_C2S_IDB;

    // Executive Confirmation Modal Controller
    window.closeExecutiveConfirmation = function() {
        const modal = document.getElementById("executiveSuccessModal");
        if (modal) {
            modal.classList.remove('open');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    window.ensureExecutiveSuccessModal = function() {
        if (document.getElementById("executiveSuccessModal")) return;
        const modalDiv = document.createElement('div');
        modalDiv.className = 'confirmation-modal-overlay';
        modalDiv.id = 'executiveSuccessModal';
        modalDiv.setAttribute('aria-hidden', 'true');
        modalDiv.setAttribute('role', 'dialog');
        modalDiv.innerHTML = `
        <div class="confirmation-modal-content">
            <button class="job-modal-close" id="closeExecutiveSuccessModalBtn" aria-label="Fermer la confirmation" type="button">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="conf-modal-header">
                <div class="conf-success-icon-wrap">
                    <div class="conf-pulse-ring"></div>
                    <div class="conf-icon-circle">
                        <i class="fa-solid fa-check"></i>
                    </div>
                </div>
                <span class="conf-badge" id="confBadgeText">CONFIRMATION OFFICIELLE PRO C2S</span>
                <h2 class="conf-title" id="confMainTitle">Candidature Enregistrée avec Succès !</h2>
                <p class="conf-subtitle" id="confSubTitle">Votre dossier a été transmis directement au Pôle Recrutement & Ressources Humaines.</p>
            </div>

            <!-- Tracking Reference Bar -->
            <div class="conf-ref-card">
                <div class="conf-ref-left">
                    <span class="conf-ref-label" id="confRefLabel">Numéro de Référence Officiel</span>
                    <strong class="conf-ref-code" id="confRefCode">—</strong>
                </div>
                <div class="conf-status-pill">
                    <span class="status-dot"></span>
                    <span id="confStatusText">Dossier Actif & Validé</span>
                </div>
            </div>

            <!-- Application Summary Card -->
            <div class="conf-summary-card">
                <div class="conf-summary-row">
                    <span class="conf-label" id="confLblName"><i class="fa-solid fa-user"></i> Candidat :</span>
                    <strong class="conf-val" id="confCandidateName">—</strong>
                </div>
                <div class="conf-summary-row">
                    <span class="conf-label" id="confLblPole"><i class="fa-solid fa-briefcase"></i> Poste / Pôle :</span>
                    <span class="conf-val" id="confCandidatePole">—</span>
                </div>
                <div class="conf-summary-row" id="confFileRow">
                    <span class="conf-label"><i class="fa-solid fa-file-pdf"></i> Document CV :</span>
                    <span class="conf-val file-highlight" id="confFileName">CV_Document.pdf</span>
                </div>
                <div class="conf-summary-row">
                    <span class="conf-label"><i class="fa-regular fa-clock"></i> Date & Heure :</span>
                    <span class="conf-val" id="confDateTime">—</span>
                </div>
            </div>

            <!-- Next Steps Protocol -->
            <div class="conf-steps-card">
                <h4 class="conf-steps-title"><i class="fa-solid fa-shield-halved"></i> <span id="confStepsTitle">Déroulement du Traitement (Norme ISO RH) :</span></h4>
                <div class="conf-steps-list">
                    <div class="conf-step-item">
                        <div class="step-num">1</div>
                        <div class="step-text">
                            <strong id="confStep1T">Examen approfondi du profil</strong>
                            <span id="confStep1D">Évaluation sous 24h à 48h ouvrées par un consultant métier dédié.</span>
                        </div>
                    </div>
                    <div class="conf-step-item">
                        <div class="step-num">2</div>
                        <div class="step-text">
                            <strong id="confStep2T">Prise de contact téléphonique</strong>
                            <span id="confStep2D">Entretien de présélection et vérification des compétences techniques.</span>
                        </div>
                    </div>
                    <div class="conf-step-item">
                        <div class="step-num">3</div>
                        <div class="step-text">
                            <strong id="confStep3T">Délégation & Contrat sécurisé</strong>
                            <span id="confStep3D">Mise en relation directe avec l'entreprise utilisatrice & contrat 100% conforme.</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="conf-actions-group">
                <a href="#" id="confWhatsAppAccelerateBtn" target="_blank" rel="noopener noreferrer" class="btn-conf-wa">
                    <i class="fa-brands fa-whatsapp"></i>
                    <span id="confWaBtnText">Accélérer mon dossier via WhatsApp</span>
                </a>
                <button type="button" class="btn-conf-close" id="confReturnBtn">
                    <span id="confCloseBtnText">Retourner au site</span>
                </button>
            </div>

            <div class="conf-footer-guarantee">
                <i class="fa-solid fa-lock"></i>
                <span id="confGuaranteeText">PRO C2S garantit la stricte confidentialité de vos données conformément à la loi 09-08 & CNDP.</span>
            </div>
        </div>`;

        document.body.appendChild(modalDiv);

        modalDiv.addEventListener('click', function(e) {
            if (e.target === modalDiv) window.closeExecutiveConfirmation();
        });
        const cBtn = modalDiv.querySelector('#closeExecutiveSuccessModalBtn');
        if (cBtn) cBtn.addEventListener('click', window.closeExecutiveConfirmation);
        const rBtn = modalDiv.querySelector('#confReturnBtn');
        if (rBtn) rBtn.addEventListener('click', window.closeExecutiveConfirmation);
    };

    window.showExecutiveConfirmation = function(options) {
        window.ensureExecutiveSuccessModal();
        const modal = document.getElementById("executiveSuccessModal");
        if (!modal) return;

        const isEn = (localStorage.getItem("proC2sLang") === "en" || document.documentElement.lang === "en");
        const refId = options.refId || options.id || ('CAND-' + Date.now());
        const nowStr = options.date || new Date().toLocaleString(isEn ? 'en-US' : 'fr-FR', {
            day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const badge = document.getElementById("confBadgeText");
        const title = document.getElementById("confMainTitle");
        const subTitle = document.getElementById("confSubTitle");
        const refCode = document.getElementById("confRefCode");
        const refLabel = document.getElementById("confRefLabel");
        const statusText = document.getElementById("confStatusText");
        const lblName = document.getElementById("confLblName");
        const candName = document.getElementById("confCandidateName");
        const lblPole = document.getElementById("confLblPole");
        const candPole = document.getElementById("confCandidatePole");
        const fileRow = document.getElementById("confFileRow");
        const fileName = document.getElementById("confFileName");
        const dateTime = document.getElementById("confDateTime");
        const stepsTitle = document.getElementById("confStepsTitle");
        const s1T = document.getElementById("confStep1T");
        const s1D = document.getElementById("confStep1D");
        const s2T = document.getElementById("confStep2T");
        const s2D = document.getElementById("confStep2D");
        const s3T = document.getElementById("confStep3T");
        const s3D = document.getElementById("confStep3D");
        const waBtn = document.getElementById("confWhatsAppAccelerateBtn");
        const waBtnText = document.getElementById("confWaBtnText");
        const closeBtnText = document.getElementById("confCloseBtnText");
        const guaranteeText = document.getElementById("confGuaranteeText");

        if (refCode) refCode.innerText = refId;
        if (dateTime) dateTime.innerText = nowStr;
        if (candName) candName.innerText = options.name || (isEn ? "Not specified" : "Non spécifié");
        if (candPole) candPole.innerText = options.poste || options.pole || options.subject || (isEn ? "General Application" : "Candidature Générale");

        if (refLabel) refLabel.innerText = isEn ? "Official Reference Number" : "Numéro de Référence Officiel";
        if (statusText) statusText.innerText = isEn ? "Active & Verified Record" : "Dossier Actif & Validé";

        if (badge) badge.innerText = isEn ? "OFFICIAL PRO C2S CONFIRMATION" : "CONFIRMATION OFFICIELLE PRO C2S";
        if (title) title.innerText = isEn ? "Application Successfully Received!" : "Candidature Enregistrée avec Succès !";
        if (subTitle) subTitle.innerText = isEn ? "Your application has been delivered directly to our Recruitment & HR Division." : "Votre dossier a été transmis directement au Pôle Recrutement & Ressources Humaines.";
        if (lblName) lblName.innerHTML = '<i class="fa-solid fa-user"></i> ' + (isEn ? "Candidate:" : "Candidat :");
        if (lblPole) lblPole.innerHTML = '<i class="fa-solid fa-briefcase"></i> ' + (isEn ? "Target Position:" : "Poste / Pôle :");

        if (fileRow) {
            fileRow.style.display = 'flex';
            if (fileName) fileName.innerText = options.fileName || 'CV Document';
        }

        if (stepsTitle) stepsTitle.innerText = isEn ? "Recruitment Screening Protocol:" : "Déroulement du Traitement (Norme ISO RH) :";
        if (s1T) s1T.innerText = isEn ? "In-depth Profile Screening" : "Examen approfondi du profil";
        if (s1D) s1D.innerText = isEn ? "Evaluation within 24 to 48 business hours by our specialized recruitment consultant." : "Évaluation sous 24h à 48h ouvrées par un consultant métier dédié.";
        if (s2T) s2T.innerText = isEn ? "Pre-qualification Call" : "Prise de contact téléphonique";
        if (s2D) s2D.innerText = isEn ? "Direct phone interview to validate skills, availability, and expectations." : "Entretien de présélection et vérification des compétences techniques.";
        if (s3T) s3T.innerText = isEn ? "Mission Placement & Contract" : "Délégation & Contrat sécurisé";
        if (s3D) s3D.innerText = isEn ? "Placement with partner enterprise under a 100% compliant Labor Code contract." : "Mise en relation directe avec l'entreprise utilisatrice & contrat 100% conforme.";

        const candidateRole = options.poste || options.pole || 'Poste Ouvert';
        const waMsg = isEn 
            ? `Hello PRO C2S Recruitment, I have submitted my application (Ref: ${refId}, Name: ${options.name}) for: ${candidateRole}.`
            : `Bonjour Pôle Recrutement PRO C2S, je viens de postuler (Réf: ${refId}, Nom: ${options.name}) pour le poste: ${candidateRole}.`;
        if (waBtn) waBtn.href = 'https://wa.me/212663449824?text=' + encodeURIComponent(waMsg);
        if (waBtnText) waBtnText.innerText = isEn ? "Fast-Track My Application on WhatsApp" : "Accélérer mon dossier via WhatsApp";

        if (closeBtnText) closeBtnText.innerText = isEn ? "Return to Website" : "Retourner au site";
        if (guaranteeText) guaranteeText.innerText = isEn 
            ? "PRO C2S guarantees strict data confidentiality compliant with statutory CNDP privacy guidelines."
            : "PRO C2S garantit la stricte confidentialité de vos données conformément à la loi 09-08 & CNDP.";

        modal.style.display = 'flex';
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            window.closeExecutiveConfirmation();
        }
    });

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

            // 1. IndexedDB save (stores binary dataUrl and fileData for Admin CV viewer)
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
                    const needsChunking = (fullBase64 && fullBase64.length > 900000);

                    if (needsChunking) {
                        fireCand.fileData = null; // Prevent Firestore 1MB doc limit
                        fireCand.hasChunks = true;
                    }

                    // Save main candidate record to Firestore
                    await fbDb.collection('proc2s_candidatures').doc(cand.id).set(fireCand);
                    console.log('Candidate successfully synced to Firestore:', cand.id);

                    // If file is large (>900KB), save all chunks in parallel
                    if (needsChunking) {
                        const CHUNK_SZ = 400000;
                        const total = Math.ceil(fullBase64.length / CHUNK_SZ);
                        const chunkPromises = [];
                        for (let i = 0; i < total; i++) {
                            const part = fullBase64.substring(i * CHUNK_SZ, (i + 1) * CHUNK_SZ);
                            chunkPromises.push(
                                fbDb.collection('proc2s_candidatures').doc(cand.id).collection('chunks').doc(String(i)).set({
                                    idx: i,
                                    data: part
                                }).catch(function(e) { console.warn('Chunk write error:', e); })
                            );
                        }
                        await Promise.all(chunkPromises);
                        console.log('All chunks (' + total + ') successfully saved to Firestore.');
                    }
                } catch(fbErr) {
                    console.warn('Firebase save warning:', fbErr);
                }

                // 5. Firebase Cloud Storage Upload (raw binary CV) - Strictly NON-BLOCKING in background
                if (cand.rawFile && fbStorage) {
                    try {
                        const safeFileName = (cand.fileName || 'cv.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
                        const storageRef = fbStorage.ref('cv_documents/' + cand.id + '_' + safeFileName);
                        storageRef.put(cand.rawFile).then(async function(snapshot) {
                            try {
                                const downloadUrl = await snapshot.ref.getDownloadURL();
                                cand.fileUrl = downloadUrl;
                                if (fbDb) {
                                    await fbDb.collection('proc2s_candidatures').doc(cand.id).update({ fileUrl: downloadUrl }).catch(() => {});
                                }

                                // Update localStorage copy with fileUrl
                                let list = JSON.parse(localStorage.getItem('proc2s_candidatures') || '[]');
                                const idx = list.findIndex(x => x.id === cand.id);
                                if (idx >= 0) {
                                    list[idx].fileUrl = downloadUrl;
                                    localStorage.setItem('proc2s_candidatures', JSON.stringify(list));
                                }
                                console.log('CV successfully uploaded to Cloud Storage & URL linked:', downloadUrl);
                            } catch(uErr) {
                                console.warn('Storage getDownloadURL warning:', uErr);
                            }
                        }).catch(function(uploadErr) {
                            console.warn('Background Storage upload warning:', uploadErr);
                        });
                    } catch(storageInitErr) {
                        console.warn('Storage reference warning:', storageInitErr);
                    }
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

            let base64Data = null;
            try {
                base64Data = await readFileBase64(file);
            } catch(fErr) {
                console.warn('File read warning:', fErr);
            }

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

                // Show luxury green executive confirmation modal ("hadik l5edra")
                window.showExecutiveConfirmation(candRecord);
            } else {
                alert('Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer ou postuler directement via WhatsApp.');
            }
        });
    };

    // Auto-ensure modal exists on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.ensureExecutiveSuccessModal);
    } else {
        window.ensureExecutiveSuccessModal();
    }

})();
