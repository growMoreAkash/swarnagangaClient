import React,{useState} from 'react'
import image from "../assets/Testimonial 1.jpg"
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Testimonial = () => {
  // Array of testimonial data
  const testimonials = [
    {
      id: 1,
      image: image,
      text: "I had a great experience at the store! Kishan was extremely cooperative and took the time to explain each jewellery item in detail. His knowledge and patience really made the shopping experience enjoyable. The shop also has a pleasant and welcoming atmosphere. Highly recommended!",
      name:"Shubhangi Shelar"
    },
    {
      id: 2,
      image: image,
      text: "I recently visited this jewellery store Swaranga Jewellers at Kharghar and had a wonderful experience. The staff was very cooperative, patient, and helpful throughout my visit. All the gold products were of excellent quality with beautiful designs. I’m very satisfied with their service and would highly recommend this store to anyone looking for quality jewellery and good customer service.",
      name: "Sayali Gaikwad",
    },
    {
      id: 3,
      image: image,
      text: "I had a wonderful experience at the jewellery shop. The collection was elegant, well-curated, and suited a variety of budgets and occasions. Special thanks to Shashi, the attendant, who was extremely courteous and knowledgeable. She patiently guided me through the options, offered honest suggestions, and made the entire shopping experience smooth and enjoyable. Highly recommended!",
      name:"Bajarang Shinde"
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
