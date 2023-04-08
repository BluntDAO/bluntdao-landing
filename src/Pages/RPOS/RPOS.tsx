import React, { useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import classes from "./RPOS.module.css";
import { ReactComponent as CloseIcon } from "../../assets/imgs/smooking-stick-close.svg";
import { ReactComponent as Joint } from "../../assets/imgs/smookingSticks/joint.svg";
import { ReactComponent as Spliff } from "../../assets/imgs/smookingSticks/spliff.svg";
import { ReactComponent as Blunt } from "../../assets/imgs/smookingSticks/blunt.svg";
import { ReactComponent as Cigar } from "../../assets/imgs/smookingSticks/cigar.svg";
import { ReactComponent as Cigarette } from "../../assets/imgs/smookingSticks/cigarette.svg";
import ScanQR from "../../component/ScanQR/ScanQR";

const RPOS = () => {
  const [state, setState] = useState({
    cameraEnable: false,
    typeSelect: { toggle: false, value: "" },
    toggle: false,
    detectionToggle: false,
    img: "",
    location: {
      lat: "",
      lon: "",
    },
    smookingSticks: false,
  });
  const [open, setOpen] = useState(false);

  const {
    cameraEnable,
    toggle,
    img,
    typeSelect,
    detectionToggle,
    location,
    smookingSticks,
  } = state;

  const handleSetState = (payload: any) => {
    setState((state) => ({ ...state, ...payload }));
  };

  const smookingStickList = [
    { Name: "Joint", icon: <Joint />, isSelected: true },
    { Name: "Spliff", icon: <Spliff />, isSelected: false },
    { Name: "Blunt", icon: <Blunt />, isSelected: false },
    { Name: "Cigar", icon: <Cigar />, isSelected: false },
    { Name: "Cigarette", icon: <Cigarette />, isSelected: false },
  ];
  const Sticks = smookingStickList.map((stick) => {
    return (
      <div
        key={stick.Name}
        className={classes.smookingStick}
        onClick={() => {
          handleSetState({ cameraEnable: true, smookingSticks: false });
        }}
      >
        {stick.icon}
        <span>{stick.Name}</span>
      </div>
    );
  });

  const toggleDrawer = () => {
    setOpen(true);
  };
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.section}>
          {!cameraEnable && (
            <div className={classes.banner}>
              <img
                className={classes.bluntRequestIcon}
                src="/img/blunt-request.svg"
                alt="proof of sesh icon"
              />
              <h2 className={classes.header}>Request Proof Of Sesh</h2>
              <p className={classes.content}>
                Get your BluntDAO Soul Bound NFT by verifying your Blunt via
                Proof of Sesh by a validator in your area.
              </p>
              <div className={classes.btnArea}>
                <button
                  onClick={() => {
                    handleSetState({ smookingSticks: true });
                  }}
                  className={classes.btn}
                >
                  Request a Blunt
                </button>
                <a
                  target="_blank"
                  href="https://medium.com/@bluntdao/proof-of-sesh-explained-bluntdao-19ecd8479750"
                  className={`${classes.btn} ${classes.btnReverse}`}
                  rel="noreferrer"
                >
                  Learn More
                </a>
              </div>
            </div>
          )}
          {cameraEnable && (
            // <Capture
            //   {...{
            //     toggle,
            //     handleSetState,
            //     img,
            //     typeSelect,
            //     detectionToggle,
            //     location,
            //   }}
            // />
            <ScanQR />
          )}
          {smookingSticks && (
            <div className={classes.smookingStickDrawer}>
              <header className={classes.smokingStickHeader}>
                <section className={classes.smookingStickTitleSection}>
                  <h2 className={classes.header}>Smoking stick</h2>
                  <p className={classes.content}>
                    Select the stick that you are about to scan
                  </p>
                </section>
                <CloseIcon
                  onClick={() => {
                    handleSetState({ smookingSticks: false });
                  }}
                  style={{ cursor: "pointer" }}
                />
              </header>
              <main className={classes.listSmookingSticks}>{Sticks}</main>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RPOS;
