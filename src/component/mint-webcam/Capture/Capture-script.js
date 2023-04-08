// update Video dimensions on screen resize
const updateVideoSize = (webcamWrapper, handleSetState) => {
  const newWidth = webcamWrapper.current?.clientWidth;
  const newHeight = webcamWrapper.current?.clientHeight;
  handleSetState({ height: newHeight, width: newWidth });
};

// switch camera from front to rear for mobile view
const switchCameraToRear = (webcam, handleSetState, webcamRef) => {
  const webcamStatus = webcam === "user" ? "environment" : "user";
  handleSetState({ webcam: webcamStatus });
  webcamRef.current.switchCamera();
};

// Picture Handler
const takePicture = (webcamRef, handleSetState) => {
  const imageSrc = webcamRef.current.takePhoto();
  handleSetState({ img: imageSrc });
};
const downloadImg = (img) => {
  const ImageBase64 = img.split("data:image/png;base64,")[1];
  const a = document.createElement("a"); // Create <a>
  a.href = `data:image/png;base64,${ImageBase64}`; // Image Base64 Goes here
  a.download = "Image.png"; // File name Here
  a.click(); // Downloaded file
};

function getFileFromBase64(string64, fileName, type) {
  const trimmedString = string64.split(",")[1];
  const imageContent = atob(trimmedString);
  const buffer = new ArrayBuffer(imageContent.length);
  const view = new Uint8Array(buffer);
  for (let n = 0; n < imageContent.length; n += 1) {
    view[n] = imageContent.charCodeAt(n);
  }
  const blob = new Blob([buffer], { type });
  return new File([blob], fileName, {
    lastModified: new Date().getTime(),
    type,
  });
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
export {
  getFileFromBase64,
  downloadImg,
  takePicture,
  switchCameraToRear,
  updateVideoSize,
  capitalizeFirstLetter,
  isEmpty,
};
