/* ==========================================
   PRO C.2.S
   SCRIPT.JS
========================================== */

// ==========================
// Smooth Active Navigation
// ==========================

const links = document.querySelectorAll(".nav-links a");

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

});

// ==========================
// Navbar Shadow
// ==========================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.style.boxShadow="0 10px 25px rgba(0,0,0,.12)";

    }else{

        header.style.boxShadow="0 5px 20px rgba(0,0,0,.08)";

    }

});

// ==========================
// Fade Animation
// ==========================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".about,.services,.references,.contact").forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

// ==========================
// Mobile Menu
// ==========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

// ==========================
// Cookie Consent Logic Pro (Fix)
// ==========================
document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookieConsentBanner");
    const acceptBtn = document.getElementById("acceptCookiesBtn");

    if (cookieBanner && acceptBtn) {
        // Ila kan 3ndo cookie m-sajl mn qbl, mssa7ha direct
        if (localStorage.getItem("proC2sCookiesAccepted") === "true") {
            cookieBanner.style.display = "none";
        }

        // Mli ywrek l-msta3mil 3la Bouton
        acceptBtn.addEventListener("click", function() {
            localStorage.setItem("proC2sCookiesAccepted", "true");
            cookieBanner.style.display = "none";
        });
    }
});