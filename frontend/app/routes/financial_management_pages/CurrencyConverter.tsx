import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("GBP");
    const [toCurrency, setToCurrency] = useState("USD");
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);

    const fetchCurrencies = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/currencies"
            );
            setCurrencies(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Error fetching currencies:", error);
        }
    };

    const calculateConversion = () => {
        const fromCurrencyObj = currencies.find(
            (currency) => currency.currencyCode === fromCurrency
        );
        const toCurrencyObj = currencies.find(
            (currency) => currency.currency_code === toCurrency
        );

        const fromRate = fromCurrencyObj ? fromCurrencyObj.exchangeRate : 1;
        const toRate = toCurrencyObj ? toCurrencyObj.exchangeRate : 1;

        const exchangeRateFromToCurrency = toRate / fromRate;
        const result = amount * exchangeRateFromToCurrency;
        setConvertedAmount(result);
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    useEffect(() => {
        if (currencies.length > 0) {
            calculateConversion();
        }
    }, [amount, fromCurrency, toCurrency, currencies]);

    return (
        <div className="container mx-auto p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Currency Converter
                </h1>
                <div className="flex items-center justify-center mb-4">
                    <div className="flex border-2 rounded-2xl">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="p-2 w-sm text-center rounded-l-2xl"
                        />
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="border-l-4 border-double rounded-r-2xl p-2 w-24 text-center"
                        >
                            {currencies.map((currency) => (
                                <option
                                    key={currency.currencyID}
                                    value={currency.currencyCode}
                                >
                                    {currency.currencyCode}
                                </option>
                            ))}
                        </select>
                    </div>

                    <span className="mx-2 text-lg">to</span>
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="border-2 p-2 rounded-2xl w-24 text-center"
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

                <h2 className="text-xl text-center">
                    Converted Amount:{" "}
                    <span className="font-bold">
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
