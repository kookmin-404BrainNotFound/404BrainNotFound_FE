import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "react-camera-pro";
import BackIcon from "../../assets/back.svg?react";

const ContractScan = () => {
  const nav = useNavigate();
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

 // === 흰색 + 밝은 회색 비율 계산 ===
    const checkWhiteRatio = (imageSrc) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 300;
        canvas.height = 400;
        ctx.drawImage(img, 0, 0, 300, 400);

        const imageData = ctx.getImageData(0, 0, 300, 400);
        const pixels = imageData.data;

        let whiteCount = 0;
        let totalCount = pixels.length / 4;

        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // ✅ 흰색(>200) + 밝은 회색(>160)도 포함
            if (r > 160 && g > 160 && b > 160) {
            whiteCount++;
            }
        }

        const ratio = whiteCount / totalCount; // ✅ 변수명 통일
        resolve(ratio); // 📌 비율 반환 (0~1 사이 값)
        };
    });
    };


  // === 자동 감지 루프 ===
  useEffect(() => {
    const interval = setInterval(async () => {
      if (camera.current) {
        const photo = camera.current.takePhoto(); // 1. 사진 캡처
        const ratio = await checkWhiteRatio(photo); // 2. 흰색 비율 분석

        if (ratio > 0.7) {
          clearInterval(interval);
          console.log("📌 리포트 스캔 완료! 흰색 비율:", ratio); // ✅ 테스트 로그
          // 3. 분석 페이지로 이동하면서 사진 전달
          nav("/contract/analyze", { state: { image: photo } });
        }
      }
    }, 2000); // 2초마다 검사

    return () => clearInterval(interval);
  }, []);

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
          className="p-4 active:scale-95"
        >
          <BackIcon className="w-8 h-8 invert" />
        </button>
      </div>

      {/* === 중앙 스캔 가이드 박스 === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="mb-10 text-[24px] font-bold text-white">
          계약서를 가이드 안에 맞춰주세요
        </p>
        <div className="w-[300px] h-[400px] border-4 border-white rounded-xl"></div>
        <p className="mt-5 text-[14px] font-medium text-white">
          글자가 잘 보여야 내용을 정확하게 인식할 수 있어요.
        </p>
      </div>
    </div>
  );
};

export default ContractScan;
