import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import useAnalyticsEventTracker from "../../utils/useAnalyticsEventTracker";
import style from "./Partner.module.css";
import PartnersData from "./data";
const Partner = () => {
  const [endIndex, setEndeIndex] = useState(6);
  const [endlimit, setEndlimit] = useState(6);

  const gaEventTracker = useAnalyticsEventTracker("Partner Form");
  useLayoutEffect(() => {
    function updateSize() {
      if (window?.innerWidth <= 1200) {
        setEndlimit(4);
        setEndeIndex(4);
      } else {
        setEndlimit(6);
        setEndeIndex(6);
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.separateRoughFlibbed} />
      <div className={`${style.section} section`}>
        <div className={style.grid}>
          <div className={style.content}>
            <h2>Partner with BluntDAO</h2>
            <p>
              BluntDAO is the biggest IRL Web3 onboarding movement powered via
              Proof of Sesh on Solana, NEAR. We are happy to be run by a
              community of creatives, developers, founders, and investors. We
              continue to support and be supported by local community partners.{" "}
            </p>
            <Link
              onClick={() => gaEventTracker("click", "partner form")}
              to="/partner"
            >
              Apply
            </Link>
          </div>
          <div className={style.logoConatiner}>
            <div className={style.logos}>
              {PartnersData.slice(0, endIndex).map((logo) => (
                <a
                  key={logo.url}
                  href={logo.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={logo.img} alt={logo.url} />
                </a>
              ))}
            </div>
            {PartnersData.length > endIndex && (
              <p onClick={() => setEndeIndex(PartnersData.length)}>View More</p>
            )}
            {endIndex > endlimit && (
              <p onClick={() => setEndeIndex(endlimit)}>View less</p>
            )}
          </div>
        </div>
      </div>
      <div className={style.separateRough} />
    </div>
  );
};

export default Partner;
