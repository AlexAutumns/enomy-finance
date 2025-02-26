import React from "react";

import InvestmentOverview from "./InvestmentOverview";

const InvestmentInputs = ({
    investments,
    selectedInvestment,
    showDetails,
    toggleDetails,
    setSelectedInvestment,
    toCurrency,
    currencies,
    initialInvestment,
    setInitialInvestment,
    monthlyInvestment,
    setMonthlyInvestment,
    calculateCurrencyConversion,
    calculateInitialMinInvestment,
    calculateMonthlyMinInvestment,
    handleCalculation,
    setTotalResultsYear,
    setCalculatedYears,
}) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <ul className="flex overflow-x-auto gap-5 w-full py-2 pb-6 justify-center">
                {investments.map((inv) => (
                    <li
                        key={inv.type}
                        className={`flex flex-col gap-4 border-2 rounded-2xl min-w-[20%] shadow-lg p-4 items-center transition-all duration-300 ease-in-out ${
                            selectedInvestment?.type === inv.type
                                ? "shadow-lg inset-shadow-sky-200 scale-[1.02] bg-[#d3ecfc]"
                                : "bg-white hover:shadow-xl hover:scale-[1.02]"
                        }`}
                    >
                        <h2 className="font-bold text-lg text-center">
                            {inv.name}
                        </h2>

                        <div className="flex w-full flex-col items-center gap-2">
                            <button
                                className="bg-[#3282B8] hover:bg-[#0F4C75] text-white font-bold w-full py-2 px-3 rounded-full transition-all duration-300"
                                onClick={() => toggleDetails(inv.type)}
                            >
                                {showDetails[inv.type]
                                    ? "Hide Details"
                                    : "Learn More"}
                            </button>

                            {/* Smooth expanding/collapsing animation */}
                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                    showDetails[inv.type]
                                        ? "max-h-96 opacity-100"
                                        : "max-h-0 opacity-0"
                                } w-full px-2 pl-4`}
                            >
                                <div className="text-sm">
                                    <p>
                                        <strong>
                                            Expected Yearly Returns:
                                        </strong>{" "}
                                        {inv.minYearlyReturn}% -{" "}
                                        {inv.maxYearlyReturn}%
                                    </p>
                                    <p>
                                        <strong>Monthly Fee:</strong>{" "}
                                        {inv.monthlyFee}%
                                    </p>
                                    <p>
                                        <strong>Taxes:</strong>
                                    </p>
                                    <ul className="list-disc ml-6">
                                        {inv.taxes.map((tax, i) => (
                                            <li key={i}>
                                                {tax.percentage}% for profits
                                                above {toCurrency}{" "}
                                                {calculateCurrencyConversion(
                                                    currencies,
                                                    "GBP",
                                                    toCurrency,
                                                    tax.threshold
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <button
                            className={`w-full py-2 px-3 rounded-full font-bold transition-all duration-300 ${
                                selectedInvestment?.type === inv.type
                                    ? "bg-green-700 text-white"
                                    : "bg-green-500 hover:bg-green-700 text-white"
                            }`}
                            onClick={() => setSelectedInvestment(inv)}
                        >
                            {selectedInvestment?.type === inv.type
                                ? "Selected"
                                : "Select"}
                        </button>
                    </li>
                ))}
            </ul>

            {/* Investment Input Fields */}
            <div className="w-full flex items-center py-2 justify-evenly">
                <div className="flex flex-col w-[30%] gap-5 px-4">
                    <div className="flex flex-col items-center w-full">
                        <label className="mb-1 font-bold text-lg">
                            Currency
                        </label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="border-2 p-2 rounded-2xl w-24 text-center w-full"
                        >
                            {currencies.map((currency) => (
                                <option
                                    key={currency.currencyId}
                                    value={currency.currencyCode}
                                >
                                    {currency.currencyCode}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col items-center w-full">
                        <label className="mb-1 font-bold text-lg">
                            Initial Investment
                        </label>
                        <input
                            type="number"
                            value={initialInvestment}
                            onChange={(e) =>
                                setInitialInvestment(
                                    Number(e.target.value) || 0
                                )
                            }
                            min={
                                selectedInvestment
                                    ? calculateCurrencyConversion(
                                          currencies,
                                          "GBP",
                                          toCurrency,
                                          selectedInvestment.minInitialInvestment
                                      )
                                    : 0
                            }
                            className="p-2 border-2 rounded-2xl w-full text-center"
                        />
                    </div>

                    <div className="flex flex-col items-center w-full">
                        <label className="mb-1 font-bold text-lg">
                            Monthly Investment
                        </label>
                        <input
                            type="number"
                            value={monthlyInvestment}
                            onChange={(e) =>
                                setMonthlyInvestment(
                                    Number(e.target.value) || 0
                                )
                            }
                            min={
                                selectedInvestment
                                    ? calculateCurrencyConversion(
                                          currencies,
                                          "GBP",
                                          toCurrency,
                                          selectedInvestment.minMonthlyInvestment
                                      )
                                    : 0
                            }
                            className="p-2 border-2 rounded-2xl w-full text-center"
                        />
                    </div>
                </div>

                {/* Investment Overview*/}
                <InvestmentOverview
                    selectedInvestment={selectedInvestment}
                    toCurrency={toCurrency}
                    initialInvestment={initialInvestment}
                    monthlyInvestment={monthlyInvestment}
                    calculateCurrencyConversion={calculateCurrencyConversion}
                    currencies={currencies}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex w-full justify-evenly mt-4 px-4">
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full w-1/4"
                    onClick={() => {
                        setTotalResultsYear(1);
                        setCalculatedYears(10);
                        handleCalculation();
                    }}
                >
                    Calculate
                </button>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-1/4"
                    onClick={() => {}}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default InvestmentInputs;
