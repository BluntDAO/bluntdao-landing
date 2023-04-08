import React, { useState, useRef, useEffect, useContext } from "react";
import QrReader from "react-qr-scanner";
import style from "./ScanQR.module.css";
import { PublicKey } from "@solana/web3.js";
import { GenContext } from "../../gen-state/gen.context";
import { setNotification, setPOSdetails } from "../../gen-state/gen.actions";
import AddressCard from "../AddressCard/AddressCard";

const ScanQR = ({ ...props }) => {
  const { handleSetState, toggleUpdate } = props;
  const { dispatch, posDetails } = useContext(GenContext);

  const [data, setData] = useState("");
  const [toggleScan, setToggleScan] = useState(true);

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
        if (
          PublicKey.isOnCurve(address) &&
          !posDetails.addresses.includes(data)
        ) {
          setToggleScan(false);
          dispatch(
            setPOSdetails({
              img: posDetails.img,
              addresses: [...posDetails.addresses, data],
            })
          );
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
  return (
    <div className={style.selectContainer}>
      <div className={style.container}>
        <div className={style.card} ref={cardRef}>
          <div className={style.headerText}>Scan Solana/NEAR OG Validator</div>
          {toggleScan && (
            <QrReader
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />
          )}
          {posDetails.addresses.length && (
            <AddressCard
              toggleUpdate={toggleUpdate}
              setToggleScan={setToggleScan}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanQR;
