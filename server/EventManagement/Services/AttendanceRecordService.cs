using EventManagement.DTOs;
using EventManagement.Mappers;
using EventManagement.Models;
using EventManagement.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Services;

public interface IAttendanceRecordService
{
    Task<AttendanceRecordDto> CreateAttendanceRecordAsync(CreateAttendanceRecordDto dto);
    Task<AttendanceRecordDto?> GetAttendanceRecordByIdAsync(int id);
    Task<IEnumerable<AttendanceRecordDto>> GetAllAttendanceRecordsAsync();
    Task UpdateAttendanceRecordAsync(int id, UpdateAttendanceRecordDto dto);
    Task DeleteAttendanceRecordAsync(int id);
}

public class AttendanceRecordService : IAttendanceRecordService
{
    private readonly AppDbContext _context;

    public AttendanceRecordService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<AttendanceRecordDto> CreateAttendanceRecordAsync(CreateAttendanceRecordDto dto)
    {
        var attendanceRecord = AttendanceRecord.Create(dto.UserId, dto.EventId, dto.AttendanceStatus);

        await _context.AttendanceRecords.AddAsync(attendanceRecord);
        await _context.SaveChangesAsync();

        return attendanceRecord.ToDto();
    }

    public async Task DeleteAttendanceRecordAsync(int id)
    {
        var toDelete = await _context.AttendanceRecords.FindAsync(id);
        if (toDelete is not null)
        {
            _context.AttendanceRecords.Remove(toDelete);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<AttendanceRecordDto>> GetAllAttendanceRecordsAsync()
    {
        var attendanceRecords = await _context.AttendanceRecords
            .AsNoTracking()
            .Include(ar => ar.User)
            .Include(ar => ar.Event)
            .ToListAsync();

        return attendanceRecords.Select(ar => ar.ToDto());
    }

    public async Task<AttendanceRecordDto?> GetAttendanceRecordByIdAsync(int id)
    {
        var attendanceRecord = await _context.AttendanceRecords
            .AsNoTracking()
            .Include(ar => ar.User)
            .Include(ar => ar.Event)
            .FirstOrDefaultAsync(ar => ar.Id == id);

        return attendanceRecord?.ToDto();
    }

    public async Task UpdateAttendanceRecordAsync(int id, UpdateAttendanceRecordDto dto)
    {
        var toUpdate = await _context.AttendanceRecords.FindAsync(id) 
            ?? throw new Exception($"Attendance record with ID {id} not found");
        toUpdate.Update(dto.AttendanceStatus);
        await _context.SaveChangesAsync();
    }
}
