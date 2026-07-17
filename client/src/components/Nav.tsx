import { useAppDispatch } from "../hooks";
import { logOut } from "../store/authSlice";

export const Nav = () => {
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    window.location.href = "/";
  };
  return (
    <div className="w-full">
      {/* <!-- Navbar --> */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light px-3">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav items-center justify-center gap-2">
          <li className="nav-item">
            <a
              className="nav-link py-2!"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link py-2!">
              Trang chủ
            </a>
          </li>
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto!">
          <li className="nav-item">
            <button onClick={handleLogOut} className="bg-blue-500! hover:bg-blue-700! text-white font-bold py-2 px-3 rounded">
              Đăng Xuất
            </button>
          </li>
        </ul>
      </nav>
      {/* <!-- /.navbar --> */}
    </div>
  );
};