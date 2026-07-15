using EventManagement.DTOs;
using EventManagement.Models;

namespace EventManagement.Mappers;

public static class EventFeedbackMapper
{
    public static EventFeedbackDto ToDto(this EventFeedback feedback)
    {
        return new EventFeedbackDto(
            feedback.Id,
            feedback.User?.ToDto(),
            feedback.Event?.ToDto(),
            feedback.Content,
            feedback.CreatedAt,
            feedback.ModifiedAt
        );
    }
}
