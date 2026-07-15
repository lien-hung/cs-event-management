namespace EventManagement.Auth;

public record RegisterRequest(
    string Email,
    string Password,
    string Username,
    string Name,
    string StudentId,
    string PhoneNumber
);

public record LoginRequest(string Email, string Password);

public record AddRoleRequest(string Email, string Role);

public record AuthResponse(
    string UserId,
    string Email,
    IEnumerable<string> Roles,
    string Token,
    DateTime ExpiresAt);