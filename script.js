/* ==========================================
   PRO C2S - SCRIPT.JS COMPLET
========================================== */

// ==========================================
// PRELOADER & HERO REVEAL (STYLE MONTARVILLE)
// ==========================================
(function() {
    function initPreloader() {
        const preloader = document.getElementById("preloader");
        if (!preloader) return;

        if (document.body) {
            document.body.classList.add("is-loading");
        }

        const startTime = performance.now();
        const MIN_DISPLAY_TIME = 1100; // 1.1s : khefifa o mezyana, matkounch m3etla bzaf
        let isDone = false;

        function revealSite() {
            if (isDone) return;
            isDone = true;

            // 1. Lever le rideau avec transition fluide façon Montarville
            preloader.classList.add("curtain-up");

            // 2. Déclencher le reveal du Hero
            setTimeout(() => {
                if (document.body) {
                    document.body.classList.remove("is-loading");
                    document.body.classList.add("hero-revealed");
                }
            }, 200);

            // 3. Masquer complètement après la sortie
            setTimeout(() => {
                preloader.classList.add("preloader-hidden");
                if (preloader.parentNode) {
                    preloader.style.display = "none";
                }
            }, 900);
        }

        function scheduleReveal() {
            const elapsed = performance.now() - startTime;
            const delay = Math.max(0, MIN_DISPLAY_TIME - elapsed);
            setTimeout(revealSite, delay);
        }

        if (document.readyState === "complete") {
            scheduleReveal();
        } else {
            window.addEventListener("load", scheduleReveal);
        }

        // Sécurité réseau
        setTimeout(revealSite, 3200);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPreloader);
    } else {
        initPreloader();
    }
})();

