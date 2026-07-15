namespace EventManagement.DTOs;

public record CreateUserDto(
    string Username,
    string StudentId,
    string Name,
    string Email,
    string PhoneNumber,
    string Avatar,
    string Role
);

public record UpdateUserDto(
    string Username,
    string StudentId,
    string Name,
    string Email,
    string PhoneNumber,
    string Avatar
);

public record UserDto(
    int Id,
    string Username,
    string StudentId,
    string Name,
    string Email,
    string PhoneNumber,
    string Avatar,
    string Role
);