import axios from 'axios';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import env from "../../config.js"
import {UserIcon,BoxIcon,CategoryIcon,CaretDownIcon,CaretUpIcon,DollarSignIcon,HamburgerMenuIcon,CloseIcon,PlusCircleIcon,PencilAltIcon,TrashIcon,} from "../Dashboard/Icons.jsx"



const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "https://swarnaganga-back.vercel.app/api",
  // withCredentials: true,  // ← enable if your server uses cookies for auth
});

const ITEMS_PER_PAGE = 15;

const dummyUsers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  email: `user${i + 1}@example.com`,
  phone: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
}));

const dummyProducts = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Jewellery', 'Apparel', 'Home'][Math.floor(Math.random() * 4)],
  photo: `https://placehold.co/50x50/F0F0F0/000000?text=P${i + 1}`,
}));

const dummyCategories = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants', 'Anklets', 'Watches', 'Brooches'][i] || `Category ${i + 1}`,
}));

export const User = () => {
const [allUsers,     setAllUsers]     = useState([]);   // fetched from API
  const [searchTerm,   setSearchTerm]   = useState("");
  const [page,         setPage]         = useState(1);
  const [error,        setError]        = useState(null); // network / server

  /* ===================== fetch users =================================== */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/getAllUser");
        // data is an array of user docs: _id, email, phone, fullname …
        setAllUsers(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data ?? "Failed to load users");
      }
    })();
  }, []);

  /* ===================== filtering ===================================== */
  const filtered = useMemo(() => {
    if (!searchTerm) return allUsers;
    const q = searchTerm.toLowerCase();
    return allUsers.filter((u) =>
      u.email.toLowerCase().includes(q)     ||
      u.phone.includes(q)                   ||
      u.fullname?.toLowerCase().includes(q) ||
      u._id.toString().includes(q)
    );
  }, [allUsers, searchTerm]);

  /* ===================== pagination ==================================== */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const current = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const changePage = useCallback(
    (n) => { if (n >= 1 && n <= totalPages) setPage(n); },
    [totalPages]
  );

  /* ===================== UI =========================================== */
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        User Management
      </h2>

      {/* Search box */}
      <input
        className="w-full mb-6 px-4 py-2 border rounded-md"
        placeholder="Search by Name, Email, Phone, or ID…"
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
      />

      {/* Error banner */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                S No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {current.length ? (
              current.map((u, idx) => (
                <tr key={u._id} className={idx % 2 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {(page - 1) * ITEMS_PER_PAGE + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {u.fullname || "–"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {u.phone}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-6 text-center text-gray-500 text-sm"
                >
                  {allUsers.length
                    ? "No matching users."
                    : "No users found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => changePage(n)}
              className={`px-3 py-1 border rounded ${
                n === page ? "bg-yellow-600 text-white" : ""
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
};