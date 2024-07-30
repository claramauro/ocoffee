const app = {
    init: () => {
        const menuBtn = document.querySelector("#btn-menu");
        menuBtn.addEventListener("click", app.handleClickOnBurgerIcon);

        app.mobileMenu = document.querySelector("#mobile-menu");
    },
    handleClickOnBurgerIcon: (e) => {
        if (app.mobileMenu.classList.contains("hidden")) {
            app.mobileMenu.classList.remove("hidden");
            app.mobileMenu.setAttribute("aria-hidden", "false");
            e.currentTarget.setAttribute("aria-expanded", "true");
        } else {
            app.mobileMenu.classList.add("hidden");
            app.mobileMenu.setAttribute("aria-hidden", "true");
            e.currentTarget.setAttribute("aria-expanded", "false");
        }
    },
};

app.init();
