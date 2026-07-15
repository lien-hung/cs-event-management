namespace EventManagement.Models;

public class Category : EntityBase
{
    public string Name { get; private set; } = string.Empty;
    public string Slug { get; private set; } = string.Empty;

    public virtual ICollection<Event> Events { get; } = [];

    public static Category Create(string name, string slug)
    {
        ValidateInputs(name, slug);
        return new Category() { Name = name, Slug = slug };
    }

    public void Update(string name, string slug)
    {
        ValidateInputs(name, slug);

        Name = name;
        Slug = slug;
        ModifiedAt = DateTimeOffset.UtcNow;
    }

    private static void ValidateInputs(string name, string slug)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Name is required", nameof(name));
        }

        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Slug is required", nameof(slug));
        }
    }
}
