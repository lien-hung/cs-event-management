using EventManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Persistence.Configurations;

public class ScorecardConfiguration : IEntityTypeConfiguration<Scorecard>
{
    public void Configure(EntityTypeBuilder<Scorecard> builder)
    {
        builder.ToTable("Scorecards");

        builder.HasKey(s => s.Id);

        builder.HasOne(s => s.User)
            .WithOne(u => u.Scorecard)
            .HasForeignKey<Scorecard>(s => s.UserId)
            .IsRequired();

        builder.Property(s => s.Score)
            .IsRequired();

        builder.Property(c => c.CreatedAt)
            .IsRequired()
            .ValueGeneratedOnAdd();

        builder.Property(c => c.ModifiedAt)
            .IsRequired()
            .ValueGeneratedOnUpdate();
    }
}
