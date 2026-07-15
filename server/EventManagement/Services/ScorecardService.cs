using EventManagement.DTOs;
using EventManagement.Mappers;
using EventManagement.Models;
using EventManagement.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Services;

interface IScorecardService
{
    Task<ScorecardDto> CreateScorecardAsync(CreateScorecardDto dto);
    Task<ScorecardDto?> GetScorecardByIdAsync(int id);
    Task<IEnumerable<ScorecardDto>> GetAllScorecardsAsync();
    Task UpdateScorecardAsync(int id, UpdateScorecardDto dto);
    Task DeleteScorecardAsync(int id);
}

public class ScorecardService : IScorecardService
{
    private readonly AppDbContext _context;

    public ScorecardService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ScorecardDto> CreateScorecardAsync(CreateScorecardDto dto)
    {
        var scorecard = Scorecard.Create(dto.UserId, dto.Score);

        await _context.Scorecards.AddAsync(scorecard);
        await _context.SaveChangesAsync();

        return scorecard.ToDto();
    }

    public async Task DeleteScorecardAsync(int id)
    {
        var toDelete = await _context.Scorecards.FindAsync(id);
        if (toDelete is not null)
        {
            _context.Scorecards.Remove(toDelete);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<ScorecardDto>> GetAllScorecardsAsync()
    {
        var scorecards = await _context.Scorecards
            .AsNoTracking()
            .Include(s => s.User)
            .ToListAsync();

        return scorecards.Select(s => s.ToDto());
    }

    public async Task<ScorecardDto?> GetScorecardByIdAsync(int id)
    {
        var scorecard = await _context.Scorecards
            .AsNoTracking()
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.Id == id);

        return scorecard?.ToDto();
    }

    public async Task UpdateScorecardAsync(int id, UpdateScorecardDto dto)
    {
        var toUpdate = await _context.Scorecards.FindAsync(id)
            ?? throw new Exception($"Scorecard with ID {id} not found");
        toUpdate.Update(dto.UserId, dto.Score);
        await _context.SaveChangesAsync();
    }
}
