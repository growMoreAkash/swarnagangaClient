import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975939/Wedding_Banner_q8ju3m.jpg"

const WeddingEarRing = () => {
  return (
    <div>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Bridal Earrings'
        text2='Illuminate your bridal glow with our stunning collection of wedding earrings. From elegant studs to elaborate chandeliers, each pair is crafted to perfection, ensuring you sparkle with every turn on your momentous day.'
        right={true}
        type="weddingEarRing"
      />
    </div>
  )
}

export default WeddingEarRing