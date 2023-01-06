import React, { useRef } from "react";
import Slider from "react-slick";
import style from "./EventSlider.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import { getFormattedDate } from "./Utils";
import { ReactComponent as AngleLft } from "../../assets/imgs/angle-left-solid.svg";
import { ReactComponent as AngleRight } from "../../assets/imgs/angle-right-solid.svg";

const EventSlider = ({ events }) => {
  const slider = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: false,
    // variableWidth: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={style.container}>
      {events.length > 0 && (
        <>
          <Slider className="events-cards-section" ref={slider} {...settings}>
            {events
              .slice()
              .reverse()
              ?.map((event) => (
                <div
                  style={{ width: 400 }}
                  className={style.item}
                  key={event?.id}
                >
                  <div>
                    <p className={style.status}>{event?.status} EVENT</p>
                    <p className={style.title}>{event?.name}</p>
                    <a
                      className={
                        event?.status === "completed" ? style.disabled : ""
                      }
                      href={event.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Register Now
                    </a>
                    <div className={style.detail}>
                      <p>{getFormattedDate(event.start, false)}</p>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
          <button
            onClick={() => slider?.current?.slickPrev()}
            className={style.ctrlBtn_left}
          >
            <AngleLft />
          </button>
          <button
            onClick={() => slider?.current?.slickNext()}
            className={style.ctrlBtn_right}
          >
            <AngleRight />
          </button>
        </>
      )}
    </div>
  );
};

export default EventSlider;
