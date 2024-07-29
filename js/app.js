// Ouvrir/Fermer le menu de navigation mobile
const menuBtn = document.querySelector("#btn-menu");
const mobileMenu = document.querySelector("#mobile-menu");
menuBtn.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.setAttribute("aria-hidden", "false");
        menuBtn.setAttribute("aria-expanded", "true");
    } else {
        mobileMenu.classList.add("hidden");
        mobileMenu.setAttribute("aria-hidden", "true");
        menuBtn.setAttribute("aria-expanded", "false");
    }
});
