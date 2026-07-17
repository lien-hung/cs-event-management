import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUsers } from "../../store/userSlice";

const TABLE_HEAD = [
  "Tên Tài Khoản",
  "MSSV",
  "Tên",
  "Email",
  "Số Điện Thoại",
  "Vai Trò",
  "",
];

export const AccountManagement = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const auth = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => { dispatch(getUsers()); }, [dispatch]);

  if (!auth.role.includes("Admin")) {
    return null;
  }

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="content-wrapper">
        <div className="w-full ml-2">
          <div className="content-header rounded-none">
            <div className="mb-4! flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="font-bold mt-7 text-2xl">
                <h1>Quản Lý Tài Khoản</h1>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
                <div className="flex items-center gap-5 w-75 border border-gray-200 rounded-lg px-3">
                  <input
                    type="text"
                    className="w-full outline-none bg-transparent"
                    placeholder="Tìm kiếm..."
                  />
                  <span className="shrink-0 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                </div>
                <Link to="/admin/add-account">
                  <button className="flex justify-center items-center gap-1 rounded-md! h-11 px-3 bg-blue-500! hover:bg-blue-600! text-md">
                    <PlusIcon className="h-7 w-7" />
                    Thêm
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="container-fluid px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className="bg-blue-800 text-white">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 py-3"
                    >
                      <span className="font-normal leading-none">{head}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map(
                    (
                      {
                        username,
                        studentId,
                        name,
                        email,
                        phoneNumber,
                        role
                      },
                      index
                    ) => {
                      const isLast = index === users.length - 1;
                      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={username}>
                          <td className={classes}>
                            <span className="text-sm font-normal leading-none">{username}</span>
                          </td>
                          <td className={classes}>
                            <span className="text-sm font-normal leading-none">{studentId}</span>
                          </td>
                          <td className={classes}>
                            <span className="text-sm font-normal leading-none">{name}</span>
                          </td>
                          <td className={classes}>
                            <span className="text-sm font-normal leading-none">{email}</span>
                          </td>
                          <td className={classes}>
                            <span className="text-sm font-normal leading-none">{phoneNumber}</span>
                          </td>
                          <td className={classes}>
                            <span className="text-sm font-normal leading-none">{role}</span>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};