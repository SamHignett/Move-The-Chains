using Application.Models.Stats;
using Application.Models.Team;
using Infrastructure.Clients.Team.Tank01.Models;

namespace Infrastructure.Clients.Team.Tank01;

public static class Tank01TeamMapper
{
    public static TeamInfoDto ToTeamInfoDto(this Tank01TeamDto dto)
    {
        return new TeamInfoDto
        {
            ID = dto.ID,
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
            ID = dto.ID,
            Name = dto.Name,
            LogoURL = dto.NflComLogo1,
            PointsFor = dto.PointsFor,
            PointsAgainst = dto.PointsAgainst,
            Offensive = ToTeamOffensiveStatsDto(dto),
            Defensive = ToTeamDefensiveStatsDto(dto),
        };
    }

    public static TeamTopPerformersDto ToTeamTopPerformersDto(this Tank01TeamDto dto)
    {
        return new TeamTopPerformersDto()
        {
            Id = dto.ID,
            Name = dto.Name,
            Kicking = ToTeamTopPerformerKickingStatsDto(dto),
            Passing = ToTeamTopPerformerPassingStatsDto(dto),
            Punting = ToTeamTopPerformerPuntingStatsDto(dto),
            Receiving = ToTeamTopPerformerReceivingStatsDto(dto),
            Rushing = ToTeamTopPerformerRushingStatsDto(dto),
            Defensive = ToTeamTopPerformerDefensiveStatsDto(dto),
        };
    }
    
