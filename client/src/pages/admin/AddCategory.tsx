import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCategory } from "../../store/categorySlice";

import "./loading.css";

const schema = yup.object().shape({
  slug: yup.string().required("Vui lòng nhập mã số!"),
  name: yup.string().required("Vui lòng nhập tên danh mục!"),
});

export function AddCategory() {
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const isLoading = useAppSelector((state) => state.category.isLoading);

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    dispatch(addCategory(data));
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-120 mx-auto p-4 bg-gray-100 rounded-lg shadow"
      >
        <h1 className=" text-lg font-bold text-center pb-4">Thêm danh mục</h1>
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mã số
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded-lg border focus:border-blue-500 focus:outline-none text-gray-700"
            {...register("slug")}
          />
          <p className="text-red-500 mt-1">{errors.slug?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tên danh mục:
          </label>
          <div>
            <input
              type="text"
              className={`w-full px-3 py-2 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"
                } focus:border-blue-500 focus:outline-none text-gray-700`}
              {...register("name")}
            />
            <p className="text-red-500 mt-1">{errors.name?.message}</p>
          </div>
        </div>
        <div className="flex items-center">
          <a href="/admin/category-management">Quay Lại</a>
          <button
            type="submit"
            className="px-4 py-2 ml-auto! bg-blue-500! text-white rounded-lg hover:bg-blue-600! focus:outline-none"
          >
            Thêm
          </button>
        </div>
      </form>
    </div>
  );
}