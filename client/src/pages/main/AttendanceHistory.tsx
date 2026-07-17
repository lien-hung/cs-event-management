import { useEffect } from "react";
import { useNavigate } from "react-router";
import { AttendanceStatus } from "../../constants/attendance";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAttendanceByUser } from "../../store/attendanceSlice";

export const AttendanceHistory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth.currentUser);
  const myAttendance = useAppSelector((state) => state.attendance.attendance);

  useEffect(() => { dispatch(getAttendanceByUser(auth.id)) }, [auth.id, dispatch]);

  if (!auth) {
    navigate("/login");
    return null;
  }

  return (
    <div className="pt-36">
      <div className="invoice-container container-xxl mx-auto mt-4 mb-0 p-5 border rounded-lg bg-white shadow-md">
        <div className="invoice-wrap">
          <div className="invoice-inner">
            <div className="invoice-address pt-8">
              <table border={0} cellPadding="0" cellSpacing="0" width="100%">
                <tbody>
                  <tr>
                    <td align="right" colSpan={2} valign="top">
                      <div className="mce-content-body" style={{ textAlign: "center" }} spellCheck="false">
                        <span style={{ fontSize: "20pt" }} data-mce-style="font-size: 20pt;">
                          Lịch Sử Tham Gia
                        </span>
                      </div>
                      <br />
                      &nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td align="left" valign="top" width="60%">
                      <table border={0} cellPadding="0" cellSpacing="0">
                        <tbody>
                          <tr>
                            <td style={{ float: "left", fontSize: "14pt" }} valign="top">
                              <span style={{ fontWeight: "bold" }}>
                                Mã số sinh viên:
                              </span>
                            </td>
                            <td valign="top">
                              <div className="client_info">
                                <table border={0} cellPadding="0" cellSpacing="0" >
                                  <tbody>
                                    <tr>
                                      <td style={{ paddingLeft: "20px" }}>
                                        <div
                                          className="mce-content-body"
                                          id="client_info"
                                          style={{
                                            width: "200px",
                                            minHeight: "80px",
                                            position: "relative",
                                          }}
                                        >
                                          <p style={{ fontSize: "14pt" }}>
                                            {auth.username}
                                          </p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="items-list">
              <table className="table table-condensed table-bordered items-table">
                <thead>
                  <tr>
                    <th>
                      <span>Tên Sự Kiện</span>
                    </th>
                    <th className="mount-header">
                      <span>Ngày Đăng Ký</span>
                    </th>
                    <th className="mount-header">
                      <span>Trạng Thái</span>
                    </th>
                  </tr>
                </thead>

                <tbody id="ItemsTable">
                  {myAttendance.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <span>{item.event?.name}</span>
                      </td>
                      <td>
                        <span>{new Date(item.createdAt).toLocaleString("en-GB")}</span>
                      </td>
                      <td>
                        <span>{{
                          [AttendanceStatus.Registered]: "Đã Đăng Ký",
                          [AttendanceStatus.Attended]: "Đã Tham Gia",
                          [AttendanceStatus.Cancelled]: "Đã Hủy",
                        }[item.attendanceStatus]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};