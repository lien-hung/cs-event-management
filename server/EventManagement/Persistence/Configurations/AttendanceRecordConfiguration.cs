using EventManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Persistence.Configurations;

public class AttendanceRecordConfiguration : IEntityTypeConfiguration<AttendanceRecord>
{
    public void Configure(EntityTypeBuilder<AttendanceRecord> builder)
    {
        builder.ToTable("AttendanceRecords");

        builder.HasKey(ar => ar.Id);

        builder.HasOne(ar => ar.Event)
            .WithMany(e => e.AttendanceRecords)
            .HasForeignKey(ar => ar.EventId)
            .IsRequired();

        builder.HasOne(ar => ar.User)
            .WithMany(u => u.AttendanceRecords)
            .HasForeignKey(ar => ar.UserId)
            .IsRequired();

        builder.Property(ar => ar.AttendanceStatus)
            .IsRequired();

        builder.Property(c => c.CreatedAt)
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(c => c.ModifiedAt)
            .IsRequired()
            .ValueGeneratedOnUpdate();
    }
}
