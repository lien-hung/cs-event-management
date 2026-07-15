using System;
using EventManagement.DTOs;
using EventManagement.Models;

namespace EventManagement.Mappers;

public static class CategoryMapper
{
    public static CategoryDto ToDto(this Category category)
    {
        return new CategoryDto(category.Id, category.Name, category.Slug);
    }
}
