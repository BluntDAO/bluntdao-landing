import style from "./banner.module.css";

const Banner = () => {
  return (
    <div className={style.container}>
      <div className={`${style.section} section`}>
        <div className={style.description}>
          <div className={style.header}>
            <div className={style.features}>
              <div className={style.fWrapper}>
                <div>BluntDAO</div>
                <div>SpliffDAO</div>
                <div>JointsDAO</div>
                <div>HashishDAO</div>
                <div>StonedDAO</div>
              </div>
            </div>
          </div>
          <div className={style.content}>
            BluntDAO is the biggest IRL onboarding movement to Web3 via Proof of Sesh through local IRL OGs. We are now introducing the unlimtted sesh fund, a regular re-up mechanism where anyone can request crypto to host a sesh from contributors. Onboarding the next billion, 1 blunt/sesh at a time.
          </div>

          <div className={style.join}>
            <a
              className={style.discord}
              href="https://t.me/+ban7bVBaU5Q5YmJh"
              rel="noopener noreferrer"
              target="_blank"
            >
              Telegram
            </a>
            {/* <div className={style.discord}>JOIN DISCORD</div> */}

            {/* <a className={style.volunteer} href="https://doc.clickup.com/d/xhfvf-20/bluntifesto/xhfvf-240/volunteer-interest-form" rel="noopener noreferrer" target="_blank">VOLUNTEER</a> */}
            <a
              className={style.volunteer}
              href="https://blunts.wtf"
              rel="noopener noreferrer"
              target="_blank"
            >
              FUND
            </a>
          </div>
        </div>

        {/* <img className={style.img2} src="/img/BluntAnimated.gif" alt="BluntDAO animated" /> */}
        <img 
          className={style.img2} 
          src="/img/banner.gif" 
          alt="BluntDAO" 
          loading="lazy"
          decoding="async"
        />
      </div>
      {/* <div className={`${style.section} section`}></div> */}
      <div className={style.separateRough}></div>
    </div>
  );
};

export default Banner;
