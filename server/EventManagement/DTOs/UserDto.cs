using EventManagement.Enums;

namespace EventManagement.DTOs;

public record CreateUserDto(
    string Username,
    string Password,
    string StudentId,
    string Name,
    string Email,
    string PhoneNumber,
    string Avatar,
    UserRole Role
);

public record UpdateUserDto(
    string Username,
    string Password,
    string StudentId,
    string Name,
    string Email,
    string PhoneNumber,
    string Avatar,
    UserRole Role
);

public record UserDto(
    int Id,
    string Username,
    string StudentId,
    string Name,
    string Email,
    string PhoneNumber,
    string Avatar,
    UserRole Role
);