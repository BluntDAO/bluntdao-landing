import React, { useContext } from "react";
import style from "./dashboardContent.module.css";
import userIcon from "../../assets//imgs/dashboard/user-icon.png";
import { GenContext } from "../../gen-state/gen.context";
import DashboardTopSection from "./DashboardTopSection";
import DashboardLeaderboard from "./DashboardLeaderboard";
import DashboardValidator from "../../component/dashboard-validator/dashboardValidator";
import DashboardSocialGraph from "../dashboard-social-graph/dashboardSocialGraph.jsx";

const breakAddress = (address = "", width = 6) => {
  if (address)
    return `${address.slice(0, width)}.......${address.slice(-width)}`;
};

const DashboardContent = (props: any) => {
  const { sideNavStatus } = props;
  const { account } = useContext(GenContext);
  return (
    <div className={`${style.container} ${sideNavStatus && style.inactive}`}>
      <div className={style.header}>
        👋 Welcome Back, <img src={userIcon} alt="" /> {breakAddress(account)}
      </div>
      <div className={style.wrapper}>
        <div className={style.topPart}>
          <DashboardTopSection />
          <DashboardLeaderboard />
          <DashboardValidator />
          <DashboardSocialGraph />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
