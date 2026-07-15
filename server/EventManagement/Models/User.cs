using EventManagement.DTOs;

namespace EventManagement.Models;

public class User : EntityBase
{
    public string Username { get; private set; } = string.Empty;
    public string StudentId { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string PhoneNumber { get; private set; } = string.Empty;
    public string Avatar { get; private set; } = string.Empty;
    public string Role { get; private set; } = string.Empty;

    public virtual ICollection<AttendanceRecord> AttendanceRecords { get; } = [];
    public virtual ICollection<EventFeedback> Feedbacks { get; } = [];
    public virtual Scorecard? Scorecard { get; }

    public static User Create(CreateUserDto dto)
    {
        ValidateInputs(dto.Username);
        return new User()
        {
            Username = dto.Username,
            StudentId = dto.StudentId,
            Name = dto.Name,
            Email = dto.Email,
            PhoneNumber = dto.PhoneNumber,
            Avatar = dto.Avatar,
            Role = dto.Role
        };
    }

    public void Update(UpdateUserDto dto)
    {
        ValidateInputs(dto.Username);

        Username = dto.Username;
        StudentId = dto.StudentId;
        Name = dto.Name;
        Email = dto.Email;
        PhoneNumber = dto.PhoneNumber;
        Avatar = dto.Avatar;
        ModifiedAt = DateTimeOffset.UtcNow;
    }

    public void UpdateRole(string role)
    {
        Role = role;
        ModifiedAt = DateTimeOffset.UtcNow;
    }

    private static void ValidateInputs(string username)
    {
        if (string.IsNullOrWhiteSpace(username))
        {
            throw new ArgumentException("Username is required", nameof(username));
        }
    }
}
