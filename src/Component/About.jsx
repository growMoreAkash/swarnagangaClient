import React from 'react'
import Store from './Store'
const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975938/About_Banner_uicrng.jpg"
import { Banner } from './Banner'
import { Link } from 'react-router-dom'
import Cele from './Cele'
import TempBanner from './TempBanner'
import About1 from "../assets/About1.jpg"
import About2 from "../assets/About2.jpg"




const About = () => {
    return (
        <div>
            
            <TempBanner image={BannerImg} right={false}/>

            <Store image={About1} p1='Swarna Ganga Jewellers was established as a retailer in Navi mumbai. Since then, our exclusive designs of gold and silver jewellery have earned us very bright goodwill and a reputation among our customers. Our handcrafted and machine polished jewellery items like ganthan ,kanti, bangles , chains ,earing and many others are loved by our customers We have been admired for our unique and hand-picked designs featured in our jewellery collection. In our dedicated collection, you can think of, you can find any gold jewellery piece. The craftsmanship of our fine craftsmen does not go unnoticed with every piece of our jewellery.'/>

            <Store image={About2} invert={true} p1='We have all kinds of gold jewellery, including earrings, jhumkis, bracelets, kadas, rings and more. We guarante the quality/purity of all our products, and what you see in our catalogue will always be received. We also specialise in silver articles like puja accessories and gold jewellery like agri kolijewellery. Do visit us in our showroom and you can see our creativity at any time during the day.' text1='Where every piece is crafted with love and care'/>

            <Cele />
        </div>
    )
}

export default About
