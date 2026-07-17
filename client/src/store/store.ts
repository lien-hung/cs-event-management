import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import eventSlice from "./eventSlice";
import userSlice from "./userSlice";
import categorySlice from "./categorySlice";
import feedbackSlice from "./feedbackSlice";
import attendanceSlice from "./attendanceSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    event: eventSlice,
    user: userSlice,
    category: categorySlice,
    feedback: feedbackSlice,
    attendance: attendanceSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;