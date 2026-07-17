import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAttendance } from "../../store/attendanceSlice";
import { getEvent } from "../../store/eventSlice";
import { getFeedback } from "../../store/feedbackSlice";
import { getUsers } from "../../store/userSlice";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart>(null);

  const users = useAppSelector((state) => state.user.users);
  const events = useAppSelector((state) => state.event.events);
  const attendance = useAppSelector((state) => state.attendance.attendance);
  const feedbacks = useAppSelector((state) => state.feedback.feedbacks);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getEvent());
    dispatch(getAttendance());
    dispatch(getFeedback());
  }, [dispatch]);

  useEffect(() => {
    const chartData = {
      labels: [
        "Người dùng",
        "Sự kiện",
        "Lượt tham gia",
        "Phản hồi",
      ],
      datasets: [
        {
          label: "Số lượng",
          data: [
            users.length,
            events.length,
            attendance.length,
            feedbacks.length,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Destroy the previous chart if it exists
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {}
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    }
  }, [attendance.length, events.length, feedbacks.length, users.length]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl mt-3">Thống Kê</h1>
      </div>
      <div className="w-full">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};