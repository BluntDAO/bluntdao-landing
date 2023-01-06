import React, { useContext, useEffect } from "react";
import style from "./dashboradNav.module.css";
import { ReactComponent as IconSearch } from "../../assets//imgs/icon-search.svg";
import { ReactComponent as IconSideNav } from "../../assets//imgs/side-hamburger.svg";
import { Link as RouterLink } from "react-router-dom";
import ConnectWallet from "../wallet/updatedWallet";
// wallet script
import { login } from "../../component/wallet/updatedWallet-script";
import { GenContext } from "../../gen-state/gen.context";
import { setAccount, setProvider } from "../../gen-state/gen.actions";

const DashboradNav = (props: any) => {
  const { handleSetState, sideNavStatus, dropdown } = props;
  const { dispatch, account, web3auth, provider } = useContext(GenContext);

  const walletProps = {
    dispatch,
    web3auth,
    provider,
    setAccount,
    setProvider,
  };

  const initLogin = async () => {
    console.log(account);

    if (!account && web3auth) await login(walletProps);
  };

  useEffect(() => {
    initLogin();
  }, [account, web3auth]);

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <RouterLink to={"/"}>
          <img src="/img/BluntDAO.png" alt="BluntDAO Logo" />
        </RouterLink>
      </div>
      <div className={style.wrapper}>
        <div className={`${style.navItems} ${dropdown ? style.navActive : ""}`}>
          <div className={style.searhBar}>
            <IconSearch />
            <input type="text" placeholder="Search" />
          </div>
          <ConnectWallet />
        </div>
        <IconSideNav
          onClick={() => handleSetState({ sideNavStatus: !sideNavStatus })}
          className={`${style.sideNavIcon} ${sideNavStatus && style.active}`}
        />
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
    </div>
  );
};

export default DashboradNav;
