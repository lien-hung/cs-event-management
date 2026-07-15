using EventManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Persistence.Configurations;

public class EventFeedbackConfiguration : IEntityTypeConfiguration<EventFeedback>
{
    public void Configure(EntityTypeBuilder<EventFeedback> builder)
    {
        builder.ToTable("EventFeedbacks");

        builder.HasKey(ef => ef.Id);

        builder.HasOne(ef => ef.Event)
            .WithMany(e => e.Feedbacks)
            .HasForeignKey(ef => ef.EventId)
            .IsRequired();

        builder.HasOne(ef => ef.User)
            .WithMany(u => u.Feedbacks)
            .HasForeignKey(ef => ef.UserId)
            .IsRequired();

        builder.Property(ef => ef.Content)
            .IsRequired();

        builder.Property(c => c.CreatedAt)
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(c => c.ModifiedAt)
            .IsRequired()
            .ValueGeneratedOnUpdate();
    }
}
