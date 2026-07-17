import type { User } from "./user";
import type { Event } from "./event";

export interface CreateAttendanceDto {
  userId: number;
  eventId: number;
  attendanceStatus: number;
}

export interface UpdateAttendanceDto {
  attendanceStatus: number;
}

export interface AttendanceRecord {
  id: number;
  user?: User;
  event?: Event;
  attendanceStatus: number;
  createdAt: Date;
  modifiedAt: Date;
}