import calculateCurrencyConversion from "../CalculateCurrencyConversion.js";

const calculateInvestmentPlan = (
    currencies,
    toCurrencyCode,
    selectedInvestment, // Fees and Taxes
    initialInvestment = 0,
    monthlyInvestment = 0,
    years = 10,
    yearlyInvestment = 0 // Might be implemented in the future
) => {
    // Extracting data from selectedInvestment
    const { monthlyFee, taxes } = selectedInvestment;

    console.log("monthlyFee:", monthlyFee);
    console.log("taxes:", taxes);

    let totalInvestment = initialInvestment;
    let currentBalance = totalInvestment;
    let previousBalance = totalInvestment;
    let taxableProfit = 0;

    // Arrays to store yearly details
    const yearlyBalancesBeforeTaxAndFees = [];
    const yearlyBalancesAfterTaxAndFees = [];
    const yearlyFees = [];
    const yearlyTaxes = [];

    try {
        for (let year = 0; year < years; year++) {
            // Calculate every month's balance and fees
            const monthlyBalance = [];
            const monthlyFees = [];
            for (let m = 1; m <= 12; m++) {
                currentBalance += monthlyInvestment;
                monthlyBalance.push(currentBalance);

                monthlyFees.push(currentBalance * (monthlyFee / 100));
            }

            let totalFees = monthlyFees.reduce((acc, fee) => acc + fee, 0);
            yearlyFees.push(totalFees);

            // Save Balance before tax and fees
            yearlyBalancesBeforeTaxAndFees.push(currentBalance.toFixed(4));

            // Applying Fees
            currentBalance -= totalFees;

            // Calculate Taxable Profit

            taxableProfit = currentBalance - previousBalance;

            // Calculate Taxes based on provided tax conditions
            let yearlyTax = 0;

            // Check if taxableProfit is within the range of the current tax bracket
            if (taxableProfit.toFixed(4) >= 12000) {
                yearlyTax += taxableProfit * (10 / 100);
                console.log("yearlyTax:", yearlyTax);
                // Break the loop once the tax is applied
            }

            yearlyTaxes.push(yearlyTax);

            // Applying Taxes
            currentBalance -= yearlyTax;

            // Save Balance after tax and fees
            yearlyBalancesAfterTaxAndFees.push(currentBalance.toFixed(4));

            previousBalance = currentBalance;

            // totalInvestment += yearlyInvestment;
            // currentBalance += yearlyInvestment;
        }

        return {
            yearlyBalancesBeforeTaxAndFees: yearlyBalancesBeforeTaxAndFees,
            yearlyBalancesAfterTaxAndFees: yearlyBalancesAfterTaxAndFees,
            yearlyFees: yearlyFees,
            yearlyTaxes: yearlyTaxes,
        };
    } catch (error) {
        console.error("Error during investment plan calculation:", error);
        return { error: "Error during investment plan calculation" };
    }
};

export default calculateInvestmentPlan;