document.addEventListener("DOMContentLoaded", function() {
    // Navigation Active Scroll & Shadow
    const links = document.querySelectorAll(".nav-links a");
    const header = document.getElementById("main-header");
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.addEventListener("scroll", () => {
        let current = "";
        document.querySelectorAll("section").forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if(link.getAttribute("href") === "#" + current){
                link.classList.add("active");
            }
        });

        if(window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if(window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    if(backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    function closeMobileMenu() {
        if(navLinks && navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            if(menuToggle) {
                menuToggle.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if(icon) {
                    icon.className = "fa-solid fa-bars";
                }
            }
        }
    }

    if(menuToggle && navLinks) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.classList.toggle("active", isOpen);
            const icon = menuToggle.querySelector("i");
            if(icon) {
                if(isOpen) {
                    icon.className = "fa-solid fa-xmark";
                } else {
                    icon.className = "fa-solid fa-bars";
                }
            }
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                closeMobileMenu();
            });
        });

        document.addEventListener("click", (e) => {
            if(!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // Cookie Banner
    const cookieBanner = document.getElementById("cookieConsentBanner");
    const acceptBtn = document.getElementById("acceptCookiesBtn");

    if (localStorage.getItem("proC2sCookiesAccepted") === "true") {
        if (cookieBanner) cookieBanner.style.display = "none";
    }

    if (acceptBtn && cookieBanner) {
        acceptBtn.addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.setItem("proC2sCookiesAccepted", "true");
            cookieBanner.style.display = "none";
        });
    }

    // Modal Politique
    const privacyModal = document.getElementById("privacyModal");
    const openPrivacyModal = document.getElementById("openPrivacyModal");
    const closePrivacyBtn = document.getElementById("closePrivacyBtn");

    function togglePrivacyModal(e) {
        if(e) e.preventDefault();
        if(privacyModal) privacyModal.classList.toggle("open");
    }

    if(openPrivacyModal) openPrivacyModal.addEventListener("click", togglePrivacyModal);
    if(closePrivacyBtn) closePrivacyBtn.addEventListener("click", togglePrivacyModal);
    
    if(privacyModal) {
        privacyModal.addEventListener("click", (e) => {
            if(e.target === privacyModal) privacyModal.classList.remove("open");
        });
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stats Counter
    const counters = document.querySelectorAll(".counter");
    let countersStarted = false;
    const statsSection = document.querySelector(".stats");

    const statsObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !countersStarted) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                const prefix = counter.getAttribute("data-prefix") || "";
                const suffix = counter.getAttribute("data-suffix") || "";
                const duration = 1600;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if(current < target) {
                        counter.innerText = prefix + Math.ceil(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = prefix + target + suffix;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.3 });

    if(statsSection) statsObserver.observe(statsSection);

    // Job Filters & Modal Offres
    const filterBtns = document.querySelectorAll(".filter-btn");
    const allJobCards = document.querySelectorAll(".job-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filterValue = btn.getAttribute("data-filter");

            allJobCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // Recherche Rapide par Mots-Clés f Offres d'Emploi
    const jobSearchInput = document.getElementById("jobSearchInput");
    if(jobSearchInput) {
        jobSearchInput.addEventListener("input", (e) => {
            const term = e.target.value.toLowerCase().trim();
            allJobCards.forEach(card => {
                const title = card.querySelector("h3").innerText.toLowerCase();
                const sector = card.querySelector(".job-sect").innerText.toLowerCase();
                const desc = card.getAttribute("data-desc").toLowerCase();

                if(title.includes(term) || sector.includes(term) || desc.includes(term)) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    }

        // ======================== ADVANCED JOB MODAL & DUAL APPLICATION ========================
    const modal = document.getElementById("jobModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalTitle = document.getElementById("modalTitle");
    const modalBadge = document.getElementById("modalBadge");
    const modalSector = document.getElementById("modalSector");
    const modalLocation = document.getElementById("modalLocation");
    const modalReq = document.getElementById("modalReq");
    const modalDesc = document.getElementById("modalDesc");
    const modalApplyBtn = document.getElementById("modalApplyBtn");
    const jobModalHiddenTitle = document.getElementById("jobModalHiddenTitle");
    const jobModalHiddenSector = document.getElementById("jobModalHiddenSector");

    // Modal tabs (Email vs WhatsApp)
    const modalTabEmailBtn = document.getElementById("modalTabEmailBtn");
    const modalTabWaBtn = document.getElementById("modalTabWaBtn");
    const modalEmailApplyTab = document.getElementById("modalEmailApplyTab");
    const modalWhatsappApplyTab = document.getElementById("modalWhatsappApplyTab");

    if (modalTabEmailBtn && modalTabWaBtn) {
        modalTabEmailBtn.addEventListener("click", () => {
            modalTabEmailBtn.classList.add("active");
            modalTabWaBtn.classList.remove("active");
            if (modalEmailApplyTab) modalEmailApplyTab.style.display = "block";
            if (modalWhatsappApplyTab) modalWhatsappApplyTab.style.display = "none";
        });
        modalTabWaBtn.addEventListener("click", () => {
            modalTabWaBtn.classList.add("active");
            modalTabEmailBtn.classList.remove("active");
            if (modalEmailApplyTab) modalEmailApplyTab.style.display = "none";
            if (modalWhatsappApplyTab) modalWhatsappApplyTab.style.display = "block";
        });
    }

    // Open Modal when clicking any Job Card
    allJobCards.forEach(card => {
        card.addEventListener("click", () => {
            const isEn = localStorage.getItem("proC2sLang") === "en";
            const title = (isEn && card.getAttribute("data-title-en")) ? card.getAttribute("data-title-en") : card.getAttribute("data-title");
            const sector = (isEn && card.getAttribute("data-sector-en")) ? card.getAttribute("data-sector-en") : card.getAttribute("data-sector");
            const badge = card.getAttribute("data-badge") || "interim";
            const location = (isEn && card.getAttribute("data-location-en")) ? card.getAttribute("data-location-en") : card.getAttribute("data-location");
            const req = (isEn && card.getAttribute("data-req-en")) ? card.getAttribute("data-req-en") : card.getAttribute("data-req");
            const desc = (isEn && card.getAttribute("data-desc-en")) ? card.getAttribute("data-desc-en") : card.getAttribute("data-desc");
            const wa = card.getAttribute("data-wa");

            if (modalTitle) modalTitle.innerText = title;
            if (jobModalHiddenTitle) jobModalHiddenTitle.value = title;
            if (jobModalHiddenSector) jobModalHiddenSector.value = sector;
            if (modalBadge) {
                modalBadge.innerText = card.getAttribute("data-type") || "Intérim";
                modalBadge.className = `modal-header-badge job-badge ${badge}`;
            }
            if (modalSector) modalSector.innerHTML = `<i class="fa-solid fa-briefcase"></i> ${sector}`;
            if (modalLocation) modalLocation.innerText = location;
            if (modalReq) modalReq.innerText = req;
            if (modalDesc) modalDesc.innerText = desc;
            if (modalApplyBtn) {
                modalApplyBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent(wa)}`;
            }

            // Always default to email tab for maximum professional impression
            if (modalTabEmailBtn) modalTabEmailBtn.click();
            if (modal) modal.classList.add("open");
        });
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));
        modal.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("open"); });
    }

    // EmailJS Candidate Application Form
    const jobCandidateEmailForm = document.getElementById("jobCandidateEmailForm");
    const jobCandidateSubmitBtn = document.getElementById("jobCandidateSubmitBtn");

    if (jobCandidateEmailForm) {
        jobCandidateEmailForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("jobCandidateName").value;
            const phone = document.getElementById("jobCandidatePhone").value;
            const email = document.getElementById("jobCandidateEmail").value;
            const cvLink = document.getElementById("jobCandidateCvLink").value;
            const notes = document.getElementById("jobCandidateNotes") ? document.getElementById("jobCandidateNotes").value : "";
            const currentTitle = jobModalHiddenTitle ? jobModalHiddenTitle.value : (modalTitle ? modalTitle.innerText : "Poste");
            const currentSector = jobModalHiddenSector ? jobModalHiddenSector.value : "Général";

            const origHtml = jobCandidateSubmitBtn ? jobCandidateSubmitBtn.innerHTML : "Envoyer";
            if (jobCandidateSubmitBtn) {
                jobCandidateSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmission en cours...';
                jobCandidateSubmitBtn.disabled = true;
            }

            // Ensure EmailJS is initialized with user's key
            if (typeof emailjs !== 'undefined') {
                emailjs.init({ publicKey: "W70dwCkNbwmFHeSOA" });
            }

            const templateParams = {
                user_name: name,
                user_phone: phone,
                user_email: email,
                message: `CANDIDATURE OFFRE D'EMPLOI PRO C2S:\n- Poste concerné : ${currentTitle}\n- Pôle d'expertise : ${currentSector}\n- Lien CV / Portfolio / Profil : ${cvLink}\n- Précisions candidat : ${notes || 'Aucune'}`
            };

            emailjs.send("service_d9cvkm8", "template_ob7d4cb", templateParams)
                .then(() => {
                    showToast("Candidature transmise avec succès ! Nous étudierons votre profil sous 24h.");
                    jobCandidateEmailForm.reset();
                    if (modal) modal.classList.remove("open");
                })
                .catch((err) => {
                    console.error("EmailJS Job Apply Error:", err);
                    showToast("Erreur lors de l'envoi. Veuillez réessayer ou postuler via WhatsApp.", true);
                })
                .finally(() => {
                    if (jobCandidateSubmitBtn) {
                        jobCandidateSubmitBtn.innerHTML = origHtml;
                        jobCandidateSubmitBtn.disabled = false;
                    }
                });
        });
    }

    const articleModal = document.getElementById("articleModal");
    const closeArticleModalBtn = document.getElementById("closeArticleModalBtn");
    const articleModalTitle = document.getElementById("articleModalTitle");
    const articleModalBadge = document.getElementById("articleModalBadge");
    const articleModalTime = document.getElementById("articleModalTime");
    const articleModalDesc = document.getElementById("articleModalDesc");
    const articleModalPointsList = document.getElementById("articleModalPointsList");
    const articleModalConsultBtn = document.getElementById("articleModalConsultBtn");
    const articleModalShareBtn = document.getElementById("articleModalShareBtn");
    const articleModalShareText = document.getElementById("articleModalShareText");
    const articleCards = document.querySelectorAll(".article-card");

    let currentArticleTitle = "";

    function openArticle(card) {
        const isEn = localStorage.getItem("proC2sLang") === "en";
        currentArticleTitle = (isEn && card.getAttribute("data-title-en")) ? card.getAttribute("data-title-en") : (card.getAttribute("data-title") || "");
        const category = (isEn && card.getAttribute("data-category-en")) ? card.getAttribute("data-category-en") : (card.getAttribute("data-category") || "");
        const time = (isEn && card.getAttribute("data-time-en")) ? card.getAttribute("data-time-en") : (card.getAttribute("data-time") || (isEn ? "3 min read" : "3 min de lecture"));
        const content = (isEn && card.getAttribute("data-content-en")) ? card.getAttribute("data-content-en") : (card.getAttribute("data-content") || "");
        const rawPoints = (isEn && card.getAttribute("data-points-en")) ? card.getAttribute("data-points-en") : (card.getAttribute("data-points") || "");

        if (articleModalTitle) articleModalTitle.innerText = currentArticleTitle;
        if (articleModalBadge) articleModalBadge.innerText = category;
        if (articleModalTime) articleModalTime.innerHTML = '<i class="fa-regular fa-clock"></i> ' + time;
        
        // Render rich paragraphs
        if (articleModalDesc) {
            articleModalDesc.innerHTML = content;
        }

        // Render points list
        if (articleModalPointsList) {
            articleModalPointsList.innerHTML = "";
            if (rawPoints) {
                const points = rawPoints.split("|");
                points.forEach(pt => {
                    const li = document.createElement("li");
                    li.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>' + pt.trim() + '</span>';
                    articleModalPointsList.appendChild(li);
                });
            }
        }

        if (articleModal) {
            articleModal.classList.add("open");
            document.body.style.overflow = "hidden";
        }
    }

    function closeArticle() {
        if (articleModal) {
            articleModal.classList.remove("open");
            document.body.style.overflow = "";
        }
    }

    articleCards.forEach(card => {
        card.addEventListener("click", () => openArticle(card));
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openArticle(card);
            }
        });
    });

    if (closeArticleModalBtn) {
        closeArticleModalBtn.addEventListener("click", closeArticle);
    }

    if (articleModal) {
        articleModal.addEventListener("click", (e) => {
            if (e.target === articleModal) closeArticle();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && articleModal && articleModal.classList.contains("open")) {
            closeArticle();
        }
    });

    // Consultant CTA Action (Smooth scroll to contact & pre-fill message)
    if (articleModalConsultBtn) {
        articleModalConsultBtn.addEventListener("click", () => {
            closeArticle();
            const contactSection = document.getElementById("contact");
            const contactForm = document.getElementById("contact-form");
            const msgArea = contactForm ? contactForm.querySelector('textarea[name="message"]') : null;
            const nameInput = contactForm ? contactForm.querySelector('input[name="user_name"]') : null;

            if (msgArea && currentArticleTitle) {
                const isEn = localStorage.getItem("proC2sLang") === "en";
            msgArea.value = isEn ? "Hello, following my reading of your publication \"" + currentArticleTitle + "\", I would like to speak with your HR consultants regarding our corporate staffing requirements." : "Bonjour, suite à la lecture de votre publication \"" + currentArticleTitle + "\", je souhaite échanger avec vos consultants RH pour étudier nos besoins d'entreprise.";
            }

            if (contactSection) {
                setTimeout(() => {
                    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    if (nameInput) {
                        setTimeout(() => nameInput.focus(), 600);
                    }
                }, 100);
            }
        });
    }

    // Share Article Link
    if (articleModalShareBtn && articleModalShareText) {
        articleModalShareBtn.addEventListener("click", () => {
            const shareUrl = window.location.origin + window.location.pathname + "#actualites";
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    const originalText = articleModalShareText.innerText;
                    articleModalShareText.innerText = "Lien copié !";
                    articleModalShareBtn.style.background = "rgba(16, 185, 129, 0.25)";
                    articleModalShareBtn.style.borderColor = "#10b981";
                    setTimeout(() => {
                        articleModalShareText.innerText = originalText;
                        articleModalShareBtn.style.background = "";
                        articleModalShareBtn.style.borderColor = "";
                    }, 2500);
                }).catch(() => {
                    alert("Lien : " + shareUrl);
                });
            } else {
                alert("Lien : " + shareUrl);
            }
        });
    }

    // Simulator Pro Interactive
    const simSector = document.getElementById("simSector");
    const simCount = document.getElementById("simCount");
    const simWhatsAppBtn = document.getElementById("simWhatsAppBtn");
    const simPoolDisplay = document.getElementById("simPoolDisplay");
    const simSpeedDisplay = document.getElementById("simSpeedDisplay");

    function updateSimLink() {
        if(simSector && simWhatsAppBtn) {
            const count = simCount ? simCount.value : "3 à 5 profils";
            const sector = simSector.value;
            const msg = `Bonjour PRO C2S, nous souhaitons une délégation de ${count} dans le secteur : ${sector}. Merci de nous transmettre une proposition et devis.`;
            simWhatsAppBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent(msg)}`;
        }
    }

    const sectorCards = document.querySelectorAll(".sim-card-btn");
    const customBox = document.getElementById("simCustomSectorBox");
    const customInput = document.getElementById("simCustomSectorInput");

    sectorCards.forEach(card => {
        card.addEventListener("click", () => {
            sectorCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            const sector = card.getAttribute("data-sector");
            const pool = card.getAttribute("data-pool");
            const speed = card.getAttribute("data-speed");

            if (sector === "autre") {
                if (customBox) customBox.style.display = "block";
                if (customInput) {
                    customInput.focus();
                    const typed = customInput.value.trim();
                    if (simSector) simSector.value = typed ? `Autre (${typed})` : "Autre profil spécifique";
                }
            } else {
                if (customBox) customBox.style.display = "none";
                if (simSector) simSector.value = sector;
            }

            if (simPoolDisplay && pool) simPoolDisplay.innerText = pool;
            if (simSpeedDisplay && speed) simSpeedDisplay.innerText = speed;
            updateSimLink();
        });
    });

    if (customInput) {
        customInput.addEventListener("input", () => {
            const typed = customInput.value.trim();
            if (simSector) simSector.value = typed ? `Autre (${typed})` : "Autre profil spécifique";
            updateSimLink();
        });
    }

    const countPills = document.querySelectorAll(".sim-count-pill");
    countPills.forEach(pill => {
        pill.addEventListener("click", () => {
            countPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            const count = pill.getAttribute("data-count");
            if (simCount) simCount.value = count;
            updateSimLink();
        });
    });

    updateSimLink();

    // FAQ Accordion
    document.querySelectorAll(".faq-item").forEach(item => {
        item.querySelector(".faq-question").addEventListener("click", () => {
            const isOpen = item.classList.contains("active");
            document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
            if(!isOpen) item.classList.add("active");
        });
    });

    // Contact EmailJS
    const contactForm = document.getElementById("contact-form");
    const toast = document.getElementById("toastNotification");
    const toastMsg = document.getElementById("toastMsg");

    function showToast(message, isError = false) {
        if(toast && toastMsg) {
            toastMsg.innerText = message;
            toast.style.background = isError ? "#e11d48" : "#1b5e20";
            toast.classList.add("show");
            setTimeout(() => toast.classList.remove("show"), 4000);
        }
    }

    if(contactForm) {
        if (typeof emailjs !== 'undefined') {
            emailjs.init({ publicKey: "W70dwCkNbwmFHeSOA" });
        }
        const submitBtn = contactForm.querySelector("button[type='submit']");

        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Envoi en cours...";
            submitBtn.disabled = true;

            emailjs.sendForm("service_d9cvkm8", "template_ob7d4cb", this)
                .then(() => {
                    showToast("Message envoyé avec succès !");
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("Erreur EmailJS:", error);
                    showToast("Erreur lors de l'envoi.", true);
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Simulator EmailJS Modal Submission
    const simOpenModalBtn = document.getElementById("simOpenModalBtn");
    const simEmailModal = document.getElementById("simEmailModal");
    const closeSimModalBtn = document.getElementById("closeSimModalBtn");
    const simEmailForm = document.getElementById("simEmailForm");
    const modalRecapSector = document.getElementById("modalRecapSector");
    const modalRecapCount = document.getElementById("modalRecapCount");
    const simModalSubmitBtn = document.getElementById("simModalSubmitBtn");

    if (simOpenModalBtn && simEmailModal) {
        simOpenModalBtn.addEventListener("click", () => {
            const sectorVal = simSector ? simSector.value : "Intérim & Production";
            const countVal = simCount ? simCount.value : "3 à 5 profils";
            if (modalRecapSector) modalRecapSector.innerText = sectorVal;
            if (modalRecapCount) modalRecapCount.innerText = countVal;
            simEmailModal.classList.add("open");
        });
    }

    if (closeSimModalBtn && simEmailModal) {
        closeSimModalBtn.addEventListener("click", () => {
            simEmailModal.classList.remove("open");
        });
        simEmailModal.addEventListener("click", (e) => {
            if (e.target === simEmailModal) simEmailModal.classList.remove("open");
        });
    }

    if (simEmailForm) {
        simEmailForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("simModalName").value;
            const phone = document.getElementById("simModalPhone").value;
            const email = document.getElementById("simModalEmail").value;
            const notes = document.getElementById("simModalNotes") ? document.getElementById("simModalNotes").value : "";
            const sectorVal = simSector ? simSector.value : "Non précisé";
            const countVal = simCount ? simCount.value : "Non précisé";

            const origText = simModalSubmitBtn ? simModalSubmitBtn.innerHTML : "Envoyer";
            if (simModalSubmitBtn) {
                simModalSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
                simModalSubmitBtn.disabled = true;
            }

            const templateParams = {
                user_name: name,
                user_phone: phone,
                user_email: email,
                message: `DEMANDE DE DEVIS SIMULATEUR RH PRO C2S:\n- Pôle d'expertise : ${sectorVal}\n- Effectif requis : ${countVal}\n- Précisions de mission : ${notes || 'Aucune'}`
            };

            emailjs.send("service_d9cvkm8", "template_ob7d4cb", templateParams)
                .then(() => {
                    showToast("Demande de devis transmise avec succès ! Nous vous recontactons sous 24h.");
                    simEmailForm.reset();
                    if (simEmailModal) simEmailModal.classList.remove("open");
                })
                .catch((err) => {
                    console.error("EmailJS Error:", err);
                    showToast("Erreur lors de l'envoi. Veuillez réessayer ou utiliser WhatsApp.", true);
                })
                .finally(() => {
                    if (simModalSubmitBtn) {
                        simModalSubmitBtn.innerHTML = origText;
                        simModalSubmitBtn.disabled = false;
                    }
                });
        });
    }
});


/* ===================================================================
   PRO C2S — SENIOR ENGINEER INTERACTION SUITE v2.0
   Micro-interactions, Particle Canvas, Smart Header, Sector Modal
=================================================================== */
(function() {
    'use strict';

    // 1. Scroll Progress Bar
    const progressBar = document.getElementById('scrollProgress');
    function updateScrollProgress() {
        if (!progressBar) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) {
            progressBar.style.width = '0%';
            return;
        }
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        progressBar.style.width = progress + '%';
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    // 2. Smart Header (Hide on Scroll Down, Reveal on Scroll Up)
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleSmartHeader() {
        const currentScrollY = window.scrollY;
        if (header) {
            if (currentScrollY > 180 && currentScrollY > lastScrollY) {
                // Scrolling down past threshold -> hide header
                header.classList.add('nav-hidden');
                header.classList.remove('nav-visible');
            } else {
                // Scrolling up or at top -> show header
                header.classList.remove('nav-hidden');
                header.classList.add('nav-visible');
            }
        }
        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleSmartHeader);
            ticking = true;
        }
    }, { passive: true });

    // 3. Executive World-Class Fluid Wave & Interactive Neural Aurora Engine (Stripe/Linear Grade)
    const canvas = document.getElementById('heroParticles');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        const heroSection = canvas.closest('.hero') || canvas.parentElement;

        let width = 0;
        let height = 0;
        let dpr = 1;
        let time = 0;
        let animationFrameId = null;
        let isHeroVisible = true;

        const mouse = {
            x: -2000,
            y: -2000,
            targetX: -2000,
            targetY: -2000,
            intensity: 0,
            targetIntensity: 0,
            radius: 190
        };

        function resize() {
            if (!heroSection) return;
            const rect = heroSection.getBoundingClientRect();
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.scale(dpr, dpr);
        }

        // --- Constellation Nodes ---
        const particleCount = Math.min(50, Math.max(26, Math.floor((window.innerWidth * 650) / 20000)));
        const particles = [];
        const pulses = [];

        class WaveNode {
            constructor() {
                this.reset(true);
            }
            reset(initial = false) {
                this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? -10 : width + 10);
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.75;
                this.vy = (Math.random() - 0.5) * 0.75;
                this.baseRadius = Math.random() * 2.4 + 1.4;
                this.radius = this.baseRadius;
                this.color = Math.random() > 0.45 
                    ? 'rgba(16, 185, 129, ' 
                    : (Math.random() > 0.5 ? 'rgba(52, 211, 153, ' : 'rgba(6, 182, 212, ');
                this.alpha = Math.random() * 0.45 + 0.45;
                this.pulseSpeed = 0.02 + Math.random() * 0.03;
                this.phase = Math.random() * Math.PI * 2;
            }
            update() {
                this.phase += this.pulseSpeed;
                this.radius = this.baseRadius + Math.sin(this.phase) * 0.8;
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < -30 || this.x > width + 30 || this.y < -30 || this.y > height + 30) {
                    this.reset(false);
                }

                // Interactive mouse repulsion/orbit
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius && dist > 0) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 2.8;
                    this.y -= Math.sin(angle) * force * 2.8;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.shadowColor = this.color + '0.9)';
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new WaveNode());
        }

        // --- Data Pulses along lines ---
        class DataPulse {
            constructor(pA, pB, color) {
                this.pA = pA;
                this.pB = pB;
                this.progress = 0;
                this.speed = 0.018 + Math.random() * 0.025;
                this.color = color;
                this.dead = false;
            }
            update() {
                this.progress += this.speed;
                if (this.progress >= 1) this.dead = true;
            }
            draw() {
                const cx = this.pA.x + (this.pB.x - this.pA.x) * this.progress;
                const cy = this.pA.y + (this.pB.y - this.pA.y) * this.progress;
                ctx.beginPath();
                ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = this.color + '1)';
                ctx.shadowBlur = 12;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // --- Fluid Aurora Waves ---
        const waves = [
            {
                baseYRatio: 0.70,
                amplitude: 42,
                frequency: 0.0030,
                speed: 0.0016,
                colorStart: 'rgba(16, 185, 129, 0.18)',
                colorEnd: 'rgba(5, 150, 105, 0.02)',
                stroke: 'rgba(16, 185, 129, 0.45)'
            },
            {
                baseYRatio: 0.78,
                amplitude: 52,
                frequency: 0.0022,
                speed: -0.0019,
                colorStart: 'rgba(6, 182, 212, 0.16)',
                colorEnd: 'rgba(14, 165, 233, 0.01)',
                stroke: 'rgba(6, 182, 212, 0.40)'
            },
            {
                baseYRatio: 0.86,
                amplitude: 36,
                frequency: 0.0038,
                speed: 0.0024,
                colorStart: 'rgba(52, 211, 153, 0.22)',
                colorEnd: 'rgba(16, 185, 129, 0.02)',
                stroke: 'rgba(52, 211, 153, 0.50)'
            }
        ];

        function drawAuroraWave(wConfig, t) {
            const baseY = height * wConfig.baseYRatio;
            ctx.beginPath();
            ctx.moveTo(0, height);

            const step = Math.max(12, Math.floor(width / 75));
            for (let x = 0; x <= width + step; x += step) {
                let y = baseY + 
                    Math.sin(x * wConfig.frequency + t * wConfig.speed * 1000) * wConfig.amplitude +
                    Math.cos(x * wConfig.frequency * 0.55 + t * 0.0012) * (wConfig.amplitude * 0.45);

                if (mouse.intensity > 0.01) {
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 340) {
                        const ripple = Math.sin(dist * 0.035 - t * 6) * Math.exp(-dist * 0.008) * (mouse.intensity * 28);
                        y += ripple;
                    }
                }

                if (x === 0) {
                    ctx.lineTo(0, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.lineTo(width, height);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, baseY - wConfig.amplitude, 0, height);
            grad.addColorStop(0, wConfig.colorStart);
            grad.addColorStop(1, wConfig.colorEnd);
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.strokeStyle = wConfig.stroke;
            ctx.lineWidth = 1.8;
            ctx.stroke();
        }

        // --- Mouse and Parallax Listeners ---
        const heroVisual = heroSection.querySelector('.hero-visual-inner');
        const floatingBoxes = heroSection.querySelectorAll('.floating-box, .floating-box-delayed');

        function onMouseMove(e) {
            const rect = heroSection.getBoundingClientRect();
            mouse.targetX = e.clientX - rect.left;
            mouse.targetY = e.clientY - rect.top;
            mouse.targetIntensity = 1;

            if (heroVisual && window.innerWidth > 900) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const relX = (e.clientX - rect.left - centerX) / centerX;
                const relY = (e.clientY - rect.top - centerY) / centerY;
                heroVisual.style.transform = `perspective(1000px) rotateY(${relX * 6}deg) rotateX(${-relY * 6}deg) translateZ(12px)`;

                floatingBoxes.forEach((box, idx) => {
                    const factor = idx === 0 ? 14 : -14;
                    box.style.transform = `translate(${relX * factor}px, ${relY * factor}px)`;
                });
            }
        }

        function onMouseLeave() {
            mouse.targetX = -2000;
            mouse.targetY = -2000;
            mouse.targetIntensity = 0;
            if (heroVisual) {
                heroVisual.style.transform = '';
                floatingBoxes.forEach(box => box.style.transform = '');
            }
        }

        heroSection.addEventListener('mousemove', onMouseMove, { passive: true });
        heroSection.addEventListener('mouseleave', onMouseLeave, { passive: true });

        heroSection.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches.length > 0) {
                const rect = heroSection.getBoundingClientRect();
                mouse.targetX = e.touches[0].clientX - rect.left;
                mouse.targetY = e.touches[0].clientY - rect.top;
                mouse.targetIntensity = 1;
            }
        }, { passive: true });

        heroSection.addEventListener('touchend', onMouseLeave, { passive: true });

        // --- Animation Loop ---
        function render(now) {
            if (!isHeroVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            time = now * 0.001;
            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;
            mouse.intensity += (mouse.targetIntensity - mouse.intensity) * 0.05;

            // 1. Draw Aurora Waves
            for (let i = 0; i < waves.length; i++) {
                drawAuroraWave(waves[i], time);
            }

            // 2. Draw Constellation Network
            const len = particles.length;
            for (let i = 0; i < len; i++) {
                particles[i].update();
                particles[i].draw();
            }

            const maxDist = 125;
            for (let i = 0; i < len; i++) {
                const pA = particles[i];
                for (let j = i + 1; j < len; j++) {
                    const pB = particles[j];
                    const dx = pA.x - pB.x;
                    const dy = pA.y - pB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.32;
                        ctx.beginPath();
                        ctx.moveTo(pA.x, pA.y);
                        ctx.lineTo(pB.x, pB.y);
                        ctx.strokeStyle = 'rgba(16, 185, 129, ' + alpha + ')';
                        ctx.lineWidth = 1.1;
                        ctx.stroke();

                        if (Math.random() < 0.0007 && pulses.length < 8) {
                            pulses.push(new DataPulse(pA, pB, pA.color));
                        }
                    }
                }

                // Interactive beam to cursor
                const mdx = mouse.x - pA.x;
                const mdy = mouse.y - pA.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < mouse.radius) {
                    const alpha = (1 - mDist / mouse.radius) * 0.65;
                    ctx.beginPath();
                    ctx.moveTo(pA.x, pA.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(6, 182, 212, ' + alpha + ')';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }
            }

            // Update & draw pulses
            for (let i = pulses.length - 1; i >= 0; i--) {
                pulses[i].update();
                pulses[i].draw();
                if (pulses[i].dead) pulses.splice(i, 1);
            }

            animationFrameId = requestAnimationFrame(render);
        }

        if ('IntersectionObserver' in window && heroSection) {
            const heroObs = new IntersectionObserver((entries) => {
                isHeroVisible = entries[0].isIntersecting;
            }, { threshold: 0.05 });
            heroObs.observe(heroSection);
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 180);
        }, { passive: true });

        resize();
        requestAnimationFrame(render);
    }

    // 4. Sector Card Modal Activation
    const sectorModal = document.getElementById('sectorModal');
    const closeSectorModalBtn = document.getElementById('closeSectorModalBtn');
    const sectorModalTitle = document.getElementById('sectorModalTitle');
    const sectorModalDesc = document.getElementById('sectorModalDesc');
    const sectorModalIcon = document.getElementById('sectorModalIcon');
    const sectorModalWaBtn = document.getElementById('sectorModalWaBtn');
    const sectorCards = document.querySelectorAll('.sector-card');

    sectorCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('title', 'Cliquer pour voir les détails et demander un devis');

        function openModal() {
            const title = card.getAttribute('data-title') || card.innerText.trim();
            const desc = card.getAttribute('data-desc') || '';
            const wa = card.getAttribute('data-wa') || `Bonjour PRO C2S, je souhaite demander une équipe dans le secteur: ${title}`;
            const iconEl = card.querySelector('i');

            if (sectorModalTitle) sectorModalTitle.innerText = title;
            if (sectorModalDesc) sectorModalDesc.innerText = desc;
            if (sectorModalIcon && iconEl) {
                sectorModalIcon.innerHTML = `<i class="${iconEl.className}"></i>`;
            }
            if (sectorModalWaBtn) {
                sectorModalWaBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent(wa)}`;
                sectorModalWaBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Demander une équipe (${title})`;
            }
            if (sectorModal) {
                sectorModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        }

        card.addEventListener('click', openModal);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });
    });

    function closeSectorModal() {
        if (sectorModal) {
            sectorModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (closeSectorModalBtn) closeSectorModalBtn.addEventListener('click', closeSectorModal);
    if (sectorModal) {
        sectorModal.addEventListener('click', (e) => {
            if (e.target === sectorModal) closeSectorModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSectorModal();
        }
    });

    // 5. Magnetic CTA Button Micro-Interaction (Desktop only)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const magneticBtns = document.querySelectorAll('.hero-actions .btn, .nav-actions .btn, .domains-section .btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.03)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // 6. Interactive 3D Tilt on Hover for Bento & Job Cards
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const tiltCards = document.querySelectorAll('.domain-card, .job-card, .split-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;
                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }


    // 7. Senior Engineer Interactive Tech Network Canvas (Service Pages)
    (function initServiceTechCanvas() {
        const heroSection = document.querySelector('.service-page-hero');
        if (!heroSection) return;

        const canvas = heroSection.querySelector('.tech-hero-canvas');
        if (!canvas) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let particles = [];
        let pulses = [];
        let animationFrameId = null;
        let isVisible = true;

        const isInfo = document.body.classList.contains('page-informatique');
        const isNettoyage = document.body.classList.contains('page-nettoyage');

        // Color palettes tuned for engineering aesthetic
        const palette = isInfo 
            ? ['#06b6d4', '#10b981', '#3b82f6', '#0ea5e9']
            : isNettoyage 
                ? ['#10b981', '#2dd4bf', '#0284c7', '#34d399']
                : ['#10b981', '#059669', '#34d399', '#0d9488'];

        const mouse = {
            x: -2000,
            y: -2000,
            targetX: -2000,
            targetY: -2000,
            radius: 170
        };

        function resize() {
            const rect = heroSection.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.scale(dpr, dpr);

            initParticles();
        }

        class TechNode {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.75;
                this.vy = (Math.random() - 0.5) * 0.75;
                this.baseRadius = Math.random() * 2 + 1.6;
                this.radius = this.baseRadius;
                this.color = palette[Math.floor(Math.random() * palette.length)];
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.pulseSpeed = 0.02 + Math.random() * 0.025;
            }

            update() {
                this.pulsePhase += this.pulseSpeed;
                this.radius = this.baseRadius + Math.sin(this.pulsePhase) * 0.8;

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) { this.x = 0; this.vx *= -1; }
                if (this.x > width) { this.x = width; this.vx *= -1; }
                if (this.y < 0) { this.y = 0; this.vy *= -1; }
                if (this.y > height) { this.y = height; this.vy *= -1; }

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius && dist > 0) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 2.2;
                    this.y -= Math.sin(angle) * force * 2.2;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        class DataPulse {
            constructor(nodeA, nodeB, color) {
                this.nodeA = nodeA;
                this.nodeB = nodeB;
                this.progress = 0;
                this.speed = 0.015 + Math.random() * 0.02;
                this.color = color;
                this.dead = false;
            }

            update() {
                this.progress += this.speed;
                if (this.progress >= 1) {
                    this.dead = true;
                }
            }

            draw() {
                const curX = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.progress;
                const curY = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.progress;
                ctx.beginPath();
                ctx.arc(curX, curY, 2.4, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        function initParticles() {
            particles = [];
            pulses = [];
            const count = Math.min(55, Math.max(25, Math.floor((width * height) / 16000)));
            for (let i = 0; i < count; i++) {
                particles.push(new TechNode());
            }
        }

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouse.targetX = e.clientX - rect.left;
            mouse.targetY = e.clientY - rect.top;
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
            mouse.targetX = -2000;
            mouse.targetY = -2000;
        }, { passive: true });

        heroSection.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches.length > 0) {
                const rect = heroSection.getBoundingClientRect();
                mouse.targetX = e.touches[0].clientX - rect.left;
                mouse.targetY = e.touches[0].clientY - rect.top;
            }
        }, { passive: true });

        heroSection.addEventListener('touchend', () => {
            mouse.targetX = -2000;
            mouse.targetY = -2000;
        }, { passive: true });

        const maxDist = 135;

        function animate() {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            mouse.x += (mouse.targetX - mouse.x) * 0.12;
            mouse.y += (mouse.targetY - mouse.y) * 0.12;

            const len = particles.length;
            for (let i = 0; i < len; i++) {
                particles[i].update();
                particles[i].draw();
            }

            for (let i = 0; i < len; i++) {
                const pA = particles[i];
                for (let j = i + 1; j < len; j++) {
                    const pB = particles[j];
                    const dx = pA.x - pB.x;
                    const dy = pA.y - pB.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(pA.x, pA.y);
                        ctx.lineTo(pB.x, pB.y);
                        ctx.strokeStyle = 'rgba(16, 185, 129, ' + alpha + ')';
                        ctx.lineWidth = 1;
                        ctx.stroke();

                        if (Math.random() < 0.0008 && pulses.length < 8) {
                            pulses.push(new DataPulse(pA, pB, pA.color));
                        }
                    }
                }

                const mdx = mouse.x - pA.x;
                const mdy = mouse.y - pA.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mDist < mouse.radius) {
                    const alpha = (1 - mDist / mouse.radius) * 0.55;
                    ctx.beginPath();
                    ctx.moveTo(pA.x, pA.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(6, 182, 212, ' + alpha + ')';
                    ctx.lineWidth = 1.3;
                    ctx.stroke();
                }
            }

            for (let i = pulses.length - 1; i >= 0; i--) {
                pulses[i].update();
                pulses[i].draw();
                if (pulses[i].dead) {
                    pulses.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isVisible = entry.isIntersecting;
                });
            }, { threshold: 0.05 });
            observer.observe(heroSection);
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 200);
        }, { passive: true });

        resize();
        animate();
    })();

})();