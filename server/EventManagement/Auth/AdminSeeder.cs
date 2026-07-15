using EventManagement.Constants;
using EventManagement.DTOs;
using EventManagement.Services;
using Microsoft.AspNetCore.Identity;

namespace EventManagement.Auth;

public static class AdminSeeder
{
    public static async Task SeedAdminAsync(this IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var appUserService = scope.ServiceProvider.GetRequiredService<IUserService>();

        foreach (var role in new[] { UserRole.Admin, UserRole.User })
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        const string adminEmail = "admin@example.com";

        var existingAdmin = await userManager.FindByEmailAsync(adminEmail);
        if (existingAdmin is null)
        {
            var admin = new IdentityUser { UserName = adminEmail, Email = adminEmail, EmailConfirmed = true };
            await userManager.CreateAsync(admin, "Admin123!");
            await userManager.AddToRoleAsync(admin, UserRole.Admin);
            await appUserService.CreateUserAsync(new CreateUserDto(adminEmail, "", "Admin", adminEmail, "0912345678", "", UserRole.Admin));
        }
    }
}
