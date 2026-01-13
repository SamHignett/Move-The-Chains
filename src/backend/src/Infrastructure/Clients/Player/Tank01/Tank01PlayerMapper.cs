using Application.Models.Player;
using Application.Models.Stats;
using Infrastructure.Clients.Player.Tank01.Models;


namespace Infrastructure.Clients.Player.Tank01;

public static class Tank01PlayerMapper
{
    public static PlayerStatsDto ToPlayerStatsDto(this Tank01PlayerInfoDto player)
    {
        return new PlayerStatsDto()
        {
            ID = player.ID,
            Name = player.Name,
            Offensive = player.Stats.ToPlayerOffensiveStatsDto(),
            Defensive = player.Stats.Defensive == null ? null : player.Stats.Defensive.ToPlayerDefensiveStatsDto()
        };
    }

    private static OffensiveStats ToPlayerOffensiveStatsDto(this Tank01PlayerStatsDto stats)
    {
        return new OffensiveStats
        {
            Rushing = stats.Rushing == null ? null : stats.Rushing.ToPlayerRushingStats(),
            Passing = stats.Passing == null ? null : stats.Passing.ToPlayerPassingStats(),
            Kicking = stats.Kicking == null ? null : stats.Kicking.ToPlayerKickingStats(),
            Punting = stats.Punting == null ? null : stats.Punting.ToPlayerPuntingStats(),
            Receiving = stats.Receiving == null ? null : stats.Receiving.ToPlayerReceivingStats(),
            Fumbling = stats.Defensive == null? null :  stats.ToPlayerFumblingStats()
        };
    }

    private static PlayerDefensiveStats ToPlayerDefensiveStatsDto(this Tank01PlayerDefensiveStats stats)
    {
        return new PlayerDefensiveStats
        {
            FumblesRecovered = new Stat { Id = "", Value = Double.Parse(stats.FumblesRecovered) },
            Sacks = new Stat { Id = "", Value = Double.Parse(stats.Sacks) },
            QbHits = new Stat { Id = "", Value = Double.Parse(stats.QbHits) },
            Interceptions = new Stat { Id = "", Value = Double.Parse(stats.Interceptions) },
            Tackles = new Stat { Id = "", Value = Double.Parse(stats.TotalTackles) },
            SoloTackles = new Stat { Id = "", Value = Double.Parse(stats.TotalTackles) },
            TacklesForLoss = new Stat { Id = "", Value = Double.Parse(stats.TFL) },
            PassesDeflected = new Stat { Id = "", Value = Double.Parse(stats.PassDeflections) },
            DefensiveTouchdowns = new Stat { Id = "", Value = Double.Parse(stats.DefensiveTouchdowns) }
        };
    }

    private static RushingStats ToPlayerRushingStats(this Tank01PlayerRushingStats stats)
    {
        return new RushingStats
        {
            Yards = new Stat { Id = "", Value = Double.Parse(stats.Yards) },
            Touchdowns = new Stat { Id = "", Value = Double.Parse(stats.Touchdowns) },
            Carries = new Stat { Id = "", Value = Double.Parse(stats.Carries) }
        };
    }
    
    private static PassingStats ToPlayerPassingStats(this Tank01PlayerPassingStats stats)
    {
        return new PassingStats
        {
            Yards = new Stat { Id = "", Value = Double.Parse(stats.Yards) },
            Touchdowns = new Stat { Id = "", Value = Double.Parse(stats.Touchdowns) },
            Completions = new Stat { Id = "", Value = Double.Parse(stats.Completions) },
            Attempts = new Stat { Id = "", Value = Double.Parse(stats.Attempts) },
            Interceptions = new Stat { Id = "", Value = Double.Parse(stats.Interceptions) }
        };
    }

    private static KickingStats ToPlayerKickingStats(this Tank01PlayerKickingStats stats)
    {
        return new KickingStats
        {
            ExtraPointsAttempted = new Stat { Id = "", Value = Double.Parse(stats.ExtraPointsAttempted) },
            ExtraPointsMade = new Stat { Id = "", Value = Double.Parse(stats.ExtraPointsMade) },
            FieldGoalsAttempted = new Stat { Id = "", Value = Double.Parse(stats.FieldGoalsAttempted) },
            FieldGoalsMade = new Stat { Id = "", Value = Double.Parse(stats.FieldGoalsMade) }
        };
    }
    
    private static PuntingStats ToPlayerPuntingStats(this Tank01PlayerPuntingStats stats)
    {
        var yards = double.Parse(stats.Yards);
        var punts = double.Parse(stats.Punts);
        
        return new PuntingStats
        {
            AverageYards = new Stat { Id = "", Value = punts == 0.0 ? 0.0 : Math.Round(yards / punts, 1) },
            Punts = new Stat { Id = "", Value = punts },
            PuntsInside20 = new Stat { Id = "", Value = Double.Parse(stats.PuntsInside20) },
            Yards = new Stat { Id = "", Value = Double.Parse(stats.Yards) }
        };
    }
    
    private static FumblingStats ToPlayerFumblingStats(this Tank01PlayerStatsDto stats)
    {
        return new FumblingStats
        {
            Fumbles = new Stat { Id = "", Value = Double.Parse(stats.Defensive.Fumbles) },
            FumblesLost = new Stat { Id = "", Value = Double.Parse(stats.Defensive.FumblesLost) },
            FumblesRecovered = new Stat { Id = "", Value = Double.Parse(stats.Defensive.FumblesRecovered) }
        };
    }

    private static ReceivingStats ToPlayerReceivingStats(this Tank01PlayerReceivingStats stats)
    {
        return new ReceivingStats
        {
            Receptions = new Stat { Id = "", Value = Double.Parse(stats.Receptions) },
            Yards = new Stat { Id = "", Value = Double.Parse(stats.Yards) },
            Touchdowns = new Stat { Id = "", Value = Double.Parse(stats.Touchdowns) },
            Targets = new Stat { Id = "", Value = Double.Parse(stats.Targets) }
        };
    }
}