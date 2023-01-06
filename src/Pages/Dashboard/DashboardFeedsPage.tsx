import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import style from "./Dashboard.module.css";
import DashboardSideNav from "../../component/dashnoard-side-nav/dashboardSideNav";
import DashboardFooter from "../../dashboard-footer/dashboardFooter";
import DashboradNav from "../../component/dashboard-nav/dashboradNav";
// Dashboard pages
import DashboardFeeds from "../../component/dashboard-feeds/dashboardFeeds";
// wallet script
import { login } from "../../component/wallet/updatedWallet-script";
import { GenContext } from "../../gen-state/gen.context";
import { setAccount, setProvider } from "../../gen-state/gen.actions";

const DashboardFeedsPage = () => {
  const [state, setState] = useState({
    sideNavStatus: false,
    dropdown: false,
  });
  const { sideNavStatus, dropdown } = state;

  const handleSetState = (payload: any) => {
    setState((state) => ({ ...state, ...payload }));
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const { dispatch, account, web3auth, provider } = useContext(GenContext);
  const handleClickOutside = (event: any) => {
    if (wrapperRef?.current?.contains(event.target)) {
      setTimeout(() => {
        handleSetState({
          sideNavStatus: false,
        });
      }, 100);
    }
  };

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
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    initLogin();
  }, [account, web3auth]);

  useEffect(() => {
    if (account === null) {
      history.push("/");
    }
  }, [account]);

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
        <DashboardFeeds />
      </div>
      {/* <Footer /> */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardFeedsPage;
