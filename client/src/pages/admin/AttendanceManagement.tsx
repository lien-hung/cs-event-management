import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AttendanceStatus } from "../../constants/attendance";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAttendance, updateAttendanceStatus } from "../../store/attendanceSlice";

import "./loading.css";

const TABLE_HEAD = [
  "ID",
  "MSSV",
  "Tên sinh viên",
  "Tên sự kiện",
  "Thời điểm đăng ký",
  "Trạng thái",
  ""
];

export const AttendanceManagement = () => {
  const dispatch = useAppDispatch();
  const attendance = useAppSelector((state) => state.attendance.attendance);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { dispatch(getAttendance()); }, [dispatch]);

  const handleUpdateStatus = (id: number) => {
    Swal.fire({
      title: "Cập nhật trạng thái",
      input: "select",
      inputOptions: {
        [AttendanceStatus.Attended]: "Đã tham gia",
        [AttendanceStatus.Cancelled]: "Không tham gia",
      },
      inputPlaceholder: "Chọn trạng thái",
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      buttonsStyling: false,
      customClass: {
        confirmButton: "swal-accept-btn",
        cancelButton: "swal-cancel-btn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { attendanceStatus: result.value };
        dispatch(updateAttendanceStatus({ id, data }));
      }
    });
  };

  return (
    <div className="content-wrapper">
      <div className="ml-2 w-full">
        <div className="content-header rounded-none">
          <div className="mb-4! flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="font-bold mt-7 text-2xl ml-6">
              <h1>Quản Lý Tham Gia Sự Kiện</h1>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
              <div className="flex items-center gap-5 w-90 h-10 border border-gray-200 rounded-lg p-3">
                <input
                  type="text"
                  className="w-full outline-none bg-transparent"
                  placeholder="Tìm kiếm theo tên sự kiện"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
            </div>
          </div>
        </div>
        <div className="container-fluid px-0">
          <table id="otherTable" className="w-full min-w-max table-auto text-left">
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
              {attendance.filter(
                (item) => item.event?.name.toLowerCase().includes(searchTerm)
              ).map(
                  (
                    { id, user, event, createdAt, attendanceStatus },
                    index
                  ) => {
                    const isLast = index === attendance.length - 1;
                    const classes = isLast ? "px-4 py-3" : "px-4 py-3 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <span className="text-sm font-normal">{id}</span>
                        </td>
                        <td className={classes}>
                          <span className="text-sm font-normal">{user?.studentId}</span>
                        </td>
                        <td className={classes}>
                          <span className="text-sm font-normal">{user?.name}</span>
                        </td>
                        <td className={classes}>
                          <span className="text-sm font-normal">{event?.name}</span>
                        </td>
                        <td className={classes}>
                          <span className="text-sm font-normal">{new Date(createdAt).toLocaleString("en-GB")}</span>
                        </td>
                        <td className={classes}>
                          <span className="text-sm font-normal">
                            {{
                              [AttendanceStatus.Registered]: "Đã đăng ký",
                              [AttendanceStatus.Attended]: "Đã tham gia",
                              [AttendanceStatus.Cancelled]: "Đã hủy",
                            }[attendanceStatus]}
                          </span>
                        </td>

                        {attendanceStatus === AttendanceStatus.Registered && (
                          <td className={classes}>
                            <button
                              className="bg-green-500! hover:bg-green-600! text-white font-semibold py-2 px-4 rounded-full!"
                              onClick={() => handleUpdateStatus(id)}
                            >
                              Cập nhật
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};