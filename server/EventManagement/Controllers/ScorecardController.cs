using EventManagement.DTOs;
using EventManagement.Services;

namespace EventManagement.Controllers;

public static class ScorecardController
{
    public static void MapScorecardEndpoints(this IEndpointRouteBuilder routes)
    {
        var scorecardApi = routes.MapGroup("/api/scorecard").WithTags("Scorecard");

        scorecardApi.MapPost("/", async (IScorecardService service, CreateScorecardDto dto) =>
        {
            var scorecard = await service.CreateScorecardAsync(dto);
            return TypedResults.Created($"/api/scorecard/{scorecard.Id}", scorecard);
        });

        scorecardApi.MapGet("/", async (IScorecardService service) =>
        {
            var scorecards = await service.GetAllScorecardsAsync();
            return TypedResults.Ok(scorecards);
        });

        scorecardApi.MapGet("/{id}", async (IScorecardService service, int id) =>
        {
            var scorecard = await service.GetScorecardByIdAsync(id);

            return scorecard is null
                ? (IResult)TypedResults.NotFound(new { Message = $"Scorecard with ID {id} not found" })
                : TypedResults.Ok(scorecard);
        });

        scorecardApi.MapPut("/{id}", async (IScorecardService service, int id, UpdateScorecardDto dto) =>
        {
            await service.UpdateScorecardAsync(id, dto);
            return TypedResults.NoContent();
        });

        scorecardApi.MapDelete("/{id}", async (IScorecardService service, int id) =>
        {
            await service.DeleteScorecardAsync(id);
            return TypedResults.NoContent();
        });
    }
}
