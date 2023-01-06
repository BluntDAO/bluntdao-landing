import style from "./webcamEnable.module.css";
import { ReactComponent as CameraIcon } from "../../assets/imgs/icon-camera.svg";
import { useHistory } from "react-router-dom";

const WebcamEnable = ({ getVideo, permissionDenied }) => {
  const history = useHistory();
  return (
    <div className={`${style.container}`}>
      <div className={style.popupWrapper}>
        <div className={style.card}>
          <div className={style.heading}>
            {permissionDenied && <h3>Please try again!</h3>}
            <CameraIcon />
            <h3>Allow camera access</h3>
            <p>to begin proof of sesh with liveness detection</p>
            {permissionDenied && (
              <p style={{ color: "#FF0000" }}>Camera access denied</p>
            )}
          </div>

          {!permissionDenied ? (
            <div className={style.wrapper}>
              <p onClick={() => history.push("/pos")}>Don’t allow</p>
              <div onClick={() => getVideo()}>Allow access</div>
            </div>
          ) : (
            <div className={style.deniedAccessWrapper}>
              <p>Allow access</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebcamEnable;
