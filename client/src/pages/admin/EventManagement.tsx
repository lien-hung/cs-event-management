import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteEvent, getEvent } from "../../store/eventSlice";

const TABLE_HEAD = [
  "Hình Ảnh",
  "Tên",
  "Mô Tả",
  "Địa Điểm",
  "Sức Chứa",
  "Bắt Đầu",
  "Kết Thúc",
  "",
];

export const EventManagement = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.event.events);
  const loading = useAppSelector((state) => state.event.isLoading);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  const handleDelete = (id: number) => async () => {
    dispatch(deleteEvent(id));
  };

  return (
    <div className="content-wrapper">
      <div className="ml-2 w-full overflow-y-auto">
        <div className="content-header rounded-none">
          <div className="mb-4! flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="font-bold mt-7 text-2xl ml-6">
              <h1>Quản Lý Sự Kiện</h1>
            </div>
            <div className="flex items-center shrink-0 gap-2 md:w-max mt-10 mr-3">
              <div className="flex items-center gap-5 w-80 h-10 border border-gray-200 rounded-lg p-3">
                <input
                  type="text"
                  className="w-full outline-none bg-transparent"
                  placeholder="Tìm kiếm..."
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
              <Link to="/admin/add-event">
                <button className="flex justify-center items-center gap-1 rounded-md! px-3 h-11 bg-blue-500! hover:bg-blue-600! text-md">
                  <PlusIcon className="h-7 w-7" />
                  Thêm
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container-fluid w-full px-2">
          {loading ? (
            <div className="body">
              <div className="spinner"></div>
              <div className="message">
                <h1>Loading...</h1>
              </div>
            </div>
          ) : (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className="bg-blue-800 text-white">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-4 py-3"
                    >
                      <span className="text-sm text-white font-normal leading-none">{head}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  filteredEvents.length > 0 &&
                  filteredEvents.map((row) => (
                    <tr key={row.id}>
                      <td className="h-20">
                        <img src={row.image} alt={row.name} width={100} />
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        {row.name}
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        {row.description}
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        {row.location}
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        {row.capacity}
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        {new Date(row.startDate).toLocaleString("en-GB")}
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        {new Date(row.endDate).toLocaleString("en-GB")}
                      </td>
                      <td className="border-dashed border-t border-blue-gray-200 p-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/admin/edit-event/${row.id}`}>
                            <button className="inline-flex items-center gap-2 justify-center p-4 text-white bg-blue-500! rounded-lg h-12.5 mr-2">
                              <PencilIcon className="h-4 w-4" />
                              <span>Sửa</span>
                            </button>
                          </Link>
                          <button
                            className="inline-flex items-center gap-2 justify-center p-4 text-white bg-red-500! rounded-lg h-12.5"
                            onClick={handleDelete(row.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span>Xóa</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};