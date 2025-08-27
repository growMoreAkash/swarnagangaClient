import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import gsap from 'gsap';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFlip, Pagination, Navigation, EffectCreative } from 'swiper/modules';
import BannerComp1 from "../assets/BannerComp.png"
import BannerComp2 from "../assets/BannerComp2.png"
import BannerComp3 from "../assets/BannerComp3.png"
import Banner1 from "../assets/Banner 1.jpg"
import Banner2 from "../assets/Banner 2.jpg"
import Banner3 from "../assets/Banner 3.jpg"

import J1R from "../assets/Jewellery 1 Right.png"
import J2R from "../assets/Jewellery 2 Right.png"
import J3R from "../assets/Jewellery 3 Right.png"
import J1L from "../assets/Jewellery 1 Left.png"
import J2L from "../assets/Jewellery 2 Left.png"
import J3L from "../assets/Jewellery 3 Left.png"


export const Banner = () => {
    const images =
        [
            { Banner: Banner1, left: J1L, right: J1R, text1: 'INDULGE IN', text2: 'Eternal Shine', text3: 'with our new', text4: 'exquisite designs' },
            { Banner: Banner2, left: J2L, right: J2R, text1: 'FIND YOUR', text2: 'Perfect Match', text3: 'from our latest', text4: 'curated styles' },
            { Banner: Banner3, left: J3L, right: J3R, text1: 'EMBRACE THE', text2: 'Timeless Beauty', text3: 'crafted for you', text4: 'brilliant artistry' }

        ];
    const BannerComp = [BannerComp1, BannerComp2]

    // Define different button positions for each banner
    const buttonPositions = [
        "xmd:bottom-[50%] xmd:right-[10%] md:bottom-[60%] right-[5%] sm:bottom-[75%] sm:right-[5%] bottom-[78%] right",
        "xmd:bottom-[50%] xmd:right-[10%] md:bottom-[60%] right-[5%] sm:bottom-[75%] sm:right-[5%] bottom-[78%] right",
        "xmd:bottom-[50%] xmd:right-[10%] md:bottom-[60%] right-[5%] sm:bottom-[75%] sm:right-[5%] bottom-[78%] right",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [images.length]);


    return (
        <section className="relative w-full overflow-hidden smx:pt-40 pt-52 ">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="relative flex-shrink-0 w-full">
                        <img src={image.Banner} alt={`Banner ${index + 1}`} className="w-full" />

                        <div className={`absolute flex ${buttonPositions[index]}`}>
                            {
                                index % 2 == 0 ?
                                    <>
                                        <div className='flex flex-col justify-center items-center'>
                                            <h1 className="xxmd:text-5xl xmd:text-4xl  md:text-3xl sm:text-2xl text-lg text-center font-century text-white" id='bannerText1'>
                                                {image.text1}
                                            </h1>
                                            <h1 className="xxmd:text-9xl xmd:text-8xl md:text-7xl sm:text-5xl text-3xl md:mt-5 mt-1 font-catchye text-white" id='bannerText2'>
                                                {image.text2}
                                            </h1>
                                            <h1 className={`  xxmd:text-4xl xmd:text-3xl md:text-2xl sm:text-xl text-sm text-center font-century text-white uppercase`} id='bannerText2'>
                                                {image.text3}
                                            </h1>
                                            <h1 className={`  xxmd:text-4xl xmd:text-3xl md:text-2xl sm:text-xl text-sm  text-center font-century text-white uppercase`} id='bannerText2'>
                                                {image.text4}
                                            </h1>
                                        </div>
                                    </>

                                    :
                                    <>
                                        <div className='flex flex-col justify-center items-center'>
                                            <h1 className="xxmd:text-5xl xmd:text-4xl  md:text-3xl sm:text-2xl text-lg text-center font-century text-white" id='bannerText1'>
                                                {image.text1}
                                            </h1>
                                            <h1 className="xxmd:text-9xl xmd:text-8xl md:text-7xl sm:text-5xl text-3xl md:mt-5 mt-1 font-catchye text-white" id='bannerText2'>
                                                {image.text2}
                                            </h1>
                                            <h1 className={`  xxmd:text-4xl xmd:text-3xl md:text-2xl sm:text-xl text-sm text-center font-century text-white uppercase`} id='bannerText2'>
                                                {image.text3}
                                            </h1>
                                            <h1 className={`  xxmd:text-4xl xmd:text-3xl md:text-2xl sm:text-xl text-sm  text-center font-century text-white uppercase`} id='bannerText2'>
                                                {image.text4}
                                            </h1>
                                        </div>
                                    </>
                            }

                        </div>


                        <div className=''
                            onMouseEnter={() => {
                                gsap.to("#left", {
                                    scale: 0.8,
                                    x: -9,
                                    rotate: 10,
                                    marginLeft: 4
                                })
                                gsap.to("#right", {
                                    scale: 1.1,
                                    x: -9,
                                    rotate: -10,
                                    marginLeft: 4
                                })
                            }}
                            onMouseLeave={() => {
                                gsap.to("#left", {
                                    scale: 1,
                                    x: 0,
                                    marginRight: 0,
                                    rotate: 0,
                                    marginLeft: 8
                                })
                                gsap.to("#right", {
                                    scale: 1,
                                    x: 0,
                                    rotate: 0,
                                    marginRight: 0,
                                    marginLeft: 8
                                })
                            }}>
                            <img src={image.left} id='left' className='absolute hidden sm:block  xxxmd:-bottom-5 xmd:bottom-[10%] bottom-[18%] right-25 xxxmd:w-[15%] xmd:w-[10%] w-24 xmd:right-[21%] xxmd:right-1/4' alt="" />

                            <img src={image.right} id='right' className='absolute hidden sm:block  xxxmd:-bottom-17 xmd:bottom-[12%] bottom-[18%] right-10 xxxmd:w-[13%] xmd:w-[8%] w-20 xmd:right-[15%] xxmd:right-1/6' alt="" />
                        </div>

                        <div className='flex flex-col xxl:flex-row sm:p-14 p-5 justify-between items-center'>
                            <div className=' flex flex-col'>
                                <h1 className='xxl:text-4xl lg:text-3xl text-2xl font-century md:w-[100%] xxsm:w-[60%]  text-yellow-600'>Timeless craftsmanship... Contemporary elegance.</h1>
                                <p className='xxxmd:w-[900px] sm:w-[60%] my-6'>Each piece in our collection is a testament to generations of artistry, meticulously crafted to bring you unparalleled quality and enduring beauty. Discover the legacy of exquisite design and let our jewelry tell your unique story.</p>
                            </div>
                            <Link to="/new-arrival/best-seller">
                                <button
                                    type="submit"
                                    className="mt-4 cursor-pointer bg-[#8b5e3c] hover:bg-[#754a2d] w-52 text-white uppercase text-sm rounded-lg px-6 py-3 transition"
                                >
                                    Shop Now
                                </button>
                            </Link>

                        </div>

                    </div>
                ))}
            </div>
        </section >
    );
};