const admin = {
    init: () => {
        const deleteCategoryBtns = document.querySelectorAll(".js-delete-category-btn");
        deleteCategoryBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const modal = document.querySelector(".modal");
                modal.classList.remove("hidden");
                modal.setAttribute("aria-hidden", false);
            });
        });

        const closeModalBtns = document.querySelectorAll(".js-close-modal");
        closeModalBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const modal = e.currentTarget.closest(".modal");
                modal.classList.add("hidden");
                modal.setAttribute("aria-hidden", true);
            });
        });
    },
};

document.addEventListener("DOMContentLoaded", admin.init);
