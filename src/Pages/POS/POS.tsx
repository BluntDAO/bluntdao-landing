import React, { useContext, useState } from "react";
import style from "./POS.module.css";
import Capture from "../../component/Capture/Capture";
import StickSelect from "../../component/stick-select/stickSelect";
import ScanQR from "../../component/ScanQR/ScanQR";
import PosForm from "../../component/PosForm/PosForm";
import Navbar from "../../component/Navbar/Navbar";
import { GenContext } from "../../gen-state/gen.context";
import { setNotification } from "../../gen-state/gen.actions";

const POS = () => {
  const { dispatch, account, web3auth } = useContext(GenContext);

  const [state, setState] = useState({
    cameraEnable: false,
    addresses: ["0FS53...ds8k2v"],
    typeSelect: { toggle: false, value: "" },
    toggle: false,
    detectionToggle: false,
    scanTogggle: false,
    clipboardState: false,
    img: "",
    location: {
      lat: "",
      lon: "",
    },
  });

  const {
    cameraEnable,
    toggle,
    img,
    typeSelect,
    detectionToggle,
    location,
    scanTogggle,
    addresses,
    clipboardState,
  } = state;

  const handleSetState = (payload: any) => {
    setState((state) => ({ ...state, ...payload }));
  };

  console.log(typeSelect);

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
                  onClick={() => {
                    // if (account?.length) {
                    //   handleSetState({ detectionToggle: true });
                    // } else {
                    //   dispatch(
                    //     setNotification({
                    //       message: "You must sign in to continue",
                    //       type: "error",
                    //     })
                    //   );
                    // }
                    handleSetState({ detectionToggle: true });
                  }}
                  className={style.btn}
                >
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
          {detectionToggle && (
            <StickSelect
              {...{
                handleSetState,
                typeSelect,
              }}
            />

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
          )}
          {false && (
            <ScanQR
              {...{
                handleSetState,
                addresses,
              }}
            />
          )}
          {scanTogggle && (
            <PosForm
              {...{
                handleSetState,
                addresses,
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
