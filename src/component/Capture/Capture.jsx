import React, { useRef, useState, useEffect } from "react";
import style from "./Capture.module.css";
// popups
import WebcamEnable from "../webcam-enable/webcamEnable";
import StickSelect from "../stick-select/stickSelect";
import DetectionResult from "../detection-result/detectionResult";
// webcam
import { Camera } from "./Camera";
// Icons
import { ReactComponent as IconCapture } from "../../assets/imgs/capture-btn.svg";
import { ReactComponent as CloseIcon } from "../../assets/imgs/icon-close.svg";
import { ReactComponent as CameraSwitch } from "../../assets/imgs/camera-switch.svg";

const Capture = ({ ...props }) => {
  const { toggle, handleSetState, img, typeSelect, detectionToggle, location } =
    props;
  let webcamRef = useRef(null);

  const [webcam, setWebcam] = useState("environment");
  const [, setNumberOfCameras] = useState();
  const [permissionDenied, setPermissionDenied] = useState();
  // GEO loaction
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    handleSetState({
      location: {
        lat: crd.latitude,
        lon: crd.longitude,
      },
    });
    // console.log(`More or less ${crd.accuracy} meters.`);
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const switchCameraToRear = () => {
    const webcamStatus = webcam === "user" ? "environment" : "user";
    setWebcam(webcamStatus);
    webcamRef.current.switchCamera();
  };

  const getVideo = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
    handleSetState({
      toggle: true,
    });
  };

  // Picture Handler
  const takePicture = () => {
    const imageSrc = webcamRef.current.takePhoto();
    handleSetState({ img: imageSrc });
  };

  const clearImage = () => {
    handleSetState({ img: "" });
  };

  useEffect(() => {
    console.log(permissionDenied);
    if (permissionDenied) {
      handleSetState({ toggle: false });
    } else if (permissionDenied === false) {
      handleSetState({ toggle: true });
    }
  }, [permissionDenied]);

  return (
    <div className={`${style.container}`}>
      <div className={style.videoWrapper}>
        {/* Webcam */}
        {toggle && !img && (
          <Camera
            ref={webcamRef}
            aspectRatio="cover"
            permissionDeniedCallback={setPermissionDenied}
            numberOfCamerasCallback={setNumberOfCameras}
          />
        )}
        {/* Webcam enable popup */}
        {!toggle && (
          <WebcamEnable
            getVideo={getVideo}
            permissionDenied={permissionDenied}
          />
        )}
        {/* snapshot preview */}
        {img && (
          <>
            <div
              className={style.closeBtn}
              onClick={() => handleSetState({ img: "" })}
            >
              <CloseIcon />
            </div>
            <img src={img} className={`${style.cameraShot}`} alt="snapshot" />
          </>
        )}
        {img ? (
          <div
            onClick={() => {
              handleSetState({
                typeSelect: { ...typeSelect, toggle: true },
              });
            }}
            className={style.btn}
          >
            Continue
          </div>
        ) : (
          <div className={style.btnWrapper}>
            <div
              onClick={() => {
                handleSetState({ cameraEnable: false });
              }}
              className={style.cancelBtn}
            >
              cancel
            </div>

            <div onClick={takePicture} className={style.captureBtn}>
              <IconCapture />
            </div>
            <div className={style.uploadBtn}>
              <CameraSwitch onClick={() => switchCameraToRear()} />
            </div>
          </div>
        )}
      </div>

      <StickSelect
        typeSelect={typeSelect}
        detectionToggle={detectionToggle}
        handleSetState={handleSetState}
      />
      <DetectionResult
        typeSelect={typeSelect}
        detectionToggle={detectionToggle}
        handleSetState={handleSetState}
        location={location}
      />
    </div>
  );
};

export default Capture;
