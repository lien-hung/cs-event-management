using System;
using EventManagement.DTOs;
using EventManagement.Mappers;
using EventManagement.Models;
using EventManagement.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Services;

interface IUserService
{
    Task<UserDto> CreateUserAsync(CreateUserDto dto);
    Task<UserDto?> GetUserByIdAsync(int id);
    Task<IEnumerable<UserDto>> GetAllUsersAsync();
    Task UpdateUserAsync(int id, UpdateUserDto dto);
    Task DeleteUserAsync(int id);
}

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
    {
        var user = User.Create(dto);

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return user.ToDto();
    }

    public async Task DeleteUserAsync(int id)
    {
        var toDelete = await _context.Users.FindAsync(id);
        if (toDelete is not null)
        {
            _context.Users.Remove(toDelete);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
        var users = await _context.Users
            .AsNoTracking()
            .Include(u => u.Feedbacks)
            .Include(u => u.AttendanceRecords)
            .Include(u => u.Scorecard)
            .ToListAsync();

        return users.Select(u => u.ToDto());
    }

    public async Task<UserDto?> GetUserByIdAsync(int id)
    {
        var user = await _context.Users
            .AsNoTracking()
            .Include(u => u.Feedbacks)
            .Include(u => u.AttendanceRecords)
            .Include(u => u.Scorecard)
            .FirstOrDefaultAsync(u => u.Id == id);

        return user?.ToDto();
    }

    public async Task UpdateUserAsync(int id, UpdateUserDto dto)
    {
        var toUpdate = await _context.Users.FindAsync(id) ?? throw new Exception($"User with ID {id} not found");
        toUpdate.Update(dto);
        await _context.SaveChangesAsync();
    }
}
