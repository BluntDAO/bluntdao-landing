import React, { useRef, useState, useEffect } from "react";
// import style from "./Capture.module.css";
// popups
import WebcamEnable from "../webcam-enable/webcamEnable";
import StickSelect from "../stick-select/stickSelect";
import DetectionResult from "../detection-result/detectionResult";
// webcam
import { Camera } from "../Capture/Camera";
// Icons
import { ReactComponent as IconCapture } from "../../assets/imgs/capture-btn.svg";
import { ReactComponent as CloseIcon } from "../../assets/imgs/icon-close.svg";
import { ReactComponent as CameraSwitch } from "../../assets/imgs/camera-switch.svg";
import { QrReader } from "react-qr-reader";

const ScanQR = ({ ...props }) => {
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
  // const getImageSize = async (img) =>
  //   new Promise((resolve) => {
  //     const image = new Image();
  //     if (typeof img === "string") {
  //       image.src = img;
  //     } else {
  //       image.src = URL.createObjectURL(img);
  //       console.log(image.src);
  //     }
  //     image.onload = () => {
  //       resolve({ height: image.height, width: image.width });
  //     };
  //   });

  // const handleFileChange = async (event) => {
  //   clearImage();
  //   const uploadedFile = event.target.files[0];

  //   if (!uploadedFile) return;
  //   let photo = photoRef?.current;
  //   if (photo) {
  //     let ctx = photo.getContext("2d");
  //     const { height, width } = await getImageSize(uploadedFile);
  //     const img = new Image();
  //     img.src = URL.createObjectURL(uploadedFile);
  //     photo.setAttribute("width", width);
  //     photo.setAttribute("height", height);
  //     img.onload = function () {
  //       ctx.drawImage(img, 0, 0, width, height);
  //     };
  //     const imageUrl = photo.toDataURL("image/webp", 1);
  //     console.log(imageUrl);
  //     handleSetState({ img: imageUrl });
  //   }
  // };

  const [data, setData] = useState("No result");

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "50%" }}
      />
      <p style={{color:"#fff"}}>{data}</p>
    </>
    // <div className={`${style.container}`}>
    //   <div className={style.videoWrapper}>
    //     {/* Webcam */}
    //     {toggle && !img && (
    //       <Camera
    //         ref={webcamRef}
    //         aspectRatio="cover"
    //         permissionDeniedCallback={setPermissionDenied}
    //         numberOfCamerasCallback={setNumberOfCameras}
    //       />
    //     )}
    //     {/* Webcam enable popup */}
    //     {!toggle && (
    //       <WebcamEnable
    //         getVideo={getVideo}
    //         permissionDenied={permissionDenied}
    //       />
    //     )}
    //     {/* snapshot preview */}
    //     {img && (
    //       <>
    //         <div
    //           className={style.closeBtn}
    //           onClick={() => handleSetState({ img: "" })}
    //         >
    //           <CloseIcon />
    //         </div>
    //         <img src={img} className={`${style.cameraShot}`} alt="snapshot" />
    //       </>
    //     )}
    //     {img ? (
    //       <div
    //         onClick={() => {
    //           handleSetState({
    //             typeSelect: { ...typeSelect, toggle: true },
    //           });
    //         }}
    //         className={style.btn}
    //       >
    //         Continue
    //       </div>
    //     ) : (
    //       <div className={style.btnWrapper}>
    //         <div
    //           onClick={() => {
    //             handleSetState({ cameraEnable: false });
    //           }}
    //           className={style.cancelBtn}
    //         >
    //           cancel
    //         </div>

    //         <div onClick={takePicture} className={style.captureBtn}>
    //           <IconCapture />
    //         </div>
    //         <div className={style.uploadBtn}>
    //           <CameraSwitch onClick={() => switchCameraToRear()} />
    //         </div>
    //       </div>
    //     )}
    //   </div>
    //   {/* <div className={style.uploadBtn}>
    //       <IconLibrary onClick={() => fileRef.current.click()} />
    //     </div> */}
    //   <StickSelect
    //     typeSelect={typeSelect}
    //     detectionToggle={detectionToggle}
    //     handleSetState={handleSetState}
    //   />
    //   <DetectionResult
    //     typeSelect={typeSelect}
    //     detectionToggle={detectionToggle}
    //     handleSetState={handleSetState}
    //     location={location}
    //   />
    //   {/* <input
    //     style={{ display: "none" }}
    //     onChange={handleFileChange}
    //     ref={fileRef}
    //     type="file"
    //     accept=".jpg, .jpeg, .png, .webp"
    //   /> */}
    // </div>
  );
};

export default ScanQR;
