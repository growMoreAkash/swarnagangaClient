import Logo from "../assets/Logo.png";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import axios from "axios";
import env from "../config";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL ?? "https://swarnaganga-back.vercel.app/api",
});
const getTokenCookie = () => Cookies.get("token");

const mainNavItems = [
  {
    label: "New Arrival",
    path: "/new-arrival",
    dropdown: [
      { label: "Best Seller", path: "/new-arrival/best-seller" },
      { label: "Back in Store", path: "/new-arrival/back-in-store" },
    ],
  },
  {
    label: "All Jewellery",
    path: "/all-jewellery",
    dropdown: [
      { label: "Ear Ring", path: "/all-jewellery/ear-ring" },
      { label: "Rings", path: "/all-jewellery/rings" },
      { label: "Bangles", path: "/all-jewellery/bangles" },
      { label: "Necklace", path: "/all-jewellery/necklace" },
    ],
  },
  {
    label: "Shop by Style",
    path: "/shop-by-style",
    dropdown: [
      { label: "Partywear", path: "/shop-by-style/partywear" },
      { label: "Dailywear", path: "/shop-by-style/dailywear" },
    ],
  },
  {
    label: "Gifting",
    path: "/gifting",
    dropdown: [
      { label: "Corporate Gifting", path: "/gifting/corporate" },
      { label: "By Occasion", path: "/gifting/occasion" },
    ],
  },
  {
    label: "Wedding",
    path: "/wedding",
    dropdown: [
      { label: "Wedding Ear Ring", path: "/wedding/wedding-ear-ring" },
      { label: "Wedding Rings", path: "/wedding/wedding-rings" },
      { label: "Wedding Bangles", path: "/wedding/wedding-bangles" },
      { label: "Wedding Necklace", path: "/wedding/wedding-necklace" },
      { label: "Wedding Mangal Sutra", path: "/wedding/wedding-mangalsutra" },
    ],
  },
  { label: "Media", path: "/media" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const isDropdownParentActive = (pathname, dropdown) =>
  dropdown ? dropdown.some((d) => pathname.startsWith(d.path)) : false;

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [openDD, setOpenDD] = useState(null);
  const toggleDrawer = () => { setOpen((o) => !o); if (open) setOpenDD(null); };
  const toggleDropdown = (lbl) => setOpenDD((prev) => (prev === lbl ? null : lbl));

  return (
    <div className="xxmd:hidden ml-auto sm:mr-10">

      <GiHamburgerMenu className="text-3xl text-yellow-600 cursor-pointer mt-5"
        onClick={toggleDrawer} />
        
      <div id="navMobile"
        className={`absolute top-0 right-0 h-screen sm:w-3/4 w-full z-50 transform
                 ${open ? "translate-x-0" : "translate-x-full"}
                 transition-transform duration-300 flex flex-col backdrop-filter backdrop-blur-lg overflow-y-auto`}>
        <RiCloseLargeLine className="text-black text-3xl absolute top-0 right-0 mt-12 mr-10 cursor-pointer"
          onClick={toggleDrawer} />

        <div className="mt-28 pl-10 flex flex-col gap-10 uppercase mr-5">
          {mainNavItems.map((link) => (
            <div key={link.label}>
              {link.dropdown ? (
                <button
                  onClick={() => toggleDropdown(link.label)}
                  className="flex items-center justify-between w-full text-white text-lg py-5 pl-2 font-semibold bg-gray-800 hover:bg-black relative overflow-hidden px-5 transition-all">
                  {link.label}
                  <IoIosArrowDropdownCircle className={`ml-2 h-7 transition-transform ${openDD === link.label ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link to={link.path} onClick={toggleDrawer}>
                  <h1 className="text-white text-lg py-5 pl-2 font-semibold bg-gray-800 hover:bg-black relative overflow-hidden px-5 transition-all">
                    {link.label}
                  </h1>
                </Link>
              )}

              {link.dropdown && openDD === link.label && (
                <ul className="pl-8 pt-4 pb-2 space-y-4 bg-gray-900 text-white">
                  {link.dropdown.map((d) => (
                    <li key={d.label}>
                      <Link to={d.path} onClick={toggleDrawer}
                        className="block text-lg hover:text-yellow-600">
                        {d.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

/* ========================================================================== */
const Navbar = () => {
  /* -------------------- state ------------------------------------------ */
  const [goldPrice, setGoldPrice] = useState(null);
  const [userName, setUserName] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [activeDD, setActiveDD] = useState(null);
  const dropRef = useRef(null);
  const location = useLocation();

  const leftLinks = mainNavItems.slice(0, 3);
  const rightLinks = mainNavItems.slice(3);

  /* -------------------- gold price ------------------------------------ */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${env.host}/getGold`);
        setGoldPrice(data?.price ?? null);
      }
      catch (err) { console.error(err); }
    })();
  }, []);

  /* -------------------- user info (auto-refresh) ----------------------- */
  const refreshUser = async () => {
    const token = getTokenCookie();
    if (!token) { setUserName(null); return; }

    try {
      await api.post("/loginUser", { token });          // confirm token
      const { data } = await api.get("/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserName(data?.fullname ?? null);
    } catch {
      Cookies.remove("token"); Cookies.remove("userId");
      setUserName(null);
    }
  };
  useEffect(() => { refreshUser(); }, []);
  useEffect(() => {
    window.addEventListener("authchange", refreshUser);
    return () => window.removeEventListener("authchange", refreshUser);
  }, []);

  /* -------------------- logout ---------------------------------------- */
  const handleLogout = () => {
    Cookies.remove("token"); Cookies.remove("userId");
    setUserName(null);
    window.dispatchEvent(new Event("authchange"));
  };

  /* -------------------- outside click for dropdown -------------------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setActiveDD(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ==================================================================== */
  return (
    <nav className="w-full fixed smx:h-[160px] h-[200px] bg-white z-20 py-2">
      {/* top bar (price + user + cart) */}
      <div className="flex flex-col smx:flex-row gap-5 justify-end items-center pr-5">

        <div className="flex">
          <div className="bg-gray-500 text-white py-2 px-5 font-semibold rounded-l-2xl sm:text-xl">Gold Price</div>
          <div className="bg-[#bfae7a] text-white py-2 px-5 font-semibold rounded-r-2xl sm:text-xl">
            {goldPrice ?? "…"}
          </div>
        </div>

        <div className="flex">

          {userName ? (
            <div className="relative"
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}>
              <span className="text-black flex items-center sm:text-xl cursor-pointer hover:text-[#bfae7a]">
                <FaRegUserCircle className="mr-2 text-[#bfae7a]" /> {userName}
              </span>
              {showLogout && (
                <button onClick={handleLogout}
                  className="absolute top-full left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-md shadow">
                  Logout
                </button>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-black flex items-center sm:text-xl hover:text-[#bfae7a]">
              <FaRegUserCircle className="mr-2 text-[#bfae7a] " />
              Login
            </Link>
          )}

          {/* cart */}
          <Link to="/cart" className="text-black flex items-center sm:text-xl hover:text-[#bfae7a]">
            <CiShoppingCart className="mr-2 text-3xl text-[#bfae7a]" /> Cart
          </Link>
        </div>

      </div>

      {/* main nav row */}
      <div className="max-w-screen-xxmd mx-auto flex items-center justify-between py-4 px-2 w-full">

        {/* ----- left links ----- */}
        <ul className="xxmd:flex hidden items-center space-x-3 text-black text-xl">
          {leftLinks.map((item, idx) => (
            <React.Fragment key={item.label}>
              <li className="relative"
                onMouseEnter={() => setActiveDD(item.label)}
                onMouseLeave={() => setActiveDD(null)}
                ref={activeDD === item.label ? dropRef : null}>
                {item.dropdown ? (
                  <button className={`flex items-center p-2 rounded-md transition-colors
                                     ${activeDD === item.label || isDropdownParentActive(location.pathname, item.dropdown)
                      ? "text-white bg-[#754a2d]" : "hover:text-white hover:bg-[#754a2d]"}`}>
                    {item.label}
                    <IoIosArrowDropdownCircle className={`ml-1 h-5 transition-transform
                                                          ${activeDD === item.label ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link to={item.path}
                    className={`p-2 rounded-md transition-colors
                                    ${location.pathname.startsWith(item.path)
                        ? "text-white bg-[#754a2d]" : "hover:text-white hover:bg-[#754a2d]"}`}>
                    {item.label}
                  </Link>
                )}

                {/* dropdown */}
                {item.dropdown && activeDD === item.label && (
                  <div className="absolute left-0 top-full bg-white shadow-lg rounded-md w-48 z-50">
                    <ul className="py-2">
                      {item.dropdown.map((d) => (
                        <li key={d.label}>
                          <Link to={d.path}
                            className="block px-4 py-2 hover:bg-gray-100 hover:text-[#754a2d]"
                            onClick={() => setActiveDD(null)}>
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              {idx < leftLinks.length - 1 && <li>|</li>}
            </React.Fragment>
          ))}
        </ul>

        {/* ----- logo ----- */}
        <Link to="/">
          <img src={Logo} alt="Swarna Ganga" className="h-20" />
        </Link>

        {/* ----- right links ----- */}
        <ul className="xxmd:flex hidden items-center space-x-3 text-black text-xl">
          {rightLinks.map((item, idx) => (
            <React.Fragment key={item.label}>
              <li className="relative"
                onMouseEnter={() => setActiveDD(item.label)}
                onMouseLeave={() => setActiveDD(null)}
                ref={activeDD === item.label ? dropRef : null}>
                {item.dropdown ? (
                  <button className={`flex items-center p-2 rounded-md transition-colors
                                     ${activeDD === item.label || isDropdownParentActive(location.pathname, item.dropdown)
                      ? "text-white bg-[#754a2d]" : "hover:text-white hover:bg-[#754a2d]"}`}>
                    {item.label}
                    <IoIosArrowDropdownCircle className={`ml-1 h-5 transition-transform
                                                          ${activeDD === item.label ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link to={item.path}
                    className={`p-2 rounded-md transition-colors
                                    ${location.pathname.startsWith(item.path)
                        ? "text-white bg-[#754a2d]" : "hover:text-white hover:bg-[#754a2d]"}`}>
                    {item.label}
                  </Link>
                )}

                {item.dropdown && activeDD === item.label && (
                  <div className="absolute left-0 top-full bg-white shadow-lg rounded-md w-48 z-50">
                    <ul className="py-2">
                      {item.dropdown.map((d) => (
                        <li key={d.label}>
                          <Link to={d.path}
                            className="block px-4 py-2 hover:bg-gray-100 hover:text-[#754a2d]"
                            onClick={() => setActiveDD(null)}>
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              {idx < rightLinks.length - 1 && <li>|</li>}
            </React.Fragment>
          ))}
        </ul>

        {/* ----- hamburger on small screens ----- */}
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
