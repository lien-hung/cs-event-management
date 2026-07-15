namespace EventManagement.Models;

public abstract class EntityBase
{
    public int Id { get; private init; } = 0;
    public DateTimeOffset CreatedAt { get; private set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset ModifiedAt { get; protected set; } = DateTimeOffset.UtcNow;
}
