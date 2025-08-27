import React from 'react'
import Navbar from './Component/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Banner } from './Component/Banner'
import Store from './Component/Store'
import Cele from './Component/Cele'
import Testimonial from './Component/Testimonial'
import Contact from './Component/Contact'
import Footer from './Component/Footer'
import Dashboard from './Component/Dashboard';
import Login from './Component/Login';
import Cart from './Component/Cart';
import Video from './Component/Video';
import Media from './Component/Media';

import Bangles from './Component/All Jewellery/Bangles';
import EarRing from './Component/All Jewellery/EarRing';
import Necklace from './Component/All Jewellery/Necklace';
import Rings from './Component/All Jewellery/Rings';

import CorporateGifting from './Component/Gifting/CorporateGifting';
import GiftingByOccasion from './Component/Gifting/GiftingByOccasion';

import BackInStore from './Component/New Arrival/BackInStore';
import BestSeller from './Component/New Arrival/BestSeller';

import DailyWear from './Component/Shop By Style/DailyWear';
import PartyWear from './Component/Shop By Style/PartyWear';

import WeddingBangles from './Component/Wedding/WeddingBangles';
import WeddingEarRing from './Component/Wedding/WeddingEarRing';
import WeddingNecklace from './Component/Wedding/WeddingNecklace';
import WeddingRings from './Component/Wedding/WeddingRings';
import WeddingMangalSutra from './Component/Wedding/WeddingMangalSutra';

import Admin from './Component/Admin';

import About from './Component/About';
import ContactUs from './Component/ContactUs';

import RequireAuth from './Component/RequireAuth';

import store from "./assets/AboutMain.jpg"
import ScrollToTop from './Component/ScrollToTop';

const Home = () => {
  return (
    <div className=''>
      <Banner />
      <Store image={store} invert={false} p1='Swarna Ganga Jewellers was established as a retailer in Navi mumbai. Since then, our exclusive designs of gold and silver jewellery have earned us very bright goodwill and a reputation among our customers. Our handcrafted and machine polished jewellery items like ganthan ,kanti, bangles , chains ,earing and many others are loved by our customers We have been admired for our unique and hand-picked designs featured in our jewellery collection. In our dedicated collection, you can think of, you can find any gold jewellery piece. The craftsmanship of our fine craftsmen does not go unnoticed with every piece of our jewellery.' buttonActive={true}/>
      <Cele />
      <Video />
      <Testimonial />
      <Contact />
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
         <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />

        {/* protected admin routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more admin-only routes inside this block */}
        </Route>


        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />


        {/* All Jewellery */}
        <Route path="/all-jewellery/bangles" element={<Bangles />} />
        <Route path="/all-jewellery/rings" element={<Rings />} />
        <Route path="/all-jewellery/necklace" element={<Necklace />} />
        <Route path="/all-jewellery/ear-ring" element={<EarRing />} />

        {/* Gifting */}
        <Route path="/gifting/corporate" element={<CorporateGifting />} />
        <Route path="/gifting/occasion" element={<GiftingByOccasion />} />

        {/* New Arrival */}
        <Route path="/new-arrival/back-in-store" element={<BackInStore />} />
        <Route path="/new-arrival/best-seller" element={<BestSeller />} />

        {/* Shop By Style */}
        <Route path="/shop-by-style/dailywear" element={<DailyWear />} />
        <Route path="/shop-by-style/partywear" element={<PartyWear />} />

        {/* Wedding */}
        <Route path="/wedding/wedding-bangles" element={<WeddingBangles />} />
        <Route path="/wedding/wedding-ear-ring" element={<WeddingEarRing />} />
        <Route path="/wedding/wedding-necklace" element={<WeddingNecklace />} />
        <Route path="/wedding/wedding-rings" element={<WeddingRings />} />
        <Route path="/wedding/wedding-mangalsutra" element={<WeddingMangalSutra />} />


        <Route path="/about" element={<About />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contact" element={<ContactUs />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App