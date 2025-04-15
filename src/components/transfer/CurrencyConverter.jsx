import { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");

  useEffect(() => {
    if (amount) {
      fetchConvertedAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromCurrency, toCurrency]);

  const fetchConvertedAmount = async () => {
    if (!amount) return;

    try {
      const response = await fetch(
        `/api/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const {convertedAmount} = await response.json();
      console.log(convertedAmount);
      
      setConvertedAmount(convertedAmount);
      // setConvertedAmount(data.convertedAmount?.toFixed(2) || "Error");
    } catch (error) {
      console.error("Conversion Error:", error);
      setConvertedAmount("Error");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto border shadow-lg rounded-lg">
      <label className="block font-semibold mb-2">Amount in {fromCurrency}:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <label className="block font-semibold mb-2">Convert from:</label>
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="USD">US Dollars (USD)</option>
        <option value="EUR">Euros (EUR)</option>
        <option value="GBP">British Pounds (GBP)</option>
        <option value="NGN">Nigerian Naira (NGN)</option>
      </select>

      <label className="block font-semibold mb-2">Convert to:</label>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="NGN">Nigerian Naira (NGN)</option>
        <option value="USD">US Dollars (USD)</option>
        <option value="EUR">Euros (EUR)</option>
        <option value="GBP">British Pounds (GBP)</option>
      </select>

      <label className="block font-semibold mb-2">Converted Amount:</label>
      <input
        type="text"
        value={convertedAmount}
        readOnly
        className="border p-2 w-full bg-gray-100"
      />
    </div>
  );
};

export default CurrencyConverter;
