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

/* ==========================================
   PRO C.2.S - SCRIPT.JS (Cookies Fix 100%)
========================================== */

document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookieConsentBanner");
    const acceptBtn = document.getElementById("acceptCookiesBtn");

    // 1. Ila kan msta3mil qbl wrak 3liha, mssaha f lahal
    if (localStorage.getItem("proC2sCookiesAccepted") === "true") {
        if (cookieBanner) {
            cookieBanner.style.display = "none";
        }
    }

    // 2. Mli ywrak 3la Bouton "Tout accepter"
    if (acceptBtn && cookieBanner) {
        acceptBtn.addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.setItem("proC2sCookiesAccepted", "true");
            cookieBanner.style.display = "none";
        });
    }
});