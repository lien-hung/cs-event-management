using EventManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Persistence.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.ToTable("Categories");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(c => c.Slug)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(c => c.CreatedAt)
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(c => c.ModifiedAt)
            .IsRequired()
            .ValueGeneratedOnUpdate();

        builder.HasIndex(c => c.Name);
    }
}
