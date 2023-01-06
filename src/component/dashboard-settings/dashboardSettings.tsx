import React from "react";
import style from "./dashboardSettings.module.css";
import userIcon from "../../assets//imgs/dashboard/user-icon.png";
import { ReactComponent as DiscordIcon } from "../../assets/imgs/icon-disocrd.svg";
import { ReactComponent as TwitterIcon } from "../../assets/imgs/icon-twitter.svg";

const DashboardSettings = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <p>Settings</p>
      </div>
      <div className={style.wrapper}>
        <div className={style.profilePic}>
          <p>Profile Picture</p>
          <img src={userIcon} alt="" />
        </div>
        <p className={style.subheader}>Edit Profile</p>
        <label>Email</label>
        <input type="text" />
        <label>Wallet Address</label>
        <input className={style.infoInput} type="text" />
        <div className={style.infoTxt}>
          To update your address just change to your different wallet.
        </div>
        <p className={style.subheader}>Social Media</p>
        <div className={style.socialLabel}>Twitter</div>
        <div className={style.social}>
          <TwitterIcon /> <p>https://www.twitter.com/</p>
          <input type="text" />
        </div>
        <div className={style.discordLabel}>Discord</div>
        <div className={style.social}>
          <DiscordIcon /> <p>https://discordapp.com/users/</p>
          <input type="text" />
        </div>
        <div className={style.btn}>Save Changes</div>
      </div>
    </div>
  );
};

export default DashboardSettings;
