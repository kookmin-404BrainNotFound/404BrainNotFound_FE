// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";

export default function BackButton({ onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition"
    >
      <img src="/icons/backbutton-gray.png" className="w-2 h-4" />
    </button>
  );
}
