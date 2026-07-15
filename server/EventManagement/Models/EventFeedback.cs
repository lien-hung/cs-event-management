namespace EventManagement.Models;

public class EventFeedback : EntityBase
{
    public int UserId { get; private set; }
    public int EventId { get; private set; }
    public string Content { get; private set; } = string.Empty;

    public virtual User? User { get; }
    public virtual Event? Event { get; }

    public static EventFeedback Create(int userId, int eventId, string content)
    {
        ValidateInputs(content);
        return new EventFeedback() { UserId = userId, EventId = eventId, Content = content };
    }

    public void Update(int userId, int eventId, string content)
    {
        ValidateInputs(content);

        UserId = userId;
        EventId = eventId;
        Content = content;
        ModifiedAt = DateTimeOffset.UtcNow;
    }

    private static void ValidateInputs(string content)
    {
        if (string.IsNullOrWhiteSpace(content))
        {
            throw new ArgumentException("Content is required", nameof(content));
        }
    }
}
