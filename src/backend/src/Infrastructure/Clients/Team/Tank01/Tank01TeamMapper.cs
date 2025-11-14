using System.Globalization;
using Application.Models.Stats;
using Application.Models.Team;
using Infrastructure.Clients.Player.Tank01;

namespace Infrastructure.Clients.Team.Tank01;

public static class Tank01TeamMapper
{
    public static TeamInfoDto ToTeamInfoDto(this Tank01TeamDto dto)
    {
        return new TeamInfoDto
        {
            Name = dto.Name,
            City = dto.TeamCity,
            Conference = dto.Conference,
            Division = dto.Division,
            LogoURL = dto.NflComLogo1,
            Wins = int.Parse(dto.Wins),
            Losses = int.Parse(dto.Losses),
            Ties = int.Parse(dto.Ties),
        };
    }

    public static TeamStatsDto ToTeamStatsDto(this Tank01TeamDto dto)
    {
        return new TeamStatsDto
        {
            Name = dto.Name,
            LogoURL = dto.NflComLogo1,
            PointsFor = dto.PointsFor,
            PointsAgainst = dto.PointsAgainst,
            Offensive = ToOffensiveStatsDto(dto),
            Defensive = ToTeamDefensiveStatsDto(dto),
        };
    }

    public static TeamTopPerformersDto ToTeamTopPerformersDto(this Tank01TeamDto dto)
    {
        return new TeamTopPerformersDto()
        {
            Kicking = ToPlayerKickingStatsDto(dto),
            Passing = ToPlayerPassingStatsDto(dto),
            Punting = ToPlayerPuntingStatsDto(dto),
            Receiving = ToPlayerReceivingStatsDto(dto),
            Rushing = ToPlayerRushingStatsDto(dto),
            Defensive = ToPlayerDefensiveStatsDto(dto),
        };
    }
    
    public static OffensiveStats ToOffensiveStatsDto(this Tank01TeamDto dto)
    {
        return new OffensiveStats
        {
            Passing = ToTeamPassingStatsDto(dto),
            Receiving = ToTeamReceivingStatsDto(dto),
            Rushing = ToTeamRushingStatsDto(dto),
            Kicking = ToTeamKickingStatsDto(dto),
            Punting = ToTeamPuntingStatsDto(dto),
            Fumbling = ToFumblingStatsDto(dto),
        };
    }

    private static PassingStats ToTeamPassingStatsDto(this Tank01TeamDto dto)
    {
        return new PassingStats
        {
            Attempts = ToStat(dto.TeamStats.Passing.Attempts),
            Completions = ToStat(dto.TeamStats.Passing.Completions),
            Interceptions = ToStat(dto.TeamStats.Passing.Interceptions),
            Touchdowns = ToStat(dto.TeamStats.Passing.Touchdowns),
            Yards = ToStat(dto.TeamStats.Passing.Yards),
        };
    }
    
    private static PassingStats ToPlayerPassingStatsDto(this Tank01TeamDto dto)
    {
        return new PassingStats
        {
            Attempts = ToStat(dto.TopPerformers.Passing.Attempts),
            Completions = ToStat(dto.TopPerformers.Passing.Completions),
            Interceptions = ToStat(dto.TopPerformers.Passing.Interceptions),
            Touchdowns = ToStat(dto.TopPerformers.Passing.Touchdowns),
            Yards = ToStat(dto.TopPerformers.Passing.Yards)
        };
    }

    private static ReceivingStats ToTeamReceivingStatsDto(this Tank01TeamDto dto)
    {
        return new ReceivingStats()
        {
            Receptions = ToStat(dto.TeamStats.Receiving.Receptions),
            Yards = ToStat(dto.TeamStats.Receiving.Yards),
            Targets = ToStat(dto.TeamStats.Receiving.Targets),
            Touchdowns = ToStat(dto.TeamStats.Receiving.Touchdowns)
        };
    }
    
    private static ReceivingStats ToPlayerReceivingStatsDto(this Tank01TeamDto dto)
    {
        return new ReceivingStats()
        {
            Receptions = ToStat(dto.TopPerformers.Receiving.Receptions),
            Yards =  ToStat(dto.TopPerformers.Receiving.Yards),
            Targets = ToStat(dto.TopPerformers.Receiving.Targets),
            Touchdowns = ToStat(dto.TopPerformers.Receiving.Touchdowns),
        };
    }

    private static RushingStats ToTeamRushingStatsDto(this Tank01TeamDto dto)
    {
        return new RushingStats
        {
            Yards = ToStat(dto.TeamStats.Rushing.Yards),
            Touchdowns = ToStat(dto.TeamStats.Rushing.Touchdowns),
            Carries = ToStat(dto.TeamStats.Rushing.Carries),
        };
    }
    private static RushingStats ToPlayerRushingStatsDto(this Tank01TeamDto dto)
    {
        return new RushingStats
        {
            Yards = ToStat(dto.TopPerformers.Rushing.Yards),
            Touchdowns = ToStat(dto.TopPerformers.Rushing.Touchdowns),
            Carries = ToStat(dto.TopPerformers.Rushing.Carries),
        };
    }

