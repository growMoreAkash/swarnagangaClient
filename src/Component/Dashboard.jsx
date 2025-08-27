import axios from 'axios';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import env from "../config.js"

import { UserIcon, BoxIcon, CategoryIcon, CaretDownIcon, CaretUpIcon, DollarSignIcon, HamburgerMenuIcon, CloseIcon, PlusCircleIcon, PencilAltIcon, TrashIcon,SelectionIcon } from "./Dashboard/Icons.jsx"

import { CreateProduct, UpdateProduct, DeleteProduct } from './Dashboard/Product.jsx';

import { CreateCategory, UpdateCategory, DeleteCategory } from './Dashboard/Category.jsx';

import { AddNewSelection, UpdateSelection, DeleteSelection } from './Dashboard/Selection.jsx';

import { User } from './Dashboard/User.jsx';
import Gold from './Dashboard/Gold.jsx';


const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('User');
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSelectionDropdownOpen, setIsSelectionDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Function to render content based on activeMenuItem
  const renderContent = () => {
    switch (activeMenuItem) {
      case 'User':
        return (
          <User /> // Render the dedicated User component
        );
      case 'Create Product':
        return (
          <CreateProduct />
        );
      case 'Update Product':
        return (
          <UpdateProduct />
        );
      case 'Delete Product':
        return (
          <DeleteProduct />
        );
      case 'Create Category': // New Case for Create Category
        return (
          <CreateCategory />
        );
      case 'Update Category': // New Case for Update Category
        return (
          <UpdateCategory />
        );
      case 'Delete Category': // New Case for Delete Category
        return (
          <DeleteCategory />
        );
      case 'Add New Selection': // New Case for Add New Selection
        return <AddNewSelection />;
      case 'Update Selection': // New Case for Update Selection
        return <UpdateSelection />;
      case 'Delete Selection': // New Case for Delete Selection
        return <DeleteSelection />;
      case 'Update Gold Price':
        return (
          <Gold />
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to your Dashboard</h2>
            <p className="text-gray-600">Please select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 font-sans pt-44">
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden p-4 bg-gray-800 text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} aria-label="Toggle sidebar">
          <HamburgerMenuIcon />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-4 flex flex-col z-10
          md:relative md:translate-x-0 md:opacity-100
          transition-transform duration-300 ease-in-out transform
          ${isMobileSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
        `}
      >
        <div className="mb-8 flex items-center justify-between md:justify-center">
          <h1 className="text-3xl font-bold text-[#080046]">Admin Panel</h1>
          <button onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white text-2xl" aria-label="Close sidebar">
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {/* User Option */}
            <li>
              <button
                onClick={() => { setActiveMenuItem('User'); setIsMobileSidebarOpen(false); }}
                className={`flex items-center w-full p-3 rounded-md text-lg transition-colors duration-200
                  ${activeMenuItem === 'User' ? 'bg-yellow-700 text-white shadow-md' : 'hover:bg-gray-700 text-gray-300'}
                `}
              >
                <UserIcon /> User
              </button>
            </li>

            {/* Product Dropdown Parent */}
            <li>
              <button
                onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                className={`flex items-center justify-between w-full p-3 rounded-md text-lg transition-colors duration-200
                  ${isProductDropdownOpen || activeMenuItem.includes('Product') ? 'bg-yellow-700 text-white shadow-md' : 'hover:bg-gray-700 text-gray-300'}
                `}
                aria-expanded={isProductDropdownOpen}
              >
                <div className="flex items-center">
                  <BoxIcon /> Product
                </div>
                {isProductDropdownOpen ? <CaretUpIcon /> : <CaretDownIcon />}
              </button>
              {/* Product Sub-options (Dropdown) */}
              {isProductDropdownOpen && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <button
                      onClick={() => { setActiveMenuItem('Create Product'); setIsMobileSidebarOpen(false); }}
                      className={`block w-full text-left p-2 rounded-md text-base transition-colors duration-200
                        ${activeMenuItem === 'Create Product' ? 'bg-[#080046] text-white' : 'hover:bg-gray-700 text-gray-300'}
                      `}
                    >
                      Create Product
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActiveMenuItem('Update Product'); setIsMobileSidebarOpen(false); }}
                      className={`block w-full text-left p-2 rounded-md text-base transition-colors duration-200
                        ${activeMenuItem === 'Update Product' ? 'bg-[#080046] text-white' : 'hover:bg-gray-700 text-gray-300'}
                      `}
                    >
                      Update Product
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActiveMenuItem('Delete Product'); setIsMobileSidebarOpen(false); }}
                      className={`block w-full text-left p-2 rounded-md text-base transition-colors duration-200
                        ${activeMenuItem === 'Delete Product' ? 'bg-[#080046] text-white' : 'hover:bg-gray-700 text-gray-300'}
                      `}
                    >
                      Delete Product
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* New Category Dropdown Parent */}
            <li>
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className={`flex items-center justify-between w-full p-3 rounded-md text-lg transition-colors duration-200
                  ${isCategoryDropdownOpen || activeMenuItem.includes('Category') ? 'bg-yellow-700 text-white shadow-md' : 'hover:bg-gray-700 text-gray-300'}
                `}
                aria-expanded={isCategoryDropdownOpen}
              >
                <div className="flex items-center">
                  <CategoryIcon /> Category
                </div>
                {isCategoryDropdownOpen ? <CaretUpIcon /> : <CaretDownIcon />}
              </button>
              {/* Category Sub-options (Dropdown) */}
              {isCategoryDropdownOpen && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <button
                      onClick={() => { setActiveMenuItem('Create Category'); setIsMobileSidebarOpen(false); }}
                      className={`block w-full text-left p-2 rounded-md text-base transition-colors duration-200
                        ${activeMenuItem === 'Create Category' ? 'bg-[#080046] text-white' : 'hover:bg-gray-700 text-gray-300'}
                      `}
                    >
                      Create Category
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActiveMenuItem('Update Category'); setIsMobileSidebarOpen(false); }}
                      className={`block w-full text-left p-2 rounded-md text-base transition-colors duration-200
                        ${activeMenuItem === 'Update Category' ? 'bg-[#080046] text-white' : 'hover:bg-gray-700 text-gray-300'}
                      `}
                    >
                      Update Category
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActiveMenuItem('Delete Category'); setIsMobileSidebarOpen(false); }}
                      className={`block w-full text-left p-2 rounded-md text-base transition-colors duration-200
                        ${activeMenuItem === 'Delete Category' ? 'bg-[#080046] text-white' : 'hover:bg-gray-700 text-gray-300'}
                      `}
                    >
                      Delete Category
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* New Selection Dropdown Parent */}
            <li>
              <button
                onClick={() => setIsSelectionDropdownOpen(!isSelectionDropdownOpen)}
                className={`flex items-center justify-between w-full p-3 rounded-md text-lg transition-colors duration-200
                  ${isSelectionDropdownOpen || activeMenuItem.includes('Selection') ? 'bg-yellow-700 text-white shadow-md' : 'hover:bg-gray-700 text-gray-300'}
                `}
                aria-expanded={isSelectionDropdownOpen}
              >
                <div className="flex items-center">
                  <SelectionIcon /> Selection
                </div>
                {isSelectionDropdownOpen ? <CaretUpIcon /> : <CaretDownIcon />}
              </button>
              {/* Selection Sub-options (Dropdown) */}
              {isSelectionDropdownOpen && (
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <button
                      onClick={() => { setActiveMenuItem('Add New Selection'); setIsMobileSidebarOpen(false); }}
                      className={`block w-full text-left p-2 rounded-md text-base transition-colors duration-200
                        ${activeMenuItem === 'Add New Selection' ? 'bg-[#080046] text-white' : 'hover:bg-gray-700 text-gray-300'}
                      `}
                    >
                      Add New Selection
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActiveMenuItem('Update Selection'); setIsMobileSidebarOpen(false); }}
                      className={`block w-full text-left p-2 rounded-md text-base transition-colors duration-200
                        ${activeMenuItem === 'Update Selection' ? 'bg-[#080046] text-white' : 'hover:bg-gray-700 text-gray-300'}
                      `}
                    >
                      Update Selection
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setActiveMenuItem('Delete Selection'); setIsMobileSidebarOpen(false); }}
                      className={`block w-full text-left p-2 rounded-md text-base transition-colors duration-200
                        ${activeMenuItem === 'Delete Selection' ? 'bg-[#080046] text-white' : 'hover:bg-gray-700 text-gray-300'}
                      `}
                    >
                      Delete Selection
                    </button>
                  </li>
                </ul>
              )}
            </li>


            {/* Update Gold Price Option */}
            <li>
              <button
                onClick={() => { setActiveMenuItem('Update Gold Price'); setIsMobileSidebarOpen(false); }}
                className={`flex items-center w-full p-3 rounded-md text-lg transition-colors duration-200
                  ${activeMenuItem === 'Update Gold Price' ? 'bg-yellow-700 text-white shadow-md' : 'hover:bg-gray-700 text-gray-300'}
                `}
              >
                <DollarSignIcon /> Update Gold Price
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
