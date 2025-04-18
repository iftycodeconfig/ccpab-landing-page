(function ($) {
    $(document).ready(function () {
        if (window.innerWidth <= 1024) {
            const menuItemChilden = document.querySelectorAll(
                ".menu-item-has-children"
            );

            const dropdownMenu = document.querySelectorAll(".dropdown-menu");

            dropdownMenu.forEach((item, i) => {
                $(item).click(function (e) {
                    e.stopPropagation();
                });
            });
            if (menuItemChilden) {
                menuItemChilden.forEach((item, i) => {
                    $(item).click(function (e) {
                        if (e.target.nodeName === "SPAN") {
                            return;
                        }
                        e.preventDefault();

                        dropdownMenu.forEach((answer, index) => {
                            if (i !== index && $(answer).is(":visible")) {
                                $(answer).slideUp(300);
                                $(menuItemChilden[index]).removeClass(
                                    "active-dopdown-menu"
                                );
                            }
                        });

                        if ($(dropdownMenu[i]).is(":hidden")) {
                            $(dropdownMenu[i]).slideDown(300);
                            $(item).addClass("active-dopdown-menu");
                        } else {
                            $(dropdownMenu[i]).slideUp(300);
                            $(item).removeClass("active-dopdown-menu");
                        }
                    });
                });
            }
        }

        function initializeAccordion() {
            $(".cc-accordion").each(function () {
                const accordion = $(this);
                const accordionItems = accordion.find(".accordion-item");
                const accordionHeaders = accordion.find(".accordion-head");

                // Open the first item by default
                const firstItem = accordionItems.first();
                firstItem.addClass("open-body");
                firstItem.find(".accordion-body").show();

                // Close all other items by default
                accordionItems.slice(1).find(".accordion-body").hide();
                accordionItems.slice(1).removeClass("open-body");

                if ($(".accordion-another-item").length > 0) {
                    $(".accordion-another-item")
                        .first()
                        .addClass("open-another-body");
                }
                // Add toggle functionality
                accordionHeaders.each(function () {
                    $(this).on("click", function () {
                        const body = $(this).siblings(".accordion-body");
                        const parentItem = $(this).closest(".accordion-item");

                        // Close other open items in this group
                        accordion
                            .find(".accordion-body")
                            .not(body)
                            .slideUp(300);
                        accordion
                            .find(".accordion-item")
                            .not(parentItem)
                            .removeClass("open-body");

                        // Toggle the current item
                        body.slideToggle(300);
                        parentItem.toggleClass("open-body");

                        if ($(".accordion-another-item").length > 0) {
                            $(".accordion-another-item").each(function () {
                                if (
                                    parentItem.hasClass("open-body") &&
                                    parentItem.data("id") === $(this).data("id")
                                ) {
                                    $(this).addClass("open-another-body");
                                } else {
                                    $(this).removeClass("open-another-body");
                                }
                            });
                        }
                    });
                });

                // Additional For Eaw //
            });
        }
        initializeAccordion();

        $(".cc-blog-content img, .single-docs-content img").each(function () {
            var $img = $(this);

            if (!$img.parent().is("a")) {
                var imgSrc = $img.attr("src");

                var $a = $("<a>", {
                    href: imgSrc,
                    title: $img.attr("alt"),
                    "data-gallery": "cc-blog-gallery",
                    class: "cc-mfp-image",
                });

                $img.wrap($a);
            }
        });

        $(".cc-blog-content, .single-docs-content").magnificPopup({
            delegate: "a.cc-mfp-image",
            type: "image",
            mainClass: "mfp-with-zoom",
            gallery: {
                enabled: true,
                tPrev: "Previous (Left arrow)",
                tNext: "Next (Right arrow)",
                tCounter: "%curr% of %total%",
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: "ease-in-out",
                opener: function (openerElement) {
                    return openerElement.is("img")
                        ? openerElement
                        : openerElement.find("img");
                },
            },
        });
    });
})(jQuery);

