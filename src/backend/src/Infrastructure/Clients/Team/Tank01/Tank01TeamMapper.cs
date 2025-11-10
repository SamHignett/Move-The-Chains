using Application.Models.Team;

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
            Offensive = ToTeamOffensiveStatsDto(dto),
            Defensive = ToTeamDefensiveStatsDto(dto),
        };
    }
    
    public static TeamOffensiveStats ToTeamOffensiveStatsDto(this Tank01TeamDto dto)
    {
        return new TeamOffensiveStats
        {
            Passing = ToTeamPassingStatsDto(dto),
            Rushing = ToTeamRushingStatsDto(dto),
            Kicking = ToTeamKickingStatsDto(dto),
            Punting = ToTeamPuntingStatsDto(dto),
            Fumbling = ToTeamFumblingStatsDto(dto),
        };
    }

    private static TeamPassingStats ToTeamPassingStatsDto(this Tank01TeamDto dto)
    {
        return new TeamPassingStats
        {
            Attempts = int.Parse(dto.TeamStats.Passing.Attempts),
            Completions = int.Parse(dto.TeamStats.Passing.Completions),
            Interceptions = int.Parse(dto.TeamStats.Passing.Interceptions),
            Touchdowns = int.Parse(dto.TeamStats.Passing.Touchdowns),
            Yards = int.Parse(dto.TeamStats.Passing.Yards),
        };
    }

    private static TeamRushingStats ToTeamRushingStatsDto(this Tank01TeamDto dto)
    {
        return new TeamRushingStats
        {
            Yards = int.Parse(dto.TeamStats.Rushing.Yards),
            Touchdowns = int.Parse(dto.TeamStats.Rushing.Touchdowns),
            Carries = int.Parse(dto.TeamStats.Rushing.Carries),
        };
    }

    private static TeamKickingStats ToTeamKickingStatsDto(this Tank01TeamDto dto)
    {
        return new TeamKickingStats
        {
            ExtraPointsAttempted = int.Parse(dto.TeamStats.Kicking.ExtraPointsAttempted),
            ExtraPointsMade = int.Parse(dto.TeamStats.Kicking.ExtraPointsMade),
            FieldGoalsAttempted = int.Parse(dto.TeamStats.Kicking.FieldGoalsAttempted),
            FieldGoalsMade = int.Parse(dto.TeamStats.Kicking.FieldGoalsMade),
        };
    }

    private static TeamPuntingStats ToTeamPuntingStatsDto(this Tank01TeamDto dto)
    {
        var yards = int.Parse(dto.TeamStats.Punting.Yards);
        var punts = int.Parse(dto.TeamStats.Punting.Punts);
        
        return new TeamPuntingStats
        {
            Punts = punts,
            Yards = yards,
            AverageYards = yards / punts,
            PuntsInside20 = int.Parse(dto.TeamStats.Punting.PuntsInside20),
        };
    }

    private static TeamFumblingStats ToTeamFumblingStatsDto(this Tank01TeamDto dto)
    {
        return new TeamFumblingStats
        {
            Fumbles = int.Parse(dto.TeamStats.Defensive.Fumbles),
            FumblesLost = int.Parse(dto.TeamStats.Defensive.FumblesLost),
            FumblesRecovered = int.Parse(dto.TeamStats.Defensive.FumblesRecovered),
        };
    }
    
    private static TeamDefensiveStats ToTeamDefensiveStatsDto(this Tank01TeamDto dto)
    {
        return new TeamDefensiveStats
        {
            FumblesRecovered = int.Parse(dto.TeamStats.Defensive.FumblesRecovered),
            Sacks = int.Parse(dto.TeamStats.Defensive.Sacks),
            QbHits = int.Parse(dto.TeamStats.Defensive.QbHits),
            Interceptions = int.Parse(dto.TeamStats.Defensive.Interceptions),
            PassingYardsAllowed = int.Parse(dto.TeamStats.Defensive.PassingYardsAllowed),
            PassingTDsAllowed = int.Parse(dto.TeamStats.Defensive.PassingTDsAllowed),
            RushingYardsAllowed = int.Parse(dto.TeamStats.Defensive.RushingYardsAllowed),
            RushingTDsAllowed = int.Parse(dto.TeamStats.Defensive.RushingTDsAllowed),
        };
    }
}