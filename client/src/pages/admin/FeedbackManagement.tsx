import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteFeedback, getFeedback } from "../../store/feedbackSlice";

import "./loading.css";

const TABLE_HEAD = [
  "id",
  "Tên sinh viên",
  "Tên sự kiện",
  "Nội dung",
  "Ngày đăng",
  "",
];

export const FeedbackManagement = () => {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector((state) => state.feedback.feedbacks);

  useEffect(() => { dispatch(getFeedback()); }, [dispatch]);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa bình luận này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      customClass: {
        confirmButton: "swal-confirm-btn",
        cancelButton: "swal-cancel-btn"
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFeedback(id));
      }
    });
  };

  return (
    <div className="content-wrapper">
      <div className="ml-2 w-full">
        <div className="content-header rounded-none">
          <div className="mb-4! flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="font-bold mt-7 text-2xl ml-6">
              <h1>Quản Lý Phản Hồi Và Bình Luận</h1>
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
              {feedback.length > 0 &&
                feedback.map(
                  ({ id, user, event, content, createdAt }, index) => {
                    const isLast = index === feedback.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <span className="text-sm font-normal leading-none">{id}</span>
                        </td>
                        <td className={classes}>
                          <span className="text-sm font-normal leading-none">{user?.name}</span>
                        </td>
                        <td className={classes}>
                          <span className="text-sm font-normal leading-none">{event?.name}</span>
                        </td>
                        <td className={classes}>
                          <span className="text-sm font-normal leading-none">{content}</span>
                        </td>
                        <td className={classes}>
                          <span className="text-sm font-normal leading-none">{createdAt.toLocaleDateString("en-GB")}</span>
                        </td>

                        <td className={classes}>
                          <button
                            className="inline-flex items-center gap-2 justify-center px-8 py-4 text-white bg-red-500 rounded-lg h-10"
                            onClick={() => handleDelete(id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span>Xóa</span>
                          </button>
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
  );
};