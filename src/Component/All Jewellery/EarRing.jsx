import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975938/All_Jewellery_Banner_jhxsjt.jpg"

const EarRing = () => {
  return (
    <div>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Stunning Earrings'
        text2='Explore our beautiful collection of earrings, designed to add a touch of elegance to any look. From classic studs to glamorous dangles, discover the perfect pair that complements your style and enhances your natural beauty for every occasion.'
        // right={true}
        type="earRing"
      />
    </div>
  )
}

export default EarRing