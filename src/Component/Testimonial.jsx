import React,{useState} from 'react'
import image from "../assets/Testimonial 1.jpg"
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Testimonial = () => {
  // Array of testimonial data
  const testimonials = [
    {
      id: 1,
      image: image,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      name: "Mrs. Ridhima Khanna",
    },
    {
      id: 2,
      image: image,
      text: "The quality of service and attention to detail from Swarnaganga is truly exceptional. Their team understood our needs perfectly and delivered beyond expectations. Highly recommend their expertise for anyone seeking top-tier solutions and creative brilliance.",
      name: "Mr. Akash Sharma",
    },
    {
      id: 3,
      image: image,
      text: "Working with Swarnaganga was a delightful experience. Their innovative approach to design and marketing helped us achieve significant growth. The professionalism and creativity they bring to the table are unmatched. A fantastic partner!",
      name: "Ms. Priya Singh",
    },
  ];

  // State to keep track of the current testimonial index
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Function to go to the previous testimonial
  const goToPreviousTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next testimonial
  const goToNextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Get the current testimonial based on the index
  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <section className="max-w-screen-xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden"> {/* Added shadow and rounded corners to the main container */}
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex-shrink-0"> {/* flex-shrink-0 to prevent image from shrinking */}
          <img
            src={currentTestimonial.image}
            alt={`Testimonial from ${currentTestimonial.name}`}
            className="w-full h-auto object-cover md:h-[400px] lg:h-[500px] xl:h-[600px]" // Added fixed height for better aspect ratio control on larger screens
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found"; }} // Fallback
          />
        </div>

        {/* Right: Card */}
        <div className="w-full md:w-1/2   p-8 md:p-12 flex flex-col justify-between"> {/* Adjusted border and added flex-col for content distribution */}
          <div>
            <p className="italic text-lg text-gray-600 mb-2">
              What they say about
            </p>
            <h2 className="text-4xl font-extralight font-serif text-[#bfae7a] mb-6">
              Swarnaganga
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {currentTestimonial.text}
            </p>
            <p className="italic font-medium text-gray-800 text-2xl mb-8">
              {currentTestimonial.name}
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-end space-x-6 text-4xl text-gray-500 mt-4"> {/* Increased size of arrows and added top margin */}
            <button
              onClick={goToPreviousTestimonial}
              className="hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-full cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <FaArrowCircleLeft />
            </button>
            <button
              onClick={goToNextTestimonial}
              className="hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-full cursor-pointer"
              aria-label="Next Testimonial"
            >
              <FaArrowCircleRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
