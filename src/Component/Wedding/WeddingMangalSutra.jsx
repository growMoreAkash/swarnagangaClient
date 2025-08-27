import React from 'react'

const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975939/Wedding_Banner_q8ju3m.jpg"

import ProductTemp from '../ProductTemp'

const WeddingMangalSutra = () => {
    return (
        <div>
            <ProductTemp
                BannerImg={BannerImg}
                text1='Sacred Vows'
                text2='Honor the sacred bond of marriage with our timeless mangalsutra collection. Combining traditional significance with contemporary design, each piece is a beautiful emblem of love, commitment, and a shared future together.'
                right={true}
                type="WeddingMangalSutra"
            />
        </div>
    )
}

export default WeddingMangalSutra