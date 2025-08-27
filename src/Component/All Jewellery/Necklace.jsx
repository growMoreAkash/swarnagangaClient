import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975938/All_Jewellery_Banner_jhxsjt.jpg"


const Necklace = () => {
  return (
    <div>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Elegant Necklaces'
        text2='Drape yourself in elegance with our exquisite necklaces. Our collection features a wide range of styles, from delicate chains to bold statement pieces. Find the perfect necklace to elevate your attire and make a lasting impression wherever you go.'
        // right={true}
        type="necklace"
      />
    </div>
  )
}

export default Necklace