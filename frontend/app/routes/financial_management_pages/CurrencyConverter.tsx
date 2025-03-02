import React, { useState, useEffect } from "react";
import axios from "~/utils/axios/axiosConfig.js";
import calculateCurrencyConversion from "../../utils/calculation/CalculateCurrencyConversion.js";
import { FaExchangeAlt } from "react-icons/fa";

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("GBP");
    const [toCurrency, setToCurrency] = useState("USD");
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get(
                    "/currencies"
                );
                setCurrencies(response.data);
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };
        fetchCurrencies();
    }, []);

    useEffect(() => {
        if (currencies.length > 0) {
            setConvertedAmount(
                calculateCurrencyConversion(
                    currencies,
                    fromCurrency,
                    toCurrency,
                    amount
                )
            );
        }
    }, [amount, fromCurrency, toCurrency, currencies]);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className="w-[60%] mx-auto p-6 bg-white rounded-xl">
            <h1 className="text-3xl font-bold text-center mb-6">
                Currency Converter
            </h1>

            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <div className="flex items-center space-x-10">
                    <div className="flex items-center bg-gray-100 rounded-lg shadow-sm">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="p-3 w-32 text-center bg-transparent outline-none rounded-l-lg"
                            min="0"
                        />
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="p-3 text-center border-l-2 bg-white rounded-r-lg cursor-pointer"
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

                    <button
                        onClick={swapCurrencies}
                        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all"
                    >
                        <FaExchangeAlt className="text-xl" />
                    </button>

                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="p-3 text-center border-2 bg-white rounded-lg cursor-pointer"
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

                <h2 className="text-xl text-center p-3 rounded-lg font-semibold">
                    Converted Amount:{" "}
                    <span className="text-blue-500">
                        {convertedAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}{" "}
                        {toCurrency}
                    </span>
                </h2>
            </div>
        </div>
    );
};

export default CurrencyConverter;
