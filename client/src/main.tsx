import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import {
  AccountManagement,
  AddAccount,
  AddCategory,
  AddEvent,
  AttendanceManagement,
  CategoryManagement,
  Dashboard,
  EditEvent,
  EventManagement,
  FeedbackManagement,
  LayoutAdmin
} from './pages/admin';
import {
  AttendanceHistory,
  EventDetail,
  EventList,
  HomePage,
  LayoutMain,
  RegisterSuccess,
  UpdateProfile
} from './pages/main';
import { SignIn } from './pages/SignIn.tsx';
import store from './store/store.ts';

const router = createBrowserRouter([
  {
    Component: LayoutMain,
    children: [
      { index: true, Component: HomePage },
      { path: "register-success", Component: RegisterSuccess },
      { path: "event-detail/:id", Component: EventDetail },
      { path: "update-profile/:id", Component: UpdateProfile },
      { path: "event-list", Component: EventList },
      { path: "attendance-history", Component: AttendanceHistory },
    ],
  },
  {
    path: "admin",
    children: [
      {
        Component: LayoutAdmin,
        children: [
          { path: "dashboard", Component: Dashboard },
          { path: "event-management", Component: EventManagement },
          { path: "add-event", Component: AddEvent },
          { path: "edit-event/:id", Component: EditEvent },
          { path: "account-management", Component: AccountManagement },
          { path: "add-account", Component: AddAccount },
          { path: "category-management", Component: CategoryManagement },
          { path: "add-category", Component: AddCategory },
          { path: "attendance-management", Component: AttendanceManagement },
          { path: "feedback-management", Component: FeedbackManagement },
        ],
      },
    ],
  },
  {
    path: "login",
    Component: SignIn,
  },
], {
  basename: "/cs-event-management",
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
