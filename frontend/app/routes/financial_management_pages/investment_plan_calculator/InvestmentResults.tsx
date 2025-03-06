import React, { useState, useEffect } from "react";
import LineChart from "./Linechart.tsx";
import ResultsTable from "./ResultsTable";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const InvestmentResults = ({
    setCalculatedYears,
    calculatedYears,
    yearlyBalanceAfterTaxAndFees,
    totalResultsYear,
    setTotalResultsYear,
    toCurrency,
    yearlyFees,
    yearlyTaxes,
    initialInvestment,
}) => {
    const [intervalSize, setIntervalSize] = useState(5);
    const [intervalSeries, setIntervalSeries] = useState([]);
    const [targetNumber, setTargetNumber] = useState(calculatedYears);
    const [minYear, setMinYear] = useState(new Date().getFullYear());
    const [maxYear, setMaxYear] = useState(
        new Date().getFullYear() + calculatedYears
    );

    const [datasetsShown, setDatasetsShown] = useState([]);
    const [graphDataset, setGraphDataset] = useState([
        {
            // Account Balance
            label: "Account Balance",
            data: yearlyBalanceAfterTaxAndFees,
            backgroundColor: ["rgba(54, 162, 235, 1)"],
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
        },
        {
            // Yearly Profits
            label: "Profits",
            data: [0].concat(
                yearlyBalanceAfterTaxAndFees
                    .slice(1)
                    .map(
                        (current, index) =>
                            current - yearlyBalanceAfterTaxAndFees[index]
                    )
            ),
            backgroundColor: ["rgba(0, 255, 115, 1)"],
            borderColor: "rgba(0, 255, 115, 1)",
            borderWidth: 2,
        },
        {
            // Yearly Fees
            label: "Fees",
            data: yearlyFees,
            backgroundColor: ["rgba(223, 0, 255, 1)"],
            borderWidth: 3,
        },
        {
            // Yearly Taxes
            label: "Taxes",
            data: yearlyTaxes,
            backgroundColor: ["rgba(255, 0, 111, 1)"],
            borderWidth: 2,
        },
    ]);

    // Get the current year
    const currentYear = new Date().getFullYear();

    const handleIntervalRangeChange = (e) => {
        const newIntervalSize = parseInt(e.target.value);
        setIntervalSize(newIntervalSize);
        generateIntervalSeries(maxYear - minYear, newIntervalSize);
    };

    const generateIntervalSeries = (targetNumber, stepSize) => {
        const series = [];
        let currentValue = minYear;

        while (currentValue <= maxYear) {
            series.push(currentValue);
            currentValue += stepSize;
        }

        // Adjust the last value if needed
        if (series[series.length - 1] !== maxYear) {
            series[series.length - 1] = maxYear;
        }

        setIntervalSeries(series);
    };

    const handleMaxYearChange = (e) => {
        const newMaxYear = parseInt(e.target.value);
        setMaxYear(newMaxYear);
        generateIntervalSeries(newMaxYear - minYear, intervalSize);
        setCalculatedYears(newMaxYear - currentYear);
    };

    const handleYearSelectChange = (e) => {
        console.log(parseInt(e.target.value) - currentYear);
        setTotalResultsYear(parseInt(e.target.value) - currentYear);
    };

    useEffect(() => {
        setMaxYear(currentYear + calculatedYears);
    }, [totalResultsYear, calculatedYears, yearlyBalanceAfterTaxAndFees, initialInvestment]);

    // Handle the Datasets of the Line Graph
    useEffect(() => {
        setGraphDataset([
            {
                label: "Account Balance",
                data: yearlyBalanceAfterTaxAndFees,
                backgroundColor: ["rgba(54, 162, 235, 1)"],
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
            },
            {
                label: "Profits",
                data: [0].concat(
                    yearlyBalanceAfterTaxAndFees
                        .slice(1)
                        .map(
                            (current, index) =>
                                current - yearlyBalanceAfterTaxAndFees[index]
                        )
                ),
                backgroundColor: ["rgba(0, 255, 115, 1)"],
                borderColor: "rgba(0, 255, 115, 1)",
                borderWidth: 2,
            },
            {
                label: "Fees",
                data: yearlyFees,
                backgroundColor: ["rgba(223, 0, 255, 1)"],
                borderWidth: 3,
            },
            {
                label: "Taxes",
                data: yearlyTaxes,
                backgroundColor: ["rgba(255, 0, 111, 1)"],
                borderWidth: 2,
            },
        ]);
    }, [yearlyBalanceAfterTaxAndFees, yearlyFees, yearlyTaxes]);

    // Ensure datasetsShown updates when graphDataset changes
    useEffect(() => {
        setDatasetsShown([graphDataset[0]]);
    }, [graphDataset]);

    const handleDatasetCheckboxChange = (index) => {
        setDatasetsShown((prevDatasets) => {
            const dataset = graphDataset[index];
            return prevDatasets.some((d) => d.label === dataset.label)
                ? prevDatasets.filter((d) => d.label !== dataset.label)
                : [...prevDatasets, dataset];
        });
    };

    return (
        <div>
            <h2 className="font-bold mb-2 text-2xl pb-2 w-full text-center">
                Results
            </h2>
            <div className="flex h-full flex-col items-center border-2 rounded-2xl p-4 gap-6 shadow-xl bg-white">
                <div className="flex flex-col w-full justify-center gap-5">
                    {/* Result Chart */}
                    <div className="w-full h-[40%] flex justify-center items-center text-center rounded-2xl p-4">
                        <LineChart
                            chartData={{
                                labels: intervalSeries,
                                datasets: datasetsShown,
                            }}
                        />
                    </div>
                    <div className="flex gap-2 w-full items-center justify-evenly">
                        {/* Table View */}
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col text-center w-[32%] justify-center items-center">
                                <label htmlFor="minYear">
                                    <strong>Min Year</strong>
                                </label>
                                <input
                                    type="number"
                                    id="minYear"
                                    min={currentYear}
                                    value={minYear}
                                    onChange={(e) => {
                                        setMinYear(parseInt(e.target.value));
                                        generateIntervalSeries(
                                            maxYear - parseInt(e.target.value),
                                            intervalSize
                                        );
                                    }}
                                    className="flex w-[45%]"
                                />
                            </div>

                            <div className="flex flex-col w-[36%] text-center gap-2">
                                <label htmlFor="intervalSizeSlider">
                                    <strong>Interval Size:</strong>{" "}
                                    {intervalSize}
                                </label>
                                <input
                                    type="range"
                                    id="intervalSizeSlider"
                                    min="1"
                                    max={(maxYear - minYear) / 3}
                                    value={intervalSize}
                                    onChange={handleIntervalRangeChange}
                                />
                            </div>

                            <div className="flex flex-col text-center w-[32%] justify-center items-center">
                                <label htmlFor="maxYear">
                                    <strong>Max Year</strong>
                                </label>
                                <input
                                    type="number"
                                    id="maxYear"
                                    min={currentYear + 1}
                                    value={maxYear}
                                    onChange={handleMaxYearChange}
                                    className="flex w-[45%]"
                                />
                            </div>
                        </div>

                        {/* Graphs Enabled */}
                        <div className="flex flex-col gap-2 justify-center items-center">
                            <h3 className="font-bold">
                                Select Data to Display
                            </h3>
                            <div className="flex gap-4">
                                {graphDataset.map((dataset, index) => (
                                    <label
                                        key={dataset.label}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={datasetsShown.some(
                                                (d) => d.label === dataset.label
                                            )}
                                            onChange={() =>
                                                handleDatasetCheckboxChange(
                                                    index
                                                )
                                            }
                                        />
                                        {dataset.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 w-full border-black"></div>

                <div className="flex flex-col w-[80%] gap-4">
                    {/* Year Select */}
                    <div className="flex items-center gap-2">
                        <label className="mb-1 font-bold text-lg">Year</label>
                        <input
                            type="number"
                            value={totalResultsYear + currentYear}
                            onChange={handleYearSelectChange}
                            min={minYear + 1}
                            className="p-2 border-b-2 text-center"
                        />
                    </div>

                    {/* Results Table */}
                    <ResultsTable
                        toCurrency={toCurrency}
                        totalResultsYear={totalResultsYear}
                        yearlyBalanceAfterTaxAndFees={
                            yearlyBalanceAfterTaxAndFees
                        }
                        yearlyFees={yearlyFees}
                        yearlyTaxes={yearlyTaxes}
                        initialInvestment={initialInvestment}
                    />
                </div>
            </div>
        </div>
    );
};

export default InvestmentResults;
