using EventManagement.DTOs;
using EventManagement.Models;
using EventManagement.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Services;

public interface IEventService
{
    Task<EventDto> CreateEventAsync(CreateEventDto dto);
    Task<EventDto?> GetEventByIdAsync(int id);
    Task<IEnumerable<EventDto>> GetAllEventsAsync();
    Task UpdateEventAsync(int id, UpdateEventDto dto);
    Task DeleteEventAsync(int id);
}

public class EventService : IEventService
{
    private readonly AppDbContext _context;

    public EventService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<EventDto> CreateEventAsync(CreateEventDto dto)
    {
        var ev = Event.Create(dto);

        await _context.Events.AddAsync(ev);
        await _context.SaveChangesAsync();

        return new EventDto(
            ev.Id,
            ev.Name,
            ev.Description,
            null,
            ev.Image,
            ev.StartDate,
            ev.EndDate,
            ev.Location,
            ev.Capacity);
    }

    public async Task DeleteEventAsync(int id)
    {
        var toDelete = await _context.Events.FindAsync(id);
        if (toDelete is not null)
        {
            _context.Events.Remove(toDelete);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<EventDto>> GetAllEventsAsync()
    {
        var events = await _context.Events
            .AsNoTracking()
            .Include(e => e.Category)
            .ToListAsync();

        return events.Select(ev => new EventDto(
            ev.Id,
            ev.Name,
            ev.Description,
            new CategoryDto(ev.CategoryId, ev.Category?.Name ?? "", ev.Category?.Slug ?? ""),
            ev.Image,
            ev.StartDate,
            ev.EndDate,
            ev.Location,
            ev.Capacity
        ));
    }

    public async Task<EventDto?> GetEventByIdAsync(int id)
    {
        var ev = await _context.Events
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id);

        if (ev is null)
        {
            return null;
        }

        return new EventDto(
            ev.Id,
            ev.Name,
            ev.Description,
            new CategoryDto(ev.CategoryId, ev.Category?.Name ?? "", ev.Category?.Slug ?? ""),
            ev.Image,
            ev.StartDate,
            ev.EndDate,
            ev.Location,
            ev.Capacity
        );
    }

    public async Task UpdateEventAsync(int id, UpdateEventDto dto)
    {
        var toUpdate = await _context.Events.FindAsync(id) ?? throw new Exception($"Event with ID {id} not found");
        toUpdate.Update(dto);
        await _context.SaveChangesAsync();
    }
}