    public static OffensiveStats ToTeamOffensiveStatsDto(this Tank01TeamDto dto)
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
            Attempts = ToTeamTopPerformerStat(dto.TeamStatsDto.Passing.Attempts),
            Completions = ToTeamTopPerformerStat(dto.TeamStatsDto.Passing.Completions),
            Interceptions = ToTeamTopPerformerStat(dto.TeamStatsDto.Passing.Interceptions),
            Touchdowns = ToTeamTopPerformerStat(dto.TeamStatsDto.Passing.Touchdowns),
            Yards = ToTeamTopPerformerStat(dto.TeamStatsDto.Passing.Yards),
        };
    }
    
    private static PassingStats ToTeamTopPerformerPassingStatsDto(this Tank01TeamDto dto)
    {
        return new PassingStats
        {
            Attempts = ToTeamTopPerformerStat(dto.TopPerformers.Passing.Attempts),
            Completions = ToTeamTopPerformerStat(dto.TopPerformers.Passing.Completions),
            Interceptions = ToTeamTopPerformerStat(dto.TopPerformers.Passing.Interceptions),
            Touchdowns = ToTeamTopPerformerStat(dto.TopPerformers.Passing.Touchdowns),
            Yards = ToTeamTopPerformerStat(dto.TopPerformers.Passing.Yards)
        };
    }

    private static ReceivingStats ToTeamReceivingStatsDto(this Tank01TeamDto dto)
    {
        return new ReceivingStats()
        {
            Receptions = ToTeamTopPerformerStat(dto.TeamStatsDto.Receiving.Receptions),
            Yards = ToTeamTopPerformerStat(dto.TeamStatsDto.Receiving.Yards),
            Targets = ToTeamTopPerformerStat(dto.TeamStatsDto.Receiving.Targets),
            Touchdowns = ToTeamTopPerformerStat(dto.TeamStatsDto.Receiving.Touchdowns)
        };
    }
    
    private static ReceivingStats ToTeamTopPerformerReceivingStatsDto(this Tank01TeamDto dto)
    {
        return new ReceivingStats()
        {
            Receptions = ToTeamTopPerformerStat(dto.TopPerformers.Receiving.Receptions),
            Yards =  ToTeamTopPerformerStat(dto.TopPerformers.Receiving.Yards),
            Targets = ToTeamTopPerformerStat(dto.TopPerformers.Receiving.Targets),
            Touchdowns = ToTeamTopPerformerStat(dto.TopPerformers.Receiving.Touchdowns),
        };
    }

    private static RushingStats ToTeamRushingStatsDto(this Tank01TeamDto dto)
    {
        return new RushingStats
        {
            Yards = ToTeamTopPerformerStat(dto.TeamStatsDto.Rushing.Yards),
            Touchdowns = ToTeamTopPerformerStat(dto.TeamStatsDto.Rushing.Touchdowns),
            Carries = ToTeamTopPerformerStat(dto.TeamStatsDto.Rushing.Carries),
        };
    }
    private static RushingStats ToTeamTopPerformerRushingStatsDto(this Tank01TeamDto dto)
    {
        return new RushingStats
        {
            Yards = ToTeamTopPerformerStat(dto.TopPerformers.Rushing.Yards),
            Touchdowns = ToTeamTopPerformerStat(dto.TopPerformers.Rushing.Touchdowns),
            Carries = ToTeamTopPerformerStat(dto.TopPerformers.Rushing.Carries),
        };
    }

    private static KickingStats ToTeamKickingStatsDto(this Tank01TeamDto dto)
    {
        return new KickingStats
        {
            ExtraPointsAttempted = ToTeamTopPerformerStat(dto.TeamStatsDto.Kicking.ExtraPointsAttempted),
            ExtraPointsMade = ToTeamTopPerformerStat(dto.TeamStatsDto.Kicking.ExtraPointsMade),
            FieldGoalsAttempted = ToTeamTopPerformerStat(dto.TeamStatsDto.Kicking.FieldGoalsAttempted),
            FieldGoalsMade = ToTeamTopPerformerStat(dto.TeamStatsDto.Kicking.FieldGoalsMade),
        };
    }
    
    private static KickingStats ToTeamTopPerformerKickingStatsDto(this Tank01TeamDto dto)
    {
        return new KickingStats
        {
            ExtraPointsAttempted = ToTeamTopPerformerStat(dto.TopPerformers.Kicking.ExtraPointsAttempted),
            ExtraPointsMade = ToTeamTopPerformerStat(dto.TopPerformers.Kicking.ExtraPointsMade),
            FieldGoalsAttempted = ToTeamTopPerformerStat(dto.TopPerformers.Kicking.FieldGoalsAttempted),
            FieldGoalsMade = ToTeamTopPerformerStat(dto.TopPerformers.Kicking.FieldGoalsMade),
        };
    }

    private static PuntingStats ToTeamPuntingStatsDto(this Tank01TeamDto dto)
    {
        var yards = double.Parse(dto.TeamStatsDto.Punting.Yards);
        var punts = double.Parse(dto.TeamStatsDto.Punting.Punts);
        
        return new PuntingStats
        {
            Punts = new Stat{Value = punts},
            Yards = new Stat{Value = yards},
            AverageYards = new Stat{Value = punts > 0 ? Math.Round(yards / punts, 1): 0},
            PuntsInside20 = ToTeamTopPerformerStat(dto.TeamStatsDto.Punting.PuntsInside20)
        };
    }
    
    private static PuntingStats ToTeamTopPerformerPuntingStatsDto(this Tank01TeamDto dto)
    {
        var yards = double.Parse(dto.TopPerformers.Punting.Yards.Value);
        var punts = double.Parse(dto.TopPerformers.Punting.Punts.Value);

        var topPuntingAttemptsPlayerID = dto.TopPerformers.Punting.Punts.PlayerIDs.Length > 0
            ? dto.TopPerformers.Punting.Punts.PlayerIDs[0]
            : "";
        
        var topPuntingYardsPlayerID = dto.TopPerformers.Punting.Yards.PlayerIDs.Length > 0
            ? dto.TopPerformers.Punting.Yards.PlayerIDs[0]
            : "";
        
        return new PuntingStats
        {
            Punts = new Stat{Value = punts, Id = topPuntingAttemptsPlayerID},
            Yards = new Stat{Value = yards, Id = topPuntingYardsPlayerID},
            AverageYards = new Stat{Value =  punts > 0 ? Math.Round(yards / punts, 1) : 0, Id = topPuntingYardsPlayerID},
            PuntsInside20 = ToTeamTopPerformerStat(dto.TopPerformers.Punting.PuntsInside20)
        };
    }

    private static FumblingStats ToFumblingStatsDto(this Tank01TeamDto dto)
    {
        return new FumblingStats
        {
            Fumbles = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.Fumbles),
            FumblesLost = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.FumblesLost),
            FumblesRecovered = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.FumblesRecovered)
        };
    }
    
    private static TeamDefensiveStats ToTeamDefensiveStatsDto(this Tank01TeamDto dto)
    {
        return new TeamDefensiveStats
        {
            FumblesRecovered = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.FumblesRecovered),
            Sacks = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.Sacks),
            QbHits = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.QbHits),
            Interceptions = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.Interceptions),
            PassingYardsAllowed = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.PassingYardsAllowed),
            PassingTDsAllowed = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.PassingTDsAllowed),
            RushingYardsAllowed = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.RushingYardsAllowed),
            RushingTDsAllowed = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.RushingTDsAllowed),
            PassesDeflected = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.PassesDeflected),
            SoloTackles = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.SoloTackles),
            TacklesForLoss = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.TacklesForLoss),
            TotalTackles = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.TotalTackles),
            DefensiveTouchdowns = ToTeamTopPerformerStat(dto.TeamStatsDto.Defensive.DefensiveTouchdowns),
        };
    }
    
    private static PlayerDefensiveStats ToTeamTopPerformerDefensiveStatsDto(this Tank01TeamDto dto)
    {
        return new PlayerDefensiveStats
        {
            FumblesRecovered = ToTeamTopPerformerStat(dto.TopPerformers.Defense.FumblesRecovered),
            Sacks =  ToTeamTopPerformerStat(dto.TopPerformers.Defense.Sacks),
            QbHits = ToTeamTopPerformerStat(dto.TopPerformers.Defense.QbHits),
            Interceptions = ToTeamTopPerformerStat(dto.TopPerformers.Defense.Interceptions),
            SoloTackles = ToTeamTopPerformerStat(dto.TopPerformers.Defense.SoloTackles),
            Tackles = ToTeamTopPerformerStat(dto.TopPerformers.Defense.TotalTackles),
            TacklesForLoss = ToTeamTopPerformerStat(dto.TopPerformers.Defense.TacklesForLoss),
            DefensiveTouchdowns = ToTeamTopPerformerStat(dto.TopPerformers.Defense.DefensiveTouchdowns),
            PassesDeflected = ToTeamTopPerformerStat(dto.TopPerformers.Defense.PassesDeflected),
        };
    }

    private static Stat ToTeamTopPerformerStat(this Tank01TeamTopPerformerStat teamTopPerformerStat)
    {
        return new Stat { Value = Math.Round(double.Parse(teamTopPerformerStat.Value), 1), Id = teamTopPerformerStat.PlayerIDs.Length > 0 ? teamTopPerformerStat.PlayerIDs[0] : ""};
    }
    
    private static Stat ToTeamTopPerformerStat(this string value)
    {
        return new Stat { Value = Math.Round(double.Parse(value) , 1) };
    }

    public static ScheduleDto ToScheduleDto(this Tank01TeamScheduleDto dto)
    {
        return new ScheduleDto
        {
            Games = dto.Schedule.Select(g => g.ToGameDto()).ToArray()
        };
    }
    
    private static GameDto ToGameDto(this Tank01GameDto dto)
    {
        return new GameDto
        {
            ID = dto.GameID,
            Type = dto.SeasonType,
            GameWeek = dto.GameWeek,
            HomeTeamID = dto.TeamIDHome,
            AwayTeamID = dto.TeamIDAway,
            Date = dto.GameDate,
            Time = dto.GameTimeEpoch,
            Status = dto.GameStatus,
            HomePoints = dto.HomePts,
            AwayPoints = dto.AwayPts
        };
    }
}