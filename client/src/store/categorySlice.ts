import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import API from "./api";
import type { Category, CategoryRequest } from "../types/category";

const initialState = {
  categories: new Array<Category>(),
  isLoading: false,
  error: {},
};

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (_, { rejectWithValue }) => {
    try {
      return await API.get<Category[]>("/api/category");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (payload: CategoryRequest, { rejectWithValue }) => {
    try {
      const res = await API.post<Category>(
        "api/category",
        { body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } },
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Add category successfully",
      });
      window.location.href = "/admin/category-management";
      return res;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message,
      });
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }: { id: number, data: CategoryRequest }, { rejectWithValue }) => {
    try {
      await API.put<void>(
        `api/category/${id}`,
        { body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Update category successfully",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message,
      });
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete<void>(`api/category/${id}`);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Delete category successfully",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (error as Error).message,
      });
      return rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload ?? [];
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.categories.push(action.payload);
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, data } = action.meta.arg;
        const index = state.categories.findIndex((category) => category.id === id);
        state.categories[index].name = data.name;
        state.categories[index].slug = data.slug;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.meta.arg
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default categorySlice.reducer;