import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteCategory, getCategory, updateCategory } from "../../store/categorySlice";

import "./loading.css";

const TABLE_HEAD = ["Id", "Tên Danh Mục", "Slug", ""];

export const CategoryManagement = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  const isLoading = useAppSelector((state) => state.category.isLoading);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { dispatch(getCategory()); }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="content-wrapper">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="flex">
        <div className="ml-2 w-full">
          <div className="content-header rounded-none">
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="font-bold mt-7 text-2xl ml-6">
                <h1>Quản Lý Danh Mục</h1>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max mt-10 mr-3">
                <div className="flex items-center gap-5 w-90 h-10 border border-gray-200 rounded-lg p-3">
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
                <div className="mb-2 h-14">
                  <Link to="/admin/add-category">
                    <button className="flex justify-center items-center gap-1 rounded-md! px-2 h-11 bg-blue-500! hover:bg-blue-600! text-md">
                      <PlusIcon className="h-7 w-7" />
                      Thêm
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="px-0 container-fluid">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className=" bg-blue-800 text-white">
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
                {categories.length > 0 &&
                  categories.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map(
                    ({ id, name, slug }, index) => {
                      const isLast = index === categories.length - 1;
                      const classes = isLast ? "px-4 py-2" : "p-4 border-b border-blue-gray-50";
                      return (
                        <tr key={id}>
                          <td className={classes}>
                            {id}
                          </td>
                          <td className={classes}>
                            {name}
                          </td>
                          <td className={classes}>
                            {slug}
                          </td>
                          <td className={classes}>
                            <button
                              onClick={() => {
                                Swal.fire({
                                  title: "Cập nhật Danh mục",
                                  html: `
                                    <input
                                      id="slug"
                                      class="swal2-input"
                                      placeholder="Slug"
                                    >
                                    <br />
                                    <input
                                      id="name"
                                      class="swal2-input"
                                      placeholder="Tên Danh Mục"
                                      type="text"
                                    >
                                  `,
                                  showCancelButton: true,
                                  confirmButtonText: "Cập Nhật",
                                  cancelButtonText: "Hủy",
                                  preConfirm: () => {
                                    const slug = (Swal.getPopup()?.querySelector("#slug") as HTMLInputElement).value;
                                    const name = (Swal.getPopup()?.querySelector("#name") as HTMLInputElement).value;
                                    const data = { slug, name };
                                    dispatch(updateCategory({ id, data }));
                                  },
                                });
                              }}
                              className="inline-flex items-center gap-2 justify-center p-4 text-white bg-blue-500! rounded-lg! h-10 mr-2!"
                            >
                              <PencilSquareIcon className="h-4 w-4" />
                              <span>Sửa</span>
                            </button>
                            <button
                              onClick={() => handleDelete(id)}
                              className="inline-flex items-center gap-2 justify-center p-4 text-white bg-red-500! rounded-lg! h-10"
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
    </div>
  );
};