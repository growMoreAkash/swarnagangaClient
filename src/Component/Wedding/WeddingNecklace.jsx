import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975939/Wedding_Banner_q8ju3m.jpg"


const WeddingNecklace = () => {
  return (
    <div>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Bridal Necklaces'
        text2='Adorn your neckline with a breathtaking wedding necklace from our curated collection. Designed to be the centerpiece of your bridal attire, our necklaces range from classic elegance to opulent statements, perfecting your wedding day look.'
        right={true}
        type="WeddingNecklace"
      />
    </div>
  )
}

export default WeddingNecklace