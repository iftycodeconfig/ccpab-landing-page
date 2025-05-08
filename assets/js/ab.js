

const common_header = document.querySelector("#cc-header");

if (common_header) {
    const hamburger_menu_open = document.querySelector(".hamburger-menu");

    hamburger_menu_open.addEventListener("click", function () {
        common_header.classList.toggle("cc-mobile-menu-active");
    });
}


const ab_pricing_toggle = document.querySelector(".ab-pricing-toggle");

if (ab_pricing_toggle) {
    const ab_pricing_toggle_button = document.querySelector(".ab-pricing-toggle button");

    ab_pricing_toggle_button.addEventListener("click", function () {
        ab_pricing_toggle.classList.toggle("yearly-active");
    });
}