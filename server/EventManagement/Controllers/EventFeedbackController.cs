using System;
using EventManagement.DTOs;
using EventManagement.Services;

namespace EventManagement.Controllers;

public static class EventFeedbackController
{
    public static void MapEventFeedbackEndpoints(this IEndpointRouteBuilder routes)
    {
        var eventFeedbackApi = routes.MapGroup("/api/feedback").WithTags("EventFeedbacks");

        eventFeedbackApi.MapPost("/", async (IEventFeedbackService service, CreateEventFeedbackDto dto) =>
        {
            var eventFeedback = await service.CreateEventFeedbackAsync(dto);
            return TypedResults.Created($"/api/feedback/{eventFeedback.Id}", eventFeedback);
        });

        eventFeedbackApi.MapGet("/", async (IEventFeedbackService service) =>
        {
            var eventFeedbacks = await service.GetAllEventFeedbacksAsync();
            return TypedResults.Ok(eventFeedbacks);
        });

        eventFeedbackApi.MapGet("/{id}", async (IEventFeedbackService service, int id) =>
        {
            var eventFeedback = await service.GetEventFeedbackByIdAsync(id);

            return eventFeedback is null
                ? (IResult)TypedResults.NotFound(new { Message = $"Feedback with ID {id} not found" })
                : TypedResults.Ok(eventFeedback);
        });

        eventFeedbackApi.MapPut("/{id}", async (IEventFeedbackService service, int id, UpdateEventFeedbackDto dto) =>
        {
            await service.UpdateEventFeedbackAsync(id, dto);
            return TypedResults.NoContent();
        });

        eventFeedbackApi.MapDelete("/{id}", async (IEventFeedbackService service, int id) =>
        {
            await service.DeleteEventFeedbackAsync(id);
            return TypedResults.NoContent();
        });
    }
}
