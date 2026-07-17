import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCategory } from "../../store/categorySlice";
import { addEvent } from "../../store/eventSlice";

import "./loading.css";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  location: yup.string().required("Vui lòng nhập địa điểm"),
  capacity: yup.number().required("Vui lòng nhập sức chứa"),
  startDate: yup.date().required("Vui lòng nhập thời gian bắt đầu"),
  endDate: yup.date().required("Vui lòng nhập thời gian kết thúc"),
  categoryId: yup.number(),
});

export const AddEvent = () => {
  const isLoading = useAppSelector((state) => state.event.isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [imageUpload, setImageUpload] = useState<File>();
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.category.categories);

  useEffect(() => { dispatch(getCategory()); }, [dispatch]);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size < 1024 ** 2) {
        setImageUpload(e.target.files[0]);
      } else {
        Swal.fire({ title: "Lỗi", text: "Ảnh phải dưới 1 MB", icon: "error", toast: true });
      }
    }
  };

  const handleAddEvent = async (data: yup.InferType<typeof schema>) => {
    const submittedData = { ...data, categoryId: Number(data.categoryId), description, image: "" };
    dispatch(addEvent({ data: submittedData, imageFile: imageUpload }));
  };

  return (
    <div className="flex h-full">
      <div className="container mx-auto p-4 overflow-y-scroll">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h1 className="font-bold text-2xl text-center mb-6">Thêm Sự Kiện</h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleAddEvent)}
            className="max-w-md mx-auto"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-sm text-gray-600">
                Tên sự kiện:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Hãy nhập tên sự kiện"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="text-sm text-gray-600">
                Địa điểm:
              </label>
              <input
                type="text"
                id="location"
                placeholder="Hãy nhập địa điểm"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("location")}
              />
              <p className="text-red-500 mt-1">{errors.location?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="capacity" className="text-sm text-gray-600">
                Sức chứa:
              </label>
              <input
                type="number"
                min={1}
                id="capacity"
                placeholder="Hãy nhập sức chứa"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("capacity")}
              />
              <p className="text-red-500 mt-1">{errors.capacity?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="startDate" className="text-sm text-gray-600">
                Thời gian bắt đầu:
              </label>
              <input
                type="datetime-local"
                id="startDate"
                placeholder="Hãy nhập thời gian bắt đầu"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("startDate")}
              />
              <p className="text-red-500 mt-1">{errors.startDate?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="endDate" className="text-sm text-gray-600">
                Thời gian kết thúc:
              </label>
              <input
                type="datetime-local"
                id="endDate"
                placeholder="Hãy nhập thời gian kết thúc"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("endDate")}
              />
              <p className="text-red-500 mt-1">{errors.endDate?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="text-sm text-gray-600">
                Danh mục
              </label>
              <select
                id="categoryId"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                {...register("categoryId")}
              >
                {category.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="text-sm text-gray-600">
                Hình ảnh (không quá 1 MB):
              </label>
              <input
                type="file"
                onChange={handleUploadImage}
                accept="image/*"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-sm text-gray-600">
                Mô tả:
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả"
                name="description"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between pb-4">
              <a href="/admin/event-management">Quay lại</a>
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