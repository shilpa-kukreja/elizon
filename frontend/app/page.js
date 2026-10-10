import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import ImageSlider from "./components/ImageSlider";
import About from "./components/About";
import OurJourney from "./components/OurJourney";
import Products from "./components/ProductsList";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import TrustBadges from "./components/TrustBadges";
import Category from "./components/Categories";
import MarketplaceMarquee from "./components/MarketPlace";

export default function Home() {
  return (
   <>
   <AnnouncementBar/>
   <Navbar/>
   <ImageSlider/>
     <Category/>

   <About/>
   {/* <OurJourney/> */}
    <TrustBadges/>
   <Products/>
   <Testimonials/>
   <CTA/>
   {/* <Blog/> */}
<MarketplaceMarquee/>
   <Footer/>
   </>
  );
}
