const app = {
    init: () => {
        app.burgerBtn = document.querySelector("#burger-btn");
        app.burgerBtn.addEventListener("click", app.handleClickOnBurgerIcon);

        app.header = document.querySelector("header");
        app.headerNav = document.querySelector("#header-nav");

        window.addEventListener("resize", app.handleResizeWindow);
    },
    handleResizeWindow: (e) => {
        if (window.innerWidth >= 992) {
            app.closeNav();
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
};

document.addEventListener("DOMContentLoaded", app.init);
