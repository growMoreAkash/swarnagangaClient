import React from 'react'
const BannerImg = "https://res.cloudinary.com/dnmljnbh7/image/upload/v1752975943/Media_Banner_wnzdeo.jpg"
import TempBanner from './TempBanner'
import Press1 from "../assets/Press 1.jpg"
import Press2 from "../assets/Press 2.jpg"
import Press3 from "../assets/Press 3.jpg"
import { Link } from 'react-router-dom'

const Media = () => {
  return (
    <div>
      <TempBanner image={BannerImg} right={false} />

      <div className='flex xxmd:flex-nowrap flex-wrap p-6 justify-center items-center'>

        <div className='flex flex-col'>
          <h1 className='text-3xl mb-3'>September 08, 2023</h1>
          <div className='flex gap-5'>
            <img src={Press1} className='w-64' alt="" />
            <p className='w-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minus dicta totam eaque, minima temporibus adipisci laudantium magni dolorum dolorem?</p>
          </div>
          <Link className='text-2xl mt-5 ' to="https://retailjewellerindia.com/swarnaganga-jewellers-launches-kathaa-fine-jewels-bridal-jewellery-boutique-in-navi-mumbai/">Follow</Link>

        </div>
        <div className='flex flex-col'>
          <h1 className='text-3xl mb-3'>September 08, 2023</h1>
          <div className='flex gap-5'>
            <img src={Press2} className='w-64' alt="" />
            <p className='w-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minus dicta totam eaque, minima temporibus adipisci laudantium magni dolorum dolorem?</p>
          </div>
          <Link className='text-2xl mt-5 ' to="https://www.youtube.com/watch?app=desktop&v=jz6uRF71F2I">Follow</Link>

        </div>
        <div className='flex flex-col'>
          <h1 className='text-3xl mb-3'>September 08, 2023</h1>
          <div className='flex gap-5'>
            <img src={Press3} className='w-64' alt="" />
            <p className='w-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet minus dicta totam eaque, minima temporibus adipisci laudantium magni dolorum dolorem?</p>
          </div>
          <Link className='text-2xl mt-5 ' to="https://www.inquilab.com/brand-media/articles/swarnaganga-jewellers-successfully-launches-navi-mumbais-first-bridal-jewellery-23308002">Follow</Link>

        </div>

      </div>
    </div>
  )
}

export default Media
