import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const AppLayout = () => (
  <div className="min-h-screen bg-background text-foreground">
    <div className="pb-24">
      <Outlet />
    </div>
    <BottomNav />
  </div>
);

export default AppLayout;
