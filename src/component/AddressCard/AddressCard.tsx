import React, { useContext } from "react";
import ReactTooltip from "react-tooltip";
import style from "./AddressCard.module.css";
import { ReactComponent as ScanIcon } from "../../assets/imgs/icon-scan-outline.svg";
import { ReactComponent as CameraIcon } from "../../assets/imgs/icon-camera-light.svg";
import { ReactComponent as SolanaIcon } from "../../assets/imgs/icon-solana-bordered.svg";
import { ReactComponent as BackIcon } from "../../assets/imgs/icon-goback.svg";
import { GenContext } from "../../gen-state/gen.context";

const AddressCard = ({ ...props }) => {
  const { toggleUpdate, setToggleScan, setToggleAddressCard } = props;
  const { posDetails } = useContext(GenContext);
  return (
    <div className={style.addressCard}>
      <div className={style.cardTop}>
        <div className={style.content}>
          <p>Open Link | Get Validated</p>
          {posDetails.addresses?.map((address: String) => (
            <div>
              <SolanaIcon />
              {address}
            </div>
          ))}
          {posDetails?.img?.name && (
            <div>
              <SolanaIcon />
              {posDetails.img.name}.png
            </div>
          )}
        </div>
        <BackIcon
          onClick={() => {
            if (posDetails.img.name) {
              toggleUpdate("form");
            } else if (posDetails.addresses.length) {
              toggleUpdate("capture");
            }
          }}
        />
      </div>
      <div className={style.btnWrapper}>
        <div
          data-tip
          data-for={"scan_another"}
          onClick={() => {
            if (setToggleScan) setToggleScan(true);
            toggleUpdate("scan");
          }}
        >
          <ScanIcon />
          Scan Another
        </div>{" "}
        <p
          onClick={() => {
            if (setToggleAddressCard) setToggleAddressCard(false);
            toggleUpdate("capture");
          }}
        >
          <CameraIcon />
          Take Picture
        </p>
      </div>
      <ReactTooltip
        id={"scan_another"}
        className={`tooltip ${style.tooltip}`}
        place="top"
        effect="solid"
      >
        Is multiple people
        <br /> onboarding you?
      </ReactTooltip>
    </div>
  );
};
export default AddressCard;
