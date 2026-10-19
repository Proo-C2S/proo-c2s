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

    if(closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => modal.classList.remove("open"));
        modal.addEventListener("click", (e) => { if(e.target === modal) modal.classList.remove("open"); });
    }

    // Article Modal (Blog Reading)
    const articleModal = document.getElementById("articleModal");
    const closeArticleModalBtn = document.getElementById("closeArticleModalBtn");
    const articleModalTitle = document.getElementById("articleModalTitle");
    const articleModalBadge = document.getElementById("articleModalBadge");
    const articleModalDesc = document.getElementById("articleModalDesc");
    const articleModalWaBtn = document.getElementById("articleModalWaBtn");
    const articleCards = document.querySelectorAll(".article-card");

    articleCards.forEach(card => {
        const readBtn = card.querySelector(".btn-read-article");
        readBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const title = card.getAttribute("data-title");
            const category = card.getAttribute("data-category");
            const content = card.getAttribute("data-content");

            articleModalTitle.innerText = title;
            articleModalBadge.innerText = category;
            articleModalDesc.innerText = content;
            articleModalWaBtn.href = `https://wa.me/212663449824?text=${encodeURIComponent("Bonjour, j'ai lu votre article '" + title + "' et je souhaite en savoir plus.")}`;
            
            if(articleModal) articleModal.classList.add("open");
        });
    });

    if(closeArticleModalBtn && articleModal) {
        closeArticleModalBtn.addEventListener("click", () => articleModal.classList.remove("open"));
        articleModal.addEventListener("click", (e) => { if(e.target === articleModal) articleModal.classList.remove("open"); });
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

    // 3. Hero Particle Canvas (Senior Tech Agency Grade)
    const canvas = document.getElementById('heroParticles');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight || 600;
        let particles = [];
        const particleCount = Math.min(45, Math.floor((width * height) / 18000));
        let mouse = { x: -1000, y: -1000, radius: 120 };

        function onResize() {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        }
        window.addEventListener('resize', onResize, { passive: true });

        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }, { passive: true });

        canvas.parentElement.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        }, { passive: true });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.4 ? 'rgba(16, 185, 129, ' : 'rgba(0, 230, 118, ';
                this.alpha = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse push
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius && dist > 0) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let isHeroVisible = true;
        const heroObserver = new IntersectionObserver((entries) => {
            isHeroVisible = entries[0].isIntersecting;
        }, { threshold: 0.05 });
        if (canvas.parentElement) heroObserver.observe(canvas.parentElement);

        function animateParticles() {
            if (isHeroVisible) {
                ctx.clearRect(0, 0, width, height);

                // Connect nearby particles
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 110) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(16, 185, 129, ${0.18 * (1 - dist / 110)})`;
                            ctx.lineWidth = 0.8;
                            ctx.stroke();
                        }
                    }
                }

                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
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

})();