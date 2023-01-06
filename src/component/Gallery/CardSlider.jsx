import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./gallery.module.css";
import cardInfo from "./CardInfo";
import { ReactComponent as AngleLft } from "../../assets/imgs/angle-left-solid.svg";
import { ReactComponent as AngleRight } from "../../assets/imgs/angle-right-solid.svg";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  // slidesToScroll: Math.ceil(cardInfo.length / 3),
  slidesToScroll: 3,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        // slidesToScroll: Math.ceil(cardInfo.length / 4),
      },
    },
    {
      breakpoint: 694,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        // slidesToScroll: Math.ceil(cardInfo.length / 4),
      },
    },
  ],
};

const CardSlider = () => {
  const slider = useRef(null);

  return (
    <>
      <Slider ref={slider} className="gallery-slider" {...settings}>
        {cardInfo.map((item, idx) => {
          return (
            <a
              href={item?.url}
              key={item?.title}
              target="_blank"
              rel="noreferrer"
              className="card-url"
            >
              <div key={item.title} className={style.item}>
                <div className={style.title}>{item.title}</div>
                <div className={style.img}>
                  <img src={item.img} alt="" />
                </div>
                <div className={style.description}>{item.description}</div>
              </div>
            </a>
          );
        })}
      </Slider>
      <div className={style.customArrows}>
        <div onClick={() => slider?.current?.slickPrev()}>
          <AngleLft />
        </div>
        <div onClick={() => slider?.current?.slickNext()}>
          <AngleRight />
        </div>
      </div>
    </>
  );
};
export default CardSlider;
