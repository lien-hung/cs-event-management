using EventManagement.DTOs;
using EventManagement.Models;

namespace EventManagement.Mappers;

public static class ScorecardMapper
{
    public static ScorecardDto ToDto(this Scorecard scorecard)
    {
        return new ScorecardDto(scorecard.Id, scorecard.User?.ToDto(), scorecard.Score, scorecard.ModifiedAt);
    }
}
