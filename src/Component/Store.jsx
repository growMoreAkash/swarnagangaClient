import React from 'react'
import { Link } from 'react-router-dom'
import store from "../assets/Store.jpg"

const Store = ({ image, invert, p1, text1, buttonActive }) => {
  return (
    <section className="max-w-screen-xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* text card */}

        {
          invert ?
            <>
              {/* image */}
              <div className="w-full h-64 md:h-96">
                <img
                  src={image}
                  alt="Jewellery Store Interior"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>


              <div className="border border-gray-300 rounded-2xl p-8">
                <p className="italic text-gray-600 mb-2 text-xl">
                  Swarnagagga - The Trusted Jewellers
                </p>
                <h2 className="text-3xl lg:text-4xl font-serif text-[#bfae7a] mb-4">
                  {text1 ? text1 : 'Experience & Expertise'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {p1}
                </p>
                {
                  buttonActive ?
                    <Link to="/about">
                      <button className="bg-[#bfae7a] cursor-pointer text-white uppercase text-sm py-2 px-6 rounded">
                        Read More
                      </button>
                    </Link>
                    :
                    <></>
                }
              </div>
            </>
            :

            <>
              <div className="border border-gray-300 rounded-2xl p-8">
                <p className="italic text-gray-600 mb-2 text-xl">
                  Swarnagagga - The Trusted Jewellers
                </p>
                <h2 className="text-3xl lg:text-4xl font-serif text-[#bfae7a] mb-4">
                  Experience & Expertise
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {p1}
                </p>
                {
                  buttonActive ?
                    <Link to="/about">
                      <button className="bg-[#bfae7a] cursor-pointer text-white uppercase text-sm py-2 px-6 rounded">
                        Read More
                      </button>
                    </Link>
                    :
                    <></>
                }
              </div>

              {/* image */}


              <div className="w-full h-64 md:h-96">
                <img
                  src={image}
                  alt="Jewellery Store Interior"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </>
        }
      </div>
    </section>
  )
}

export default Store
