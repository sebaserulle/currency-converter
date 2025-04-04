import { useEffect, useState } from "react";
import axios from "axios";

export default function Converter() {
  const [rate, setRate] = useState(null);
  const [usd, setUsd] = useState(100);
  const [dop, setDop] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL || "http://localhost:5000/api/rate")
      .then(res => {
        const fetchedRate = res.data.rate;
        setRate(fetchedRate);
        setDop(usd * fetchedRate);
      })
      .catch(err => console.error("Error fetching rate:", err));
  }, [usd]);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-2">USD → DOP Converter</h1>
      {rate ? (
        <>
          <input
            type="number"
            value={usd}
            onChange={(e) => {
              const val = parseFloat(e.target.value) || 0;
              setUsd(val);
              setDop(val * rate);
            }}
            className="border rounded px-4 py-2 w-40 text-center mb-4"
          />
          <div className="text-lg">
            {usd} USD = <strong>{dop.toFixed(2)} DOP</strong>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            (1 USD = {rate.toFixed(4)} DOP)
          </p>
        </>
      ) : (
        <p>Loading exchange rate...</p>
      )}
    </div>
  );
}
