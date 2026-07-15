using EventManagement.DTOs;
using EventManagement.Models;

namespace EventManagement.Mappers;

public static class AttendanceRecordMapper
{
    public static AttendanceRecordDto ToDto(this AttendanceRecord attendanceRecord)
    {
        return new AttendanceRecordDto(
            attendanceRecord.Id,
            attendanceRecord.User?.ToDto(),
            attendanceRecord.Event?.ToDto(),
            attendanceRecord.AttendanceStatus,
            attendanceRecord.CreatedAt,
            attendanceRecord.ModifiedAt
        );
    }
}
