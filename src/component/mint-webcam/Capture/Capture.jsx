import React, { useRef, useState, useContext, useEffect } from "react";
import classes from "./Capture.module.css";
import WebcamEnable from "../webcam-enable/webcamEnable";
import DoubleWebcam from "../Camera-Modes/DoubleWebcam";
import RegularCamera from "../Camera-Modes/RegularCamera";
import { GenContext } from "../../../gen-state/gen.context";
// mode switch icons
import { ReactComponent as IconDoubleTake } from "../../../assets/imgs/icon-dual-camera.svg";
import { ReactComponent as IconCamera } from "../../../assets/imgs/icon-camera-switch.svg";

const Capture = ({ ...props }) => {
  const { toggleUpdate } = props;

  const webcamRef = useRef();

  const { dispatch } = useContext(GenContext);

  /* regular expression 
  containing some mobile devices keywords 
  to search it in details string */
  const details = navigator?.userAgent;

  const regexp = /android|iphone|kindle|ipad/i;

  const isMobileDevice = regexp.test(details);

  const [state, setState] = useState({
    toggle: false,
    // each type file
    img: "",
    faceImg: "",
    // current file to mint
    currenFile: "",
    activeFile: "Photos",
    // User or Environment camera
    webcam: "environment",
    // video size
    width: "100%",
    height: "100%",
    // genrate GIF loading status
    cameraPermission: false,
    webcamCurrentType: "Photo",
    trackRecord: false,
    loaderToggle: false,
    dualCam: false,
  });

  const {
    toggle,
    img,
    webcam,
    currenFile,
    activeFile,
    webcamCurrentType,
    cameraPermission,
    faceImg,
    loaderToggle,
    dualCam,
  } = state;

  const handleSetState = (payload) => {
    setState((state) => ({ ...state, ...payload }));
  };

  const modeSwitchList = [
    {
      id: 1,
      text: "Photo",
      icon: <IconCamera />,
    },
    {
      id: 2,
      text: "Doubletake",
      icon: <IconDoubleTake />,
    },
  ];

  useEffect(async () => {
    navigator.permissions.query({ name: "camera" }).then((permission) => {
      handleSetState({
        cameraPermission: permission.state === "granted",
        toggle: permission.state === "granted",
      });
    });
  }, []);

  const displayedModes = modeSwitchList.filter(
    (mode) => mode.text !== webcamCurrentType
  );

  const doubleCameraProps = {
    img,
    faceImg,
    toggle,
    webcamRef,
    handleSetState,
    webcam,
    loaderToggle,
    displayedModes,
    toggleUpdate,
  };
  const regularCameraProps = {
    img,
    toggle,
    webcamRef,
    handleSetState,
    webcam,
    webcamCurrentType,
    currenFile,
    activeFile,
    displayedModes,
    toggleUpdate,
  };

  const enableAccess = async () => {
    handleSetState({
      toggle: true,
    });
  };

  return (
    <div className={`${classes.container}`}>
      <WebcamEnable
        toggle={toggle}
        enableAccess={enableAccess}
        cameraPermission={cameraPermission}
      />
      {dualCam ? (
        <DoubleWebcam doubleCameraProps={doubleCameraProps} />
      ) : (
        <RegularCamera regularCameraProps={regularCameraProps} />
      )}
    </div>
  );
};

export default Capture;
