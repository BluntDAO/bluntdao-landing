import { useState, useEffect } from "react";
import style from "./Links.module.css";
import { links, footerLinks } from "./links-script";
import { ReactComponent as Share } from "../../assets/imgs/share-links-button.svg";

export default function Links() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      setScrollY(window.scrollY);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const description =
    "🍃IRL onboarding movement via Proof of Sesh🍃 [On ◎ SOLANA + ⋈ NEAR]";
  const title = "BluntDAO";
  const shareHanlder = async () => {
    await navigator.share({
      url: "",
      title: title,
    });
  };
  return (
    <div className={style.container}>
      <div className={style.bg}>
        <div />
      </div>
      <div className={`${style.topBar} ${scrollY > 30 ? style.active : ""}`}>
        <div className={style.topLogo}>
          <img src={"/img/links-icon/gallery.png"} alt="logo" />
        </div>
        <div className={style.headerTop}>{title}</div>

        <button className={style.shareBtn} onClick={shareHanlder}>
          <Share />
        </button>
      </div>
      <div className={style.wrapper}>
        <div className={style.header}>
          <div className={style.logo}>
            <img src={"/img/links-icon/gallery.png"} alt="logo" />
          </div>
          <div className={style.title}> {title}</div>
          <div className={style.description}> {description}</div>
        </div>
        <div className={style.links}>
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              className={style.link}
              key={link.title}
              rel="noreferrer"
            >
              <img src={link.img} alt={link.title} />
              <div>{link.title}</div>
            </a>
          ))}
        </div>
        <div className={style.footerLinks}>
          {footerLinks.map((link) => (
            <a href={link.url} target="_blank" key={link.url} rel="noreferrer">
              {link.img}
            </a>
          ))}
        </div>
        <div className={style.copyright}>
          © Copyright by {new Date().getFullYear()}&nbsp; {title}
        </div>
      </div>
    </div>
  );
}
