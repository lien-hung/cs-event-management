import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import Swal from "sweetalert2";
import { type User, type UserRequest } from "../types/user";

const initialState = {
  users: new Array<User>(),
  isLoading: false,
  error: {},
};

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await API.get<User[]>("api/user");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data, imageFile }: { id: number, data: UserRequest, imageFile?: File }, { rejectWithValue }) => {
    try {
      let imageUrl = "";
      if (imageFile) {
        const imageForm = new FormData();
        imageForm.append("file", imageFile);
        imageForm.append("upload_preset", "unsigned_event_app");
        const imageRes = await fetch(
          "https://api.cloudinary.com/v1_1/ds2ij1si7/upload",
          { method: "POST", body: imageForm }
        );
        const imageObj = await imageRes.json();
        imageUrl = imageObj.url;
      }

      await API.put<void>(
        `/api/user/${id}`,
        { body: JSON.stringify({ ...data, avatar: imageUrl }), headers: { "Content-Type": "application/json" } }
      );
      Swal.fire({
        title: "Success!",
        text: "Update user successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Update user failed!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return rejectWithValue(error);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await API.get<User>(`/api/user/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoading = false;
        window.location.reload();
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload ? [action.payload] : [];
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload ?? [];
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;