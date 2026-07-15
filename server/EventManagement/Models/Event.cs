using EventManagement.DTOs;

namespace EventManagement.Models;

public class Event : EntityBase
{
    public string Name { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public int CategoryId { get; private set; }
    public string Image { get; private set; } = string.Empty;
    public DateTimeOffset StartDate { get; private set; }
    public DateTimeOffset EndDate { get; private set; }
    public string Location { get; private set; } = string.Empty;
    public int Capacity { get; private set; }

    public virtual Category? Category { get; }
    public virtual ICollection<AttendanceRecord> AttendanceRecords { get; } = [];
    public virtual ICollection<EventFeedback> Feedbacks { get; } = [];

    public static Event Create(CreateEventDto dto)
    {
        ValidateInputs(dto.Name, dto.Capacity);
        return new Event()
        {
            Name = dto.Name,
            Description = dto.Description,
            CategoryId = dto.CategoryId,
            Image = dto.Image,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            Location = dto.Location,
            Capacity = dto.Capacity
        };
    }

    public void Update(UpdateEventDto dto)
    {
        ValidateInputs(dto.Name, dto.Capacity);

        Name = dto.Name;
        Description = dto.Description;
        CategoryId = dto.CategoryId;
        Image = dto.Image;
        StartDate = dto.StartDate;
        EndDate = dto.EndDate;
        Location = dto.Location;
        Capacity = dto.Capacity;
        ModifiedAt = DateTimeOffset.UtcNow;
    }

    private static void ValidateInputs(string name, int capacity)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Name is required", nameof(name));
        }

        if (capacity < 0)
        {
            throw new ArgumentException("Capacity cannot be negative", nameof(capacity));
        }
    }
}
