import { useEffect, Suspense, lazy } from "react";
import Navbar from "../component/Navbar/Navbar";
import Banner from "../component/Banner/Banner";
import { Element } from "react-scroll";
import Footer from "../component/Footer/Footer";

// Lazy load components that are below the fold
const FAQ = lazy(() => import("../component/FAQ/FAQ"));
const Gallery = lazy(() => import("../component/Gallery/Gallery"));
const POS = lazy(() => import("../component/ProofOfSesh/POS"));
const BuiltWith = lazy(() => import("../component/Built-With/BuiltWith"));
const Review = lazy(() => import("../component/Review/Review"));
const RPOS = lazy(() => import("./RPOS/RPOS"));

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    color: '#F1592A'
  }}>
    <div style={{ 
      fontSize: '1.2rem',
      fontFamily: 'Londrina Solid, cursive'
    }}>
      Loading... 💨
    </div>
  </div>
);

const Home = () => {
  const scrollToComment = () => {
    let currentLocation = window.location.href;
    const hasCommentAnchor = currentLocation.includes("/#");
    if (hasCommentAnchor) {
      const elementId = `${currentLocation.substring(
        currentLocation.indexOf("#") + 1
      )}`;

      const element = document.getElementById(elementId);

      if (element) {
        var headerOffset = 0;
        console.log(elementId);

        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };
  useEffect(() => {
    setTimeout(() => scrollToComment(), 500);
  }, []);
  const footerProps = { backgroundColor: "transparent" };
  return (
    <>
      <Navbar />

      <Element id="banner" name="banner">
        <Banner />
      </Element>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Element id="pos" name="pos">
          <POS />
        </Element>
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Element id="rpos" name="rpos">
          <RPOS />
        </Element>
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <div id="gallery">
          <Gallery />
        </div>
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Element name="testimonial">
          <Review />
        </Element>
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <div id="buildwith">
          <BuiltWith />
        </div>
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Element id="faq" name="faq">
          <FAQ />
        </Element>
      </Suspense>
      
      <Footer {...footerProps} />
    </>
  );
};

export default Home;
