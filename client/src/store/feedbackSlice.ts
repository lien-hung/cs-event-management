import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import type { CreateFeedbackDto, EventFeedback } from "../types/eventFeedback";
import API from "./api";

const initialState = {
  feedbacks: new Array<EventFeedback>(),
  isLoading: false,
  error: {},
};

export const addFeedback = createAsyncThunk(
  "feedback/addFeedback",
  async (payload: CreateFeedbackDto, { rejectWithValue }) => {
    try {
      const res = await API.post<EventFeedback>(
        "api/feedback",
        { body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } }
      )
      Swal.fire({
        icon: "success",
        text: "Thêm bình luận thành công",
      });
      return res;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng đăng nhập để bình luận",
        confirmButtonText: ` <a href="/login">Đăng Nhập</a> `,
      });
      return rejectWithValue(error);
    }
  }
);

export const getFeedback = createAsyncThunk(
  "feedback/getFeedback",
  async (_, { rejectWithValue }) => {
    try {
      return await API.get<EventFeedback[]>("api/feedback");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getFeedbackByEvent = createAsyncThunk(
  "feedback/getFeedbackByEvent",
  async (eventId: number, { rejectWithValue }) => {
    try {
      return await API.get<EventFeedback[]>(`api/event/${eventId}/feedbacks`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete<void>(`api/feedback/${id}`);
      Swal.fire({
        icon: "success",
        text: "Xóa bình luận thành công",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: (error as Error).message,
      });
      return rejectWithValue(error);
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFeedback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.feedbacks.push(action.payload);
        }
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getFeedback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedbacks = action.payload ?? [];
      })
      .addCase(getFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(getFeedbackByEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedbackByEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedbacks = action.payload ?? [];
      })
      .addCase(getFeedbackByEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(deleteFeedback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedbacks = state.feedbacks.filter(
          (feedback) => feedback.id !== action.meta.arg
        );
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default feedbackSlice.reducer;