import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "react-camera-pro";
import BackIcon from "../../assets/back.svg?react";

const ContractScan = () => {
  const nav = useNavigate();
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  // === base64 → File 변환 함수 ===
  function base64ToFile(base64, filename = "scan.jpg") {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1]; // image/jpeg
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

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
          if (r > 160 && g > 160 && b > 160) whiteCount++;
        }

        resolve(whiteCount / totalCount);
      };
    });
  };

  // === 자동 감지 루프 ===
  useEffect(() => {
    const interval = setInterval(async () => {
      if (camera.current) {
        const photo = camera.current.takePhoto(); // base64 반환
        const ratio = await checkWhiteRatio(photo);

        if (ratio > 0.7) {
          clearInterval(interval);

          // base64 → File 변환
          const file = base64ToFile(photo, "contract_scan.jpg");

          // ✅ 디버깅용 로그
          console.log("📸 원본 base64 길이:", photo.length);
          console.log("📄 변환된 File 객체:", file);
          console.log("   ▶ 이름:", file.name);
          console.log("   ▶ 타입:", file.type);
          console.log("   ▶ 크기:", file.size, "bytes");

          console.log("📌 스캔 완료! 흰색 비율:", ratio);

          nav("/contract/analyze", {
            state: {
              image: photo, // 미리보기용 base64
              file: file,   // 서버 업로드용 File 객체
            },
          });
        }
      }
    }, 2000);

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

      {/* 상단 뒤로가기 버튼 */}
      <div className="absolute z-30">
        <button
          onClick={() => nav(-1)}
          aria-label="뒤로가기"
          className="p-4 active:scale-95"
        >
          <BackIcon className="w-8 h-8 invert" />
        </button>
      </div>

      {/* 스캔 가이드 오버레이 */}
      <img
        src="/icons/scanframe.png"
        alt="스캔 프레임"
        className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
      />

      {/* 안내 텍스트 */}
      <div className="absolute left-1/2 top-[calc(50%-260px)] -translate-x-1/2 z-30 text-center">
        <p className="text-2xl font-bold text-white whitespace-nowrap">
          계약서를 가이드 안에 맞춰주세요
        </p>
      </div>

      <div className="absolute left-1/2 top-[calc(50%+255px)] -translate-x-1/2 z-30 text-center">
        <p className="text-sm text-white/80 whitespace-nowrap">
          글자가 잘 보여야 내용을 정확하게 인식할 수 있어요.
        </p>
      </div>  
    </div>
  );
};

export default ContractScan;
