const app = {
    init: () => {
        const menuBtn = document.querySelector("#btn-menu");
        menuBtn.addEventListener("click", app.handleClickOnBurgerIcon);

        const showAllBtn = document.querySelector("#btn-show-all");
        showAllBtn.addEventListener("click", app.handleClickOnShowAllBtn);

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
    handleClickOnShowAllBtn: (e) => {
        const hiddenCards = document.querySelectorAll(".card.hide-card");
        hiddenCards.forEach((card) => card.classList.remove("hide-card"));
        e.currentTarget.classList.add("hidden");
    },
};

app.init();
