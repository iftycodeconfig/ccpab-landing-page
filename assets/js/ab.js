

const ab_header = document.querySelector(".cc-ab-header");

if (ab_header) {
    const hamburger_menu_open = document.querySelector(".hamburger-menu");

    hamburger_menu_open.addEventListener("click", function () {
        ab_header.classList.toggle("cc-mobile-menu-active");
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



(function ($) {

    document.addEventListener("DOMContentLoaded", function () {
        const sections = document.querySelectorAll(".cc-video-popup-section");
    
        sections.forEach((section) => {
            const btn = section.querySelector(".cc-video-popup-btn");
            const popupBox = section.querySelector(".cc-video-popup-box");
            const closeBtn = section.querySelector(".cc-video-popup-close");
            const iframe = section.querySelector(".cc-video-popup-box .video-frame iframe");
    
            if (btn && popupBox) {
                btn.addEventListener("click", () => {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                    section.classList.add("cc-video-popup-active");
                });
            }
    
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    section.classList.remove("cc-video-popup-active");
                    if (iframe) {
                        iframe.src = iframe.src;
                    }
                });
            }
        });
    });
    

})(jQuery);