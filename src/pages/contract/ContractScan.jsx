// src/pages/contract/ContractScan.jsx 
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "react-camera-pro";
import BackIcon from "../../assets/back.svg?react";

const ContractScan = () => {
  const nav = useNavigate();
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState(null);

  return (
    <div className="mx-auto relative w-[375px] h-[812px] bg-black overflow-hidden shadow-2xl text-white">
      {/* 카메라 프리뷰 */}
      <Camera
        ref={camera}
        aspectRatio="cover"
        numberOfCamerasCallback={setNumberOfCameras}
        className="w-full h-full object-cover"
      />

      {/* === 상단 뒤로가기 버튼 === */}
      <div className="absolute z-30">
        <button
          onClick={() => nav(-1)}
          aria-label="뒤로가기"
          className="p-4  active:scale-95"
          style={{ WebkitTapHighlightColor: "white" }}
        >
          <BackIcon className="w-8 h-8 invert" />
        </button>
      </div>

      {/* === 중앙 스캔 가이드 박스 + 안내문구 === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* 위쪽 안내문구 */}
        <p className="mb-10 text-[24px] font-bold text-white">
          계약서를 가이드 안에 맞춰주세요
        </p>

        {/* 가이드 박스 */}
        <div className="w-[300px] h-[400px] border-4 border-white rounded-xl"></div>

        {/* 아래쪽 안내문구 */}
        <p className="mt-5 text-[14px] font-medium text-white">
          글자가 잘 보여야 내용을 정확하게 인식할 수 있어요.
        </p>
      </div>
    </div>
  );
};

export default ContractScan;