jQuery(document).ready(function ($) {
    // Docs search box start
    const SelectSearch = $("#cc-docs-selectbox");
    SelectSearch.change(function () {
        const catSlug = $(this).val();
        const data = {
            catSlug,
        };

        SearchloadPosts(data);
    });

    $("#cc-docs-search-box").on("keyup", function () {
        let searchpost = $(this).val();
        SearchloadPosts(null, searchpost);
        $(".codeconfig-docs-search-box").addClass("active-result");

        if (searchpost.length === 0) {
            $(".codeconfig-docs-search-box").removeClass("active-result");
        }
    });

    $(document).on("change", "#cc-docs-selectbox", function () {
        $(".codeconfig-docs-search-box").addClass("active-result");
    });

    $(".cc-search-result .close-result").on("click", function () {
        $(".codeconfig-docs-search-box").removeClass("active-result");
    });

    function SearchloadPosts(data = {}, searchpost = "") {
        $("#cc-show-search-result").html(
            `<div class='preloader text-center'><img style='width: auto;' src="${ajax.preloader}"/></div>`
        );

        wp.ajax
            .post("search_loadmore_posts", { data, searchpost })
            .done((res) => {
                if (res) {
                    $("#cc-show-search-result").html(res.page);
                }
            })
            .fail((err) => {
                $("#cc-show-search-result").html(err.message);
                console.log(err);
            });
    }
    SearchloadPosts();

    // Docs Search box end
});

// Sticky Header start
const headerElement = document.querySelector("#cc-header");
const cc_body = document.body;

if (headerElement) {
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 0) {
            headerElement.classList.add("sticky");
            cc_body.classList.add("sticky-class");
        } else {
            headerElement.classList.remove("sticky");
            cc_body.classList.remove("sticky-class");
        }
    });
}
// Sticky Header end

// Mobile menu toggoe bar start
if (headerElement) {
    function toggler() {
        // Mobile menu toggle bars
        const header_menu = document.querySelector(".header-menu-wrap");
        const mobile_menu_bar = document.querySelector(
            ".header-menu-wrap .toggler"
        );

        if (mobile_menu_bar) {
            mobile_menu_bar.addEventListener("click", () => {
                header_menu.classList.toggle("toggle-active");
            });
        }
    }
    function togglerload() {
        toggler();
    }
    window.addEventListener("load", togglerload);
}
// Mobile menu toggoe bar end

// Header height & Top space
const ccCommonHeader = document.querySelector("#cc-header");
const ccAnnounceBar = document.querySelector("#countDownTimerSection");
const ccAdminBar = document.querySelector("#wpadminbar");
const headerHeight = ccCommonHeader?.clientHeight || 0;

function updateHeaderHeights() {
    const announceBarHeight = ccAnnounceBar?.clientHeight || 0;
    const adminBarHeight = ccAdminBar?.clientHeight || 0;
    const only_header_height = ccCommonHeader?.clientHeight || 0;

    const header_announce_admin_height =
        headerHeight + announceBarHeight + adminBarHeight;
    const admin_announce_height = adminBarHeight + announceBarHeight;
    const header_announce_height = headerHeight + announceBarHeight;

    document.body.style.setProperty(
        "--header-height",
        `${header_announce_admin_height}px`
    );
    document.body.style.setProperty(
        "--header-top-space",
        `${admin_announce_height}px`
    );
    document.body.style.setProperty(
        "--header-announce-height",
        `${header_announce_height}px`
    );

    document.body.style.setProperty(
        "--only-header-height",
        `${only_header_height}px`
    );
}

// Initial call
updateHeaderHeights();

// Recalculate on transition end
window.addEventListener("transitionend", () => {
    updateHeaderHeights();
});

// Add class in review when item <= 3 start
const codeConfigReviews = document.querySelector(".cc-reviews");
if (codeConfigReviews) {
    document.addEventListener("DOMContentLoaded", function () {
        const reviewItems = document.querySelectorAll(".cc-review-item");

        if (reviewItems.length <= 3) {
            codeConfigReviews.classList.add("limited-reviews");
        }
    });
}
// Add class in review when item <= 3 end

// CC tab start
function showTab(tabNumber) {
    document.querySelectorAll(".cc-tab-buttons button").forEach((button) => {
        button.classList.remove("active");
    });

    document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
    });

    document
        .getElementById(`cc-tab-button-${tabNumber}`)
        .classList.add("active");
    document.getElementById(`tab-content-${tabNumber}`).classList.add("active");
}
// CC tab end

