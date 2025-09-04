import style from "./navbar.module.css";
import { useState } from "react";
import { ExternalLink } from "react-external-link";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-scroll";
import ConnectWallet from "../wallet/updatedWallet";
import useAnalyticsEventTracker from "../../utils/useAnalyticsEventTracker";

const votesArr = [
  {
    title: "SESH FUND (BASE)",
    url: "https://blunts.wtf/vote",
  },
  {
    title: "NEAR",
    url: "https://app.bluntdao.com/bluntdao.near/widget/DAO.Dashboard",
  },
  {
    title: "Solana",
    url: "https://app.sqds.io/nft/6NrbQwDSvvnkn4Yv82hVnpyLoKsriPV1D7NUXwMKMxAp/",
  },
  {
    title: "ETH",
    url: "https://snapshot.org/#/bluntdao.eth",
  },
];

const Navbar = () => {
  const [state, setState] = useState({
    dropdown: false,
  });
  const { dropdown } = state;
  const gaEventTracker = useAnalyticsEventTracker("Navbar Links");
  const handleSetState = (payload: { dropdown: boolean }) => {
    setState((state) => ({ ...state, ...payload }));
  };

  return (
    <div className={style.container}>
      <Link
        spy={true}
        smooth={true}
        hashSpy={true}
        offset={-80}
        duration={300}
        isDynamic={true}
        to="banner"
        onClick={() => handleSetState({ dropdown: false })}
      >
        <RouterLink to={"/#banner"}>
          <img
            className={style.logo}
            src="/img/BluntDAO.png"
            alt="BluntDAO Logo"
          />
        </RouterLink>
      </Link>

      <div
        className={`${style.wrapper} ${
          dropdown ? style.navActive : style.navInactive
        }`}
      >
        <br />

        <ul className={style.navList}>
          {/* <HashLink smooth to={'#banner'} onClick={() => handleSetState({ dropdown: false })}>
                        <li className={style.navItem} >THE VISION</li>
                    </HashLink> */}
          <Link
            spy={true}
            smooth={true}
            offset={0}
            duration={300}
            isDynamic={true}
            activeClass={style.active}
            hashSpy={true}
            to="pos"
            onClick={() => handleSetState({ dropdown: false })}
          >
            <RouterLink to={"/#pos"}>
              <li
                onClick={() => gaEventTracker("view", "proof of sesh")}
                className={style.navItem}
              >
                PROOF OF SESH
              </li>
            </RouterLink>
          </Link>
          {/* <HashLink
            smooth
            to={"/#gallery"}
            onClick={() => handleSetState({ dropdown: false })}
          >
            <li className={style.navItem}>GALLERY</li>
          </HashLink> */}
          <ExternalLink href="https://blunts.wtf/">
            <li
              onClick={() => gaEventTracker("view", "fund")}
              className={style.navItem}
            >
              Fund
            </li>
          </ExternalLink>
          <ExternalLink href="https://shop.bluntdao.org">
            <li className={style.navItem}>Shop</li>
          </ExternalLink>
          <div>
            <li className={style.navItem}>VOTE</li>
            <div className={style.toolTip}>
              <div>
                {votesArr.map((link) => (
                  <a
                    href={link.url}
                    target="_blank"
                    key={link.url}
                    rel="noreferrer"
                  >
                    <p>{link.title}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <ConnectWallet />
          {/* <Link
            to={'https://bluntdao.holaplex.market/'}
            // onCli-ck={() => handleSetState({ dropdown: false })}
          >
            <li className={style.navItem}>MARKETPLACE</li>
          </Link> */}
        </ul>
      </div>
      {dropdown ? (
        <img
          onClick={() => handleSetState({ dropdown: !dropdown })}
          className={style.iconClose}
          src="/icons/icon-close.svg"
          alt=""
        />
      ) : (
        <img
          onClick={() => handleSetState({ dropdown: !dropdown })}
          className={style.iconOpen}
          src="/icons/icon-hamburger.svg"
          alt=""
        />
      )}
    </div>
  );
};

export default Navbar;