    private static KickingStats ToTeamKickingStatsDto(this Tank01TeamDto dto)
    {
        return new KickingStats
        {
            ExtraPointsAttempted = ToStat(dto.TeamStats.Kicking.ExtraPointsAttempted),
            ExtraPointsMade = ToStat(dto.TeamStats.Kicking.ExtraPointsMade),
            FieldGoalsAttempted = ToStat(dto.TeamStats.Kicking.FieldGoalsAttempted),
            FieldGoalsMade = ToStat(dto.TeamStats.Kicking.FieldGoalsMade),
        };
    }
    
    private static KickingStats ToPlayerKickingStatsDto(this Tank01TeamDto dto)
    {
        var memes = new KickingStats
        {
            ExtraPointsAttempted = ToStat(dto.TopPerformers.Kicking.ExtraPointsAttempted),
            ExtraPointsMade = ToStat(dto.TopPerformers.Kicking.ExtraPointsMade),
            FieldGoalsAttempted = ToStat(dto.TopPerformers.Kicking.FieldGoalsAttempted),
            FieldGoalsMade = ToStat(dto.TopPerformers.Kicking.FieldGoalsMade),
        };

        return memes;
    }

    private static PuntingStats ToTeamPuntingStatsDto(this Tank01TeamDto dto)
    {
        var yards = double.Parse(dto.TeamStats.Punting.Yards);
        var punts = double.Parse(dto.TeamStats.Punting.Punts);
        
        return new PuntingStats
        {
            Punts = new Stat{Value = punts},
            Yards = new Stat{Value = yards},
            AverageYards = new Stat{Value = Math.Round(yards / punts, 1)},
            PuntsInside20 = ToStat(dto.TeamStats.Punting.PuntsInside20)
        };
    }
    
    private static PuntingStats ToPlayerPuntingStatsDto(this Tank01TeamDto dto)
    {
        var yards = double.Parse(dto.TopPerformers.Punting.Yards.Value);
        var punts = double.Parse(dto.TopPerformers.Punting.Punts.Value);
        
        return new PuntingStats
        {
            Punts = new Stat{Value = punts, Id = dto.TopPerformers.Punting.Punts.PlayerIDs[0]},
            Yards = new Stat{Value = yards, Id = dto.TopPerformers.Punting.Yards.PlayerIDs[0]},
            AverageYards = new Stat{Value = Math.Round(yards / punts, 1), Id = dto.TopPerformers.Punting.Yards.PlayerIDs[0]},
            PuntsInside20 = ToStat(dto.TopPerformers.Punting.PuntsInside20)
        };
    }

    private static FumblingStats ToFumblingStatsDto(this Tank01TeamDto dto)
    {
        return new FumblingStats
        {
            Fumbles = ToStat(dto.TeamStats.Defensive.Fumbles),
            FumblesLost = ToStat(dto.TeamStats.Defensive.FumblesLost),
            FumblesRecovered = ToStat(dto.TeamStats.Defensive.FumblesRecovered)
        };
    }
    
    private static TeamDefensiveStats ToTeamDefensiveStatsDto(this Tank01TeamDto dto)
    {
        return new TeamDefensiveStats
        {
            FumblesRecovered = ToStat(dto.TeamStats.Defensive.FumblesRecovered),
            Sacks = ToStat(dto.TeamStats.Defensive.Sacks),
            QbHits = ToStat(dto.TeamStats.Defensive.QbHits),
            Interceptions = ToStat(dto.TeamStats.Defensive.Interceptions),
            PassingYardsAllowed = ToStat(dto.TeamStats.Defensive.PassingYardsAllowed),
            PassingTDsAllowed = ToStat(dto.TeamStats.Defensive.PassingTDsAllowed),
            RushingYardsAllowed = ToStat(dto.TeamStats.Defensive.RushingYardsAllowed),
            RushingTDsAllowed = ToStat(dto.TeamStats.Defensive.RushingTDsAllowed),
        };
    }
    
    private static PlayerDefensiveStats ToPlayerDefensiveStatsDto(this Tank01TeamDto dto)
    {
        return new PlayerDefensiveStats
        {
            FumblesRecovered = ToStat(dto.TopPerformers.Defensive.FumblesRecovered),
            Sacks =  ToStat(dto.TopPerformers.Defensive.Sacks),
            QbHits = ToStat(dto.TopPerformers.Defensive.QbHits),
            Interceptions = ToStat(dto.TopPerformers.Defensive.Interceptions),
            SoloTackles = ToStat(dto.TopPerformers.Defensive.SoloTackles),
            Tackles = ToStat(dto.TopPerformers.Defensive.TotalTackles),
            TacklesForLoss = ToStat(dto.TopPerformers.Defensive.TacklesForLoss),
            DefensiveTouchdowns = ToStat(dto.TopPerformers.Defensive.DefensiveTouchdowns),
            PassesDeflected = ToStat(dto.TopPerformers.Defensive.PassesDeflected),
        };
    }

    private static Stat ToStat(this Tank01PlayerStat playerStat)
    {
        return new Stat { Value = Math.Round(double.Parse(playerStat.Value), 1), Id = playerStat.PlayerIDs.Length > 0 ? playerStat.PlayerIDs[0] : ""};
    }
    
    private static Stat ToStat(this string playerStat)
    {
        return new Stat { Value = Math.Round(double.Parse(playerStat) , 1) };
    }
}