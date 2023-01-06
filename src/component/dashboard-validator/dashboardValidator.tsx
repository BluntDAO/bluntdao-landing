import React from "react";
import { useHistory } from "react-router-dom";
import style from "./dashboardValidator.module.css";
// import { GenContext } from "../../gen-state/gen.context";
import Slider from "react-slick";
import { data } from "./dashboardValidator-script";

const DashboardValidator = () => {
  var settings = {
    centerMode: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 845,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // const { account } = useContext(GenContext);
  const history = useHistory();
  return (
    <div className={style.contianer}>
      <div className={style.header}>
        <p>Validator NFTs</p>
        <div className={style.tabs}>
          <div className={style.active}>All</div>
          <div>Popular</div>
          <div>General NFT</div>
          <div>Validator NFTs</div>
          <div>Badge NFT</div>
        </div>
      </div>
      <div className={style.sliderContainer}>
        <Slider className="events-sliders-section" {...settings}>
          {data.map((elm) => (
            <div key={elm.id}>
              <div className={style.card}>
                <div className={style.content}>
                  <img src={elm.nft} alt="" />
                  {elm.chain}
                  <div className={style.address}>
                    <img src={elm.addressIcon} alt="" />
                    <p>{elm.address}</p>
                  </div>
                </div>
                <div className={style.title}>{elm.title}</div>
                <div className={style.line}></div>
                <div
                  onClick={() => history.push(`/dashboard/nft/${elm.id}`)}
                  className={style.viewBtn}
                >
                  View NFT
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DashboardValidator;
