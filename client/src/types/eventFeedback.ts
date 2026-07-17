import type { Event } from "./event";
import type { User } from "./user";

export interface CreateFeedbackDto {
  userId: number;
  eventId: number;
  content: string;
}

export interface UpdateFeedbackDto {
  content: string;
}

export interface EventFeedback {
  id: number;
  user?: User;
  event?: Event;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
}