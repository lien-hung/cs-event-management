namespace EventManagement.DTOs;

public record CreateCategoryDto(string Name, string Slug);
public record UpdateCategoryDto(string Name, string Slug);
public record CategoryDto(int Id, string Name, string Slug);