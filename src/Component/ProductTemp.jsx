// -----------------------------------------------------------------------------
//  ProductTemp.jsx – toast upgraded                                        
// -----------------------------------------------------------------------------
//  • Success toast is green, error toast is red.                           
//  • Toast auto‑dismisses after 3 s.                                       
// -----------------------------------------------------------------------------

import React, { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import env from "../config";
import TempBanner from "./TempBanner";
import { Link, useLocation } from "react-router-dom";

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "https://swarnaganga-back.vercel.app/api",
});
const getTokenCookie = () => Cookies.get("token");

/* Generic fetcher */
const fetcher = async (url, options = {}) => {
  try {
    const res = await api({ method: options.method || "GET", url, ...options });
    return res.data;
  } catch (err) {
    console.error("API error:", err.response?.data || err.message);
    return null;
  }
};

const ITEMS_PER_PAGE = 20;

const ProductTemp = ({ BannerImg, text1, text2, right, type }) => {
  /* ----------------------------- state ---------------------------------- */
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [catId, setCatId] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selProduct, setSelProduct] = useState(null);

  const [toast, setToast] = useState(null); // { text:"", ok:true/false }

  const location = useLocation(); // track route changes

  /* ----------------------------- helpers -------------------------------- */
  const showToast = (text, ok = true) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 3000);
  };

  /* ----------------------------- load categories ------------------------ */
  useEffect(() => {
    (async () => {
      const d = await fetcher(`${env.host}/getCategories`);
      if (d?.categories) setCats(d.categories);
    })();
  }, []);

  /* ----------------------------- load products -------------------------- */
  const loadProducts = useCallback(async () => {

    console.log(type)
    if (!type) return;
    const payload = { type, page, limit: ITEMS_PER_PAGE };
    if (catId) payload.catagoryId = catId;

    const d = await fetcher(`${env.host}/getSelectionByTypeCatagory`, {
      method: "POST",
      data: payload,
    });
    if (d?.products) {
      setProducts(d.products);
      setTotal(d.totalPages);
    } else {
      setProducts([]);
      setTotal(1);
    }
  }, [type, catId, page]);
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* ----------------------------- filtering ------------------------------ */
  const filtered = useMemo(() => {
    let list = [...products];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
      );
    }
    if (sort === "asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "desc") list.sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [products, search, sort]);

  /* ----------------------------- modal ---------------------------------- */
  const openModal = (p) => {
    setSelProduct(p);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelProduct(null);
    document.body.style.overflow = "auto";
  };

  // Reset scroll on route change
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [location]);

  /* ----------------------------- add to cart ---------------------------- */
  const addToCart = async (pid) => {
    const token = getTokenCookie();
    if (!token) return showToast("Please login first.", false);
    try {
      await api.post("/addToCart", { productId: pid }, { headers: { Authorization: `Bearer ${token}` } });
      showToast("Item added to cart.");
      closeModal();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data || "Failed to add to cart.", false);
    }
  };

  /* ----------------------------- pagination ----------------------------- */
  const changePage = (n) => {
    if (n >= 1 && n <= total) {
      setPage(n);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  useEffect(() => {
    setPage(1);
  }, [search, sort, catId]);

  /* ----------------------------- UI ------------------------------------ */
  return (
    <div className="bg-gray-50 min-h-screen">
      <TempBanner image={BannerImg} text1={text1} text2={text2} right={right} />

      <div className=" mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">

          <input
            className="border rounded-lg px-4 py-2 w-full sm:w-1/2 md:w-1/3"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select className="border rounded-lg px-4 py-2" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="none">Sort By Name</option>
              <option value="asc">Name (A‑Z)</option>
              <option value="desc">Name (Z‑A)</option>
            </select>


            {
              !["bestSeller", "backInStore", "necklace", "partyWear","dailyWear"].includes(type) ? <></> : <select className="border rounded-lg px-4 py-2" value={catId} onChange={(e) => setCatId(e.target.value)}>
                <option value="">Category: All</option>
                {cats.map((c) => (
                  <option key={c._id} value={c._id}>
                    Category: {c.name}
                  </option>
                ))}
              </select>
            }


          </div>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.length ? (
            filtered.map((p) => (
              <div key={p._id} className="bg-white rounded-lg shadow hover:shadow-xl transform hover:scale-105 transition">
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/150x150/E0E0E0/666?text=No+Img";
                  }}
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold truncate">{p.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{p.category?.name ?? "N/A"}</p>
                  <div className="flex gap-2">
                    <button onClick={() => openModal(p)} className="flex-1 bg-yellow-500 text-white py-2 rounded">View</button>
                    <button onClick={() => addToCart(p._id)} className="flex-1 bg-yellow-800 text-white py-2 rounded">Add</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-xl text-gray-600">No products found.</p>
          )}
        </div>

        {/* Pagination */}
        {total > 1 && (
          <nav className="flex justify-center gap-2 mt-8">
            <button onClick={() => changePage(page - 1)} disabled={page === 1} className="px-4 py-2 border rounded disabled:opacity-50">Prev</button>
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => changePage(n)} className={`px-4 py-2 border rounded ${n === page ? "bg-yellow-500 text-white" : ""}`}>{n}</button>
            ))}
            <button onClick={() => changePage(page + 1)} disabled={page === total} className="px-4 py-2 border rounded disabled:opacity-50">Next</button>
          </nav>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-4 py-2 rounded shadow-lg ${toast.ok ? "bg-green-600" : "bg-red-600"} text-white`}>
          {toast.text}
        </div>
      )}

      {/* Modal */}
      {modalOpen && selProduct && (
        <div className="fixed inset-0  bg-opacity-60 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="relative bg-white rounded-lg max-w-4xl w-full flex flex-col md:flex-row overflow-y-auto">
            <button
              onClick={closeModal}
              className="cursor-pointer absolute top-3 right-3 bg-gray-200 hover:bg-gray-800 hover:text-white p-2 px-[14px] rounded-full"
            >
              ✕
            </button>
            <div className="w-full md:w-1/2 p-4 bg-gray-100 flex items-center justify-center">
              <img src={selProduct.photo} alt={selProduct.name} className="max-h-full object-contain" />
            </div>
            <div className="w-full md:w-1/2 p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{selProduct.name}</h3>
              <p className="text-lg text-gray-600 mb-4">{selProduct.category?.name}</p>
              <p className="flex-grow text-gray-700">{selProduct.description}</p>
              <div className="flex justify-between rounded-md mt-4">
                <Link to="/contact">
                  <button className="bg-amber-600 px-5 py-3 hover:bg-amber-800 cursor-pointer rounded-md text-white">Visit our store</button>
                </Link>
                <button className="bg-amber-600 px-5 py-3 hover:bg-amber-800 cursor-pointer rounded-md text-white">Talk to us on what's app</button>
              </div>
              <button
                onClick={() => addToCart(selProduct._id)}
                className="cursor-pointer mt-6 bg-yellow-600 text-white py-3 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTemp;
