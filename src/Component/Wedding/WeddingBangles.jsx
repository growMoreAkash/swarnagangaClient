import React from 'react'
import { Banner } from '../Banner'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975939/Wedding_Banner_q8ju3m.jpg"

import ProductTemp from '../ProductTemp'

const WeddingBangles = () => {
  return (
    <div>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Bridal Radiance'
        text2='Complete your bridal look with our exquisite wedding bangles. Each piece is intricately designed to symbolize prosperity and happiness, adding a touch of traditional elegance and timeless grace to your special day.'
        right={true}
        type="WeddingBangles"
      />
    </div>
  )
}

export default WeddingBangles