// Option link in Mobile of blog category
if (window.innerWidth <= 768) {
    document.addEventListener("DOMContentLoaded", function () {
        const tabsSelect = document.getElementById("tabs-select");
        if (tabsSelect) {
            tabsSelect.addEventListener("change", function () {
                const catsUrl = this.value;
                if (catsUrl) {
                    window.location.href = catsUrl;
                }
            });
        }
    });
}

// Offer Popup of Single blog page start *******
function setCookie(name, value, hours) {
    let expires = new Date();
    expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1];
}

function windowTokenPop() {
    const tokenPopUpActive = document.getElementById("cc-token-popup");
    const tokenPopUpClose = document.getElementById("cc-token-close");
    const secretTokenArea = document.querySelector(".cc-secret-token-area");
    const tokenPopUpFarm = document.querySelector(".popup-fame");
    const secretTokenCopyButton = document.getElementById(
        "CCsecretTokenCopyBtn"
    );
    const secretTokenFill = document.getElementById("CCsecretToken");
    const PopUpbutton = document.getElementById("cc-popup-button");

    let popupTriggered = false;

    if (!getCookie("popupClosed") && tokenPopUpActive) {
        if (window.innerWidth <= 3500) {
            setTimeout(() => {
                tokenPopUpActive.classList.add("active-cookie");
                popupTriggered = true;
            }, 10000);
        } else {
            document.addEventListener("mousemove", function (event) {
                if (event.clientY < 1 && !popupTriggered) {
                    tokenPopUpActive.classList.add("active-cookie");
                    popupTriggered = true;
                }
            });
        }
    }

    function copyText() {
        if (secretTokenFill) {
            navigator.clipboard
                .writeText(secretTokenFill.value)
                .then(() => secretTokenArea?.classList.add("copy-text"))
                .catch((err) => console.error("Failed to copy text:", err));
        }
    }

    if (secretTokenCopyButton) {
        secretTokenCopyButton.addEventListener("click", copyText);
    }

    function closePopup() {
        if (tokenPopUpActive) {
            tokenPopUpActive.classList.remove("active-cookie");
            setCookie("popupClosed", "true", 24);
        }
    }

    if (tokenPopUpClose) tokenPopUpClose.addEventListener("click", closePopup);
    if (PopUpbutton) PopUpbutton.addEventListener("click", closePopup);
    if (tokenPopUpActive) {
        tokenPopUpActive.addEventListener("click", (e) => {
            if (!tokenPopUpFarm.contains(e.target)) closePopup();
        });
    }
}

function ccCokie() {
    const blogSideBarPopups = document.querySelectorAll(".cc-cookie-body");

    blogSideBarPopups.forEach((popup, index) => {
        const popupId = `blogSideBarClose_${index}`; // Unique cookie for each popup
        const blogSideBarCloses = document.querySelectorAll(
            ".cc-cookie-close-btn"
        );

        if (!getCookie(popupId)) {
            setTimeout(() => popup.classList.add("active-cookie"), 5000);

            blogSideBarCloses[index]?.addEventListener("click", () => {
                popup.classList.remove("active-cookie");

                setTimeout(() => (popup.style.display = "none"), 2000);

                setCookie(popupId, "true", 24);
            });
        }
    });
}

// Offer Popup of Single blog page end*********

