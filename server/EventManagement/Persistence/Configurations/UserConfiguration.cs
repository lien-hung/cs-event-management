using EventManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Username)
            .IsRequired()
            .HasMaxLength(255);

        builder.Property(u => u.StudentId)
            .HasMaxLength(20);

        builder.Property(u => u.Name)
            .HasMaxLength(100);

        builder.Property(u => u.Email)
            .HasMaxLength(100);

        builder.Property(u => u.PhoneNumber)
            .HasMaxLength(20);

        builder.Property(u => u.Role)
            .HasMaxLength(20);

        builder.Property(u => u.CreatedAt)
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(u => u.ModifiedAt)
            .IsRequired()
            .ValueGeneratedOnUpdate();

        builder.HasIndex(u => u.Username);
    }
}
