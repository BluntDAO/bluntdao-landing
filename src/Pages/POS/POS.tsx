import React, { useContext, useState } from "react";
import style from "./POS.module.css";
import Capture from "../../component/mint-webcam/Capture/Capture";
import StickSelect from "../../component/stick-select/stickSelect";
import ScanQR from "../../component/ScanQR/ScanQR";
import PosForm from "../../component/PosForm/PosForm";
import Navbar from "../../component/Navbar/Navbar";
import { GenContext } from "../../gen-state/gen.context";
import { setNotification } from "../../gen-state/gen.actions";

const POS = () => {
  const { dispatch, account } = useContext(GenContext);

  const [state, setState] = useState({
    cameraEnable: false,
    typeSelect: { toggle: false, value: "" },
    toggle: {
      detection: false,
      scan: false,
      capture: false,
      form: false,
    },
    detectionToggle: false,
    scanTogggle: false,
    captureToggle: false,
    clipboardState: false,
    location: {
      lat: "",
      lon: "",
    },
  });

  const { cameraEnable, typeSelect, toggle, clipboardState } = state;

  const handleSetState = (payload: any) => {
    setState((state) => ({ ...state, ...payload }));
  };

  const toggleUpdate = (updateKey = "") => {
    const updatedToggle: Record<string, any> = {};
    for (const key of Object.keys(toggle)) {
      if (updateKey === key) {
        updatedToggle[updateKey] = true;
        console.log(updatedToggle);
      } else {
        updatedToggle[key] = false;
        console.log(updatedToggle);
      }
    }
    handleSetState({ toggle: updatedToggle });
  };
  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className="section">
          {!cameraEnable && (
            <div className={style.banner}>
              <img src="/img/blunt-request.svg" alt="" />
              <div className={style.header}>Request Proof of Sesh</div>
              <div className={style.content}>
                Get your BluntDAO Soul Bound NFT by verifying your Blunt via
                Proof of Sesh by a validator in your area.
              </div>
              <div className={style.btnContainer}>
                <div
                  //onClick={() => {
                    //if (account?.length) {
                      //toggleUpdate("detection");
                    //} else {
                      //dispatch(
                        //setNotification({
                          //message: "You must sign in to continue",
                          //type: "error",
                        //})
                      //);
                    //}
                  //}}
                  className={style.btn}
                //>
                  Request For Blunt
                </div>
                <a
                  href="https://medium.com/@bluntdao/proof-of-sesh-explained-bluntdao-19ecd8479750"
                  target="_blank"
                  className={style.btn}
                  rel="noreferrer"
                >
                  Learn More
                </a>
              </div>
            </div>
          )}
          {toggle.detection && (
            <StickSelect
              {...{
                handleSetState,
                typeSelect,
                toggleUpdate,
              }}
            />
          )}
          {toggle.scan && (
            <ScanQR
              {...{
                handleSetState,
                toggleUpdate,
              }}
            />
          )}
          {toggle.capture && (
            <Capture
              {...{
                handleSetState,
                toggleUpdate,
              }}
            />
          )}
          {toggle.form && (
            <PosForm
              {...{
                toggleUpdate,
                handleSetState,
                clipboardState,
                typeSelect,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default POS;
