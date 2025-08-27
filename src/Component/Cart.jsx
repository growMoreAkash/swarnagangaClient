
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// -----------------------------------------------------------------------------
//  Axios instance & helpers
// -----------------------------------------------------------------------------
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "https://swarnaganga-back.vercel.app/api",
});
const getTokenCookie = () => Cookies.get("token");

// -----------------------------------------------------------------------------
//  Component
// -----------------------------------------------------------------------------
const Cart = () => {
  /* ------------------------------ State ----------------------------------- */
  const [cartItems, setCartItems]   = useState([]);   // flattened items from API
  const [loading,   setLoading]     = useState(true);
  const [search,    setSearch]      = useState("");
  const [selected,  setSelected]    = useState(new Set());
  const [msg,       setMsg]         = useState("");
  const [page,      setPage]        = useState(1);
  const perPage = 10;

  /* ---------------------------- Fetch cart -------------------------------- */
  useEffect(() => {
    const token = getTokenCookie();
    if (!token) {
      setMsg("Please login first.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const { data } = await api.get("/getUserCart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const flat = data.map((c) => ({
          id:       c.productId?._id,
          name:     c.productId?.name,
          category: c.productId?.category.name,
          photo:    c.productId?.photo,
        }));
        setCartItems(flat);
      } catch (err) {
        console.error(err);
        setMsg("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ----------------------- Derived lists & pagination --------------------- */
  const filtered = useMemo(() => {
    if (!search) return cartItems;
    const q = search.toLowerCase();
    return cartItems.filter(
      (it) => it.name.toLowerCase().includes(q) || it.category.toLowerCase().includes(q)
    );
  }, [search, cartItems]);

  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const currentItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  /* -------------------------- Checkbox helpers --------------------------- */
  const allSelected = currentItems.length && currentItems.every((it) => selected.has(it.id));
  const toggleOne   = (id, chk) => setSelected((s) => {
    const n = new Set(s); chk ? n.add(id) : n.delete(id); return n; });
  const toggleAll   = (chk)    => setSelected(chk ? new Set(currentItems.map((i) => i.id)) : new Set());

  /* -------------------------- Delete selected ---------------------------- */
  const onDelete = async () => {
    if (!selected.size) return setMsg("Please select at least one item to delete.");
    const token = getTokenCookie();
    if (!token) return setMsg("Please login first.");

    try {
      const { data } = await api.delete("/removeFromCart", {
        data: { productIds: Array.from(selected) },
        headers: { Authorization: `Bearer ${token}` },
      });
      const flat = data.map((c) => ({
        id: c.productId._id,
        name: c.productId.name,
        category: c.productId.category,
        photo: c.productId.photo,
      }));
      setCartItems(flat);
      setSelected(new Set());
      setMsg(`Successfully deleted ${selected.size} item(s).`);
      const newTotal = Math.ceil(flat.length / perPage) || 1;
      if (page > newTotal) setPage(newTotal);
    } catch (err) {
      console.error(err);
      setMsg("Delete failed. Try again.");
    }
  };

  /* -------------------------- Checkout stub ----------------------------- */
  const onCheckout = () => setMsg("Proceeding to checkout… (simulate)");

  /* -------------------------- UI 🚀 ------------------------------------- */
  if (loading) return <div className="p-10 text-center">Loading…</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-64">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">Your Shopping Cart</h1>

        {/* Search */}
        <input
          className="w-full p-3 mb-6 border rounded-lg"
          placeholder="Search products in cart…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); setSelected(new Set()); }}
        />

        {/* Delete button */}
        {cartItems.length > 0 && (
          <div className="flex justify-end mb-4">
            <button onClick={onDelete} disabled={!selected.size} className="px-6 py-2 bg-red-600 text-white rounded disabled:opacity-50">
              Delete Selected ({selected.size})
            </button>
          </div>
        )}

        {msg && <div className="mb-4 p-3 text-center bg-yellow-50 border rounded">{msg}</div>}

        {/* Table */}
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4"><input type="checkbox" checked={!!allSelected} onChange={(e) => toggleAll(e.target.checked)} /></th>
                <th className="p-4">Photo</th>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length ? currentItems.map((it, idx) => (
                <tr key={it.id} className={idx % 2 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-4"><input type="checkbox" checked={selected.has(it.id)} onChange={(e) => toggleOne(it.id, e.target.checked)} /></td>
                  <td className="p-4"><img src={it.photo} alt={it.name} className="w-16 h-16 object-cover rounded" /></td>
                  <td className="p-4 font-medium">{it.name}</td>
                  <td className="p-4">{it.category}</td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="p-6 text-center">Your cart is empty.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex justify-center gap-2 mt-6">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`px-3 py-1 border rounded ${n === page ? "bg-yellow-600 text-white" : ""}`}>{n}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
          </nav>
        )}

        {/* Checkout */}
        {cartItems.length > 0 && (
          <div className="flex justify-end mt-8">
            <button onClick={onCheckout} className="px-8 py-3 bg-yellow-600 text-white rounded-lg">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
