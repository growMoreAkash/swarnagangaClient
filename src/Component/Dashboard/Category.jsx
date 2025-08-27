import axios from 'axios';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import env from "../../config.js"
import {UserIcon,BoxIcon,CategoryIcon,CaretDownIcon,CaretUpIcon,DollarSignIcon,HamburgerMenuIcon,CloseIcon,PlusCircleIcon,PencilAltIcon,TrashIcon,} from "../Dashboard/Icons.jsx"



const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/* ================================================================== */
/* 1. CREATE CATEGORY                                                  */
/* ================================================================== */
export const CreateCategory = () => {
  const [name, setName] = useState("");
  const [msg, setMsg]   = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Category name cannot be empty.");

    try {
      await axios.post(`${env.host}/createCategory`, { name });
      alert("Category created!");
      setName("");
    } catch (err) {
      alert(err.response?.data?.message || "Could not create category.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Create New Category</h2>
      <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Category Name</label>
          <input
            className="mt-1 block w-full border rounded-md px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Rings"
            required
          />
        </div>
        <button className="w-full py-2 rounded-md bg-yellow-600 text-white">
          Submit Category
        </button>
        {msg && <p className="text-center text-sm mt-2">{msg}</p>}
      </form>
    </div>
  );
};

/* ================================================================== */
/* 2. UPDATE CATEGORY                                                  */
/* ================================================================== */
export const UpdateCategory = () => {
  const [cats, setCats]           = useState([]);
  const [editId, setEditId]       = useState(null);
  const [editName, setEditName]   = useState("");
  const [msg, setMsg]             = useState("");

  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);
  const itemsPerPage              = 10;

  /* load list */
  const loadCats = useCallback(async () => {
    const data = await fetcher(`${env.host}/getCategories`);
    setCats(data?.categories || []);
  }, []);

  useEffect(() => { loadCats(); }, [loadCats]);

  /* save */
  const save = async (id) => {
    if (!editName.trim()) return setMsg("Category name cannot be empty.");
    try {
      await axios.put(`${env.host}/updateCategory/${id}`, { name: editName });
      await loadCats();
      setEditId(null);
      setMsg("Category updated!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed.");
    }
  };

  /* derived rows */
  const filtered = useMemo(() => {
    if (!search) return cats;
    const t = search.toLowerCase();
    return cats.filter((c) =>
      c.name.toLowerCase().includes(t) || c._id.toLowerCase().includes(t)
    );
  }, [search, cats]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const current = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Update Category</h2>
      {msg && <div className="mb-4 p-3 bg-gray-100">{msg}</div>}

      <input
        className="w-full mb-6 px-4 py-2 border rounded-md"
        placeholder="Search by name or ID…"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
      />

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {["ID", "Category", "Actions"].map((h) => (
              <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {h}
              </th>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {current.map((c, i) => (
              <tr key={c._id} className={i % 2 ? "bg-gray-50" : ""}>
                <td className="px-6 py-4">{c._id}</td>
                <td className="px-6 py-4">
                  {editId === c._id ? (
                    <input
                      className="border rounded-md px-2 py-1 w-full"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    c.name
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {editId === c._id ? (
                    <>
                      <button onClick={() => save(c._id)} className="text-green-600">Save</button>
                      <button onClick={() => setEditId(null)} className="text-gray-600">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => { setEditId(c._id); setEditName(c.name); setMsg(""); }}>
                      <PencilAltIcon className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {!current.length && (
              <tr><td colSpan="3" className="py-4 text-center">No categories.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav className="flex justify-center space-x-2 mt-6">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)} className={n === page ? "font-bold" : ""}>{n}</button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </nav>
      )}
    </div>
  );
};

/* ================================================================== */
/* 3. DELETE CATEGORY                                                  */
/* ================================================================== */
export const DeleteCategory = () => {
  const [cats, setCats]          = useState([]);
  const [delCat, setDelCat]      = useState(null);
  const [msg, setMsg]            = useState("");

  const [search, setSearch]      = useState("");
  const [page, setPage]          = useState(1);
  const itemsPerPage             = 10;

  const loadCats = useCallback(async () => {
    const data = await fetcher(`${env.host}/getCategories`);
    setCats(data?.categories || []);
  }, []);

  useEffect(() => { loadCats(); }, [loadCats]);

  const confirm = async () => {
    if (!delCat) return;
    try {
      await axios.delete(`${env.host}/deleteCategory/${delCat._id}`);
      await loadCats();
      setMsg("Category deleted.");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    }
    setDelCat(null);
  };

  /* search + pagination */
  const filtered = useMemo(() => {
    if (!search) return cats;
    const t = search.toLowerCase();
    return cats.filter(
      (c) => c.name.toLowerCase().includes(t) || c._id.toLowerCase().includes(t)
    );
  }, [cats, search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const current = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4">Delete Category</h2>
      {msg && <div className="mb-4 p-3 bg-gray-100">{msg}</div>}

      {/* confirm modal */}
      {delCat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow max-w-sm text-center">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Delete "{delCat.name}"?</p>
            <div className="flex justify-center space-x-4">
              <button onClick={confirm} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
              <button onClick={() => setDelCat(null)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* search */}
      <input
        className="w-full mb-6 px-4 py-2 border rounded-md"
        placeholder="Search…"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
      />

      {/* table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            {["ID", "Name", "Action"].map((h) => (
              <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{h}</th>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {current.map((c, i) => (
              <tr key={c._id} className={i % 2 ? "bg-gray-50" : ""}>
                <td className="px-6 py-4">{c._id}</td>
                <td className="px-6 py-4">{c.name}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setDelCat(c)}><TrashIcon className="w-5 h-5 text-red-600" /></button>
                </td>
              </tr>
            ))}
            {!current.length && <tr><td colSpan="3" className="py-4 text-center">No categories.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center space-x-2 mt-6">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)} className={n === page ? "font-bold" : ""}>{n}</button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </nav>
      )}
    </div>
  );
};