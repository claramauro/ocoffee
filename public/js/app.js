const app = {
    init: () => {
        app.burgerBtn = document.querySelector("#burger-btn");
        app.burgerBtn.addEventListener("click", app.handleClickOnBurgerIcon);

        app.header = document.querySelector("header");
        app.headerNav = document.querySelector("#header-nav");

        window.addEventListener("resize", app.handleResizeWindow);

        app.formCategory = document.querySelector("#form-category");
        const selectFormCategory = document.querySelector("#form-category select");
        if (selectFormCategory) {
            selectFormCategory.addEventListener("change", app.handleOnChangeSelectFormCategory);
        }

        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            card.addEventListener("focusin", app.handleFocusOnCardBtn);
        });
    },
    handleResizeWindow: (e) => {
        if (window.innerWidth >= 992) {
            if (app.headerNav.classList.contains("expanded")) {
                app.closeNav();
            }
        }
    },
    handleClickOnBurgerIcon: (e) => {
        if (!app.headerNav.classList.contains("expanded")) {
            app.openNav();
        } else {
            app.closeNav();
        }
    },
    openNav: () => {
        app.headerNav.classList.add("expanded"); // Afficher la nav
        const heightNav = app.headerNav.offsetHeight;
        app.header.style.marginBottom = `${heightNav}px`; // nav en position absolute sur mobile, on rajoute margin bottom pour décaler le main
        app.burgerBtn.style.transform = "rotate(90deg)";
        app.burgerBtn.setAttribute("aria-expanded", "true");
        app.headerNav.setAttribute("aria-hidden", "false");
    },
    closeNav: () => {
        app.headerNav.classList.remove("expanded"); // Masquer la nav
        app.header.style.marginBottom = "0";
        app.burgerBtn.style.transform = "rotate(180deg)";
        app.burgerBtn.setAttribute("aria-expanded", "false");
        app.headerNav.setAttribute("aria-hidden", "true");
    },
    handleOnChangeSelectFormCategory: (e) => {
        app.formCategory.submit();
    },
    handleFocusOnCardBtn: (e) => {
        const card = e.currentTarget;
        card.classList.add("up");
        // Empecher le transform du hover si le focus au clavier est deja passé sur la card
    },
    // PARTIE ADMIN :
    handleClickOnDeleteCategory: (e) => {},
};

document.addEventListener("DOMContentLoaded", app.init);
