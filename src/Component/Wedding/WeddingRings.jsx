import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975939/Wedding_Banner_q8ju3m.jpg"

const WeddingRings = () => {
  return (
    <div>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Wedding & Engagement Rings'
        text2='Seal your promise of a lifetime with our exceptional collection of wedding and engagement rings. Each ring is a masterpiece, crafted to symbolize your unique love story and the beautiful journey you are embarking upon together.'
        right={true}
        type="weddingRings"
      />
    </div>
  )
}

export default WeddingRings