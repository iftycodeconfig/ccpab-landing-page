// Pricing Button
function eawPricingButton() {
    const eawPricingCheckbox = document.getElementById(
        "eaw-pricing-trigger-area"
    );
    const eawAnnualCheckbox = document.getElementById("eaw-pricing-annual");
    const eawLifetimeCheckbox = document.getElementById("eaw-pricing-lifetime");

    const regularPrices = document.querySelectorAll(".regular-price");
    const offerAmounts = document.querySelectorAll(".offer-amount");
    const offerPrices = document.querySelectorAll(".offer-price");
    const packageDurations = document.querySelectorAll(".duration");

    const pricingData = [];

    // Gather pricing data
    regularPrices.forEach((priceElementRegular, index) => {
        pricingData.push({
            regularAnnualPrice:
                priceElementRegular.getAttribute("regular-annual") || "0",
            regularLifeTimePrice:
                priceElementRegular.getAttribute("regular-life") || "0",
            annualOfferAmount:
                offerAmounts[index]?.getAttribute("amount-annual") || "0",
            lifeTimeOfferAmount:
                offerAmounts[index]?.getAttribute("amount-life") || "0",
            annualOfferPrice:
                offerPrices[index]?.getAttribute("offer-annual") || "0",
            lifeTimeOfferPrice:
                offerPrices[index]?.getAttribute("offer-life") || "0",
        });
    });

    // Handle Annual Plan Click
    if (eawAnnualCheckbox) {
        eawAnnualCheckbox.addEventListener("click", function () {
            eawPricingCheckbox.classList.add("active-annual");
            eawPricingCheckbox.classList.remove("active-lifetime");
            productPricing("annual");
        });
    }

    // Handle Lifetime Plan Click
    if (eawLifetimeCheckbox) {
        eawLifetimeCheckbox.addEventListener("click", function () {
            eawPricingCheckbox.classList.add("active-lifetime");
            eawPricingCheckbox.classList.remove("active-annual");
            productPricing("lifetime");
        });
    }

    // Function to update pricing based on selected plan
    function productPricing(planType) {
        regularPrices.forEach((priceElementRegular, index) => {
            const priceData = pricingData[index];

            // Update Regular Price
            priceElementRegular.innerHTML =
                planType === "annual"
                    ? `${priceData.regularAnnualPrice}`
                    : `${priceData.regularLifeTimePrice}`;

            // Update Offer Amount
            if (offerAmounts[index]) {
                offerAmounts[index].innerHTML =
                    planType === "annual"
                        ? `${priceData.annualOfferAmount}`
                        : `${priceData.lifeTimeOfferAmount}`;
            }

            // Update Offer Price
            if (offerPrices[index]) {
                offerPrices[index].innerHTML =
                    planType === "annual"
                        ? `${priceData.annualOfferPrice}`
                        : `${priceData.lifeTimeOfferPrice}`;
            }

            // Update Package Duration
            if (packageDurations[index]) {
                packageDurations[index].innerHTML =
                    planType === "annual" ? "Month" : "Forever";
            }
        });
    }
}

function eawCostCut() {
    const singleBestPlugins = document.querySelectorAll(
        ".best-plugin-body .single-best"
    );
    const replacementNumberOfPlugins = document.querySelector(
        ".replacement-heading .replacement-number"
    );
    const replacementPrice = document.querySelector(
        ".replacement-heading .replacement-price"
    );

    function calculateTotalPrice() {
        let totalPrice = 0;
        document
            .querySelectorAll(".best-plugin-body .single-best.active-plugin")
            .forEach((activePlugin) => {
                totalPrice +=
                    parseFloat(activePlugin.getAttribute("data-price")) || 0;
            });
        return totalPrice;
    }

    if (singleBestPlugins && replacementNumberOfPlugins && replacementPrice) {
        function getActivePluginsCount() {
            return document.querySelectorAll(
                ".best-plugin-body .single-best.active-plugin"
            ).length;
        }

        // Initially activate first 3 plugins
        singleBestPlugins.forEach((plugin, index) => {
            if (index < 3) {
                plugin.classList.add("active-plugin");
            }
        });

        // Set initial values
        replacementPrice.innerHTML = calculateTotalPrice().toFixed(2);
        replacementNumberOfPlugins.innerHTML = getActivePluginsCount()
            .toString()
            .padStart(2, "0");

        // Add event listeners to toggle active state and recalculate price
        singleBestPlugins.forEach((plugin) => {
            plugin.addEventListener("click", function () {
                this.classList.toggle("active-plugin");

                replacementPrice.innerHTML = calculateTotalPrice().toFixed(2);
                replacementNumberOfPlugins.innerHTML = getActivePluginsCount()
                    .toString()
                    .padStart(2, "0");
            });
        });
    }
}



function eawOnLoaded() {
    eawPricingButton();
    eawCostCut();
}
window.addEventListener("load", eawOnLoaded);
