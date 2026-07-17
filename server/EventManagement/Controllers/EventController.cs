using EventManagement.DTOs;
using EventManagement.Services;

namespace EventManagement.Controllers;

public static class EventController
{
    public static void MapEventEndpoints(this IEndpointRouteBuilder routes)
    {
        var eventApi = routes.MapGroup("/api/event").WithTags("Events");

        eventApi.MapPost("/", async (IEventService service, CreateEventDto dto) =>
        {
            var ev = await service.CreateEventAsync(dto);
            return TypedResults.Created($"/api/event/{ev.Id}", ev);
        });

        eventApi.MapGet("/", async (IEventService service) =>
        {
            var events = await service.GetAllEventsAsync();
            return TypedResults.Ok(events);
        });

        eventApi.MapGet("/{id}", async (IEventService service, int id) =>
        {
            var ev = await service.GetEventByIdAsync(id);

            return ev is null
                ? (IResult)TypedResults.NotFound(new { Message = $"Event with ID {id} not found" })
                : TypedResults.Ok(ev);
        });

        eventApi.MapPut("/{id}", async (IEventService service, int id, UpdateEventDto dto) =>
        {
            await service.UpdateEventAsync(id, dto);
            return TypedResults.NoContent();
        });

        eventApi.MapDelete("/{id}", async (IEventService service, int id) =>
        {
            await service.DeleteEventAsync(id);
            return TypedResults.NoContent();
        });

        eventApi.MapGet("/{id}/attendance", async (IEventService service, int id) =>
        {
            var attendance = await service.GetAttendanceByEventAsync(id);
            return TypedResults.Ok(attendance);
        });

        eventApi.MapGet("/{id}/feedbacks", async (IEventService service, int id) =>
        {
            var feedbacks = await service.GetFeedbackByEventAsync(id);
            return TypedResults.Ok(feedbacks);
        });
    }
}
