import React from 'react'
import { Banner } from '../Banner'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975938/All_Jewellery_Banner_jhxsjt.jpg"


import ProductTemp from '../ProductTemp'
const Bangles = () => {
  return (
    <div>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Exquisite Bangles'
        text2='Adorn your wrists with our stunning collection of bangles, crafted to perfection. From timeless traditional designs to chic contemporary styles, find the perfect piece to complement your outfit and celebrate every special occasion with a touch of elegance.'
        // right={true}
        type="bangles"
      />
    </div>
  )
}

export default Bangles