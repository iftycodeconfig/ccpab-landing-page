

const common_header = document.querySelector("#cc-header");

if (common_header) {
    const hamburger_menu_open = document.querySelector(".hamburger-menu");

    hamburger_menu_open.addEventListener("click", function () {
        common_header.classList.toggle("cc-mobile-menu-active");
    });
}


const toggleButtons = document.querySelectorAll(".ab-toggle-button");

toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const parentBody = this.closest(".ab-toggle-body");
        if (parentBody) {
            parentBody.classList.toggle("ab-toggle-active");
        }
    });
});

