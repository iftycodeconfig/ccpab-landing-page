// Check if the element exists before adding the event listener

const headerElement = document.querySelector(".codeconfig-header");
if (headerElement) {
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 0) {
            headerElement.classList.add("sticky");
        } else {
            headerElement.classList.remove("sticky");
        }
    });
}

function Toggler() {
    const headerBarOpen = document.querySelector(".toggler-open");
    const headerBarClose = document.querySelector(".toggler-close");
    const headerSection = document.querySelector(".codeconfig-header");

    if (headerSection && headerBarOpen && headerBarClose) {
        if (window.innerWidth <= 1024) {
            jQuery(".megamenu .dropdown-menu").slideDown();
            headerBarOpen.addEventListener("click", function () {
                headerSection.classList.add("bar-active");
                jQuery(".megamenu").addClass("active-mobilebar");
            });

            headerBarClose.addEventListener("click", function () {
                headerSection.classList.remove("bar-active");
                jQuery(".megamenu").removeClass("active-mobilebar");
            });
        }
    }
}

function hightSat(pushClass) {
    const questionBox = Array.from(document.querySelectorAll(pushClass));
    let maxHight = 0;

    if (questionBox) {
        questionBox.forEach(function (items) {
            const enteredValue = items.offsetHeight;
            if (enteredValue > maxHight) {
                maxHight = enteredValue;
            }
        });
        questionBox.forEach(function (items) {
            items.style.height = maxHight + "px";
        });
    }
}

hightSat(".card-item .docslist");

function addClassOnClickSearchBox() {
    const searchBoxParent = document.querySelector(
        ".codeconfig-docs-search-box"
    );

    const searchBox = document.querySelector(
        ".codeconfig-docs-search-box .categories-box .cc-docs-selectbox"
    );

    const searchInputBox = document.querySelector("#cc-docs-search-box");

    const closeBox = document.querySelector(
        ".codeconfig-docs-search-box .close-result"
    );
    const closeToggle = document.querySelector(
        ".codeconfig-docs-search-box .categories-box .categories-toggol"
    );
    if (searchBox) {
        searchBox.addEventListener("input", function () {
            if (searchBox.value.length > 1) {
                searchBoxParent.classList.add("active-result");
            } else {
                searchBoxParent.classList.remove("active-result");
            }
        });
    }

    if (searchInputBox) {
        searchInputBox.addEventListener("input", function (e) {
            console.log(searchInputBox);
            if (e.target.value.length >= 1) {
                searchBoxParent.classList.add("active-result");
            } else {
                searchBoxParent.classList.remove("active-result");
            }
        });
    }

    if (closeBox) {
        closeBox.addEventListener("click", function () {
            searchBoxParent.classList.remove("active-result");
        });
    }
    if (closeToggle) {
        closeToggle.addEventListener("click", function () {
            searchBoxParent.classList.toggle("active-result");
        });
    }

    if (closeToggle) {
        window.addEventListener("scroll", function () {
            searchBoxParent.classList.remove("active-result");
        });
    }
    if (closeToggle) {
        document.addEventListener("click", function (event) {
            if (!searchBoxParent.contains(event.target)) {
                searchBoxParent.classList.remove("active-result");
            }
        });
    }
}

function addClassOnClickSelectBox() {
    const selectBox = document.querySelector(
        ".contact-form .select-tag select"
    );
    if (selectBox) {
        selectBox.addEventListener("click", function () {
            this.parentElement.parentElement.parentElement.parentElement.classList.toggle(
                "select-toggle"
            );
        });
    }
}

