import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCategory } from "../../store/categorySlice";
import { getEventById, updateEvent } from "../../store/eventSlice";

import "./loading.css";

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  location: yup.string().required("Vui lòng nhập địa điểm"),
  capacity: yup.number().required("Vui lòng nhập sức chứa"),
  startDate: yup.date().required("Vui lòng nhập thời gian bắt đầu"),
  endDate: yup.date().required("Vui lòng nhập thời gian kết thúc"),
  description: yup.string().required("Vui lòng nhập mô tả"),
  categoryId: yup.number().required("Vui lòng chọn thể loại"),
});

export const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useAppSelector((state) => state.category.categories);
  const event = useAppSelector((state) => state.event.events[0]);
  const isLoading = useAppSelector((state) => state.event.isLoading);
  const [imageUpload, setImageUpload] = useState<File>();

  const {
    register,
    handleSubmit,
    setValues,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    dispatch(getEventById(Number(id)));
    dispatch(getCategory());
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      setValues({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        categoryId: event.category?.id,
      });
    }
  }, [event, setValues]);

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size < 1024 ** 2) {
        setImageUpload(e.target.files[0]);
      } else {
        Swal.fire({ title: "Lỗi", text: "Ảnh phải dưới 1 MB", icon: "error", toast: true });
      }
    }
  };

  const handleEditEvent = (data: yup.InferType<typeof schema>) => {
    const submittedData = { ...data, image: imageUpload ? "" : event.image };

    dispatch(
      updateEvent({ id: Number(id), data: submittedData, imageFile: imageUpload })
    ).then(() => {
      Swal.fire({
        title: "Success",
        text: "Event updated successfully",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => { navigate("/admin/event-management"); });
    });
  };

  return (
    <div className="flex h-full">
      <div className="container flex justify-center overflow-y-scroll p-4">
        <div className="h-max w-full max-w-240 p-4 shadow-xl shadow-blue-gray-900/5">
          <h1 className="font-bold text-2xl text-center mb-9">
            Cập nhật Sự Kiện
          </h1>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
          <form
            onSubmit={handleSubmit(handleEditEvent)}
            className="w-full max-w-240"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="name" className="text-lg text-gray-600">
                Tên sự kiện:
              </label>
              <input
                type="text"
                placeholder="Hãy nhập tên sự kiện"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.name}
                {...register("name")}
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="text-lg text-gray-600">
                Địa điểm:
              </label>
              <input
                type="text"
                placeholder="Hãy nhập địa điểm"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.location}
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
                placeholder="Hãy nhập sức chứa"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.capacity}
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
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.category?.id}
                {...register("categoryId")}
              >
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="text-lg text-gray-600">
                Hình ảnh:
              </label>
              {event?.image && (
                <img
                  src={event.image}
                  alt="Event"
                  className="w-50 h-25 p-2"
                />
              )}
              <input
                type="file"
                onChange={handleSelectImage}
                accept="image/*"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="text-lg text-gray-600">
                Mô tả
              </label>
              <textarea
                placeholder="Nhập mô tả"
                className="w-full border rounded-lg py-2 px-3 outline-none bg-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                defaultValue={event?.description}
                {...register("description")}
              />
              <p className="text-red-500 mt-1">{errors.description?.message}</p>
            </div>
            <button
              className="h-10 w-20 rounded-sm bg-slate-200"
              type="submit"
            >
              Cập nhật
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};