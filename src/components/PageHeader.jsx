import { useNavigate } from "react-router-dom";

export default function PageHeader({ title }) {
  const navigate = useNavigate();

  return (
<div className="flex items-center justify-center py-4 mb-2 border-gray-200 bg-white sticky top-0 z-10 -mx-3 px-3">
  <button
    onClick={() => navigate(-1)}
    className="absolute left-3 flex items-center justify-center p-1 hover:bg-gray-100 rounded-full"
  >
    <img src="/icons/back.png" alt="뒤로가기" className="w-4 h-8" />
  </button>
  <h1 className="text-lg font-bold">{title}</h1>
</div>
  );
}
