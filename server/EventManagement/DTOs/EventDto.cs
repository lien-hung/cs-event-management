namespace EventManagement.DTOs;

public record CreateEventDto(
    string Name,
    string Description,
    int CategoryId,
    string Image,
    DateTimeOffset StartDate,
    DateTimeOffset EndDate,
    string Location,
    int Capacity
);

public record UpdateEventDto(
    string Name,
    string Description,
    int CategoryId,
    string Image,
    DateTimeOffset StartDate,
    DateTimeOffset EndDate,
    string Location,
    int Capacity
);

public record EventDto(
    int Id,
    string Name,
    string Description,
    CategoryDto? Category,
    string Image,
    DateTimeOffset StartDate,
    DateTimeOffset EndDate,
    string Location,
    int Capacity
);