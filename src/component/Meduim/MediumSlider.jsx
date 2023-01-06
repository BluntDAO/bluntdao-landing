import { useEffect, useRef, useState } from "react";
import style from "./Medium.module.css";
import Slider from "react-slick";
import { getFormattedDateMeduimBlog } from "../Events/Utils";
import { ReactComponent as AngleLft } from "../../assets/imgs/angle-left-solid.svg";
import { ReactComponent as AngleRight } from "../../assets/imgs/angle-right-solid.svg";

const settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 694,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const blogImgs = (postEncoded) => {
  var m,
    urls = [],
    str = postEncoded,
    rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

  while ((m = rex.exec(str))) {
    urls.push(m[1]);
  }

  return urls[0];
};

const MediumSlider = () => {
  const slider = useRef(null);
  const [state, setState] = useState({
    profile: {
      ptitle: "",
      name: "",
      avtar: "",
      profileurl: "",
    },
    items: [],
    isloading: true,
    error: null,
  });

  const { profile, items } = state;

  const formattedContent = (content) => {
    return content?.substring(0, 140) + (content?.length > 140 ? "..." : "");
  };
  const formattedContentUserName = (content) => {
    return content?.substring(0, 50) + (content?.length > 100 ? "..." : "");
  };

  const handleSetState = (payload) => {
    setState((state) => ({ ...state, ...payload }));
  };

  useEffect(() => {
    let Parser = require("rss-parser");
    let parser = new Parser();
    const CORS_PROXY = "https://cors-anywhere-wjlt.onrender.com/";
    (async () => {
      let feed = await parser.parseURL(
        CORS_PROXY + "https://medium.com/feed/@bluntdao"
      );
      const avatar = feed.image.url;
      const profileLink = feed.link;
      const res = feed.items; //This is an array with the content. No feed, no info about author etc..
      const posts = res.filter((item) => item.categories.length > 0);

      const title = feed.title;
      handleSetState({
        profile: {
          ptitle: title,
          profileurl: profileLink,
          avtar: avatar,
        },
        items: posts,
        isloading: false,
      });
    })();
  }, []);
  return (
    <div className={style.swiperWrapper}>
      {items.length > 0 && (
        <Slider ref={slider} {...settings}>
          {items.map((item) => (
            <div key={item?.pubDate}>
              <a
                href={item?.link}
                target="_blank"
                rel="noreferrer"
                className={style.card}
              >
                <img
                  src={blogImgs(item["content:encoded"])}
                  alt=""
                  className={style.banner}
                />

                <img className={style.thumbnail} src={profile.avtar} alt="" />
                <div className={style.title}>
                  {/* {formattedContentUserName(
                    item?.title
                  )} */}
                  {formattedContentUserName(
                    new DOMParser().parseFromString(item?.title, "text/html")
                      .body.firstChild.textContent
                  )}
                </div>
                <div className={style.content}>
                  {formattedContent(
                    item["content:encodedSnippet"]?.replace(/<[^>]+>/g, "")
                  )}
                </div>
                <div className={style.line}></div>
                <div className={style.footer}>
                  <div className={style.handle}>
                    <img src={"/img/profile-icon.svg"} alt="" />
                    {item?.creator}
                  </div>
                  <div className={style.date}>
                    <img src={"/img/calendar-icon.svg"} alt="" />
                    {getFormattedDateMeduimBlog(item?.pubDate)}
                  </div>
                </div>
              </a>
            </div>
          ))}
        </Slider>
      )}
      <>
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
    </div>
  );
};

export default MediumSlider;
