using EventManagement.DTOs;
using EventManagement.Mappers;
using EventManagement.Models;
using EventManagement.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Services;

interface IEventFeedbackService
{
    Task<EventFeedbackDto> CreateEventFeedbackAsync(CreateEventFeedbackDto dto);
    Task<EventFeedbackDto?> GetEventFeedbackByIdAsync(int id);
    Task<IEnumerable<EventFeedbackDto>> GetAllEventFeedbacksAsync();
    Task UpdateEventFeedbackAsync(int id, UpdateEventFeedbackDto dto);
    Task DeleteEventFeedbackAsync(int id);
}

public class EventFeedbackService : IEventFeedbackService
{
    private readonly AppDbContext _context;

    public EventFeedbackService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<EventFeedbackDto> CreateEventFeedbackAsync(CreateEventFeedbackDto dto)
    {
        var eventFeedback = EventFeedback.Create(dto.UserId, dto.EventId, dto.Content);

        await _context.EventFeedbacks.AddAsync(eventFeedback);
        await _context.SaveChangesAsync();

        return eventFeedback.ToDto();
    }

    public async Task DeleteEventFeedbackAsync(int id)
    {
        var toDelete = await _context.EventFeedbacks.FindAsync(id);
        if (toDelete is not null)
        {
            _context.EventFeedbacks.Remove(toDelete);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<EventFeedbackDto>> GetAllEventFeedbacksAsync()
    {
        var eventFeedbacks = await _context.EventFeedbacks
            .AsNoTracking()
            .Include(ef => ef.User)
            .Include(ef => ef.Event)
            .ToListAsync();

        return eventFeedbacks.Select(ef => ef.ToDto());
    }

    public async Task<EventFeedbackDto?> GetEventFeedbackByIdAsync(int id)
    {
        var eventFeedback = await _context.EventFeedbacks
            .AsNoTracking()
            .Include(ef => ef.User)
            .Include(ef => ef.Event)
            .FirstOrDefaultAsync(ef => ef.Id == id);

        return eventFeedback?.ToDto();
    }

    public async Task UpdateEventFeedbackAsync(int id, UpdateEventFeedbackDto dto)
    {
        var toUpdate = await _context.EventFeedbacks.FindAsync(id)
            ?? throw new Exception($"Event feedback with ID {id} not found");
        toUpdate.Update(dto.UserId, dto.EventId, dto.Content);
        await _context.SaveChangesAsync();
    }
}
