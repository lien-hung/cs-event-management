using EventManagement.DTOs;
using EventManagement.Models;

namespace EventManagement.Mappers;

public static class EventMapper
{
    public static EventDto ToDto(this Event ev)
    {
        return new EventDto(
            ev.Id,
            ev.Name,
            ev.Description,
            ev.Category?.ToDto(),
            ev.Image,
            ev.StartDate,
            ev.EndDate,
            ev.Location,
            ev.Capacity
        );
    }
}