// Search box toggle Active start
function blogSearchToggle() {
    const cc_search_box = document.querySelector(".cc-search-form");
    const cc_search_toggle = document.querySelector(".cc-search-toggle");

    if (cc_search_box && cc_search_toggle) {
        function toggleOpen() {
            cc_search_box.classList.toggle("cc-search-box-active");
        }

        cc_search_toggle.addEventListener("click", toggleOpen);
    }
}
// Search box toggle Active end
function mouseMoveBox() {
    const movingBoxes = document.querySelectorAll(
        ".cc-career-benefits .card-border"
    );
    const cardBoxes = document.querySelectorAll(
        ".cc-career-benefits .single-card-border"
    );

    if (movingBoxes.length > 0 && cardBoxes.length > 0) {
        cardBoxes.forEach((cardBox, index) => {
            // Add mousemove event listener for each cardBox
            cardBox.addEventListener("mousemove", (event) => {
                const mouseX = event.clientX;
                const mouseY = event.clientY;

                // Get the bounding rectangle of the cardBox
                const rect = cardBox.getBoundingClientRect();

                // Calculate the position to place the moving box
                const offsetX = mouseX - rect.left; // Mouse X relative to the cardBox
                const offsetY = mouseY - rect.top; // Mouse Y relative to the cardBox

                // Move the corresponding movingBox based on the calculated offsets
                movingBoxes[index].style.transform = `translate(${
                    offsetX - 150
                }px, ${offsetY - 150}px)`;
            });

            // Optional: Reset position on mouse leave
            cardBox.addEventListener("mouseleave", () => {
                movingBoxes[index].style.transform = "translate(0, 0)"; // Reset position
            });
        });
    }
}

function CareerFromPopup() {
    const sectionWrapperBox = document.querySelector(
        ".cc-career-join-section .cc-career-application-form"
    );
    const closeForm = document.querySelector(
        ".cc-career-application-form .close-form"
    );
    const applicationCard = document.querySelectorAll(
        ".cc-career-join-section .cc-join-post-wrapper .career-post-card .cc-job-action-button"
    );
    if (applicationCard && sectionWrapperBox && closeForm) {
        applicationCard.forEach((button) => {
            button.addEventListener("click", () => {
                sectionWrapperBox.classList.add("career-form-active");
                sectionWrapperBox.querySelector(".wpcf7-form-control").value =
                    button.parentElement.querySelector(
                        ".cc-job-title"
                    ).innerText;
            });
        });

        closeForm.addEventListener("click", () => {
            sectionWrapperBox.classList.remove("career-form-active");
        });
    }
}

function codeConfigOnLoad() {
    countDownTimer();
    Toggler();
    mouseMoveBox();
    addClassOnClickSearchBox();
    CareerFromPopup();
    blogSearchToggle();
}

window.addEventListener("load", codeConfigOnLoad);

const searchBoxSubmit = document.querySelector("#search-submit");

searchBoxSubmit?.addEventListener("click", function (e) {
    e.preventDefault();
});

jQuery(document).ready(function ($) {
    let currentPage = 1;

    $(".blog-filter-menu ul li").on("click", function () {
        console.log("Clicked li:", this);

        $(".blog-filter-menu ul li").removeClass("active");
        $(this).addClass("active");

        const catSlug = $(this).data("slug");

        let data = {
            catSlug,
        };

        if (catSlug === "all") {
            data = {};
        }

        currentPage = 1;
        loadPosts(data, currentPage);
    });

    function loadPosts(data = {}, page = 1) {
        $("#load-blog-posts").html(
            `<div class='preloader'><img src="${ajax.preloader}"/></div>`
        );

        wp.ajax
            .post("loadmore_posts", { data, page })
            .done((res) => {
                if (res) {
                    $("#load-blog-posts").html(res.page);
                }
            })
            .fail((err) => {
                $("#load-blog-posts").html(err.message);
            });
    }

    loadPosts();

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
});

