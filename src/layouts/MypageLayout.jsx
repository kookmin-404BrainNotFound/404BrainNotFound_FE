import { Outlet } from "react-router-dom";
import BackHeader from "../components/PageHeader"; 

export default function MypageLayout() {
  return (
    <div className="px- pb-4 text-6">
      <Outlet />
    </div>
  );
}
