import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import style from "./Dashboard.module.css";
import { GenContext } from "../../gen-state/gen.context";
import { initConnectWallet } from "../../component/wallet/wallet-script";
import DashboardSideNav from "../../component/dashnoard-side-nav/dashboardSideNav";
import DashboardFooter from "../../dashboard-footer/dashboardFooter";
import DashboradNav from "../../component/dashboard-nav/dashboradNav";
import NftSingle from "../../component/dashborad-nft-single/NftSingle";
const DashboardNFTSingle = () => {
  const [state, setState] = useState({
    sideNavStatus: false,
    dropdown: false,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { account, dispatch, toggleWalletPopup } = useContext(GenContext);
  const handleClickOutside = (event: any) => {
    if (wrapperRef?.current?.contains(event.target)) {
      setTimeout(() => {
        handleSetState({
          sideNavStatus: false,
        });
      }, 100);
    }
  };
  console.log(toggleWalletPopup);

  useEffect(() => {
    // console.log(account);

    if (!account) initConnectWallet({ dispatch });

    // if (!toggleWalletPopup && !account) history.push("/");

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (account === null) {
      history.push("/");
    }
  }, [account]);

  const { sideNavStatus, dropdown } = state;

  const handleSetState = (payload: any) => {
    setState((state) => ({ ...state, ...payload }));
  };
  return (
    <div className={style.container}>
      <DashboradNav
        handleSetState={handleSetState}
        sideNavStatus={sideNavStatus}
        dropdown={dropdown}
      />
      <div ref={wrapperRef} className={style.wrapper}>
        <DashboardSideNav
          sideNavStatus={sideNavStatus}
          handleSetState={handleSetState}
        />
        <NftSingle />
      </div>
      {/* <Footer /> */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardNFTSingle;