(function ($) {
    $(document).ready(function () {
        // Mobile menu toggle
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
    });

    $(function () {
        // Bind click event to images inside .cc-docs-content-decoration
        $(".cc-post-content-decoration img").click(function () {
            // Create a dialog wrapper element
            const dialog = document.createElement("div");
            const dialog_child = document.createElement("span");
            const dialog_img = document.createElement("div");
            dialog.appendChild(dialog_child);
            dialog.appendChild(dialog_img);
            dialog.className = "dialog-wrapper";
            dialog_img.className = "dialog-image";

            const dialogContent = $(this).clone();

            dialog_img.appendChild(dialogContent[0]);

            $(dialog).click(function () {
                $(this).remove();
            });

            $(dialog_child).click(function () {
                $(dialog).remove();
            });

            $(".cc-post-content-decoration")[0].appendChild(dialog);
        });
    });
})(jQuery);

// faq page start
(function ($) {
    $(document).ready(function () {
        function faqToggle() {
            const frequentlyQs = document.querySelectorAll(".faq-item");

            const questionTitle = document.querySelectorAll(".faq-question");

            const answerTitle = document.querySelectorAll(".faq-answer");

            if (frequentlyQs) {
                $(frequentlyQs[0]).addClass("open-answer");
                $(answerTitle[0]).show();

                frequentlyQs.forEach((item, i) => {
                    $(questionTitle[i]).click(function () {
                        answerTitle.forEach((answer, index) => {
                            if (i !== index && $(answer).is(":visible")) {
                                $(answer).slideUp(300);
                                $(frequentlyQs[index]).removeClass(
                                    "open-answer"
                                );
                            }
                        });

                        if ($(answerTitle[i]).is(":hidden")) {
                            $(answerTitle[i]).slideDown(300);
                            $(item).addClass("open-answer");
                        } else {
                            $(answerTitle[i]).slideUp(300);
                            $(item).removeClass("open-answer");
                        }
                    });
                });
            }
        }

        function codeConfigFaqOnLoad() {
            faqToggle();
        }

        window.addEventListener("load", codeConfigFaqOnLoad);
    });
})(jQuery);
// faq page end

function countDownTimer() {
    let cc_countDownDate = setInterval(function () {
        // Get the current time
        let now = new Date().getTime();

        // Retrieve the countdown date from the dataset
        const countDownElement = document.getElementById("cc-countDownTimer");
        if (!countDownElement) {
            clearInterval(cc_countDownDate);
            return; // Exit if the countdown element is not found
        }

        const countDownDate = countDownElement.dataset.endEvent;
        const countDownTime = new Date(countDownDate).getTime();

        // Calculate the time difference
        let distance = countDownTime - now;

        // Calculate days, hours, minutes, and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Check if the necessary elements exist
        const daysElement = document.getElementById("days");
        const hoursElement = document.getElementById("hours");
        const minutesElement = document.getElementById("minutes");
        const secondsElement = document.getElementById("seconds");

        if (daysElement && hoursElement && minutesElement && secondsElement) {
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
                "<h5>Time's up! Offer closing.</h4>";
        }
    }, 1000);

    const timerSection = document.getElementById("countDownTimerSection");
    if (timerSection) {
        timerSection.addEventListener("click", () => {
            window.location.href = "/offers";
        });
    }

    const campaign_banner = document.querySelector(".codeconfig-header");
    const campaign_close_btn = document.querySelector(".cc-campaign-close");

    function closeCampaign(e) {
        e.stopPropagation();
        if (campaign_banner) {
            campaign_banner.classList.add("campaign-close");
        }
    }

    if (campaign_close_btn) {
        campaign_close_btn.addEventListener("click", closeCampaign);
    }
}

(function ($) {
    $(document).ready(function () {
        $(".single-review-content-slider-wrapper").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            // adaptiveHeight: true,
            fade: true,
            arrows: false,
            dots: false,
            asNavFor: ".single-review-product-slider-wrapper",
            asNavFor: ".single-review-product-slider-wrapper",
            autoplay: false,
            // autoplaySpeed: 3000,
        });
        $(".single-review-product-slider-wrapper").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: ".single-review-content-slider-wrapper",
            centerMode: true,
            focusOnSelect: true,
            arrows: true,
            autoplay: false,
            // autoplaySpeed: 3000,
            dots: false,
        });
    });
})(jQuery);

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


