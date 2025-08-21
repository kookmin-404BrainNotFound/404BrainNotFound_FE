import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import "./MissionCamera.css";

export const MissionCamera = () => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);

  return (
    <div className="wrap">
      <Camera
        ref={camera}
        aspectRatio="cover"
        numberOfCamerasCallback={setNumberOfCameras}
      />
      <div className="control">
        <div className="ImagePreview" image={image} />
        <div
          className="TakePhotoButton"
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto();
              console.log(photo);
              setImage(photo);
            }
          }}
        />
        <div
          className="ChangeFacingCameraButton"
          disabled={numberOfCameras <= 1}
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              console.log(result);
            }
          }}
        />
      </div>
    </div>
  );
};
export default MissionCamera;
