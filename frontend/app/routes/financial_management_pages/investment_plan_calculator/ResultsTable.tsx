import React from "react";

const ResultsTable = ({
    toCurrency,
    totalResultsYear,
    yearlyBalanceAfterTaxAndFees,
    yearlyFees,
    yearlyTaxes,
    initialInvestment,
}) => {
    return (
        <table className="min-w-full bg-white border rounded-xl border-gray-300 border-separate">
            <tbody className="text-md text-center font-light">
                <tr className="border-b border-gray-300 rounded-tl-xl text-lg hover:bg-[#BBE1FA] hover:shadow-md hover:text-xl transition-all duration-300 ease-in-out">
                    <td className="py-3 px-6 rounded-tl-xl">Total Balance</td>
                    <td className="py-3 px-6 rounded-tr-xl">
                        {toCurrency}{" "}
                        {yearlyBalanceAfterTaxAndFees[totalResultsYear - 1]
                            ? Number(
                                  yearlyBalanceAfterTaxAndFees[
                                      totalResultsYear - 1
                                  ]
                              ).toFixed(2)
                            : 0}
                    </td>
                </tr>
                <tr className="border-b border-gray-300 rounded-tl-xl hover:bg-[#BBE1FA] hover:shadow-md hover:text-lg transition-all duration-300 ease-in-out">
                    <td className="py-3 px-6 rounded-tl-xl">Total Profits</td>
                    <td className="py-3 px-6 rounded-tr-xl">
                        {toCurrency}{" "}
                        {yearlyBalanceAfterTaxAndFees[totalResultsYear - 1]
                            ? (
                                  Number(
                                      yearlyBalanceAfterTaxAndFees[
                                          totalResultsYear - 1
                                      ]
                                  ) -
                                  (yearlyBalanceAfterTaxAndFees[
                                      totalResultsYear - 2
                                  ]
                                      ? yearlyBalanceAfterTaxAndFees[
                                            totalResultsYear - 2
                                        ]
                                      : initialInvestment)
                              ).toFixed(2)
                            : 0}
                    </td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-[#BBE1FA] hover:shadow-md hover:text-lg transition-all duration-300 ease-in-out">
                    <td className="py-3 px-6">Total Fees</td>
                    <td className="py-3 px-6">
                        {toCurrency}{" "}
                        {yearlyFees[totalResultsYear - 1]
                            ? Number(yearlyFees[totalResultsYear - 1]).toFixed(
                                  2
                              )
                            : 0}
                    </td>
                </tr>
                <tr className="border-b border-gray-300 hover:bg-[#BBE1FA] hover:shadow-md hover:text-lg transition-all duration-300 ease-in-out">
                    <td className="py-3 px-6">Total Taxes</td>
                    <td className="py-3 px-6 rounded-br-xl">
                        {toCurrency}{" "}
                        {yearlyTaxes[totalResultsYear - 1]
                            ? Number(yearlyTaxes[totalResultsYear - 1]).toFixed(
                                  2
                              )
                            : 0}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default ResultsTable;
