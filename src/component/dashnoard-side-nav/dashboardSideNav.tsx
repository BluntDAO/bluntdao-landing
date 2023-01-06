import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import style from "./dashboardSideNav.module.css";
import data from "./dashboardSideNav-script";

const DashboardSideNav = (props: any) => {
  const { sideNavStatus } = props;
  const location = useLocation();
  const history = useHistory();
  return (
    <div className={`${style.container} ${sideNavStatus && style.active}`}>
      {data.map((tab) => (
        <div
          onClick={() => history.push(`/dashboard/${tab.route}`)}
          className={`${style.tabItem} ${
            location.pathname === `/dashboard/${tab.route}` && style.active
          }`}
          id={
            location.pathname === `/dashboard/${tab.route}`
              ? tab.title + "Active"
              : tab.title
          }
          key={tab.title}
        >
          {tab.icon}
          <div>{tab.title}</div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSideNav;
