import React from 'react'
import ContactImg from "../assets/ContactImage.jpg"
import { Banner } from './Banner'
import Contact from './Contact'
import TempBanner from './TempBanner';
const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975938/Contact_Banner_u2jcz5.jpg"

const Address = () => {
    return (
        <section className="max-w-screen-xl mx-auto py-12 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: Store Image */}
                <div className="w-full h-64 md:h-96">
                    <img
                        src={ContactImg}
                        alt="Jewellery Store Interior"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                </div>

                {/* Right: Address Card */}
                <div className="border border-gray-300 rounded-2xl p-8">
      
                    <p className="text-gray-700 leading-relaxed mb-2">
                       NERUL SHOWROOM : Plot No. 5, Shop No. 7, 8 and 9,<br />
                        Goodwill Arcade, Sector 10, Nerul, <br />
                         Navi Mumbai, Maharashtra 400706. <br />
                         Phone: +91-9892566546 <br />
                         Open: Mon – Sat, 10:00 AM – 8:00 PM
                    </p>
                    <br />
                    <p className="text-gray-700 leading-relaxed mb-2">
                       NERUL SHOWROOM : Plot No. 5, Shop No. 7, 8 and 9,<br />
                        Goodwill Arcade, Sector 10, Nerul, <br />
                         Navi Mumbai, Maharashtra 400706. <br />
                         Phone: +91-9892566546 <br />
                         Open: Mon – Sat, 10:00 AM – 8:00 PM
                    </p>

                </div>
            </div>
        </section>
    );
};

const ContactUs = () => {
    return (
        <div>
            <TempBanner image={BannerImg} right={true} />
            <Address />
            <Contact /> 
        </div>
    )
}

export default ContactUs
