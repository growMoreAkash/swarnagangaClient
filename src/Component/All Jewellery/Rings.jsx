import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975938/All_Jewellery_Banner_jhxsjt.jpg"


const Rings = () => {
  return (
    <div>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Exquisite Rings'
        text2='Discover the perfect ring for every moment in our diverse collection. Featuring everything from elegant solitaires to intricate bands, each piece is crafted to symbolize love, commitment, and personal style. Find a ring that truly speaks to you.'
        // right={true}
        type="rings"
      />
    </div>
  )
}

export default Rings