import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import API from "./api";
import type { AttendanceRecord, CreateAttendanceDto, UpdateAttendanceDto } from "../types/attendance";

const initialState = {
  attendance: new Array<AttendanceRecord>(),
  isLoading: false,
  error: {},
};

export const getAttendance = createAsyncThunk(
  "attendance/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return API.get<AttendanceRecord[]>("api/attendance");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAttendanceStatus = createAsyncThunk(
  "attendance/updateAttendanceStatus",
  async ({ id, data }: { id: number, data: UpdateAttendanceDto }, { rejectWithValue }) => {
    try {
      await API.put<void>(
        `api/attendance/${id}`,
        { body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAttendanceById = createAsyncThunk(
  "attendance/getAttendanceById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await API.get<AttendanceRecord>(`api/attendance/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAttendance = createAsyncThunk(
  "attendance/addAttendance",
  async (payload: CreateAttendanceDto, { rejectWithValue }) => {
    try {
      const res = await API.post<AttendanceRecord>(
        "api/attendance",
        { body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } }
      );
      localStorage.clear();
      window.location.href = "/register-success";
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

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendance.push(action.payload);
      })
      .addCase(getAttendance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendance = action.payload;
      })
      .addCase(getAttendanceById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendanceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getAttendanceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attendance = [action.payload];
      })
      .addCase(updateAttendanceStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAttendanceStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(updateAttendanceStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, id } = action.meta.arg;
        const index = state.attendance.findIndex((item) => item.id === id);
        if (index !== -1) {
          state.attendance[index].attendanceStatus = data.attendanceStatus;
        }
      });
  },
});

export default attendanceSlice.reducer;