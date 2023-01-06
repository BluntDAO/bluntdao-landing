import { useEffect, useRef, useState } from "react";
import axios from "axios";
import style from "./Review.module.css";
import twitterIcon from "../../assets/imgs/twitter.svg";
import Slider from "react-slick";
import { getFormattedDateTweets } from "../Events/Utils";
import { ReactComponent as AngleLft } from "../../assets/imgs/angle-left-solid.svg";
import { ReactComponent as AngleRight } from "../../assets/imgs/angle-right-solid.svg";

const twitterAPIURL = (twitterIDs) => {
  let ids = "";
  twitterIDs.forEach((id, idx) => {
    if (idx < twitterIDs.length - 1) {
      ids += `${id},`;
    } else {
      ids += `${id}`;
    }
  });
  return `https://api.twitter.com/2/tweets?ids=${ids}&tweet.fields=attachments,author_id,created_at,entities&expansions=attachments.media_keys,author_id&media.fields=alt_text,duration_ms,media_key,preview_image_url,type,url,variants&user.fields=name,profile_image_url,username`;
};
const tweets = [
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

const Review = () => {
  const cardRef = useRef(null);
  const slider = useRef(null);
  const [state, setState] = useState({
    tweetsData: [],
  });

  const { tweetsData } = state;

  const handleSetState = (payload) => {
    setState((state) => ({ ...state, ...payload }));
  };

  const formattedContent = (content) => {
    return content.substring(0, 140) + (content.length > 140 ? "..." : "");
  };
  const formattedContentUserName = (content) => {
    return content.substring(0, 20) + (content.length > 20 ? "..." : "");
  };

  useEffect(() => {
    axios
      .get("https://cors-anywhere-wjlt.onrender.com/" + twitterAPIURL(tweets), {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TWITTER_ACCESS_TOKEN}`,
        },
      })
      .then((data) => {
        let tweets = data.data;
        let attachments = {};
        let users = {};
        data.data.includes.users.forEach((element) => {
          users[element.id] = {
            id: element.id,
            username: element.username,
            profile_image_url: element.profile_image_url,
            name: element.name,
          };
        });
        data.data.includes.media.forEach((element) => {
          let img;
          if (element?.type === "photo") {
            img = element?.url;
          } else {
            img = element.variants[0]?.url;
          }
          attachments[element.media_key] = {
            media_key: element.media_key,
            type: element?.type,
            url: img,
          };
        });
        tweets = data.data.data.map((tweet) => {
          return {
            id: tweet.id,
            media: attachments[tweet?.attachments?.media_keys[0]],
            author_id: users[tweet?.author_id],
            created_at: tweet?.created_at,
            text: tweet.text?.split("https://t.co/")[0],
            url: `https://twitter.com/${
              users[tweet?.author_id]?.username
            }/status/${tweet.id}`,
            domain: "Twitter Web App",
            icon: twitterIcon,
            links: tweet.entities?.urls?.filter(
              (link) => !link.display_url.includes("pic.twitter")
            )[0],
          };
        });
        tweets.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.created_at) - new Date(a.created_at);
        });
        handleSetState({ tweetsData: tweets });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={`${style.container} reviews-section`}>
      <div className="section">
        <div className={style.header}>Buzz on Twitter</div>
        <div className={style.subheader}>
          See how people are getting Buzzed off the BluntDAO on twitter
        </div>
        <div className={style.swiperWrapper}>
          <Slider ref={slider} {...settings}>
            {tweetsData.map((review) => (
              <div key={review.id}>
                <a
                  href={review.url}
                  target="_blank"
                  rel="noreferrer"
                  ref={cardRef}
                  className={style.card}
                >
                  <div className={style.cardHeader}>
                    <img src={review.icon} alt="" className={style.icon} />
                    <div className={style.date}>
                      {getFormattedDateTweets(review.created_at)}
                    </div>
                    <div className={style.domain}>{review.domain}</div>
                  </div>
                  {review?.media?.type === "photo" && review?.media?.url ? (
                    <img
                      src={review.media.url}
                      alt=""
                      className={style.banner}
                    />
                  ) : review?.media?.url ? (
                    <video
                      className={style.banner}
                      src={review.media?.url}
                      loop={true}
                    />
                  ) : (
                    ""
                  )}
                  <div className={style.content}>
                    {formattedContent(review.text)}
                  </div>
                  {!review?.media?.url && <div className={style.filler} />}
                  <div className={style.line}></div>
                  <div className={style.footer}>
                    <img
                      className={style.thumbnail}
                      src={review.author_id.profile_image_url}
                      alt=""
                    />
                    <div className={style.wrapper}>
                      <div className={style.name}>
                        {formattedContentUserName(review.author_id.name)}
                      </div>
                      <div className={style.handle}>
                        @{review.author_id.username}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </Slider>
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
      </div>
    </div>
  );
};

export default Review;
