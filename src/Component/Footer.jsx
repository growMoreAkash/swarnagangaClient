import React from 'react';
import { Link } from 'react-router-dom'; // Using Link for internal navigation
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import logo from "../assets/FooterLogo.png"; // Adjust path as needed

// Define all main navigation items and their dropdown sub-items
// This array should ideally be a shared constant or come from a global config/context
// to ensure Navbar and Footer use the same source of truth.
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
      { label: "For Him", path: "/all-jewellery/for-him" },
      { label: "For Her", path: "/all-jewellery/for-her" },
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
      { label: "Ear Ring", path: "/wedding/ear-ring" },
      { label: "Rings", path: "/wedding/rings" },
      { label: "Bangles", path: "/wedding/bangles" },
      { label: "Necklace", path: "/wedding/necklace" },
    ],
  },
  { label: "Media", path: "/media" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];


function Footer() {
  // Derive quickLinks from mainNavItems, excluding dropdowns for simplicity in footer
  // You can customize which items appear here.
  const quickLinks = mainNavItems.filter(item => !item.dropdown).map(item => ({
    label: item.label,
    path: item.path
  }));

  // Useful links are explicitly defined if they don't map directly to mainNavItems
  const usefulLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Media', path: '/media' },
    { label: 'Contact us', path: '/contact' },
    // You might also map some dropdown items directly if desired
    { label: 'Best Seller', path: '/new-arrival/best-seller' }, // Example of pulling a sub-item
  ];

  // Handler to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll animation
    });
  };

  return (
    <footer className="bg-[#562f07] text-white font-gotham px-5">
      {/* Top bar: logo + socials */}
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between py-6 px-4 lg:px-0">
        {/* Logo with yellow frame */}
        <div className="relative mb-4 sm:mb-0">
          <img src={logo} alt="Swarnaganga logo" className="h-24 lg:h-32 object-contain" /> {/* Adjusted height for better visibility */}
          <span className="absolute inset-0 pointer-events-none" />
        </div>
        {/* Social icons */}
        <div className="flex space-x-6 text-white text-3xl"> {/* Increased icon size for better visibility */}
          <a href="https://www.facebook.com/swarnagangajewellers/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-400 transition-colors'>
            <FaFacebookF />
          </a>
          {/* <a href="https://twitter.com/yourpage" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-400 transition-colors'>
            <FaTwitter />
          </a> */}
          <a href="https://www.instagram.com/swarna_ganga" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-400 transition-colors'>
            <FaInstagram />
          </a>
          <a href="https://youtube.com/yourpage" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className='hover:text-yellow-400 transition-colors'>
            <FaYoutube />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-700 mx-4 lg:mx-0" /> {/* Adjusted border color for subtlety */}

      {/* Main content: 4 columns */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 px-4 lg:px-0">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">About Swarnaganga</h3>
          <p className="text-base leading-relaxed text-gray-300">
            At Swarnaganga, we believe every piece of jewellery tells a unique story.
            Crafted with passion and precision, our exquisite collections reflect timeless elegance
            and contemporary design. We are dedicated to providing unparalleled quality and beauty,
            making every moment shine with our precious adornments.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Quick links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  onClick={scrollToTop}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Useful links</h3>
          <ul className="space-y-2">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  onClick={scrollToTop}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact us */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <address className="not-italic space-y-2 text-base leading-relaxed text-gray-300">
            <div>
              NERUL SHOWROOM : Plot No. 5, Shop No. 7, 8 and 9, Goodwill Arcade, Sector 10, Nerul, Navi Mumbai, Maharashtra 400706. CALL :  9892566546</div>
            <div>
              KHARGHAR SHOWROOM : Mauli Darshan, Gharkul Road, Gharkul, Near D Mart, Sector 15, Kharghar, Navi Mumbai, Maharashtra 410210. CALL : 9326377300</div>
           <div>
              Email:{' '}
              <a
                href="mailto:info@swarnagangajewellers.com"
                className="hover:text-yellow-400"
              >
                info@swarnagangajewellers.com
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-gray-700 mx-4 lg:mx-0" />

      <div className="container mx-auto text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Swarnaganga. All rights reserved.
      </div>

      <div className="border-t border-gray-800 mx-4 lg:mx-0" /> {/* Slightly darker border for separation */}
      <div className="container mx-auto text-center py-4 text-sm text-gray-400">
        Designed and Developed by <Link to="https://www.akasuya.com">Akasuya</Link> & <Link to="https://www.rightclickadvd.com">RightClick</Link>
      </div>
    </footer>
  );
}

export default Footer;
