import React from 'react' 
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975939/Shop_By_Style_Banner_sf43uu.jpg"


const DailyWear = () => {
  return (
    <div>
        <ProductTemp 
            BannerImg={BannerImg} 
            text1="Effortless Daily Wear" 
            text2="Elevate your everyday look with our collection of daily wear jewellery. Designed for comfort and style, these versatile pieces are perfect for adding a subtle touch of elegance to your office attire or casual outfits."
            right={true}
            type="dailyWear"
        />
    </div>
  )
}

export default DailyWear