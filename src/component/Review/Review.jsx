import { useEffect, useRef, useState } from "react";
import style from "./Review.module.css";
import Slider from "react-slick";
import TweetEmbed from 'react-tweet-embed';
import { ReactComponent as AngleLft } from "../../assets/imgs/angle-left-solid.svg";
import { ReactComponent as AngleRight } from "../../assets/imgs/angle-right-solid.svg";

// Featured tweet IDs to display in the review section
const featuredTweets = [
  "1598053293477232641",
  "1575373829001691136",
  "1583521546718482433",
  "1583874790363828224",
  "1587646466427965441",
  "1589457951315853312",
  "1591211463305490433",
  "1591637549444898816",
  "1567343075629858818",
  "1566943218658574337",
  "1566371345721880577",
  "1574825045951643651",
  "1574472426079096856",
  "1574483130345750528",
  "1574034978102386690",
  "1574414270594433025",
  "1571666924567777280",
  "1593015887271165952",
  "1593625073780285441",
  "1594126965694349312",
  "1594141798322118662",
  "1497375592089489410",
  "1492545522896457734",
  "1490707850024271872",
  "1493677869314162694",
  "1539889903190052864",
  "1539931030727303169",
  "1540041077314535424",
  "1539986643171418112",
  "1531748621665898497",
  "1526359494623735808",
  "1523576839780052992",
  "1516502634978496524",
  "1511002844538757120",
  "1494743546871656448",
  "1563932578578587648",
  "1565464924633047041",
  "1563308737506738178",
  "1562168161918767105",
  "1560376536041136130",
  "1558599857799151616",
  "1565580515490598913",
  "1565335784412311554",
  "1559421400112189442",
  "1554839503776497665",
  "1550143574565584897",
  "1549053570325966851",
  "1536573292517236737",
  "1490142262176587781",
];

var settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  adaptiveHeight: false,
  autoplay: true,
  autoplaySpeed: 6000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Review = () => {
  const slider = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Select a subset of tweets to display (limit for better performance)
  const displayTweets = featuredTweets.slice(0, 12);

  useEffect(() => {
    // Small delay to ensure slider is properly initialized
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={`${style.container} reviews-section`}>
      <div className="section">
        <div className={style.header}>The Most Beloved DAO</div>
        <div className={style.subheader}>
          See how the streets love the world's biggest cannabis crew.
        </div>
        <div className={style.swiperWrapper}>
          {isLoaded && (
            <Slider ref={slider} {...settings}>
              {displayTweets.map((tweetId) => (
                <div key={tweetId} className={style.tweetContainer}>
                  <div className={style.tweetWrapper}>
                    <TweetEmbed
                      tweetId={tweetId}
                      options={{
                        theme: 'dark',
                        width: 350,
                        conversation: 'none',
                        cards: 'visible',
                        align: 'center'
                      }}
                      hideMedia={true}
                      placeholder="Loading tweet..."
                    />
                  </div>
                </div>
              ))}
            </Slider>
          )}
          
          {!isLoaded && (
            <div className={style.loadingContainer}>
              <div className={style.loadingText}>Loading Twitter feed...</div>
            </div>
          )}

          {isLoaded && (
            <>
              <button
                onClick={() => slider?.current?.slickPrev()}
                className={style.ctrlBtn_left}
                aria-label="Previous tweets"
              >
                <AngleLft />
              </button>
              <button
                onClick={() => slider?.current?.slickNext()}
                className={style.ctrlBtn_right}
                aria-label="Next tweets"
              >
                <AngleRight />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
