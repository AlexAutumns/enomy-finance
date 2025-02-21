import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("GBP");
    const [toCurrency, setToCurrency] = useState("USD");
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const fetchCurrencies = async () => {
            const response = await axios.get(
                "https://api.exchangerate-api.com/v4/latest/GBP"
            );
            setCurrencies(Object.keys(response.data.rates));
        };
        fetchCurrencies();
    }, []);

    useEffect(() => {
        const fetchConversion = async () => {
            const response = await axios.get(
                `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
            );
            const rate = response.data.rates[toCurrency];
            setConvertedAmount((amount * rate).toFixed(2));
        };
        fetchConversion();
    }, [fromCurrency, toCurrency, amount]);

    return (
        <div className="p-6 bg-gray-100">
            <div className="mb-4">
                <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2"
                />
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="border p-2 ml-2"
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
                <span className="mx-2">to</span>
                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="border p-2"
                >
                    {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>

                <h2 className="text-xl">
                    Converted Amount: {convertedAmount} {toCurrency}
                </h2>
            </div>
            <div>
                {/* Charts */}
            </div>
        </div>
    );
};

export default CurrencyConverter;
