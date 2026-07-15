using EventManagement.DTOs;
using EventManagement.Services;

namespace EventManagement.Controllers;

public static class UserController
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder routes)
    {
        var userApi = routes.MapGroup("/api/user").WithTags("Users");

        userApi.MapPost("/", async (IUserService service, CreateUserDto dto) =>
        {
            var user = await service.CreateUserAsync(dto);
            return TypedResults.Created($"/api/user/{user.Id}", user);
        });

        userApi.MapGet("/", async (IUserService service) =>
        {
            var users = await service.GetAllUsersAsync();
            return TypedResults.Ok(users);
        });

        userApi.MapGet("/{id}", async (IUserService service, int id) =>
        {
            var user = await service.GetUserByIdAsync(id);

            return user is null
                ? (IResult)TypedResults.NotFound(new { Message = $"User with ID {id} not found" })
                : TypedResults.Ok(user);
        });

        userApi.MapPut("/{id}", async (IUserService service, int id, UpdateUserDto dto) =>
        {
            await service.UpdateUserAsync(id, dto);
            return TypedResults.NoContent();
        });

        userApi.MapDelete("/{id}", async (IUserService service, int id) =>
        {
            await service.DeleteUserAsync(id);
            return TypedResults.NoContent();
        });
    }
}
