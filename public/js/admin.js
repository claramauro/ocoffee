const admin = {
    init: () => {
        const deleteCategoryBtns = document.querySelectorAll(".js-delete-category-btn");
        deleteCategoryBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const modal = document.querySelector(".modal");
                modal.classList.remove("hidden");
                modal.setAttribute("aria-hidden", false);
                const categoryId = e.currentTarget.dataset.categoryId;
                modal.querySelector("#confirm-delete").href = `/admin/categories/delete/${categoryId}`;
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

        // Gestion tab/focus sur la modale
        window.addEventListener("keydown", (e) => {
            const modal = document.querySelector(".modal");
            if (!modal.classList.contains("hidden") && e.key === "Tab") {
                e.preventDefault();
                focusableElements = Array.from(modal.querySelectorAll(".btn"));
                let index = focusableElements.findIndex((el) => el === modal.querySelector(":focus"));
                if (e.shiftKey === true) {
                    index--;
                } else {
                    index++;
                }
                if (index >= focusableElements.length) {
                    index = 0;
                }
                if (index < 0) {
                    index = focusableElements.length - 1;
                }
                focusableElements[index].focus();
            }
        });
    },
};

document.addEventListener("DOMContentLoaded", admin.init);
