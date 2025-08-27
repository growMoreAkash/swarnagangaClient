import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'
const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975939/New_Arrival_Banner_wcjvpn.jpg"


const BackInStore = () => {
    return (
        <div>
            <ProductTemp 
                BannerImg={BannerImg} 
                text1="Back In Store" 
                text2="Your favorites are back! We've restocked our most sought-after designs. Don't miss your second chance to own these popular pieces. Shop now before they're gone again and rediscover the styles you love."
                type="backInStore"
            />
        </div>
    )
}

export default BackInStore