namespace EventManagement.Models;

public class Scorecard : EntityBase
{
    public int UserId { get; private set; }
    public int Score { get; private set; }

    public virtual User? User { get; }

    public static Scorecard Create(int userId, int score)
    {
        ValidateInputs(score);
        return new Scorecard { UserId = userId, Score = score };
    }

    public void Update(int userId, int score)
    {
        ValidateInputs(score);

        UserId = userId;
        Score = score;
        ModifiedAt = DateTimeOffset.UtcNow;
    }

    private static void ValidateInputs(int score)
    {
        if (score < 0)
        {
            throw new ArgumentException("Score cannot be negative", nameof(score));
        }
    }
}
