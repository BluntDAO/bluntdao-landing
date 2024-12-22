import { useEffect } from "react";
import Navbar from "../component/Navbar/Navbar";
import Banner from "../component/Banner/Banner";
import FAQ from "../component/FAQ/FAQ";
import Gallery from "../component/Gallery/Gallery";
import POS from "../component/ProofOfSesh/POS";
import Roadmap from "../component/Roadmap/Roadmap";
import Partner from "../component/Partner/Partner";
import { Element } from "react-scroll";
import Events from "../component/Events/Events.jsx";
import BuiltWith from "../component/Built-With/BuiltWith";
import Review from "../component/Review/Review";
import Footer from "../component/Footer/Footer";
import Medium from "../component/Meduim/Medium";
import RPOS from "./RPOS/RPOS";

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
      <Element id="pos" name="pos">
        <POS />
      </Element>
      <Element id="rpos" name="rpos">
        <RPOS />
      </Element>
      <div id="gallery">
        <Gallery />
      </div>
      {/* <div id="roadmap">
        <Roadmap />
      </div> */}
      {/* <div id="events">
        <Events />
      </div> */}
      {/* <Element name="Partner">
        <Partner />
      </Element> */}
      <Element name="testimonial">
        <Review />
      </Element>
      <div id="buildwith">
        <BuiltWith />
      </div>
      {/* <div id="medium">
        <Medium />
      </div> */}
      <Element id="faq" name="faq">
        <FAQ />
      </Element>
      <Footer {...footerProps} />
    </>
  );
};

export default Home;
