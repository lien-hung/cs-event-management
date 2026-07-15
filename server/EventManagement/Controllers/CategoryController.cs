using EventManagement.DTOs;
using EventManagement.Services;

namespace EventManagement.Controllers;

public static class CategoryController
{
    public static void MapCategoryEndpoints(this IEndpointRouteBuilder routes)
    {
        var categoryApi = routes.MapGroup("/api/category").WithTags("Categories");

        categoryApi.MapPost("/", async (ICategoryService service, CreateCategoryDto dto) =>
        {
            var category = await service.CreateCategoryAsync(dto);
            return TypedResults.Created($"/api/category/{category.Id}", category);
        });

        categoryApi.MapGet("/", async (ICategoryService service) =>
        {
            var categories = await service.GetAllCategoriesAsync();
            return TypedResults.Ok(categories);
        });

        categoryApi.MapGet("/{id}", async (ICategoryService service, int id) =>
        {
            var category = await service.GetCategoryByIdAsync(id);

            return category is null
                ? (IResult)TypedResults.NotFound(new { Message = $"Category with ID {id} not found" })
                : TypedResults.Ok(category);
        });

        categoryApi.MapPut("/{id}", async (ICategoryService service, int id, UpdateCategoryDto dto) =>
        {
            await service.UpdateCategoryAsync(id, dto);
            return TypedResults.NoContent();
        });

        categoryApi.MapDelete("/{id}", async (ICategoryService service, int id) =>
        {
            await service.DeleteCategoryAsync(id);
            return TypedResults.NoContent();
        });
    }
}
