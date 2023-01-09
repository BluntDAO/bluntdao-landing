import React, {useState} from 'react'
import Navbar from '../../component/Navbar/Navbar';
import Capture from "../../component/Capture/Capture";
import classes from "./RPOS.module.css";
import { ReactComponent as POSICON } from "./img/blunt-request.svg";

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
    
      const { cameraEnable, toggle, img, typeSelect, detectionToggle, location, smookingSticks } =
        state;
    
      const handleSetState = (payload: any) => {
        setState((state) => ({ ...state, ...payload }));
      };
  return (
      <>
          <Navbar />
          <div className={classes.container}>
        <div className="section">
          {!cameraEnable && (
            <div className={classes.banner}>
              <img className={classes.bluntRequestIcon} src="/img/blunt-request.svg" alt="proof of sesh icon" />
              <div className={classes.header}>Request Proof Of Sesh</div>
              <div className={classes.content}>
              Get your BluntDAO Soul Bound NFT by verifying your Blunt via Proof of Sesh by a validator in your area.
                </div>
                <div className={classes.btnArea}>               
                    <button
                        onClick={() => {
                        handleSetState({ smookingSticks: true });
                        }}
                        className={classes.btn}
                    >
                        Request a Blunt
                    </button>
                    <a target="_blank" href="https://medium.com/@bluntdao/proof-of-sesh-explained-bluntdao-19ecd8479750"
                        className={`${classes.btn} ${classes.btnReverse}`} rel="noreferrer"
                    >
                        Learn More
                    </a>
                          </div>
            </div>
          )}
          {/* {cameraEnable && (
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
          )} */}
        </div>
      </div>
      </>
  )
}

export default RPOS