// Campaign bar & count Down star
function countDownTimer() {
    const timerSection = document.getElementById("countDownTimerSection");
    let cc_countDownDate = setInterval(function () {
        // Get the current time
        let now = new Date().getTime();

        // Retrieve the countdown date from the dataset
        // const countDownElement = document.getElementById("cc-countDownTimer");
        const countDownElement = document.querySelectorAll(".cc-countDown");
        if (!countDownElement) {
            clearInterval(cc_countDownDate);
            return; // Exit if the countdown element is not found
        }

        if (countDownElement.length > 0) {
            countDownElement.forEach((item) => {
                const countDownDate = item.dataset.endEvent;
                const countDownTime = new Date(countDownDate).getTime();

                // Calculate the time difference
                let distance = countDownTime - now;

                // Calculate days, hours, minutes, and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                let minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Check if the necessary elements exist
                const daysElement = item.querySelector(".days");
                const hoursElement = item.querySelector(".hours");
                const minutesElement = item.querySelector(".minute");
                const secondsElement = item.querySelector(".second");

                if (
                    daysElement &&
                    hoursElement &&
                    minutesElement &&
                    secondsElement
                ) {
                    // Update the countdown display
                    daysElement.innerHTML = String(days).padStart(2, "0");
                    hoursElement.innerHTML = String(hours).padStart(2, "0");
                    minutesElement.innerHTML = String(minutes).padStart(2, "0");
                    secondsElement.innerHTML = String(seconds).padStart(2, "0");
                }

                // If the countdown is over, stop the interval and show "00:00:00:00"
                if (distance < 0) {
                    clearInterval(cc_countDownDate);
                    document.getElementById("cc-countDownTimer").innerHTML =
                        "<h6>Time's up! Offer closing.</h6>";
                    if (timerSection) {
                        timerSection.remove();
                    }
                }
            });
        }
    }, 1000);

    const campaign_close_btn = document.getElementById("cc-campaign-close");
    const campaignOfferButton = document.querySelector(".cc-banner-button");

    if (campaign_close_btn) {
        campaign_close_btn.addEventListener("click", (e) => {
            e.stopPropagation();

            if (timerSection) {
                timerSection.remove();
            }
        });
    }
    if (timerSection) {
        timerSection.addEventListener("click", () => {
            window.location.href = campaignOfferButton.href;
        });
    }
}
// Campaign bar & count Down end

// Scroll to top Button start
const cc_scroll_top_button = document.querySelector(".cc-scroll-top-btn");

if (cc_scroll_top_button) {
    cc_scroll_top_button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}
// Scroll to top Button end

// Blog content count time start
const ccReadingContent = document.querySelector(".cc-blog-content");
const blogReadingTime = document.querySelector("#blog-reading-time");

if (ccReadingContent && blogReadingTime) {
    const ccTextContent =
        ccReadingContent.innerText || ccReadingContent.textContent;
    const words = ccTextContent.trim().split(/\s+/); // Split on any whitespace
    const ccWordCount = words.length;
    let readingTime = ccWordCount / 240;

    if (!Number.isInteger(readingTime)) {
        readingTime = Math.ceil(readingTime); // Round up the reading time
    }
    // Print reading time in the blog-reading-time element
    blogReadingTime.innerText = `${readingTime}`;
}
// Blog content count time end

// Review Slider in window start
document.addEventListener("DOMContentLoaded", () => {
    const sliderWindow = document.querySelector(".cc-review-slider-window");

    if (sliderWindow) {
        const sliderItems = Array.from(sliderWindow.children);
        let currentIndex = 0;
        const intervalTime = 12000;

        function showSlide(index) {
            sliderItems.forEach((item, i) => {
                if (i === index) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            });
        }

        function moveSlider() {
            currentIndex = (currentIndex + 1) % sliderItems.length;
            showSlide(currentIndex);
        }

        showSlide(currentIndex);

        setInterval(moveSlider, intervalTime);
    }
});
// Review Slider in window end

// Mouse hove masic mouse color
function mouseShadowHover() {
    document
        .querySelectorAll(".cc-mouse-shadow-hover-wrapper")
        .forEach((wrapper) => {
            const hoverBox = wrapper.querySelector(".cc-mouse-shadow-hover");

            if (!hoverBox) return;

            wrapper.addEventListener("mousemove", (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const boxWidth = hoverBox.offsetWidth / 2;
                const boxHeight = hoverBox.offsetHeight / 2;

                const hoveredItem = document
                    .elementFromPoint(e.clientX, e.clientY)
                    ?.closest(".cc-service-item");

                if (hoveredItem) {
                    const serviceColor = getComputedStyle(hoveredItem)
                        .getPropertyValue("--cc-service-color")
                        .trim();
                    hoverBox.style.background = serviceColor;
                }

                requestAnimationFrame(() => {
                    hoverBox.style.transform = `translate(${x - boxWidth}px, ${
                        y - boxHeight
                    }px)`;
                });
            });

            wrapper.addEventListener("mouseleave", () => {
                hoverBox.style.transform = `translate(-50%, -50%)`;
                hoverBox.style.background = ""; // Reset background color
            });
        });
}

