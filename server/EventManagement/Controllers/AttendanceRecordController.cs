using EventManagement.DTOs;
using EventManagement.Services;

namespace EventManagement.Controllers;

public static class AttendanceRecordController
{
    public static void MapAttendanceRecordEndpoints(this IEndpointRouteBuilder routes)
    {
        var attendanceApi = routes.MapGroup("/api/attendance").WithTags("AttendanceRecords");

        attendanceApi.MapPost("/", async (IAttendanceRecordService service, CreateAttendanceRecordDto dto) =>
        {
            var attendanceRecord = await service.CreateAttendanceRecordAsync(dto);
            return TypedResults.Created($"/api/attendance/{attendanceRecord.Id}", attendanceRecord);
        });

        attendanceApi.MapGet("/", async (IAttendanceRecordService service) =>
        {
            var attendanceRecords = await service.GetAllAttendanceRecordsAsync();
            return TypedResults.Ok(attendanceRecords);
        });

        attendanceApi.MapGet("/{id}", async (IAttendanceRecordService service, int id) =>
        {
            var attendanceRecord = await service.GetAttendanceRecordByIdAsync(id);

            return attendanceRecord is null
                ? (IResult)TypedResults.NotFound(new { Message = $"Attendance record with ID {id} not found" })
                : TypedResults.Ok(attendanceRecord);
        });

        attendanceApi.MapPut("/{id}", async (IAttendanceRecordService service, int id, UpdateAttendanceRecordDto dto) =>
        {
            await service.UpdateAttendanceRecordAsync(id, dto);
            return TypedResults.NoContent();
        });

        attendanceApi.MapDelete("/{id}", async (IAttendanceRecordService service, int id) =>
        {
            await service.DeleteAttendanceRecordAsync(id);
            return TypedResults.NoContent();
        });
    }
}
