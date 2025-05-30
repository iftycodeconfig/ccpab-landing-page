(function ($) {
    // Header sticky
    const common_header = document.querySelector(".cc-dropbox-header");

    if (common_header) {
        
        const hamburger_menu_open = document.querySelector(".mobile-menu-open");
        const hamburger_menu_close =
            document.querySelector(".mobile-menu-close");

        hamburger_menu_open.addEventListener("click", function () {
            common_header.classList.add("cc-mobile-menu-active");
        });
        hamburger_menu_close.addEventListener("click", function () {
            common_header.classList.remove("cc-mobile-menu-active");
        });

        let lastScrollY = window.scrollY;
        let removeStickyTimeout;

        function stickyFunction() {
            return setTimeout(function () {
                common_header.classList.remove("sticky");
            }, 2000);
        }

        // Add sticky behavior based on scroll
        window.onscroll = function () {
            let currentScrollY = window.scrollY;

            if (currentScrollY < 500) {
                if (removeStickyTimeout) {
                    clearTimeout(removeStickyTimeout);
                }
                common_header.classList.add("sticky");
                common_header.classList.add("sticky-hero");
                return;
            }

            if (currentScrollY > lastScrollY) {
                clearTimeout(removeStickyTimeout);
                removeStickyTimeout = stickyFunction();
                common_header.classList.remove("sticky-hero");
            } else {
                clearTimeout(removeStickyTimeout);
                common_header.classList.add("sticky");
            }

            lastScrollY = currentScrollY;
        };

        // Add sticky while mouse is hovering over the header
        common_header.addEventListener("mouseover", function () {
            clearTimeout(removeStickyTimeout);
            common_header.classList.add("sticky");
        });

        common_header.addEventListener("mouseout", function () {
            removeStickyTimeout = stickyFunction();
        });
    }

    // Radio button of annual & lifetime
    const dropbox_radio_button = document.querySelector(".radio-btns");

    if (dropbox_radio_button) {
        const annual_button = document.getElementById("db-duration-annual");
        const lifetime_button = document.getElementById("db-duration-lifetime");
        const price_table = document.getElementsByClassName("db-pricing-table");
        const savingArea = document.querySelector(".db-saving-percent");

        annual_button.addEventListener("click", function () {
            for (let i = 0; i < price_table.length; i++) {
                price_table[i].classList.remove("lifetime-button-active");
                price_table[i].classList.add("annual-button-active");
            }

            annual_button.classList.add("active");
            lifetime_button.classList.remove("active");
            savingArea.classList.remove("lifetime-active");
        });

        lifetime_button.addEventListener("click", function () {
            for (let i = 0; i < price_table.length; i++) {
                price_table[i].classList.remove("annual-button-active");
                price_table[i].classList.add("lifetime-button-active");
            }

            lifetime_button.classList.add("active");
            annual_button.classList.remove("active");
            savingArea.classList.add("lifetime-active");
        });
    }

    function introVideoPopup() {
        const popUpWrapper = document.querySelector(".cc-db-hero-section");
        const popUpTargetButton = document.getElementById("db-popup-button");
        const popUpTargetArea = document.querySelector(".pop-up-video-section");
        const closePopupButton = document.getElementById("popup-close");
        const iFrameIntro = document.querySelector(
            ".cc-db-hero-section .pop-up-video-section .video-fame iframe"
        );

        if (popUpTargetButton && popUpTargetArea) {
            popUpTargetButton.addEventListener("click", (e) => {
                popUpWrapper.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                // Add class to show the popup
                popUpWrapper.classList.add("active-popup");
                popUpTargetArea.classList.add("popup-ready");
            });
        }
        if (closePopupButton) {
            closePopupButton.addEventListener("click", () => {
                popUpWrapper.classList.remove("active-popup");
                if (iFrameIntro) {
                    iFrameIntro.src = iFrameIntro.src;
                }
            });
        }
    }

    function extraFeatureArea() {
        const extraFeatureButton =
            document.getElementById("all-feature-button");
        const wrapperArea = document.querySelector(".extra-features");
        const extraFeatures = document.querySelectorAll(
            ".extra-features .extra-feature-item"
        );

        let initialItems = 6;
        let itemsPerClick = 3;
        let visibleItems = initialItems;

        // Function to show the current visible items
        function showItems() {
            extraFeatures.forEach((feat, index) => {
                feat.style.display = index < visibleItems ? "block" : "none";
            });
        }

        // Function to update item count based on screen size
        function updateItemCount() {
            const screenWidth = window.innerWidth;

            if (screenWidth <= 768) {
                initialItems = 2;
                itemsPerClick = 1;
            } else if (screenWidth <= 1024) {
                initialItems = 4;
                itemsPerClick = 2;
            } else {
                initialItems = 6;
                itemsPerClick = 3;
            }
            visibleItems = initialItems;
            showItems();
        }

        // Initialize item visibility on page load
        if (extraFeatureButton) {
            updateItemCount();

            // Listen for window resize to update items per click and initial items
            window.addEventListener("resize", updateItemCount);

            // Button click handler for showing more items
            extraFeatureButton.addEventListener("click", () => {
                const totalItems = extraFeatures.length;

                if (visibleItems >= totalItems) {
                    // Scroll back to top of the wrapper area
                    wrapperArea.parentElement.parentElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });

                    setTimeout(() => {
                        wrapperArea.classList.remove("all-feature-showed");
                        extraFeatureButton.innerHTML =
                            "<span>See All Features</span>";
                        visibleItems = initialItems;
                        showItems();
                    }, 1000);
                } else {
                    // Show the next set of items
                    visibleItems = Math.min(
                        visibleItems + itemsPerClick,
                        totalItems
                    );
                    showItems();

                    // Update button text based on visibility
                    extraFeatureButton.innerHTML =
                        visibleItems >= totalItems
                            ? "<span>Back To Top</span>"
                            : "<span>Show More</span>";

                    // Add a class if all items are shown
                    if (visibleItems >= totalItems) {
                        wrapperArea.classList.add("all-feature-showed");
                        extraFeatureButton.style.position = "unset";
                    }
                }
            });
        }
    }

    function dropboxOnLoad() {
        introVideoPopup();
        extraFeatureArea();
    }

    window.addEventListener("DOMContentLoaded", dropboxOnLoad);
})(jQuery);
