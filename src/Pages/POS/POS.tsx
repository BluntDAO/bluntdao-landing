import React, { useContext, useState } from "react";
import style from "./POS.module.css";
import Capture from "../../component/Capture/Capture";
import Navbar from "../../component/Navbar/Navbar";
import { GenContext } from "../../gen-state/gen.context";
import { setNotification } from "../../gen-state/gen.actions";

const POS = () => {
  const { dispatch, account, web3auth } = useContext(GenContext);

  console.log(web3auth);
  console.log(account);

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
              <div className={style.header}>Request Proof of Sesh</div>
              <div className={style.content}>
                Get your BluntDAO Soul Bound NFT by verifying your Blunt via
                Proof of Sesh by a validator in your area.
              </div>
              <div className={style.btnContainer}>
                <div
                  onClick={() => {
                    if (account?.length) {
                      handleSetState({ cameraEnable: true });
                    } else {
                      dispatch(
                        setNotification({
                          message: "You must sign in to continue",
                          type: "error",
                        })
                      );
                    }
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
