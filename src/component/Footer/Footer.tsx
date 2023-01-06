import React, { ReactNode } from "react";
import style from "./footer.module.css";
import footerLinks from "./Footer-script";

interface Props {
  children?: ReactNode;
  backgroundColor: string;
  // any props that come into the component
}

const Footer = ({ children, ...props }: Props) => {
  return (
    <div
      style={{
        background: props.backgroundColor,
      }}
      className={style.wrapper}
    >
      <div className={style.container}>
        <div className={`${style.section} section`}>
          <div className={style.left}>
            &copy; 2022 BluntDAO. All rights reserved
          </div>
          <div className={style.right}>
            <span>Join our community</span>
            <div className={style.socialIcons}>
              {footerLinks.map((elm) => (
                <a
                  className={style.icon}
                  href={elm.url}
                  target="_blank"
                  rel="noreferrer"
                  key={elm.url}
                >
                  <img src={elm.icon} alt="link-icon" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
