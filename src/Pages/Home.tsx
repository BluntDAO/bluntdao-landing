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
  // SEO optimization for home page
  useEffect(() => {
    // Set comprehensive SEO meta tags
    document.title = 'BluntDAO - Global Cannabis Community & Web3 Onboarding | Proof of Sesh';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'BluntDAO is the biggest IRL onboarding movement to Web3 via Proof of Sesh. Join global cannabis communities, explore legal status worldwide, and connect with local OGs. Onboarding the next billion, 1 blunt/sesh at a time.');
    }

    // Add comprehensive structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BluntDAO",
      "description": "Global cannabis community and Web3 onboarding movement via Proof of Sesh",
      "url": "https://bluntdao.org",
      "logo": "https://bluntdao.org/img/BluntDAO.png",
      "foundingDate": "2021",
      "sameAs": [
        "https://discord.com/invite/e3cGSTzyWp",
        "https://t.me/+ban7bVBaU5Q5YmJh",
        "https://twitter.com/BluntDAO",
        "https://github.com/BluntDAO"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Community",
        "url": "https://discord.com/invite/e3cGSTzyWp"
      },
      "offers": [
        {
          "@type": "Service",
          "name": "Global Cannabis Legal Status Map",
          "description": "Interactive map showing cannabis legalization worldwide",
          "url": "https://bluntdao.org/map"
        },
        {
          "@type": "Service", 
          "name": "Proof of Sesh",
          "description": "IRL cannabis community verification system",
          "url": "https://bluntdao.org/pos"
        }
      ],
      "keywords": "cannabis community, Web3 onboarding, proof of sesh, cannabis legalization, global cannabis, blockchain, DAO, decentralized autonomous organization",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://bluntdao.org/"
      }
    };

    // Add structured data to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add comprehensive meta tags
    const metaTags = [
      { property: 'og:title', content: 'BluntDAO - Global Cannabis Community & Web3 Onboarding' },
      { property: 'og:description', content: 'Join the biggest IRL cannabis community onboarding movement to Web3. Explore global cannabis laws, connect with local chapters, and participate in Proof of Sesh.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://bluntdao.org/' },
      { property: 'og:image', content: 'https://bluntdao.org/img/BluntDAO.png' },
      { property: 'og:site_name', content: 'BluntDAO' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'BluntDAO - Global Cannabis Community & Web3' },
      { name: 'twitter:description', content: 'The biggest IRL cannabis community onboarding movement to Web3 via Proof of Sesh' },
      { name: 'twitter:image', content: 'https://bluntdao.org/img/BluntDAO.png' },
      { name: 'keywords', content: 'BluntDAO, cannabis community, Web3, blockchain, DAO, proof of sesh, cannabis legalization, global cannabis, decentralized, marijuana community' },
      { name: 'author', content: 'BluntDAO' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'theme-color', content: '#00ff88' }
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.property) meta.setAttribute('property', tag.property);
      if (tag.name) meta.setAttribute('name', tag.name);
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    });

    return () => {
      // Cleanup
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      if (structuredDataScript) {
        document.head.removeChild(structuredDataScript);
      }
    };
  }, []);

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
