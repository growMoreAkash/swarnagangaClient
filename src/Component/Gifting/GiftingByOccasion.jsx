import React from 'react'
import { Banner } from '../Banner'
import ProductTemp from '../ProductTemp'
const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975938/Gifting_Banner_r4l0mx.jpg"
const GiftingByOccasion = () => {
  return (
    <div>
      <ProductTemp
        BannerImg={BannerImg}
        text1='Gifts for Every Occasion'
        text2='Celebrate life’s special moments with the perfect gift. Whether it’s a birthday, anniversary, or a simple "thank you," our curated collection has something for everyone. Find a meaningful and beautiful present to make any occasion unforgettable.'
        type="giftingByOccasion"
      />
    </div>
  )
}

export default GiftingByOccasion