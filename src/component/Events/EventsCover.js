import React from "react";
import Slider from "react-slick";
import style from "./Events.module.css";
import { getFormattedDate } from "./Utils";

const EventsCover = ({ events }) => {
  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
  };
  const sortEvents = (events) => {
    const arr = [...events];
    const order = ["live", "completed", "upcoming"];
    arr.sort((x, y) => order.indexOf(x.status) - order.indexOf(y.status));
    return arr;
  };
  return (
    <div>
      {" "}
      {events.length > 0 && (
        <Slider className="events-sliders-section" {...settings}>
          {sortEvents(events)?.map((event) => (
            <div key={event?.id}>
              <div
                className={style.coverItem}
                style={{
                  //   backgroundImage: `url()`,
                  background: `linear-gradient(0deg, rgba(0, 0, 0, 0.83), rgba(0, 0, 0, 0.83)), url('${event?.img_url})`,
                }}
              >
                <p className={style.status}>{event?.status} EVENT</p>
                <p className={style.title}>{event?.name}</p>
                <div className={style.detail}>
                  <p>{getFormattedDate(event?.start)}</p>
                  <div className={style.seprator}></div>
                  <div> {event?.venue_id?.address}</div>
                </div>
                <a
                  className={
                    event?.status === "completed" ? style.disabled : ""
                  }
                  href={event?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  REGISTER NOW
                </a>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default EventsCover;
