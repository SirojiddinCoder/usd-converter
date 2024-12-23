import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UZS");
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(() => {
 
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "https://v6.exchangerate-api.com/v6/ab462a0d4c42d50ec63f0d4d/latest/USD"
        );
        setRates(response.data.conversion_rates);
      } catch (error) {
        console.error("Valyuta kurslarini yuklashda xatolik:", error);
      }
    };

    fetchRates();
  }, []);

  const handleConvert = () => {
    if (amount && rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  return (
    <div  className="container mt-5 pb-5">
      <h2 className="text-center mb-4">(Hello Muxriddin) 1 USD to UZS - Convert US Dollars to Uzbekistani Sums</h2>
      <div className="row">
        {/* Valyuta kurslari */}
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Valyuta kurslari</h5>
            <div className="table-wrapper">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Valyuta</th>
                    <th>MB kursi</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(rates).map((currency) => (
                    <tr key={currency}>
                      <td>{currency}</td>
                      <td>{rates[currency]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
       
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-3">Valyuta konvertori</h5>
            <div className="form-group mt-3">
              <label>Summangizni kiriting...</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <select
                className="form-select mt-2"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {Object.keys(rates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Olishim kerak</label>
              <input
                type="text"
                className="form-control"
                value={convertedAmount}
                readOnly
              />
              <select
                className="form-select mt-2"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {Object.keys(rates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleConvert}>
              Konvertatsiya qilish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
