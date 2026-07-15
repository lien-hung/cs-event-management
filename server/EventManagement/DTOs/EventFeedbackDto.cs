namespace EventManagement.DTOs;

public record CreateEventFeedbackDto(int UserId, int EventId, string Content);
public record UpdateEventFeedbackDto(int UserId, int EventId, string Content);
public record EventFeedbackDto(
    int Id,
    UserDto? User,
    EventDto? Event,
    string Content,
    DateTimeOffset CreatedAt,
    DateTimeOffset ModifiedAt
);