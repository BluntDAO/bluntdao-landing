import React, { useState } from "react";
import style from "./POS.module.css";
import Capture from "../../component/Capture/Capture";
import Navbar from "../../component/Navbar/Navbar";

const POS = () => {
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
  });

  const { cameraEnable, toggle, img, typeSelect, detectionToggle, location } =
    state;

  const handleSetState = (payload: any) => {
    setState((state) => ({ ...state, ...payload }));
  };
  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className="section">
          {!cameraEnable && (
            <div className={style.banner}>
              <img src="/img/blunt-request.svg" alt="" />
              <div className={style.header}>Request Proof Of Sesh</div>
              <div className={style.content}>
                BluntDAO is the IRL onboarding movement to Web3 via proof of
                sesh. The longest continous sesh via OG Blunt Validators in the
                Blunt Network. Onboarding the next 1 million users to Web3,
                wallets, DIDs, DAOs, and NFTs 1 blunt at a time.
              </div>
              <div
                onClick={() => {
                  handleSetState({ cameraEnable: true });
                }}
                className={style.btn}
              >
                Request For Blunt
              </div>
            </div>
          )}
          {cameraEnable && (
            <Capture
              {...{
                toggle,
                handleSetState,
                img,
                typeSelect,
                detectionToggle,
                location,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default POS;
