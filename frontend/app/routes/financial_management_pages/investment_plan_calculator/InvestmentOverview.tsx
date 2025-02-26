import React from "react";

const InvestmentOverview = ({
    selectedInvestment,
    toCurrency,
    initialInvestment,
    monthlyInvestment,
    calculateCurrencyConversion,
    currencies,
}) => {
    return (
        <div className="flex flex-col h-full w-[40%] px-4">
            <table className="min-w-full bg-white border border-gray-300 rounded-2xl border-separate">
                <thead className="text-lg">
                    <tr className="p-0 not-first:uppercase rounded-tl-2xl rounded-tr-2xl">
                        <th
                            className="py-3 px-6 text-center w-full rounded-tl-2xl rounded-tr-2xl bg-gray-200"
                            colSpan="2"
                        >
                            Overview
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-md font-light">
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
                        <td className="py-3 px-6">Monthly Investment</td>
                        <td className="py-3 px-6">
                            {selectedInvestment
                                ? `${toCurrency} ${monthlyInvestment}`
                                : `${toCurrency} 0`}
                        </td>
                    </tr>
                    <tr className="border-b border-gray-300 hover:bg-[#BBE1FA] hover:shadow-md hover:text-lg transition-all duration-300 ease-in-out">
                        <td className="py-3 px-6">Monthly Fee</td>
                        <td className="py-3 px-6">
                            {selectedInvestment
                                ? `${selectedInvestment.monthlyFee}`
                                : `0`}{" "}
                            %
                        </td>
                    </tr>
                    <tr className="border-b border-gray-300 hover:bg-[#BBE1FA] hover:shadow-md hover:text-lg transition-all duration-300 ease-in-out">
                        <td className="py-3 px-6">Taxes (Yearly)</td>
                        <td className="py-3 rounded-br-2xl text-sm">
                            <ul className="list-disc pl-8">
                                {selectedInvestment &&
                                    selectedInvestment.taxes.map(
                                        (tax, index) => (
                                            <li key={index}>
                                                {tax.percentage}% for profits
                                                above {toCurrency}{" "}
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
    );
};

export default InvestmentOverview;
