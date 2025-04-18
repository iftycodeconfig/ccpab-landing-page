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

export default duskyLoad;
