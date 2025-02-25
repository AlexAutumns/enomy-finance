const calculateCurrencyConversion = (
    currencies,
    fromCurrencyCode = "GBP",
    toCurrencyCode,
    amount
) => {
    const fromCurrencyObj = currencies.find(
        (currency) => currency.currencyCode === fromCurrencyCode
    );
    const toCurrencyObj = currencies.find(
        (currency) => currency.currencyCode === toCurrencyCode
    );


    const fromRate = fromCurrencyObj ? fromCurrencyObj.exchangeRate : 1;
    const toRate = toCurrencyObj ? toCurrencyObj.exchangeRate : 1;

    const exchangeRate = toRate / fromRate;
    const result = amount * exchangeRate;
    return result;
};

export default calculateCurrencyConversion;
