import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import env from "../config.js";
import { useNavigate, useLocation } from "react-router-dom";

const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg]           = useState("");
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";   // return path

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      setLoading(true);
      const { data } = await axios.post(`${env.host}/loginAdmin`, {
        username,
        password,
      });

      /* save token for RequireAuth */
      Cookies.set("adminToken", data.token, { expires: 1 });      // 1-day cookie
      navigate(from, { replace: true });
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" py-14 pt-50 flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-semibold text-center mb-6">Admin Login</h2>

        {msg && <div className="mb-4 p-3 bg-gray-100 text-center">{msg}</div>}

        <form onSubmit={onSubmit} className="space-y-6">
          <input
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="w-full py-2 rounded-md bg-yellow-600 text-white"
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