function detectSecondRow() {
    const items = document.querySelectorAll(".single-context");
    if (items.length === 0) return;

    // Remove the existing 'second-row' class before recalculating
    items.forEach((item) => item.classList.remove("second-row"));

    const firstRowTop = items[0].offsetTop;
    let secondRowTop = null;

    items.forEach((item) => {
        if (item.offsetTop !== firstRowTop) {
            secondRowTop = item.offsetTop;
            return;
        }
    });

    if (secondRowTop !== null) {
        items.forEach((item) => {
            if (item.offsetTop === secondRowTop) {
                item.classList.add("second-row");
            }
        });
    }
}

function ccPopupVideo() {
    const videoPopupActive = document.querySelector(".cc-popup-active-btn");
    const videoPopupClose = document.querySelector(".cc-popup-close-btn");
    const videoPopupFrame = document.querySelector(".cc-video-popup");

    if (videoPopupActive && videoPopupClose && videoPopupFrame) {
        const videoSrc = videoPopupFrame.querySelector("iframe");

        videoPopupActive.addEventListener("click", () => {
            videoPopupFrame.classList.add("active-popup");
        });

        videoPopupClose.addEventListener("click", () => {
            videoPopupFrame.classList.remove("active-popup");
            videoSrc.src = videoSrc.src;
        });
    }
}

// CC Global Load Function
function codeConfigGlobalOnLoad() {
    countDownTimer();
    windowTokenPop();
    ccCokie();
    mouseShadowHover();
    detectSecondRow();
    ccPopupVideo();
}
window.addEventListener("DOMContentLoaded", codeConfigGlobalOnLoad);

// Dropbox js start

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

// Dropbox js end

// Dusky js start

