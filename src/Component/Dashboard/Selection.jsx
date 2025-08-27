import axios from 'axios';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import env from "../../config.js"

// Selection Components
const fetcher = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const AddNewSelection = () => {
  const [type, setType] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState([]); // Array of product _ids
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // Products filtered by selected category
  const [message, setMessage] = useState('');

  // Define valid selection types
  const selectionTypes = [
    "bestSeller", "backInStore", "partyWear", "dailyWear",
    "corporateGifting", "giftingByOccasion",
    "earRing", "rings", "bangles", "necklace",
    "weddingEarRing", "weddingRings", "WeddingBangles", "WeddingNecklace", "WeddingMangalSutra"
  ];

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetcher(`${env.host}/getCategories`);
      if (data && data.categories) {
        setCategories(data.categories);
      } else {
        setMessage("Failed to load categories.");
      }
    };
    loadCategories();
  }, []);

  // Load products based on selected category
  useEffect(() => {
    const loadProductsByCategory = async () => {
      setProducts([]); // Clear products when category changes
      setSelectedProductIds([]); // Clear selected products
      if (selectedCategoryId) {
        const data = await fetcher(`${env.host}/getProducts?category=${selectedCategoryId}`);
        if (data && data.products) {
          setProducts(data.products);
        } else {
          setMessage("Failed to load products for selected category.");
        }
      }
    };
    loadProductsByCategory();
  }, [selectedCategoryId]);

  const handleProductSelection = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map(option => option.value);
    setSelectedProductIds(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    console.log("object")
    if (!type || !selectedCategoryId || selectedProductIds.length === 0) {
      setMessage('Please select a type, category, and at least one product.');
      return;
    }

    try {
      const res = await axios.post(`${env.host}/addSelection`, {
        type,
        catagoryId: selectedCategoryId, // Make sure backend expects 'catagoryId' or 'categoryId'
        productId: selectedProductIds,
      }, {
        // headers: getAuthHeaders(),
      });
      setMessage(res.data.message || 'Selection added successfully!');
      alert(res.data.message || 'Selection added successfully!')
      setType('');
      setSelectedCategoryId('');
      setSelectedProductIds([]);
      setProducts([]); // Clear products dropdown
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add selection.');
      console.error('Add Selection API error:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Add New Selection</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* Selection Type */}
        <div>
          <label htmlFor="selectionType" className="block text-sm font-medium text-gray-700 mb-1">Selection Type</label>
          <select
            id="selectionType"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">-- Select Type --</option>
            {selectionTypes.map((sType) => (
              <option key={sType} value={sType}>{sType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</option>
            ))}
          </select>
        </div>

        {/* Select Category */}
        <div>
          <label htmlFor="selectionCategory" className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
          <select
            id="selectionCategory"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-white"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Select Products (multi-select) */}
        <div>
          <label htmlFor="selectedProducts" className="block text-sm font-medium text-gray-700 mb-1">Select Products</label>
          <select
            id="selectedProducts"
            multiple // Enable multi-selection
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-white h-40 overflow-y-auto" // Added height and overflow
            value={selectedProductIds}
            onChange={handleProductSelection}
            required
            disabled={!products.length} // Disable if no products loaded for category
          >
            {products.length > 0 ? (
              products.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))
            ) : (
              <option value="" disabled>No products available for this category</option>
            )}
          </select>
          <p className="mt-1 text-xs text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple products.</p>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
        >
          Add Selection
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
};

// Placeholder components for Update and Delete Selection
export const UpdateSelection = () => {
  const [type, setType] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]); // Products NOT in current selection
  const [selectedProductIdsToAdd, setSelectedProductIdsToAdd] = useState([]); // Products to add to selection
  const [message, setMessage] = useState('');

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetcher(`${env.host}/getCategories`);
      if (data && data.categories) {
        setCategories(data.categories);
      } else {
        setMessage("Failed to load categories.");
      }
    };
    loadCategories();
  }, []);

  // Load products and current selection for selected type/category
  useEffect(() => {
    const loadProductsAndSelection = async () => {
      setAvailableProducts([]);
      setSelectedProductIdsToAdd([]);
      if (type && selectedCategoryId) {
        // Fetch all products for the selected category
        const allProductsData = await fetcher(`${env.host}/getProducts?category=${selectedCategoryId}`);
        const allProducts = allProductsData?.products || [];

        // Fetch current selection for this type and category
        // Note: getSelectionByTypeCatagory is POST as per your router
        const currentSelectionData = await axios.post(`${env.host}/getSelectionByTypeCatagory`, {
          type,
          catagoryId: selectedCategoryId
        }, {});

        const currentSelectionProducts = currentSelectionData?.data?.products || [];
        const currentSelectionProductIds = new Set(currentSelectionProducts.map(p => p._id));

        // Filter products that are NOT already in the selection
        const productsNotYetInSelection = allProducts.filter(p => !currentSelectionProductIds.has(p._id));
        setAvailableProducts(productsNotYetInSelection);

        if (!productsNotYetInSelection.length && allProducts.length) {
          setMessage('All products in this category are already in this selection type.');
        } else if (!allProducts.length) {
          setMessage('No products available for this category.');
        } else {
          setMessage('');
        }
      }
    };
    loadProductsAndSelection();
  }, [type, selectedCategoryId]);

  const handleProductSelection = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map(option => option.value);
    setSelectedProductIdsToAdd(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!type || !selectedCategoryId || selectedProductIdsToAdd.length === 0) {
      setMessage('Please select a type, category, and at least one product to add.');
      return;
    }

    try {
      // Use the addNewSelection endpoint (PUT method)
      const res = await axios.put(`${env.host}/addNewSelection`, {
        type,
        catagoryId: selectedCategoryId,
        productId: selectedProductIdsToAdd,
      }, {

      });
      setMessage(res.data.message || 'Products added to selection successfully!');
      // Re-fetch data to update the list of available products
      // (This will trigger the useEffect for type/category change)
      setType('');
      setSelectedCategoryId('');
      setSelectedProductIdsToAdd([]);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update selection.');
      console.error('Update Selection API error:', error);
    }
  };

  const selectionTypes = [
    "bestSeller", "backInStore", "partyWear", "dailyWear",
    "corporateGifting", "giftingByOccasion",
    "earRing", "rings", "bangles", "necklace",
    "weddingEarRing", "weddingRings", "WeddingBangles", "WeddingNecklace", "WeddingMangalSutra"
];
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Update Selection (Add Products)</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* Selection Type */}
        <div>
          <label htmlFor="updateSelectionType" className="block text-sm font-medium text-gray-700 mb-1">Selection Type</label>
          <select
            id="updateSelectionType"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">-- Select Type --</option>
            {selectionTypes.map((sType) => (
              <option key={sType} value={sType}>{sType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</option>
            ))}
          </select>
        </div>

        {/* Select Category */}
        <div>
          <label htmlFor="updateSelectionCategory" className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
          <select
            id="updateSelectionCategory"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-white"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Select Products to Add (Multi-select) */}
        <div>
          <label htmlFor="productsToAdd" className="block text-sm font-medium text-gray-700 mb-1">Products Not Yet In Selection</label>
          <select
            id="productsToAdd"
            multiple
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-white h-40 overflow-y-auto"
            value={selectedProductIdsToAdd}
            onChange={handleProductSelection}
            disabled={!availableProducts.length}
            required
          >
            {availableProducts.length > 0 ? (
              availableProducts.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))
            ) : (
              <option value="" disabled>
                {type && selectedCategoryId ? 'No products available to add for this selection/category.' : 'Select a type and category first.'}
              </option>
            )}
          </select>
          <p className="mt-1 text-xs text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple products.</p>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out"
        >
          Add Selected Products to Selection
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export const DeleteSelection = () => {
  const [type, setType] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentSelectionProducts, setCurrentSelectionProducts] = useState([]); // Products currently in selection
  const [selectedProductIdsToDelete, setSelectedProductIdsToDelete] = useState([]); // Products to delete from selection
  const [message, setMessage] = useState('');

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetcher(`${env.host}/getCategories`);
      if (data && data.categories) {
        setCategories(data.categories);
      } else {
        setMessage("Failed to load categories.");
      }
    };
    loadCategories();
  }, []);

  // Load products currently in the selection for selected type/category
  useEffect(() => {
    const loadCurrentSelectionProducts = async () => {
      setCurrentSelectionProducts([]);
      setSelectedProductIdsToDelete([]);
      if (type && selectedCategoryId) {
        // Fetch current selection for this type and category
        const currentSelectionData = await axios.post(`${env.host}/getSelectionByTypeCatagory`, {
          type,
          catagoryId: selectedCategoryId
        }, {});

        const productsInSelection = currentSelectionData?.data?.products || [];
        setCurrentSelectionProducts(productsInSelection);

        if (!productsInSelection.length) {
          setMessage('No products found in this selection type for the selected category.');
        } else {
          setMessage('');
        }
      }
    };
    loadCurrentSelectionProducts();
  }, [type, selectedCategoryId]);

  const handleProductSelection = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map(option => option.value);
    setSelectedProductIdsToDelete(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!type || !selectedCategoryId || selectedProductIdsToDelete.length === 0) {
      setMessage('Please select a type, category, and at least one product to delete.');
      return;
    }

    try {
      const res = await axios.delete(`${env.host}/deleteSelection`, {
        // headers: getAuthHeaders(),
        data: { // DELETE request body must be sent via 'data' property in axios
          type,
          productId: selectedProductIdsToDelete,
        }
      });
      setMessage(res.data.message || 'Products removed from selection successfully!');
      // Re-fetch data to update the list of current selection products
      // (This will trigger the useEffect for type/category change)
      setType('');
      setSelectedCategoryId('');
      setSelectedProductIdsToDelete([]);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete from selection.');
      console.error('Delete Selection API error:', error);
    }
  };

  const selectionTypes = [
    "bestSeller", "backInStore", "partyWear", "dailyWear",
    "corporateGifting", "giftingByOccasion",
    "earRing", "rings", "bangles", "necklace",
    "weddingEarRing", "weddingRings", "WeddingBangles", "WeddingNecklace", "WeddingMangalSutra"
];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Delete Selection</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* Selection Type */}
        <div>
          <label htmlFor="deleteSelectionType" className="block text-sm font-medium text-gray-700 mb-1">Selection Type</label>
          <select
            id="deleteSelectionType"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-white"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">-- Select Type --</option>
            {selectionTypes.map((sType) => (
              <option key={sType} value={sType}>{sType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</option>
            ))}
          </select>
        </div>

        {/* Select Category */}
        <div>
          <label htmlFor="deleteSelectionCategory" className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
          <select
            id="deleteSelectionCategory"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-white"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Products currently in this selection */}
        <div>
          <label htmlFor="productsToDelete" className="block text-sm font-medium text-gray-700 mb-1">Products In This Selection</label>
          <select
            id="productsToDelete"
            multiple
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm bg-white h-40 overflow-y-auto"
            value={selectedProductIdsToDelete}
            onChange={handleProductSelection}
            disabled={!currentSelectionProducts.length}
            required
          >
            {currentSelectionProducts.length > 0 ? (
              currentSelectionProducts.map((product) => (
                <option key={product._id} value={product._id}>{product.name}</option>
              ))
            ) : (
              <option value="" disabled>
                {type && selectedCategoryId ? 'No products in this selection for the selected category.' : 'Select a type and category first.'}
              </option>
            )}
          </select>
          <p className="mt-1 text-xs text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple products to delete.</p>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
        >
          Remove Selected Products
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
};
