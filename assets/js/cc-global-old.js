function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function windowTokenPop() {
    // Get the button and input elements
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

    // Check if the popupClosed cookie exists
    if (!getCookie("popupClosed")) {
        if (tokenPopUpActive) {
            // Show popup after 10 seconds if the window width is <= 3500
            if (window.innerWidth <= 3500) {
                setTimeout(() => {
                    tokenPopUpActive.classList.add("active-popup");
                    popupTriggered = true;
                }, 10000);
            } else {
                // Trigger popup when the mouse goes to the top edge of the page
                document.addEventListener("mousemove", function (event) {
                    if (event.clientY < 1 && !popupTriggered) {
                        tokenPopUpActive.classList.add("active-popup");
                        popupTriggered = true;
                    }
                });
            }
        }
    }

    function copyText() {
        navigator.clipboard
            .writeText(secretTokenFill.value)
            .then(() => {
                secretTokenArea.classList.add("copy-text");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    }

    if (secretTokenCopyButton && secretTokenArea) {
        // Copy token to clipboard and add a class to indicate it's copied
        secretTokenCopyButton.addEventListener("click", copyText);
    }

    // Add event listeners if all elements exist
    if (
        tokenPopUpActive &&
        tokenPopUpClose &&
        secretTokenCopyButton &&
        secretTokenFill &&
        secretTokenArea &&
        tokenPopUpFarm
    ) {
        // Copy token to clipboard and add a class to indicate it's copied
        secretTokenCopyButton.addEventListener("click", copyText);

        // Close the popup and set the popupClosed cookie
        tokenPopUpClose.addEventListener("click", () => {
            tokenPopUpActive.classList.remove("active-popup");
            setCookie("popupClosed", "true", 24); // Assume setCookie works with a 24-hour expiration
        });

        tokenPopUpActive.addEventListener("click", () => {
            tokenPopUpActive.classList.remove("active-popup");
            setCookie("popupClosed", "true", 24); // Assume setCookie works with a 24-hour expiration
        });

        tokenPopUpFarm.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        // Check if PopUpbutton exists before adding the click listener
        if (PopUpbutton) {
            PopUpbutton.addEventListener("click", () => {
                tokenPopUpActive.classList.remove("active-popup");
                setCookie("popupClosed", "true", 24);
            });
        }
    }
}

function singleBlogPopup() {
    const blogSideBarPopup = document.getElementById("cc-popup-side-bar");
    const blogSideBarClose = document.getElementById("cc-blog-popup-close");

    if (blogSideBarPopup && blogSideBarClose) {
        if (!getCookie("blogSideBarClose")) {
            setTimeout(function () {
                blogSideBarPopup.classList.add("active-popup");
            }, 5000);

            blogSideBarClose.addEventListener("click", () => {
                blogSideBarPopup.classList.remove("active-popup");

                setTimeout(function () {
                    blogSideBarPopup.style.display = "none";
                }, 2000);

                setCookie("blogSideBarClose", "true", 24); // Set cookie to prevent showing again for 24 hours
            });
        }
    }
}

// Count down date start
function countDownTimer() {
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
                const daysElement = item.querySelector(".days span");
                const hoursElement = item.querySelector(".hours span");
                const minutesElement = item.querySelector(".minute span");
                const secondsElement = item.querySelector(".second span");

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
                        "<h5>Time's up! Offer closing.</h4>";
                }
            });
        }
    }, 1000);

    const campaign_close_btn = document.getElementById("cc-campaign-close");
    const timerSection = document.getElementById("countDownTimerSection");
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
function codeConfigGlobalOnLoad() {
    countDownTimer();
    windowTokenPop();
    singleBlogPopup();
}
window.addEventListener("DOMContentLoaded", codeConfigGlobalOnLoad);
