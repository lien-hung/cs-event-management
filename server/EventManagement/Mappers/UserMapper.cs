using EventManagement.DTOs;
using EventManagement.Models;

namespace EventManagement.Mappers;

public static class UserMapper
{
    public static UserDto ToDto(this User user)
    {
        return new UserDto(
            user.Id,
            user.Username,
            user.StudentId,
            user.Name,
            user.Email,
            user.PhoneNumber,
            user.Avatar,
            user.Role
        );
    }
}
