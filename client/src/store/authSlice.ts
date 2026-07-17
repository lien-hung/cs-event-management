import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";
import API from "./api";

const sessionUser = sessionStorage.getItem("user");

const initialState = {
  currentUser: sessionUser ? JSON.parse(sessionUser) : null,
  isLoading: false,
  error: {},
};

export const addAccount = createAsyncThunk(
  "user/addAccount",
  async ({ data, imageFile }: { data: RegisterRequest, imageFile?: File }, { rejectWithValue }) => {
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

      await API.post<void>(
        "api/auth/register",
        {
          body: JSON.stringify({ ...data, avatar: imageUrl }),
          headers: { "Content-Type": "application/json" }
        }
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      return await API.post<AuthResponse>(
        "api/auth/login",
        {
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" }
        }
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.currentUser = null;
      Cookies.remove("token");
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAccount.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, roles, token } = action.payload;
        state.isLoading = false;
        state.currentUser = user;
        sessionStorage.setItem("user", JSON.stringify(user));

        Cookies.set("token", token);
        window.location.href = roles.includes("Admin") ? "/admin/dashboard" : "/";     
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;