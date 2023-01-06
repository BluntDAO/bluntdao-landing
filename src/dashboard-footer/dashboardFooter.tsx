import React, { useEffect, useState, ReactNode } from "react";
// import { useHistory } from "react-router-dom";
import style from "./dashboardFooter.module.css";

const DashboardFooter = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={`${style.section}`}>
          <div className={style.left}>
            &copy; 2022 BluntDAO. All rights reserved
          </div>
          <div className={style.right}>
            <span>Join our community</span>
            <div className={style.socialIcons}>
              <a
                className={style.icon}
                href="https://linktr.ee/BluntDAO"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/icons/linktree.svg" alt="BluntDAO LinkTree" />
              </a>
              <a
                className={style.icon}
                href="https://discord.com/invite/e3cGSTzyWp"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/icons/discord.svg" alt="BluntDAO Discord" />
              </a>
              <a
                className={style.icon}
                href="https://twitter.com/bluntdao"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/icons/twitter.svg" alt="BluntDao Twitter" />
              </a>
              <a
                className={style.icon}
                href="http://medium.com/@bluntdao"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/icons/medium.svg" alt="BluntDao medium" />
              </a>

              <a
                className={style.icon}
                href="https://t.me/+t2nnbUov1sRhMTgx"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/icons/telegram.svg" alt="BluntDAO Telegram" />
              </a>
              <a
                className={style.icon}
                href="https://www.instagram.com/bluntdao/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="/icons/instagram-brands.svg"
                  alt="BluntDAO Telegram"
                />
              </a>
              <a
                className={style.icon}
                href="https://github.com/BluntDAO/"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/icons/github-brands.svg" alt="BluntDAO github" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;
