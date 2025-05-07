

const common_header = document.querySelector("#cc-header");

if (common_header) {
    const hamburger_menu_open = document.querySelector(".hamburger-menu");

    hamburger_menu_open.addEventListener("click", function () {
        common_header.classList.toggle("cc-mobile-menu-active");
    });
}