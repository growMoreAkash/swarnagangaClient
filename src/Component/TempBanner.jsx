import React from 'react'

const TempBanner = ({ image, text1, text2, right }) => {

    const rightTrue = `absolute flex xmd:bottom-[19%] xmd:right-[10%] md:bottom-[15%] right-[5%] sm:bottom-[10%] sm:right-[5%] bottom-[5%] right`

    const rightFalse = `absolute flex xmd:bottom-[19%] xmd:left-[10%] md:bottom-[15%] left-[5%] sm:bottom-[10%] sm:left-[5%] bottom-[5%] left`

    return (
        <>
         <section className="relative w-full overflow-hidden smx:pt-40 pt-52 ">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                >
                    <div className="relative flex-shrink-0 w-full">
                        <img src={image} className="w-full" />

                        <div className={right ? rightTrue : rightFalse}>

                            <div className='flex flex-col justify-center items-center'>
                                <h1 className="xxmd:text-5xl xmd:text-4xl  md:text-3xl sm:text-2xl text-lg text-center font-century text-white" id='bannerText1'>
                                    INDULGE IN
                                </h1>
                                <h1 className="xxmd:text-9xl xmd:text-8xl md:text-7xl sm:text-5xl text-3xl md:mt-5 mt-1 font-catchye text-white" id='bannerText2'>
                                    Eternal Shine
                                </h1>
                                <h1 className={`  xxmd:text-4xl xmd:text-3xl md:text-2xl sm:text-xl text-sm text-center font-century text-white uppercase`} id='bannerText2'>
                                    with our new
                                </h1>
                                <h1 className={`  xxmd:text-4xl xmd:text-3xl md:text-2xl sm:text-xl text-sm  text-center font-century text-white uppercase`} id='bannerText2'>
                                    exquisite designs
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <div className='bg-gradient-to-t   py-10 text-center'>
                <h1 className='font-century text-[#bfae7a] mt-10 uppercase xxmd:text-5xl xmd:text-4xl  md:text-3xl text-2xl'>{text1}</h1>
                <h1 className='font-century text-lg px-10 text-[#bfae7a] mt-10 uppercase'>{text2}</h1>
            </div>
        </>

    )
}

export default TempBanner
