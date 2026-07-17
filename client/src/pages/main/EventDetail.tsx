import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import defaultAvatar from "../../assets/avatar.jpg";
import { AttendanceStatus } from "../../constants/attendance";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addAttendance, getAttendanceByEvent } from "../../store/attendanceSlice";
import { getEventById } from "../../store/eventSlice";
import { addFeedback, getFeedbackByEvent } from "../../store/feedbackSlice";
import { getUsers } from "../../store/userSlice";
import type { CreateAttendanceDto } from "../../types/attendance";
import type { CreateFeedbackDto } from "../../types/eventFeedback";

export function EventDetail() {
  const [feedback, setFeedback] = useState("");
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const event = useAppSelector((state) => state.event.events[0]);
  const users = useAppSelector((state) => state.user.users);
  const auth = useAppSelector((state) => state.auth);
  const feedbackList = useAppSelector((state) => state.feedback.feedbacks);
  const attendance = useAppSelector((state) => state.attendance.attendance);

  const userId = auth.currentUser?.id;

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getEventById(Number(id)));
    dispatch(getAttendanceByEvent(Number(id)));
    dispatch(getFeedbackByEvent(Number(id)));
  }, [dispatch, id]);

  if (!event) return;

  const nowDate = new Date();

  const isUpcoming = nowDate < new Date(event.startDate);
  const isEnded = nowDate > new Date(event.endDate);

  const isRegistered = attendance.some((item) => item.event?.id === id && item.user?.id === userId);
  const remainingCapacity = event.capacity - attendance.length;

  const handleAddFeedback = (feedback: string) => {
    if (!auth.currentUser) {
      navigate("/login");
      return null;
    } else {
      const data: CreateFeedbackDto = {
        userId: userId,
        eventId: Number(id),
        content: feedback
      };
      dispatch(addFeedback(data));
    }
  };

  const handleRegister = () => {
    const data: CreateAttendanceDto = {
      userId: userId,
      eventId: Number(id),
      attendanceStatus: AttendanceStatus.Registered,
    };
    dispatch(addAttendance(data));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-5">
          <img
            src={event.image}
            alt={event.name}
            className="img-fluid"
            style={{ borderRadius: "5px", border: "1px solid #ddd", height: "auto" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{event.name}</h1>
          <h2 className="text-danger">Còn {remainingCapacity} suất</h2>
          <h2 className="text-danger">Thời gian: {new Date(event.startDate).toLocaleDateString("en-GB")} đến {new Date(event.endDate).toLocaleDateString("en-GB")}</h2>
          <p className="lead" dangerouslySetInnerHTML={{ __html: event.description }}></p>
          {auth.currentUser
            ? (isUpcoming && remainingCapacity > 0
              ? (
                <button
                  onClick={handleRegister}
                  className="btn btn-primary btn-lg btn-block mb-2"
                  disabled={isRegistered}
                >
                  {isRegistered ? "Đã đăng ký" : "ĐĂNG KÝ"}
                </button>
              )
              : (
                <button className="btn btn-secondary btn-lg btn-block mb-2" disabled>
                  {remainingCapacity <= 0 ? "Hết suất" : (isEnded ? "Đã kết thúc" : "Đang diễn ra")}
                </button>
              ))
            : <p className="lead" style={{ fontStyle: "italic" }}>Vui lòng đăng nhập để tiếp tục.</p>
          }
        </div>
      </div>

      {/* Comment Section */}
      <div className="row mt-5">
        <div className="col">
          <h3 className="pt-0 text-black">Phản Hồi</h3>
          <form>
            <div className="form-group">
              <label htmlFor="message">Phản Hồi:</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="form-control"
                placeholder="Nhập bình luận của bạn..."
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddFeedback(feedback);
              }}
              className="btn btn-primary mt-3"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          {feedbackList.length > 0 ? (
            feedbackList.map((item) => {
              const user = users.find((user) => user.id === item.user?.id);
              return (
                <div key={item.id} className="media mb-4">
                  <img
                    src={(user && user.avatar) ? user.avatar : defaultAvatar}
                    alt="User Avatar"
                    className="w-12.5 rounded-full"
                  />
                  <div className="media-body">
                    <h5 className="mt-0">{user?.name}</h5>
                    <p>{item.content}</p>
                    <small className="text-muted">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Không có bình luận nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}