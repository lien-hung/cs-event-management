using EventManagement.Constants;

namespace EventManagement.DTOs;

public record CreateAttendanceRecordDto(int UserId, int EventId, AttendanceStatus AttendanceStatus);
public record UpdateAttendanceRecordDto(int UserId,int EventId, AttendanceStatus AttendanceStatus);
public record AttendanceRecordDto(
    int Id,
    UserDto? User,
    EventDto? Event,
    AttendanceStatus AttendanceStatus,
    DateTimeOffset CreatedAt,
    DateTimeOffset ModifiedAt
);