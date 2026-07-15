namespace EventManagement.DTOs;

public record CreateScorecardDto(int UserId, int Score);
public record UpdateScorecardDto(int UserId, int Score);
public record ScorecardDto(int Id, UserDto? User, int Score, DateTimeOffset ModifiedAt);