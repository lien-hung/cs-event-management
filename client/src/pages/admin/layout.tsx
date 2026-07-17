import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../../hooks";
import { Nav, Sidebar } from "../../components";

export const LayoutAdmin = () => {
  const auth = useAppSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!auth?.role.includes("Admin")) {
      window.location.href = "/";
    }
  }, [auth, navigate]);

  if (!auth?.role.includes("Admin")) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex-1 min-h-0 flex">
        <Sidebar />
        <div className="flex-1 p-8! pt-4 overflow-x-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};