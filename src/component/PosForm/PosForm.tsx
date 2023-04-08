import React, { useState, useRef, useEffect, useContext } from "react";
import style from "./PosForm.module.css";
import { GenContext } from "../../gen-state/gen.context";
import { breakAddress } from "../wallet/updatedWallet-script";
import { setNotification, setPOSdetails } from "../../gen-state/gen.actions";
import { ReactComponent as SolanaIcon } from "../../assets/imgs/icon-solana-bordered.svg";
import { ReactComponent as CopyIcon } from "../../assets/imgs/icon-copy.svg";
import copy from "copy-to-clipboard";
import Dropdown from "../Dropdown/Dropdown";
import { ReactComponent as DeleteIcon } from "../../assets/imgs/icon-delete.svg";
import { ReactComponent as GalleryIcon } from "../../assets/imgs/dashboard/image.svg";

const PosForm = ({ ...props }) => {
  const { handleSetState, typeSelect, toggleUpdate } = props;
  const { dispatch, account, posDetails } = useContext(GenContext);
  const [socialToggle, setSocailToggle] = useState(false);

  const cardRef = useRef(null);
  const clipboardRef = useRef(null);

  const stik_type = ["Joint", "Spliff", "Blunt", "Cigar", "Cigarette"];

  console.log(socialToggle);

  return (
    <div className={style.selectContainer}>
      <div className={style.container}>
        <div className={style.card} ref={cardRef}>
          <img
            className={style.logo}
            src="/img/BluntDAO.png"
            alt="BluntDAO Logo"
          />
          <div className={style.desc}>
            You are getting minted a OG Validator - Soul Bound
            (non-transferable) NFT with dynamic reputation points in the
            metadata. If you onboard someone else via Proof of Sesh then your
            NFT will automatically get points updated in the metadata. Input
            your social handles to extra points for your contributions...powered
            by Underdog Protocol.
          </div>
          <div className={style.form}>
            <label>My Address</label>
            <div className={style.inputForm}>
              <SolanaIcon />
              <p>{breakAddress(account)}</p>
              <CopyIcon
                className={style.copyIcon}
                onClick={(event) => {
                  copy(account);
                }}
              />
            </div>
            <label>Validator Address</label>
            {posDetails?.addresses?.length > 0 &&
              posDetails.addresses.map((address: any) => (
                <div className={style.inputForm}>
                  <SolanaIcon />
                  <p>{breakAddress(address)}</p>
                  <input
                    style={{ display: "none" }}
                    ref={clipboardRef}
                    type="text"
                    defaultValue={address}
                  />
                  <CopyIcon
                    className={style.copyIcon}
                    onClick={() => copy(address)}
                  />
                </div>
              ))}
            <label>Image</label>
            <div className={style.inputForm}>
              <GalleryIcon className={style.galleryICon} />
              <p>{posDetails.img.name}.Png</p>
              <DeleteIcon
                className={style.deleteIcon}
                onClick={(event) => {
                  dispatch(
                    setPOSdetails({
                      img: "",
                      addresses: posDetails.addresses,
                    })
                  );
                  toggleUpdate("capture");
                }}
              />
            </div>
            <label>Stick</label>
            <div className={style.inputForm}>
              <Dropdown
                props={{
                  typeSelect: typeSelect,
                  options: stik_type,
                  handleSetState: handleSetState,
                }}
              />
            </div>
            <div className={style.subHeader}>
              <p>Socials</p>
              <label className={style.switch}>
                <input className={style.checkbox} type={style.checkbox} />
                <span
                  onClick={() => setSocailToggle(!socialToggle)}
                  className={`${style.slider} ${
                    socialToggle ? style.active : ""
                  } ${style.round}`}
                ></span>
              </label>
            </div>
            {socialToggle && (
              <div className={style.socailInputs}>
                <label>Telegram</label>
                <input type="text" placeholder="@" />
                <label>Discord Handle</label>
                <input type="text" placeholder="xxx#1234" />
                <label>Twitter</label>
                <input type="text" placeholder="https://www.twitter.com/" />
              </div>
            )}
            <div className={style.submitBtn}>Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosForm;
