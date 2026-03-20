function closeAllDropdowns() {
    document.querySelectorAll(".dropdown.open").forEach(dropdown => {
        dropdown.classList.remove("open");
    });
}

function initDropdownMenus() {
    document.querySelectorAll(".dropdown").forEach(dropdown => {
        const trigger = dropdown.querySelector(".dropbtn");
        const submenuButtons = dropdown.querySelectorAll(".dropdown-content button");

        if (trigger) {
            trigger.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();

                const hasSubmenu = submenuButtons.length > 0;
                if (!hasSubmenu) {
                    closeAllDropdowns();
                    return;
                }

                const shouldOpen = !dropdown.classList.contains("open");
                closeAllDropdowns();

                if (shouldOpen) {
                    dropdown.classList.add("open");
                }
            });
        }

        submenuButtons.forEach(button => {
            button.addEventListener("click", () => {
                closeAllDropdowns();
            });
        });
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".dropdown")) {
            closeAllDropdowns();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeAllDropdowns();
        }
    });
}

function goToFilteredPage(category, subcategory = null) {
    let url = `products.html?category=${encodeURIComponent(category)}`;
    if (subcategory) {
        url += `&subcategory=${encodeURIComponent(subcategory)}`;
    }
    window.location.href = url;
}

window.addEventListener("DOMContentLoaded", initDropdownMenus);
