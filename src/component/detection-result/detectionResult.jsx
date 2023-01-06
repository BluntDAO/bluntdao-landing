import { useEffect, useRef, useState, useContext } from "react";
import style from "./detectionResult.module.css";
import { GenContext } from "../../gen-state/gen.context";
import { AES, enc } from "crypto-js";
import QRCode from "react-qr-code";
import { ReactComponent as IconFailer } from "../../assets/imgs/detection-falier.svg";
import { ReactComponent as IconSucceed } from "../../assets/imgs/detection-succeed.svg";
import { ReactComponent as WelcomeEffect } from "../../assets/imgs/welcome-effect.svg";
import { ReactComponent as CloseIcon } from "../../assets/imgs/icon-close.svg";

const DetectionResult = ({
  handleSetState,
  toggle,
  detectionToggle,
  typeSelect,
  location,
}) => {
  const cardRef = useRef();
  const { account, chainId } = useContext(GenContext);
  const [genrateStatus, setGenrateStatus] = useState(false);
  const [QRvalue, setQRvalue] = useState("");
  const handleClickOutside = (event) => {
    if (!cardRef?.current?.contains(event.target)) {
      handleSetState({
        detectionToggle: false,
      });
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);
  const QRdonwload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const genrateQR = () => {
    const params = {
      wallet_address: account,
      stick_type: typeSelect.value.toLowerCase(),
      location: location,
    };
    const ciphertext = AES.encrypt(
      JSON.stringify(params),
      "secret key 123"
    ).toString();
    const bytes = AES.decrypt(ciphertext, "secret key 123");
    const originalText = bytes.toString(enc.Utf8);
    setQRvalue(JSON.parse(originalText));

    setGenrateStatus(true);
  };
  const DetectionResult = () => (
    <div className={style.card} ref={cardRef}>
      <div className={style.heading}>
        <IconSucceed />
        <p>You are steps away from being verified</p>
      </div>

      <div className={style.wrapper}>
        <button onClick={genrateQR}>Generate Code</button>
      </div>
    </div>
  );
  const QRgenrated = () => (
    <div className={style.card} ref={cardRef}>
      <WelcomeEffect className={style.welcomeEffect} />
      <div className={style.iconContainer}>
        <CloseIcon
          onClick={() => {
            handleSetState({
              detectionToggle: false,
              cameraEnable: false,
              img: "",
            });
          }}
          className={style.closeIcon}
        />
      </div>
      <div className={style.heading}>
        <h3>🎉 Congratulations</h3>
        <p>You have successfully Initiate your Proof Of Sesh</p>
      </div>

      <div className={style.wrapper}>
        <QRCode
          id="QRCode"
          className={style.QR}
          value={`/validate?data=${QRvalue}`}
        />
        <p>
          Kindly have an OG 420 Validator in your location scan your code to
          validate you.
        </p>
        <button onClick={QRdonwload} className={style.shreBtn}>
          Share
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`${style.selectContainer} ${detectionToggle && style.active}`}
    >
      <div className={`${style.container}  ${toggle && style.deactive}`}>
        {genrateStatus ? <QRgenrated /> : <DetectionResult />}
      </div>
    </div>
  );
};

export default DetectionResult;
