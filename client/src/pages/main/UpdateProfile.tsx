import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserById, updateUser } from "../../store/userSlice";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  phoneNumber: yup.string().required("Vui lòng nhập số điện thoại"),
});

export const UpdateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => { dispatch(getUserById(Number(id))); }, [dispatch, id]);

  const user = useAppSelector((state) => state.user.users[0]);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const [uploaded, setUploaded] = useState<File>();
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (uploaded) {
        URL.revokeObjectURL(avatar);
      }

      setUploaded(e.target.files[0]);
      const uploadedUrl = URL.createObjectURL(e.target.files[0]);
      setAvatar(uploadedUrl);
    }
  };

  const handleUpdateUser = async (data: yup.InferType<typeof schema>) => {
    const { name, phoneNumber } = data;
    const submittedData = { studentId: user.studentId, name, phoneNumber, avatar: uploaded ? "" : user.avatar };
    dispatch(updateUser({ id: Number(id), data: submittedData, imageFile: uploaded }));
  };

  return (
    <div className="container mt-28">
      <form
        onSubmit={handleSubmit(handleUpdateUser)}
        className="container-fluid bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        encType="multipart/form-data"
      >
        <h1 style={{ fontSize: "25px", marginLeft: "50px" }}>
          Cập Nhật Thông Tin
        </h1>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Tên
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            {...register("name")}
            defaultValue={user.name}
          />
          <p className="text-red-500 mt-1">{errors.name?.message}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Số điện thoại
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="phoneNumber"
            {...register("phoneNumber")}
            defaultValue={user.phoneNumber}
          />
          <p className="text-red-500 mt-1">{errors.phoneNumber?.message}</p>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="avatar"
          >
            Ảnh đại diện
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleSelectAvatar}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <img className="w-15 rounded-full mt-2" src={avatar} />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cập nhật thông tin
          </button>
          <a href="/">Quay lại</a>
        </div>
      </form>
    </div>
  );
};