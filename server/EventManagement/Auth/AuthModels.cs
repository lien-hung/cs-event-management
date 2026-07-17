using EventManagement.DTOs;

namespace EventManagement.Auth;

public record RegisterRequest(
    string Email,
    string Password,
    string Username,
    string Name,
    string StudentId,
    string PhoneNumber,
    string Avatar
);

public record LoginRequest(string Email, string Password);

public record AddRoleRequest(string Email, string Role);

public record AuthResponse(
    UserDto User,
    string Email,
    IEnumerable<string> Roles,
    string Token,
    DateTime ExpiresAt);