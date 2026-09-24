/* ==========================================
   PRO C2S - SCRIPT.JS (Testé et corrigé)
========================================== */

const translations = {
    fr: {
        nav_home: "Accueil",
        nav_companies: "Entreprises",
        nav_jobs: "Offres d'emploi",
        nav_about: "À propos",
        nav_refs: "Références",
        nav_faq: "FAQ",
        nav_contact: "Contact"
    },
    en: {
        nav_home: "Home",
        nav_companies: "Companies",
        nav_jobs: "Job Offers",
        nav_about: "About Us",
        nav_refs: "References",
        hero_title: "Your HR partner to build tomorrow's teams"
    },
    ar: {
        nav_home: "الرئيسية",
        nav_companies: "الشركات",
        nav_jobs: "عروض العمل",
        nav_about: "من نحن",
        nav_refs: "مراجعنا",
        hero_title: "شريكك في الموارد البشرية لبناء فرق المستقبل"
    }
};

function changeLanguage(lang) {
    localStorage.setItem("proC2s_lang", lang);
    
    if (lang === 'ar') {
        document.documentElement.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", "ar");
    } else {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("lang", lang);
    }

    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active-lang"));
    const activeBtn = document.getElementById("btn-" + lang);
    if(activeBtn) activeBtn.classList.add("active-lang");

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

window.changeLanguage = changeLanguage;

document.addEventListener("DOMContentLoaded", function() {
    const savedLang = localStorage.getItem("proC2s_lang") || "fr";
    changeLanguage(savedLang);

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

    if(menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
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
    const openPrivacyLink = document.getElementById("openPrivacyLink");
    const closePrivacyBtn = document.getElementById("closePrivacyBtn");

    function togglePrivacyModal(e) {
        if(e) e.preventDefault();
        if(privacyModal) privacyModal.classList.toggle("open");
    }

    if(openPrivacyModal) openPrivacyModal.addEventListener("click", togglePrivacyModal);
    if(openPrivacyLink) openPrivacyLink.addEventListener("click", togglePrivacyModal);
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

    // Job Filters & Modal
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

    const modal = document.getElementById("jobModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalTitle = document.getElementById("modalTitle");
    const modalBadge = document.getElementById("modalBadge");
    const modalSector = document.getElementById("modalSector");
    const modalLocation = document.getElementById("modalLocation");
    const modalReq = document.getElementById("modalReq");
    const modalDesc = document.getElementById("modalDesc");
    const modalApplyBtn = document.getElementById("modalApplyBtn");

    allJobCards.forEach(card => {
        card.addEventListener("click", () => {
            modalTitle.innerText = card.getAttribute("data-title");
            modalBadge.innerText = card.getAttribute("data-type");
            modalBadge.className = `modal-header-badge job-badge ${card.getAttribute("data-badge")}`;
            modalSector.innerHTML = `<i class="fa-solid fa-briefcase"></i> ${card.getAttribute("data-sector")}`;
            modalLocation.innerText = card.getAttribute("data-location");
            modalReq.innerText = card.getAttribute("data-req");
            modalDesc.innerText = card.getAttribute("data-desc");
            modalApplyBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent(card.getAttribute("data-wa"))}`;
            modalApplyBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Postuler via WhatsApp`;
            if(modal) modal.classList.add("open");
        });
    });

    const sectorCards = document.querySelectorAll(".sector-card");
    sectorCards.forEach(card => {
        card.addEventListener("click", () => {
            modalTitle.innerText = card.getAttribute("data-title");
            modalBadge.innerText = "Secteur d'Expertise";
            modalBadge.className = "modal-header-badge job-badge interim";
            modalSector.innerHTML = `<i class="fa-solid fa-circle-check"></i> PRO C2S Maroc`;
            modalLocation.innerText = "Disponibilité Nationale";
            modalReq.innerText = "Intervention Rapide (24h/48h)";
            modalDesc.innerText = card.getAttribute("data-desc");
            modalApplyBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent(card.getAttribute("data-wa"))}`;
            modalApplyBtn.innerHTML = `<i class="fa-brands fa-whatsapp"></i> Demander du personnel dans ce secteur`;
            if(modal) modal.classList.add("open");
        });
    });

    if(closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));
        modal.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("open"); });
    }

    // Simulator
    const simSector = document.getElementById("simSector");
    const simCount = document.getElementById("simCount");
    const simWhatsAppBtn = document.getElementById("simWhatsAppBtn");

    function updateSimLink() {
        if(simSector && simWhatsAppBtn) {
            const count = simCount.value || 1;
            const msg = `Bonjour PRO C2S, nous souhaitons une délégation de ${count} profil(s) dans le secteur: ${simSector.value}. Pouvez-vous nous transmettre une étude / devis ?`;
            simWhatsAppBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent(msg)}`;
        }
    }

    if(simSector && simCount) {
        simSector.addEventListener("change", updateSimLink);
        simCount.addEventListener("input", updateSimLink);
        updateSimLink();
    }

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
});