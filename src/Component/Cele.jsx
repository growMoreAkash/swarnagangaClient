import React from 'react';
import { Link } from 'react-router-dom';
import MODEL1_IMAGE from "../assets/Model 1.jpg"; // Assuming this path is correct
import MODEL2_IMAGE from "../assets/Model 2.jpg"; // Assuming this path is correct
import MODEL3_IMAGE from "../assets/Model 3.jpg"; // Assuming this path is correct

const Cele = () => {
    return (
        <div className="bg-gray-100 font-inter p-4 sm:p-6 md:p-8 flex items-center justify-center">
            <div className="max-w-7xl mx-auto w-full">
                {/* Main layout container: flex-col on small screens, flex-row on large screens for 3 columns */}
                <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch">

                    {/* Column 1: Model 1 (Left Most) */}
                    {/* Added 'group' to the parent div */}
                    <div className="relative flex-1 lg:w-1/3 shadow-lg overflow-hidden rounded-md group">
                        <img
                            src={MODEL1_IMAGE}
                            alt="Model 1 displaying jewellery"
                            // Added group-hover:scale-130 for 1.3x zoom and transition
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            // Fallback for image loading errors
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x800/E0BBE4/FFFFFF?text=Image+Error"; }}
                        />
                        {/* Overlay for text and button */}
                        <div className="absolute inset-0 flex items-end justify-center p-4">
                            <Link to="/shop-by-style/partywear">
                                <button className="bg-[#8b5e3c] text-white px-6 py-2 shadow-md cursor-pointer hover:bg-[#754a2d] transition duration-300 ease-in-out transform rounded-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    Explore Now
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Model 2 (Top) and Text Box (Bottom) - Middle Column */}
                    <div className="flex-1 lg:w-1/3 flex flex-col gap-4 md:gap-6">
                        {/* Model 2 (Top Upper Image) */}
                        {/* Added 'group' to the parent div */}
                        <div className="relative flex-1 shadow-lg overflow-hidden rounded-md group">
                            <img
                                src={MODEL2_IMAGE}
                                alt="Model 2 displaying jewellery"
                                // Added group-hover:scale-130 for 1.3x zoom and transition
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/957DAD/FFFFFF?text=Image+Error"; }}
                            />
                            {/* Overlay for button */}
                            <div className="absolute inset-0 flex items-end justify-center p-4">
                                <Link to="/shop-by-style/dailywear">
                                    <button className="bg-[#8b5e3c] text-white px-6 py-2 shadow-md cursor-pointer hover:bg-[#754a2d] transition duration-300 ease-in-out transform rounded-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        Explore Now
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Text Box (Below Model 2) */}
                        <div className="flex-1 bg-amber-950 text-white p-6 shadow-lg flex items-center justify-center text-center rounded-md"> {/* Added rounded-md here for consistency */}
                            {/* New inner div for the border */}
                            <div className="border-2 border-white w-[100%] h-[100%] flex justify-center items-center">
                                <p className="text-2xl sm:text-3xl leading-relaxed ">
                                    A celebration of <br /> <span className="font-normal text-6xl font-catchye text-[#bfae7a]">Clam, Light</span> <br /> <span className="font-normal text-6xl text-[#bfae7a] font-catchye">& Shimmer</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Model 3 (Right Most) */}
                    {/* Added 'group' to the parent div */}
                    <div className="relative flex-1 lg:w-1/3 shadow-lg overflow-hidden rounded-md group">
                        <img
                            src={MODEL3_IMAGE}
                            alt="Model 3 displaying jewellery"
                            // Added group-hover:scale-130 for 1.3x zoom and transition
                            className="w-full m-auto max-w-96 h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x800/D291BC/FFFFFF?text=Image+Error"; }}
                        />
                        {/* Overlay for button */}
                        <div className="absolute inset-0 flex items-end justify-center p-4">
                            <Link to="/shop-by-style/partywear">
                                <button className="bg-[#8b5e3c] text-white px-6 py-2 shadow-md cursor-pointer hover:bg-[#754a2d] transition duration-300 ease-in-out transform rounded-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    Explore Now
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cele;
