import { useRef } from "react";
import style from "./Media.module.css";
import Slider from "react-slick";

const media = [
  {
    url: "https://thechainsaw.com/nft/dao-bluntdao-onboarding-to-web3/",
    imgActive: "/img/media/chainsaw.svg",
    imgInactive: "/img/media/chainsaw-inactive.svg",
  },
  {
    url: "https://www.youtube.com/watch?v=1QCUmsPP-dE&t=27836s",
    imgActive: "/img/media/DAODenver.png",
    imgInactive: "/img/media/DAODenver-inactive.png",
  },
  // {
  //   url: "https://awesomenear.com/bluntdao",
  //   imgActive: "/img/media/Awesome-Near.png",
  //   imgInactive: "/img/media/Awesome-Near-inactive.png",
  // },
  {
    url: "https://www.producthunt.com/posts/bluntdao",
    imgActive: "/img/media/Product-Hunt.png",
    imgInactive: "/img/media/Product-Hunt-inactive.png",
  },
  // {
  //   url: "https://barracuda.io/bluntdao",
  //   imgActive: "/img/media/Barracuda.png",
  //   imgInactive: "/img/media/Barracuda-inactive.png",
  // },
  {
    url: "https://shitcoinconf.com/",
    imgActive: "/img/media/Shitcoin.png",
    imgInactive: "/img/media/Shitcoin-inactive.png",
  },

];

var settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 3000,
  cssEase: "linear",

  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 694,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const Media = () => {
  const slider = useRef(null);

  return (
    <div className={`${style.container} reviews-section`}>
      <div className="section">
        <div className={style.header}>BluntDAO in the Media</div>
        <div className={style.subheader}>
          BluntDAO has been featured in media all over the world. Send us a DM
          for any media inquiries
        </div>
        <div className={style.swiperWrapper}>
          <Slider ref={slider} {...settings}>
            {media.map((element) => (
              <div key={element.url} className={style.card}>
                <a
                  href={element.url}
                  target="_blank"
                  rel="noreferrer"
                  key={element.url}
                  className={style.card}
                >
                  <img
                    onMouseOver={(e) =>
                      (e.currentTarget.src = element.imgActive)
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.src = element.imgInactive)
                    }
                    src={element.imgInactive}
                    alt={`BluntDAO featured in ${element.url}`}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Media;
