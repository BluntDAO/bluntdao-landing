import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import style from "./Dashboard.module.css";
import DashboardSideNav from "../../component/dashnoard-side-nav/dashboardSideNav";
import DashboardFooter from "../../dashboard-footer/dashboardFooter";
import DashboradNav from "../../component/dashboard-nav/dashboradNav";
import DashboardNFT from "../../component/dashboard-nft/dashboardNFT";
import { GenContext } from "../../gen-state/gen.context";

const DashboardNFTpage = () => {
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
  const { account } = useContext(GenContext);

  const handleClickOutside = (event: any) => {
    if (wrapperRef?.current?.contains(event.target)) {
      setTimeout(() => {
        handleSetState({
          sideNavStatus: false,
        });
      }, 100);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);
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
        <DashboardNFT />
      </div>
      {/* <Footer /> */}
      <DashboardFooter />
    </div>
  );
};

export default DashboardNFTpage;
