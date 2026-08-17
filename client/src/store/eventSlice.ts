import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import Swal from "sweetalert2";
import type { Event, EventRequest } from "../types/event";

const initialState = {
  events: new Array<Event>(),
  isLoading: false,
  error: {},
};

export const getEvent = createAsyncThunk(
  "event/getEvent",
  async (_, { rejectWithValue }) => {
    try {
      return await API.get<Event[]>("/api/event");
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addEvent = createAsyncThunk(
  "event/addEvent",
  async ({ data, imageFile }: { data: EventRequest, imageFile?: File }, { rejectWithValue }) => {
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

      const res = await API.post<Event>(
        "/api/event",
        { body: JSON.stringify({ ...data, image: imageUrl }), headers: { "Content-Type": "application/json" } }
      );
      Swal.fire({
        icon: "success",
        title: "Add event successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/admin/event-management";
      return res;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: (error as Error).message,
      });
      return rejectWithValue(error);
    }
  }
);

export const getEventById = createAsyncThunk(
  "event/getEventById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await API.get<Event>(`/api/event/${id}`);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async ({ id, data, imageFile }: { id: number, data: EventRequest, imageFile?: File }, { rejectWithValue }) => {
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
        `/api/event/${id}`,
        { body: JSON.stringify({ ...data, image: imageUrl }), headers: { "Content-Type": "application/json" } }
      );
      Swal.fire({
        icon: "success",
        title: "Update event successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/admin/event-management";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: (error as Error).message,
      });
      return rejectWithValue(error);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id: number, { rejectWithValue }) => {
    try {
      await API.delete<void>(`/api/event/${id}`);
      Swal.fire({
        icon: "success",
        title: "Delete event successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: (error as Error).message,
      });
      return rejectWithValue(error);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = action.payload ?? [];
    });
    builder.addCase(getEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.events.push(action.payload);
      }
    });
    builder.addCase(addEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(deleteEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = state.events.filter(
        (event) => event.id !== action.meta.arg
      );
    });
    builder.addCase(deleteEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(getEventById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEventById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = action.payload ? [action.payload] : [];
    });
    builder.addCase(getEventById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(updateEvent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      const id = action.meta.arg.id;
      const { name, description, image, startDate, endDate, location, capacity } = action.meta.arg.data;

      const index = state.events.findIndex((event) => event.id === id);
      state.events[index].name = name;
      state.events[index].description = description;
      state.events[index].image = image;
      state.events[index].startDate = startDate.toLocaleString("en-GB");
      state.events[index].endDate = endDate.toLocaleString("en-GB");
      state.events[index].location = location;
      state.events[index].capacity = capacity;
    });
    builder.addCase(updateEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export default eventSlice.reducer;