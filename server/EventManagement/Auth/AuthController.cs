using EventManagement.Constants;
using EventManagement.DTOs;
using EventManagement.Services;
using Microsoft.AspNetCore.Identity;

namespace EventManagement.Auth;

public static class AuthController
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder routes)
    {
        var authApi = routes.MapGroup("/api/auth").WithTags("Auth");

        authApi.MapPost("/register", RegisterAsync);
        authApi.MapPost("/login", LoginAsync);
        authApi.MapPost("/add-role", AddRoleAsync).RequireAuthorization(policy => policy.RequireRole(UserRole.Admin));
    }

    private static async Task<IResult> RegisterAsync(RegisterRequest request, UserManager<IdentityUser> userManager, IUserService userService)
    {
        var existingUser = await userManager.FindByEmailAsync(request.Email);
        if (existingUser is not null)
        {
            return Results.BadRequest($"Email '{request.Email}' is already registered");
        }

        var user = new IdentityUser() { UserName = request.Username, Email = request.Email };

        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
        {
            return Results.BadRequest(result.Errors.Select(e => e.Description));
        }

        await userManager.AddToRoleAsync(user, UserRole.User);
        await userService.CreateUserAsync(new CreateUserDto(
            request.Username,
            request.StudentId,
            request.Name,
            request.Email,
            request.PhoneNumber,
            request.Avatar,
            UserRole.User
        ));

        return Results.Ok();
    }

    private static async Task<IResult> LoginAsync(LoginRequest request, UserManager<IdentityUser> userManager, IUserService userService, ITokenService tokenService)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        var userInDb = await userService.GetUserByEmailAsync(request.Email);
        if (user is null || userInDb is null || !await userManager.CheckPasswordAsync(user, request.Password))
        {
            return Results.Unauthorized();
        }

        var roles = await userManager.GetRolesAsync(user);
        var (token, expiresAt) = tokenService.CreateToken(user, roles);

        return Results.Ok(new AuthResponse(userInDb, user.Email!, roles, token, expiresAt));
    }

    private static async Task<IResult> AddRoleAsync(AddRoleRequest request, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IUserService userService)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
        {
            return Results.NotFound($"User with email '{request.Email}' not found");
        }

        if (!await roleManager.RoleExistsAsync(request.Role))
        {
            return Results.BadRequest($"Role '{request.Role}' does not exist");
        }

        await userManager.AddToRoleAsync(user, request.Role);
        await userService.UpdateUserRoleAsync(request.Email, request.Role);

        return Results.Ok();
    }
}
