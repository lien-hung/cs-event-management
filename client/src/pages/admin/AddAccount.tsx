import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addAccount } from "../../store/authSlice";

import "./loading.css";

const schema = yup.object().shape({
  studentId: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  phoneNumber: yup.string().required(),
});

export const AddAccount = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [imageUpload, setImageUpload] = useState<File>();

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size < 1024 ** 2) {
        setImageUpload(e.target.files[0]);
      } else {
        Swal.fire({ title: "Lỗi", text: "Ảnh phải dưới 1 MB", icon: "error", toast: true });
      }
    }
  };

  const handleAddAccount = async (data: yup.InferType<typeof schema>) => {
    const submittedData = {
      ...data,
      username: data.studentId,
      password: `${data.studentId}@Ueh`,
      avatar: ""
    }

    try {
      await dispatch(addAccount({ data: submittedData, imageFile: imageUpload }));
      Swal.fire({
        icon: "success",
        title: "Thêm tài khoản thành công",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/admin/account-management");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: (error as Error).message
      });
    }
  };

  return (
    <div className="flex h-full">
      <div className="container mx-auto p-4 overflow-y-scroll">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="font-bold text-2xl text-center mb-6">Thêm Tài Khoản</h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleAddAccount)}
            className="max-w-md mx-auto"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="studentId" className="text-sm text-gray-600">
                MSSV:
              </label>
              <input
                type="text"
                id="studentId"
                placeholder="Hãy nhập mã số"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("studentId")}
              />
              <p className="text-red-500 mt-1">{errors.studentId?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Tên sinh viên:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Hãy nhập họ và tên"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-sm text-gray-600">
                Email:
              </label>
              <input
                type="text"
                min={1}
                id="email"
                placeholder="Hãy nhập email"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("email")}
              />
              <p className="text-red-500 mt-1">{errors.email?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="text-sm text-gray-600">
                Số điện thoại:
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Hãy nhập số điện thoại"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("phoneNumber")}
              />
              <p className="text-red-500 mt-1">{errors.phoneNumber?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="avatar" className="text-sm text-gray-600">
                Hình ảnh (không quá 1 MB):
              </label>
              <input
                type="file"
                onChange={handleUploadImage}
                accept="image/*"
              />
            </div>
            <div className="flex items-center justify-between pb-4">
              <a href="/admin/account-management">Quay lại</a>
              <button className="h-10 bg-blue-800! text-white rounded-md! px-3 ml-auto">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};