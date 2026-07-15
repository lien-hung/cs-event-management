using EventManagement.DTOs;
using EventManagement.Enums;

namespace EventManagement.Models;

public class User : EntityBase
{
    public string Username { get; private set; } = string.Empty;
    public string Password { get; private set; } = string.Empty;
    public string StudentId { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public string Email { get; private set; } = string.Empty;
    public string PhoneNumber { get; private set; } = string.Empty;
    public string Avatar { get; private set; } = string.Empty;
    public UserRole Role { get; private set; }

    public virtual ICollection<AttendanceRecord> AttendanceRecords { get; } = [];
    public virtual ICollection<EventFeedback> Feedbacks { get; } = [];
    public virtual Scorecard? Scorecard { get; }

    public static User Create(CreateUserDto dto)
    {
        ValidateInputs(dto.Username, dto.Password);
        return new User()
        {
            Username = dto.Username,
            Password = dto.Password,
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
        ValidateInputs(dto.Username, dto.Password);

        Username = dto.Username;
        Password = dto.Password;
        StudentId = dto.StudentId;
        Name = dto.Name;
        Email = dto.Email;
        PhoneNumber = dto.PhoneNumber;
        Avatar = dto.Avatar;
        Role = dto.Role;
        ModifiedAt = DateTimeOffset.UtcNow;
    }

    private static void ValidateInputs(string username, string password)
    {
        if (string.IsNullOrWhiteSpace(username))
        {
            throw new ArgumentException("Username is required", nameof(username));
        }

        if (string.IsNullOrWhiteSpace(password))
        {
            throw new ArgumentException("Password is required", nameof(password));
        }
    }
}
