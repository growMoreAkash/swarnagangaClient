import React from 'react'
import ProductTemp from '../ProductTemp'
const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975939/New_Arrival_Banner_wcjvpn.jpg"

const BestSeller = () => {
  return (
    <div>
      <ProductTemp 
        BannerImg={BannerImg} 
        text1="Our Best Sellers" 
        text2="Discover the pieces everyone is talking about. Our best sellers collection features the most loved and highly-rated designs. Trusted for their quality and style, these popular items are the perfect addition to any jewellery collection."
        type="bestSeller"
      />
    </div>
  )
}

export default BestSeller