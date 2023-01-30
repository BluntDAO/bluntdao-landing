import React, { useState, useRef, useEffect, useContext } from "react";
import QrReader from "react-qr-scanner";
import style from "./ScanQR.module.css";
import { PublicKey } from "@solana/web3.js";
import { GenContext } from "../../gen-state/gen.context";
import { setNotification } from "../../gen-state/gen.actions";
import { ReactComponent as ScanIcon } from "../../assets/imgs/icon-scan-outline.svg";
import { ReactComponent as CameraIcon } from "../../assets/imgs/icon-camera-light.svg";
import { ReactComponent as SolanaIcon } from "../../assets/imgs/icon-solana-bordered.svg";
import { ReactComponent as BackIcon } from "../../assets/imgs/icon-goback.svg";

const ScanQR = ({ ...props }) => {
  const { addresses, handleSetState, toggleUpdate } = props;
  const { dispatch } = useContext(GenContext);

  const [data, setData] = useState("");
  const handleScan = (data) => {
    if (data) {
      console.log(data);
      setData(data.text);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  const cardRef = useRef();

  useEffect(() => {
    console.log(data);
    try {
      const isBase58 = (value) => /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);
      let address;
      if (isBase58(data)) {
        address = new PublicKey(data);
      } else if (!data.length) {
        dispatch(
          setNotification({
            message: "invalid! not a Solana address. Try again",
            type: "warning",
          })
        );
      }
      if (data && address) {
        if (PublicKey.isOnCurve(address) && !addresses.includes(data)) {
          handleSetState({ addresses: [...addresses, data] });
        } else {
          dispatch(
            setNotification({
              message: "this address has been added",
              type: "warning",
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [data]);
  console.log(addresses);
  return (
    <div className={style.selectContainer}>
      <div className={style.container}>
        <div className={style.card} ref={cardRef}>
          <div className={style.headerText}>Scan Solana/NEAR OG Validator</div>
          <QrReader
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />

          <div className={style.addressCard}>
            <div className={style.cardTop}>
              <div className={style.content}>
                <p>Open Link | Get Validated</p>
                <div>
                  <SolanaIcon />
                  E93srKpyU....KR3XzpR5
                </div>
              </div>
              <BackIcon />
            </div>
            <div className={style.btnWrapper}>
              <div>
                <ScanIcon />
                Scan Another
              </div>
              <p onClick={() => toggleUpdate("capture")}>
                <CameraIcon />
                Take Picture
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
