const menuBtn = document.querySelector("#btn-menu");
const mobileMenu = document.querySelector("#mobile-menu");

menuBtn.addEventListener("click", (e) => {
    mobileMenu.classList.toggle("hidden");
});
