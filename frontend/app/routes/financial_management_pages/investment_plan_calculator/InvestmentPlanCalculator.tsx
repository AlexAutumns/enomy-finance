import React, { useState, useEffect } from "react";

import axios from "~/utils/axios/axiosConfig.js";

import type { Route } from "./+types/InvestmentPlanCalculator";

import InvestmentInputs from "./InvestmentInputs.tsx";
import InvestmentResults from "./InvestmentResults.tsx";

import calculateCurrencyConversion from "../../../utils/calculation/CalculateCurrencyConversion.js";
import calculateInvestmentPlan from "../../../utils/calculation/investment_plan_calculator/CalculateInvestmentPlan.js";
import { data } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
    const isLoggedIn = params.isLoggedIn ? params.isLoggedIn : false;

    return { isLoggedIn };
}

export async function action() {}

const InvestmentPlanCalculator = ({ loaderData }: Route.ComponentProps) => {
    const investmentsData = [
        {
            name: "Basic Savings",
            type: "basic_savings",
            currencyCode: "GBP",
            maxYearlyInvestment: 20000,
            minMonthlyInvestment: 50,
            minInitialInvestment: 0,
            maxYearlyReturn: 2.4,
            minYearlyReturn: 1.2,
            monthlyFee: 0.25,
            taxes: [{ percentage: 0.0, threshold: 0 }],
        },
        {
            name: "Savings Plan Plus",
            type: "savings_plan_plus",
            currencyCode: "GBP",
            maxYearlyInvestment: 30000,
            minMonthlyInvestment: 50,
            minInitialInvestment: 300,
            maxYearlyReturn: 5.5,
            minYearlyReturn: 3.0,
            monthlyFee: 0.3,
            taxes: [{ percentage: 10, threshold: 12000 }],
        },
        {
            name: "Managed Stock Investments",
            type: "managed_stock_investments",
            currencyCode: "GBP",
            maxYearlyInvestment: Infinity,
            minMonthlyInvestment: 150,
            minInitialInvestment: 1000,
            maxYearlyReturn: 23,
            minYearlyReturn: 3.0,
            monthlyFee: 1.3,
            taxes: [
                { percentage: 10, threshold: 12000 },
                { percentage: 20, threshold: 40000 },
            ],
        },
    ];

    // Currency
    const [currencies, setCurrencies] = useState([]);
    const [toCurrency, setToCurrency] = useState("GBP");

    const fetchCurrencies = async () => {
        try {
            console.log("Axios baseURL:", axios.defaults.baseURL); // Log baseURL to check if it's correct
            const response = await axios.get("/currencies");
            setCurrencies(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching currencies:", error);
        }
    };

    useEffect(() => {
        // Fetching Currencies
        fetchCurrencies();
    }, []);

    const [investments] = useState(investmentsData);
    const [initialInvestment, setInitialInvestment] = useState(0);
    const [monthlyInvestment, setMonthlyInvestment] = useState(0);
    const [yearlyInvestment, setYearlyInvestment] = useState(0);
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    const [showDetails, setShowDetails] = useState({});

    /** RESULTS */

    // Results
    const [yearlyBalanceBeforeTaxAndFees, setYearlyBalanceBeforeTaxAndFees] =
        useState([0]);

    const [yearlyBalanceAfterTaxAndFees, setYearlyBalanceAfterTaxAndFees] =
        useState([0]);

    const [yearlyFees, setYearlyFees] = useState([0]);
    const [yearlyTaxes, setYearlyTaxes] = useState([0]);

    // Settings
    const [totalResultsYear, setTotalResultsYear] = useState(1);
    const [calculatedYears, setCalculatedYears] = useState(30);

    // Toggles

    const toggleDetails = (type) => {
        setShowDetails((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    useEffect(() => {
        /** Converting the Currency Used Verification */
        console.log("Converted Currencies");
    }, [toCurrency]);

    useEffect(() => {
        console.log("Selected Investment Changed");
    }, [selectedInvestment]);

    useEffect(() => {
        console.log("Variable Changed");
    }, [toCurrency, selectedInvestment, initialInvestment, monthlyInvestment]);

    const handleCalculation = () => {
        console.log("Calculating Investment Plan...");
        try {
            let result = {};
            // Always use 10 years if totalResultsYear is less than or equal to 10
            const yearsToUse =
                totalResultsYear <= calculatedYears
                    ? calculatedYears
                    : totalResultsYear;
            result = calculateInvestmentPlan(
                currencies,
                toCurrency,
                selectedInvestment,
                initialInvestment,
                monthlyInvestment,
                yearsToUse
            );
            console.log(result);
            setYearlyBalanceAfterTaxAndFees(
                result.yearlyBalancesAfterTaxAndFees
                    ? result.yearlyBalancesAfterTaxAndFees
                    : [0]
            );
            setYearlyBalanceBeforeTaxAndFees(
                result.yearlyBalancesBeforeTaxAndFees
                    ? result.yearlyBalancesBeforeTaxAndFees
                    : [0]
            );
            setYearlyFees(result.yearlyFees ? result.yearlyFees : [0]);
            setYearlyTaxes(result.yearlyTaxes ? result.yearlyTaxes : [0]);
            console.log("Calculation Complete");
        } catch (error) {
            console.error("Error Calculating Investment Plan:", error);
        }
    };

    useEffect(() => {
        // Only trigger calculation if totalResultsYear is greater than 10
        if (totalResultsYear > 10 || totalResultsYear > calculatedYears) {
            try {
                handleCalculation();
                setCalculatedYears(totalResultsYear);
            } catch (error) {
                console.error("Error Calculating Investment Plan:", error);
            }
        }
    }, [totalResultsYear - 1]);

    useEffect(() => {
        try {
            handleCalculation();
        } catch (e) {}
    }, [calculatedYears]);

    return (
        <div className="container mx-auto py-6 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4 text-center">
                Investment Plan Calculator
            </h1>

            <div className="flex flex-col w-full justify-evenly my-6 gap-20">
                {/* Investment Selection Section */}
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

                                <div className="flex w-full flex-col items-center gap-2 ">
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
                                                        {tax.percentage}% for
                                                        profits above{" "}
                                                        {toCurrency}{" "}
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
                                    onChange={(e) =>
                                        setToCurrency(e.target.value)
                                    }
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
                        <div className="flex flex-col h-full w-[40%] px-4">
                            <table className="min-w-full bg-white border border-gray-300 rounded-2xl border-separate">
                                <thead className="text-lg">
                                    <tr className="p-0 not-first:uppercase rounded-tl-2xl rounded-tr-2xl">
                                        <th
                                            className="py-3 px-6 text-center w-full rounded-tl-2xl rounded-tr-2xl bg-gray-200 "
                                            colSpan="2"
                                        >
                                            Overview
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-md font-light ">
                                    <tr className="border-b border-gray-300 hover:bg-[#BBE1FA] hover:shadow-md hover:text-lg transition-all duration-300 ease-in-out">
                                        <td className="py-3 px-6 rounded-tl-2xl">
                                            Initial Investment
                                        </td>
                                        <td className="py-3 px-6 rounded-tr-2xl">
                                            {selectedInvestment
                                                ? `${toCurrency} ${initialInvestment}`
                                                : `${toCurrency} 0`}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-300 hover:bg-[#BBE1FA] hover:shadow-md hover:text-lg transition-all duration-300 ease-in-out">
                                        <td className="py-3 px-6">
                                            Monthly Investment
                                        </td>
                                        <td className="py-3 px-6">
                                            {" "}
                                            {selectedInvestment
                                                ? `${toCurrency} ${monthlyInvestment}`
                                                : `${toCurrency} 0`}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-300 hover:bg-[#BBE1FA] hover:shadow-md hover:text-lg transition-all duration-300 ease-in-out">
                                        <td className="py-3 px-6">
                                            Monthly Fee
                                        </td>
                                        <td className="py-3 px-6">
                                            {selectedInvestment
                                                ? `${selectedInvestment.monthlyFee}`
                                                : `0`}{" "}
                                            %
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-300 hover:bg-[#BBE1FA] hover:shadow-md hover:text-lg transition-all duration-300 ease-in-out">
                                        <td className="py-3 px-6">
                                            Taxes (Yearly)
                                        </td>
                                        <td className="py-3 rounded-br-2xl text-sm">
                                            <ul className="list-disc pl-8">
                                                {selectedInvestment &&
                                                    selectedInvestment.taxes.map(
                                                        (tax, index) => (
                                                            <li key={index}>
                                                                {tax.percentage}
                                                                % for profits
                                                                above{" "}
                                                                {toCurrency}{" "}
                                                                {calculateCurrencyConversion(
                                                                    currencies,
                                                                    "GBP",
                                                                    toCurrency,
                                                                    tax.threshold
                                                                )}
                                                            </li>
                                                        )
                                                    )}
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div
                        className={`flex w-full items-center mt-4 px-4 ${
                            loaderData.isLoggedIn
                                ? "justify-evenly"
                                : "justify-center"
                        }`}
                    >
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded-full w-1/4 transition-all duration-300 ease-in-out"
                            onClick={() => {
                                setTotalResultsYear(1);
                                setCalculatedYears(30);
                                handleCalculation();
                            }}
                        >
                            Calculate
                        </button>

                        {/* Save Button (This should only be loaded in if logged in*/}
                        {loaderData.isLoggedIn ? (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-1/4"
                                onClick={() => {}}
                            >
                                Save
                            </button>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>

                <InvestmentResults
                    setCalculatedYears={setCalculatedYears}
                    calculatedYears={calculatedYears}
                    yearlyBalanceAfterTaxAndFees={yearlyBalanceAfterTaxAndFees}
                    totalResultsYear={totalResultsYear}
                    setTotalResultsYear={setTotalResultsYear}
                    toCurrency={toCurrency}
                    yearlyFees={yearlyFees}
                    yearlyTaxes={yearlyTaxes}
                    initialInvestment={initialInvestment}
                />
            </div>
        </div>
    );
};

export default InvestmentPlanCalculator;
