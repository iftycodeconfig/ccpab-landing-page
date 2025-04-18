// ###################################### //
// Global Script //
// ###################################### //

// Sticky Header start
const ccCommonHeader = document.querySelector("#cc-header");
const ccAnnounceBar = document.querySelector("#countDownTimerSection");
const ccAdminBar = document.querySelector("#wpadminbar");
const cc_body = document.body;


if (ccCommonHeader) {
    // Header sticky
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 0) {
            ccCommonHeader.classList.add("sticky-top");
            cc_body.classList.add("sticky-class");
        } else {
            ccCommonHeader.classList.remove("sticky-top");
            cc_body.classList.remove("sticky-class");
        }
    });

    // Hamburger menu toggle (for mobile)
    const hamburger_menu_open = document.querySelector(".mobile-menu-open");
    const hamburger_menu_close = document.querySelector(".mobile-menu-close");

    if (hamburger_menu_open && hamburger_menu_close) {
        hamburger_menu_open.addEventListener("click", function () {
            ccCommonHeader.classList.add("cc-mobile-menu-active");
        });
        hamburger_menu_close.addEventListener("click", function () {
            ccCommonHeader.classList.remove("cc-mobile-menu-active");
        });
    }

    let lastScrollY = window.scrollY;
    let removeStickyTimeout;

    function stickyFunction() {
        return setTimeout(function () {
            ccCommonHeader.classList.remove("sticky");
        }, 2000);
    }

    // Sticky behavior based on scroll position
    window.onscroll = function () {
        let currentScrollY = window.scrollY;

        if (currentScrollY < 500) {
            if (removeStickyTimeout) {
                clearTimeout(removeStickyTimeout);
            }
            ccCommonHeader.classList.add("sticky");
            ccCommonHeader.classList.add("sticky-hero");
            return;
        }

        if (currentScrollY > lastScrollY) {
            clearTimeout(removeStickyTimeout);
            removeStickyTimeout = stickyFunction();
            ccCommonHeader.classList.remove("sticky-hero");
        } else {
            clearTimeout(removeStickyTimeout);
            ccCommonHeader.classList.add("sticky");
        }

        lastScrollY = currentScrollY;
    };

    // Sticky behavior while mouse is hovering over the header
    ccCommonHeader.addEventListener("mouseover", function () {
        clearTimeout(removeStickyTimeout);
        ccCommonHeader.classList.add("sticky");
    });

    ccCommonHeader.addEventListener("mouseout", function () {
        removeStickyTimeout = stickyFunction();
    });

    // Dynamic header position calculation
    const announceBarHeight = ccAnnounceBar ? ccAnnounceBar.clientHeight : 0;
    const adminBarHeight = ccAdminBar ? ccAdminBar.clientHeight : 0;
    const header_height_top_space = adminBarHeight + announceBarHeight;
    document.body.style.setProperty(
        "--header-height-and-top-space",
        `${header_height_top_space}px`
    );

    // Mobile bar toggle functionality
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
// Sticky Header end

// Sticky Header end

// Header height & Top space
if (ccCommonHeader) {
    const header_height = ccCommonHeader.clientHeight;
    const header_top_space = ccCommonHeader.offsetTop;
    document.body.style.setProperty("--header-height", `${header_height}px`);
    document.body.style.setProperty(
        "--header-top-space-height",
        `${header_top_space}px`
    );
}

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
                    });
                });
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
    function togglerLoad() {
        toggler();
    }
    window.addEventListener("load", togglerLoad);
}
// Mobile menu toggoe bar end

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

function ccCookie() {
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

// scroll to Top
function scrollToTop() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            const ccHeader = document.querySelector("#cc-header");

            if (targetElement) {
                e.preventDefault();
                const headerOffset = ccHeader.clientHeight + ccHeader.offsetTop;
                const elementPosition =
                    targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        });
    });
}

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

// CC Global Load Function
function codeConfigGlobalOnLoad() {
    countDownTimer();
    windowTokenPop();
    ccCookie();
    scrollToTop();
    mouseShadowHover();
}
window.addEventListener("DOMContentLoaded", codeConfigGlobalOnLoad);

(function ($) {
    const loadDusky = async () => {
        const { duskyLoad } = await import("./dusky-scripts.js");
        duskyLoad($);
    };

    const loadDropbox = async () => {
        const { dropboxLoad } = await import("./dropbox-scripts.js");
        dropboxLoad($);
    };

    loadDusky();
    loadDropbox();
})(jQuery);