(function ($) {
    // Mobile toggle functionality
    function handleMobileToggle() {
        const headerToggleActive = document.querySelector(".toggler-active");
        const headerToggleClose = document.querySelector(".toggler-close");
        const headerMainMenu = document.querySelector(".header-menu-wrap");
        if (headerToggleActive && headerToggleClose && headerMainMenu) {
            headerToggleActive.addEventListener("click", function () {
                headerMainMenu.classList.add("show-menu");
            });
            headerToggleClose.addEventListener("click", function () {
                headerMainMenu.classList.remove("show-menu");
            });
        }
    }

    // Toggle switcher functionality

    function handlePricingSwitcher() {
        const duskyPricingCheckbox = document.getElementById("checkbox-button");
        const duskyAnnualCheckbox = document.getElementById(
            "checkbox-button-annual"
        );
        const duskyLifeTimeCheckbox = document.getElementById(
            "checkbox-button-lifetime"
        );

        const regularPrices = document.querySelectorAll(
            ".plan-option-wrapper .single-planing-section .dusky-regular-price"
        );
        const offerAmounts = document.querySelectorAll(
            ".plan-option-wrapper .single-planing-section .offer-amount"
        );
        const offerPrices = document.querySelectorAll(
            ".plan-option-wrapper .single-planing-section .dusky-offer-price"
        );

        const pricingData = [];

        // Gather the pricing data from the attributes for all plans
        regularPrices.forEach((priceElementRegular, index) => {
            pricingData.push({
                regularAnnualPrice:
                    priceElementRegular.getAttribute("annualRegularPrice") ||
                    "0",
                regularLifeTimePrice:
                    priceElementRegular.getAttribute("lifeTimeRegularPrice") ||
                    "0",
                annualOfferAmount:
                    offerAmounts[index]?.getAttribute(
                        "annualPlanOfferAmount"
                    ) || "0",
                lifeTimeOfferAmount:
                    offerAmounts[index]?.getAttribute(
                        "lifeTimePlanOfferAmount"
                    ) || "0",
                annualOfferPrice:
                    offerPrices[index]?.getAttribute("annualPlanOfferPrice") ||
                    "0",
                lifeTimeOfferPrice:
                    offerPrices[index]?.getAttribute(
                        "lifeTimePlanOfferPrice"
                    ) || "0",
            });
        });

        // Handle Annual Plan Click
        if (duskyAnnualCheckbox) {
            duskyAnnualCheckbox.addEventListener("click", function () {
                duskyPricingCheckbox.classList.add("active-annual");
                // duskyPricingCheckbox.parentElement.classList.remove(
                //     "active-lifetime"
                // );
                duskyPricingCheckbox.classList.remove("active-lifetime");
                productPricing("annual");
            });
        }

        // Handle Lifetime Plan Click
        if (duskyLifeTimeCheckbox) {
            duskyLifeTimeCheckbox.addEventListener("click", function () {
                duskyPricingCheckbox.classList.add("active-lifetime");
                // duskyPricingCheckbox.parentElement.classList.add("active-lifetime");

                duskyPricingCheckbox.classList.remove("active-annual");
                productPricing("lifetime");
            });
        }

        // Function to switch between plans and update the pricing
        function productPricing(planType) {
            regularPrices.forEach((priceElementRegular, index) => {
                const priceData = pricingData[index];

                // Update Regular Price
                priceElementRegular.innerHTML =
                    planType === "annual"
                        ? `$${priceData.regularAnnualPrice}`
                        : `$${priceData.regularLifeTimePrice}`;

                // Update Offer Amount (only if element exists)
                if (offerAmounts[index]) {
                    offerAmounts[index].innerHTML =
                        planType === "annual"
                            ? `${priceData.annualOfferAmount}% off`
                            : `${priceData.lifeTimeOfferAmount}% off`;
                }

                // Update Offer Price (only if element exists)
                if (offerPrices[index]) {
                    offerPrices[index].innerHTML =
                        planType === "annual"
                            ? `$${priceData.annualOfferPrice}`
                            : `$${priceData.lifeTimeOfferPrice}`;
                }
            });
        }
    }

    // Replacement feature for wheel
    function initReplacementFeature() {
        const replacementSection = document.querySelector(
            ".dusky-replacement-features .dusky-replacement-media"
        );
        const invertWheel = document.getElementById("masking-wheel");
        const invertButton = document.getElementById("invert-wheel");

        // Event listener for the button input
        if (invertButton && invertWheel) {
            invertButton.addEventListener("input", function (e) {
                invertWheel.style.left = `${e.target.value}%`;
            });
        }

        if (replacementSection) {
            let isClassAdded = false;
            window.addEventListener("scroll", () => {
                const sectionTop =
                    replacementSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (sectionTop >= 0 && sectionTop <= windowHeight) {
                    // Add class when the section is scrolled into view
                    if (!isClassAdded) {
                        replacementSection.classList.add("active-scroll");
                    }
                    isClassAdded = true;

                    replacementSection.addEventListener("click", () => {
                        replacementSection.classList.remove("active-scroll");
                    });
                    setTimeout(() => {
                        replacementSection.classList.remove("active-scroll");
                    }, 3000);
                }
            });
        }
    }

    function initColorPicker() {
        const canvas = document.getElementById("colorCanvas");
        const ctx = canvas?.getContext("2d", { willReadFrequently: true });
        const colorDisplay = document.getElementById("pickColor");
        const width = canvas?.width;
        const height = canvas?.height;

        if (!canvas || !ctx || !colorDisplay) return;

        // Function to create radial gradient
        function drawRadialGradient() {
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const dx = x - width / 2;
                    const dy = y - height / 2;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const angle = Math.atan2(dy, dx) + Math.PI;
                    const hue = (angle / (2 * Math.PI)) * 360;
                    const [r, g, b] = hslToRgb(hue, 100, 50);

                    const index = (y * width + x) * 4;
                    data[index] = r;
                    data[index + 1] = g;
                    data[index + 2] = b;
                    data[index + 3] = 255;
                }
            }
            ctx.putImageData(imageData, 0, 0);
        }

        // HSL to RGB conversion
        function hslToRgb(h, s, l) {
            s /= 100;
            l /= 100;
            const k = (n) => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = (n) =>
                l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

            return [255 * f(0), 255 * f(8), 255 * f(4)];
        }

        drawRadialGradient();

        canvas.addEventListener("mousemove", function (event) {
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor(event.clientX - rect.left);
            const y = Math.floor(event.clientY - rect.top);

            // Ensure the coordinates are within the canvas
            if (x >= 0 && x < width && y >= 0 && y < height) {
                const color = ctx.getImageData(x, y, 1, 1).data;
                const colorValue = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                colorDisplay.style.setProperty("--dynamic-color", colorValue);
            }
        });

        const colorSwitchButton = document.getElementById("colorCanvasToggle");
        if (colorSwitchButton) {
            colorSwitchButton.addEventListener("click", () => {
                colorDisplay.classList.toggle("toggle-active-day");
            });
        }

        if (colorDisplay) {
            let isClassAdded = false;

            window.addEventListener("scroll", () => {
                const sectionTop = canvas.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                if (sectionTop >= 0 && sectionTop <= windowHeight) {
                    // Add class when the section is scrolled into view
                    if (!isClassAdded) {
                        colorDisplay.classList.add("active-scroll");
                        startColorSequence(); // Start the random color animation
                    }
                    isClassAdded = true;

                    canvas.addEventListener("mousemove", () => {
                        colorDisplay.classList.remove("active-scroll");
                    });

                    setTimeout(() => {
                        colorDisplay.classList.remove("active-scroll");
                        stopColorSequence();
                    }, 2000);
                }
            });
        }

        // Color sequence array
        const colors = [
            "#FFFF00",
            "#00FF00",
            "#00FFFF",
            "#0000FF",
            "#FFC0CB",
            "#FF0000",
        ];

        let colorInterval;
        let currentColorIndex = 0;

        // Start color sequence animation
        function startColorSequence() {
            colorDisplay.style.transition = "background-color 1s ease";
            colorInterval = setInterval(() => {
                currentColorIndex = (currentColorIndex + 1) % colors.length;
                const nextColor = colors[currentColorIndex];
                colorDisplay.style.setProperty("--dynamic-color", nextColor);
            }, 380);
        }

        // Stop the color sequence animation
        function stopColorSequence() {
            clearInterval(colorInterval);
        }
    }

    // Hero banner toggle functionality
    function heroBannerToggle() {
        const heroBanner = document.getElementById("dusky-hero-banner");
        const toggleButtons = document.querySelectorAll(
            ".hero-media-slider-nab-wrapper .hero-slider-nab"
        );

        if (heroBanner && toggleButtons.length > 0) {
            let currentIndex = 0;
            const totalButtons = toggleButtons.length;

            function updateBanner(index) {
                toggleButtons.forEach((btn) =>
                    btn.classList.remove("active-button")
                );
                toggleButtons[index].classList.add("active-button");

                if (index === 0) {
                    heroBanner.classList.add("dusky-dark");
                    heroBanner.classList.remove("dusky-light");
                } else {
                    heroBanner.classList.add("dusky-light");
                    heroBanner.classList.remove("dusky-dark");
                }
            }

            let sliderInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalButtons;
                updateBanner(currentIndex);
            }, 5000);

            toggleButtons.forEach((button, index) => {
                button.addEventListener("click", () => {
                    clearInterval(sliderInterval);
                    updateBanner(index);
                    currentIndex = index;
                });
            });
        }
    }

    function countNumber() {
        let count = 0;
        let intervalId;
        const counterDisplay = document.getElementById("display");
        if (counterDisplay) {
            const endNumberInput = counterDisplay.getAttribute("data-count");
            function updateDisplay() {
                counterDisplay.textContent = count + "+";
            }

            function startCounter() {
                const endNumber = parseInt(endNumberInput, 10);
                const step = endNumber / 20;
                clearInterval(intervalId);
                count = 0;
                updateDisplay();

                intervalId = setInterval(() => {
                    if (count < endNumber) {
                        count += step;
                        updateDisplay();
                    } else {
                        ("Upcoming");
                    }
                }, 80);
            }
            startCounter();
        }
    }

    function PageLoader() {
        const loading_class = document.getElementById("cc-page-loader");
        if (loading_class) {
            loading_class.style.opacity = 0;
            setTimeout(() => {
                loading_class.remove();
            }, 500);
        }
    }

    function upToOfferAmount() {
        const offerOffArray = document.querySelectorAll(".offer-amount");
        const offerDeclared = document.querySelector(
            ".most-offer-amount h6 span"
        );
        if (offerOffArray && offerDeclared) {
            const offAmount = Array.from(offerOffArray).map((amount) => {
                return amount.getAttribute("lifetimeplanofferamount");
            });

            offerDeclared.innerText = Math.max(...offAmount);
        }
    }

    // Initialize all features
    function initializeFeatures() {
        countNumber();
        handleMobileToggle();
        handlePricingSwitcher();
        initReplacementFeature();
        initColorPicker();
        heroBannerToggle();
        upToOfferAmount();
        PageLoader();
    }

    window.addEventListener("load", initializeFeatures);
})(jQuery);

// Dusky js end
