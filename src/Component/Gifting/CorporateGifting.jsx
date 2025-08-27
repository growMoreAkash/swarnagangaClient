import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'
const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975938/Gifting_Banner_r4l0mx.jpg"

const CorporateGifting = () => {
  return (
    <div className=''>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Corporate Gifting'
        text2='Elevate your corporate relationships with our curated selection of elegant gifts. Perfect for clients, partners, and employees, our collection offers a sophisticated way to show appreciation and strengthen professional bonds with a memorable and timeless gesture.'
        type="corporateGifting"
        />
    </div>
  )
}

export default CorporateGifting