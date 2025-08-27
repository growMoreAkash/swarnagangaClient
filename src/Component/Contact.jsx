import React from 'react' 

const Contact = () => {
  return (
    <section className="max-w-screen-xl mx-auto py-12 px-6">
      {/* Heading */}
      <div className="text-center mb-8">
        <p className="italic text-gray-600">Book an</p>
        <h2 className="text-3xl md:text-4xl font-serif text-[#bfae7a]">
          Appointment
        </h2>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Mobile"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
          />
        </div>

        {/* Right textarea + submit */}
        <div className="flex flex-col justify-between">
          <textarea
            placeholder="Your message or request"
            className="w-full h-56 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none resize-none"
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-4 bg-[#8b5e3c] hover:bg-[#754a2d] text-white uppercase text-sm rounded-lg px-6 py-3 transition"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Contact
