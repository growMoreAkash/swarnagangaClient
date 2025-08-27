import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975939/Shop_By_Style_Banner_sf43uu.jpg"


const PartyWear = () => {
  return (
    <div>
      <ProductTemp 
        BannerImg={BannerImg} 
        text1="Dazzling Party Wear" 
        text2="Make a statement at your next event with our glamorous party wear collection. Featuring bold designs and sparkling details, these pieces are crafted to ensure you stand out and shine bright on every special occasion." 
        right={true}
        type="partyWear"
      />
    </div>
  )
}

export default PartyWear