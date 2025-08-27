import { useState, useEffect } from "react";
import axios from "axios";
import env from "../../config.js";          // adjust path if needed

/* shared GET helper (same as elsewhere) */
const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const Gold = () => {
  /* ---------------- state ---------------- */
  const [price, setPrice]   = useState("");
  const [msg, setMsg]       = useState("");

  /* ---------------- load current price (optional) ---------------- */
  useEffect(() => {
    (async () => {
      const data = await fetcher(`${env.host}/getGold`);  // adjust if endpoint differs
      if (data?.price) setPrice(data.price);
    })();
  }, []);

  /* ---------------- submit ---------------- */
  const onSubmit = async (e) => {
    e.preventDefault();
    const p = Number(price);
    if (!p || p <= 0) return setMsg("Enter a valid positive price.");

    try {
      await axios.post(`${env.host}/updateGold`, { price: p });
      setMsg("Gold price updated!");
    } catch (err) {
      setMsg(
        err.response?.data?.message ||
          "Server error. Could not update gold price."
      );
    }
  };

  /* ---------------- render ---------------- */
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Update Gold Price</h2>

      {msg && <div className="mb-4 p-3 bg-gray-100">{msg}</div>}

      <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700">
          Current Gold Price (per gram)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          className="w-full p-2 border rounded-md"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="e.g., 79789"
          required
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
        >
          Save Price
        </button>
      </form>
    </div>
  );
};

export default Gold;
