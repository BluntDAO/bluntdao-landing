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
            BluntDAO is the IRL onboarding movement to Web3 via Proof of Sesh.
            The longest continous sesh via OG Blunt Validators in the Blunt
            Network. Onboarding the next 1 million users to Web3, wallets, DIDs,
            DAOs, and NFTs 1 blunt at a time.
          </div>

          <div className={style.join}>
            <a
              className={style.discord}
              href="https://discord.com/invite/e3cGSTzyWp"
              rel="noopener noreferrer"
              target="_blank"
            >
              DISCORD
            </a>
            {/* <div className={style.discord}>JOIN DISCORD</div> */}

            {/* <a className={style.volunteer} href="https://doc.clickup.com/d/xhfvf-20/bluntifesto/xhfvf-240/volunteer-interest-form" rel="noopener noreferrer" target="_blank">VOLUNTEER</a> */}
            <a
              className={style.volunteer}
              href="https://app.sqds.io/nft/6NrbQwDSvvnkn4Yv82hVnpyLoKsriPV1D7NUXwMKMxAp/"
              rel="noopener noreferrer"
              target="_blank"
            >
              VOTE
            </a>
          </div>
        </div>

        {/* <img className={style.img2} src="/img/BluntAnimated.gif" alt="BluntDAO animated" /> */}
        <img className={style.img2} src="/img/banner.gif" alt="BluntDAO" />
      </div>
      {/* <div className={`${style.section} section`}></div> */}
      <div className={style.separateRough}></div>
    </div>
  );
};

export default Banner;
