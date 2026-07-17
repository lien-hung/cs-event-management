import { ClipboardDocumentIcon, HomeIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";
import { useAppSelector } from "../hooks";

import "./Sidebar.css";

export const Sidebar = () => {
  const auth = useAppSelector((state) => state.auth.currentUser);

  return (
    <aside className="main-sidebar sidebar-primary bg-blue-900 elevation-4 w-64 h-full">
      <div className="sidebar pt-4">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link text-white">
                <HomeIcon className="h-5 w-5" />
                Thống Kê
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/category-management" className="nav-link text-white">
                <HomeIcon className="h-5 w-5" />
                Danh Mục Sự Kiện
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/event-management" className="nav-link text-white">
                <ClipboardDocumentIcon className="h-5 w-5" />
                Quản Lý Sự Kiện
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/attendance-management" className="nav-link text-white">
                <ShoppingBagIcon className="h-5 w-5" />
                Danh Sách Tham Gia
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/feedback-management" className="nav-link text-white">
                <HomeIcon className="h-5 w-5" />
                Phản Hồi
              </Link>
            </li>

            {auth.role.includes("Admin") && (
              <li className="nav-item">
                <Link
                  to="/admin/account-management"
                  className="nav-link text-white"
                >
                  <UserIcon className="h-5 w-5" />
                  Quản Lý Tài Khoản
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};