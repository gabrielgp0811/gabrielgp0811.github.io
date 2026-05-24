const langs = {};
const scrollTopBtn = document.getElementById("scrollTopBtn");

/* SCROLL TOP BUTTON */
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

function toggleMenu() {

    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.querySelector(".menu-toggle");

    navLinks.classList.toggle("active");

    menuToggle.classList.toggle("active");
}

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

async function setLanguage(lang) {

    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    if (!translations) return;

    document.querySelectorAll('[data-i18n]').forEach(element => {

        const key = element.getAttribute('data-i18n');

        if (!key) return;

        const keySplit = key.split('.');
        let val = translations;
        for (const part of keySplit) {
            const valPart = val[part];
            if (valPart)
                val = valPart;
        }

        if (val)
            element.textContent = val;
    });

    localStorage.setItem('language', lang);
}