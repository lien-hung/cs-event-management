using EventManagement.Enums;

namespace EventManagement.Models;

public class AttendanceRecord : EntityBase
{
    public int UserId { get; private set; }
    public int EventId { get; private set; }
    public AttendanceStatus AttendanceStatus { get; private set; }

    public virtual User? User { get; }
    public virtual Event? Event { get; }

    public static AttendanceRecord Create(int userId, int eventId, AttendanceStatus attendanceStatus)
    {
        return new AttendanceRecord()
        {
            UserId = userId,
            EventId = eventId,
            AttendanceStatus = attendanceStatus
        };
    }

    public void Update(int userId, int eventId, AttendanceStatus attendanceStatus)
    {
        UserId = userId;
        EventId = eventId;
        AttendanceStatus = attendanceStatus;
        ModifiedAt = DateTimeOffset.UtcNow;
    }
}
