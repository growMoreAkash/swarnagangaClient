import axios from 'axios';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import env from "../../config.js"
import { UserIcon, BoxIcon, CategoryIcon, CaretDownIcon, CaretUpIcon, DollarSignIcon, HamburgerMenuIcon, CloseIcon, PlusCircleIcon, PencilAltIcon, TrashIcon, } from "../Dashboard/Icons.jsx"

const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const ITEMS_PER_PAGE = 10;

export const CreateProduct = () => {
  /* form state */
  const [name, setName] = useState("");
  const [catId, setCatId] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  /* category cache */
  const [categories, setCategories] = useState([]);

  /* load categories once */
  useEffect(() => {
    (async () => {
      const data = await fetcher(`${env.host}/getCategories`);
      setCategories(data?.categories || []);
    })();
  }, []);

  /* photo handler */
  const onPhoto = (e) => {
    const f = e.target.files[0];
    if (!f) { setFile(null); setPreview(""); return; }
    setFile(f);
    const r = new FileReader();
    r.onloadend = () => setPreview(r.result);
    r.readAsDataURL(f);
  };

  /* reset */
  const reset = () => {
    setName(""); setCatId(""); setDesc(""); setFile(null); setPreview("");
  };

  /* submit */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !catId || !desc || !file) {
      return alert("Please fill all fields and upload a photo.");
    }

    try {
      const form = new FormData();
      form.append("name", name);
      form.append("category", catId);
      form.append("description", desc);
      form.append("productImage", file);           // field name for Multer

      await axios.post(`${env.host}/createProduct`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product created successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Server error. Could not create product."
      );
    }
  };

  /* render */
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Create New Product</h2>

      <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">

        {/* name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        {/* category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Category
          </label>
          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:ring-yellow-500 focus:border-yellow-500"
            value={catId}
            onChange={(e) => setCatId(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </div>

        {/* photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Product Photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-yellow-50 file:text-yellow-700
              hover:file:bg-yellow-100"
            onChange={onPhoto}
            required
          />
          {preview && (
            <div className="mt-4 text-center">
              <img src={preview} alt="Preview" className="mx-auto w-32 h-32 object-cover rounded-md shadow" />
              <p className="text-sm text-gray-500 mt-1">{file?.name}</p>
            </div>
          )}
        </div>

        {/* submit */}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export const UpdateProduct = () => {
  /* ------------ state ------------ */
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotal] = useState(1);

  const [editingId, setEditing] = useState(null);
  const [name, setName] = useState("");
  const [catId, setCatId] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  /* ------------ load helpers ------------ */
  const loadProducts = useCallback(async (p = 1) => {
    const data = await fetcher(
      `${env.host}/getProducts?page=${p}&limit=${ITEMS_PER_PAGE}`
    );
    if (!data) return setMessage("Failed to load products.");
    setProducts(data.products);
    setTotal(data.totalPages);
    setPage(p);
  }, []);

  const loadCategories = useCallback(async () => {
    const data = await fetcher(`${env.host}/getCategories`);
    if (!data) return setMessage("Failed to load categories.");
    setCategories(data.categories);
  }, []);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [loadProducts, loadCategories]);

  /* ------------ edit handlers ------------ */
  const startEdit = (p) => {
    setEditing(p._id);
    setName(p.name);
    setCatId(p.category._id);
    setDesc(p.description || "");
    setFile(null);
    setPreview(p.photo);
    setMessage("");
  };

  const onPhoto = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const cancelEdit = () => {
    setEditing(null);
    setFile(null);
    setPreview("");
  };

  /* ------------ save to backend ------------ */
  const saveEdit = async () => {
    if (!name || !catId) return alert("Name & category required.");

    try {
      const form = new FormData();
      form.append("name", name);
      form.append("category", catId);
      form.append("description", desc);
      if (file) form.append("productImage", file); // field name in Multer

      await axios.put(
        `${env.host}/updateProduct/${editingId}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      await loadProducts(page);           // refresh list
      cancelEdit();
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Server error. Could not update product."
      );
    }
  };

  /* ------------ search filter ------------ */
  const displayed = products.filter((p) => {
    if (!search) return true;
    const t = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(t) ||
      (p.category?.name ?? "").toLowerCase().includes(t) ||
      p.description?.toLowerCase().includes(t) ||
      p._id.toLowerCase().includes(t)
    );
  });

  /* ------------ render ------------ */
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Update Existing Product</h2>

      {message && <div className="mb-4 p-3 bg-gray-100">{message}</div>}

      <input
        className="w-full mb-6 px-4 py-2 border rounded-md"
        placeholder="Search by name, category, description, or ID…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Photo", "Name", "Category", "Description", "Actions"].map((h) => (
                <th key={h} className="px-6 py-3 ...">{h}</th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {displayed.length ? (
              displayed.map((p, i) => (
                <tr key={p._id} className={i % 2 ? "bg-gray-50" : ""}>
                  {/* photo */}
                  <td className="px-6 py-4">
                    <img
                      src={editingId === p._id ? preview : p.photo}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>

                  {/* name */}
                  <td className="px-6 py-4">
                    {editingId === p._id ? (
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded-md px-2 py-1 w-full"
                      />
                    ) : (
                      p?.name || "—"
                    )}
                  </td>

                  {/* category */}
                  <td className="px-6 py-4">
                    {editingId === p._id ? (
                      <select
                        value={catId}
                        onChange={(e) => setCatId(e.target.value)}
                        className="border rounded-md px-2 py-1 w-full bg-white"
                      >
                        {categories.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      p.category.name
                    )}
                  </td>

                  {/* description */}
                  <td className="px-6 py-4">
                    {editingId === p._id ? (
                      <textarea
                        rows={2}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="border rounded-md px-2 py-1 w-full resize-none"
                      />
                    ) : (
                      <span className="block max-w-xs truncate">{p.description}</span>
                    )}
                  </td>

                  {/* actions */}
                  <td className="px-6 py-4 text-right space-x-2">
                    {editingId === p._id ? (
                      <>
                        <input type="file" accept="image/*" onChange={onPhoto} />
                        <button className="text-green-600" onClick={saveEdit}>
                          Save
                        </button>
                        <button className="text-gray-600" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button onClick={() => startEdit(p)}>
                        <PencilAltIcon className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center space-x-2 mt-6">
          <button onClick={() => loadProducts(page - 1)} disabled={page === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => loadProducts(n)}
              className={n === page ? "font-bold" : ""}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => loadProducts(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
};

export const DeleteProduct = () => {
  /* ---------------- state ---------------- */
  const [products, setProducts] = useState([]);
  const [productDel, setProductDel] = useState(null);   // to confirm
  const [message, setMessage] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotal] = useState(1);

  const [search, setSearch] = useState("");

  /* ---------------- load products ---------------- */
  const loadProducts = useCallback(async (p = 1) => {
    const data = await fetcher(
      `${env.host}/getProducts?page=${p}&limit=${ITEMS_PER_PAGE}`
    );
    if (!data) return setMessage("Failed to load products.");
    setProducts(data.products);
    setTotal(data.totalPages);
    setPage(p);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* ---------------- confirmation flow ---------------- */
  const handleDeleteClick = (p) => {
    setProductDel(p);
    setMessage("");
  };

  const confirmDelete = async () => {
    if (!productDel) return;
    try {
      await axios.delete(`${env.host}/deleteProduct/${productDel._id}`);
      await loadProducts(page);              // refresh page list
      setProductDel(null);
      setMessage(`Product "${productDel.name}" deleted.`);
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
        "Server error. Could not delete product."
      );
    }
  };

  const cancelDelete = () => {
    setProductDel(null);
    setMessage("");
  };

  /* ---------------- search & pagination ---------------- */
  const filtered = useMemo(() => {
    if (!search) return products;
    const t = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(t) ||
        p.category.name.toLowerCase().includes(t) ||
        p.description?.toLowerCase().includes(t) ||
        p._id.toLowerCase().includes(t)
    );
  }, [products, search]);

  const current = useMemo(() => {
    const s = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(s, s + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handlePage = (n) => {
    if (n >= 1 && n <= totalPages) loadProducts(n);
  };

  /* ---------------- render ---------------- */
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Delete Product</h2>

      {message && (
        <div className="mb-4 p-3 bg-gray-100 text-sm text-gray-700 rounded-md">
          {message}
        </div>
      )}

      {/* confirmation modal */}
      {productDel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm text-center">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete "{productDel.name}"?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* search bar */}
      <input
        className="w-full mb-6 px-4 py-2 border rounded-md"
        placeholder="Search by name, category, description, or ID…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {["Photo", "Name", "Category", "Actions"].map((h) => (
              <th
                key={h}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {h}
              </th>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {current.length ? (
              current.map((p, i) => (
                <tr key={p._id} className={i % 2 ? "bg-gray-50" : ""}>
                  <td className="px-6 py-4">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4">{p.name}</td>
                  <td className="px-6 py-4">{p.category.name}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDeleteClick(p)}>
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center space-x-2 mt-6">
          <button onClick={() => handlePage(page - 1)} disabled={page === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => handlePage(n)}
              className={n === page ? "font-bold" : ""}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handlePage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
};