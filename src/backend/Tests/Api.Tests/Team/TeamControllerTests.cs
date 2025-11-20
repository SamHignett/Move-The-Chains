using Api.Team;
using Application.Commands.Team;
using Application.Models.Team;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using NSubstitute;

namespace Api.Tests.Team;

public class TeamControllerTests
{
    [Fact]
    public async Task GetTeamInfo_WithValidName_ReturnsTeamInfo()
    {
        // Arrange
        var teamName= "Test Team";
        var teamInfo = new TeamInfoDto()
        {
            City = "Test City",
            Conference = "Test Conference",
            Division = "Test Division",
            LogoURL = "http://test.com/logo.png",
            Name = "Test Team",
            Wins = 10,
            Losses = 5,
            Ties = 1
        };
        
        var mediator = Substitute.For<IMediator>();
        mediator.Send(Arg.Any<GetTeamInfo.Command>(), Arg.Any<CancellationToken>())
            .Returns(teamInfo);

        var sut = new TeamController(mediator);
        // Act
        var result = await sut.GetTeamInfo(teamName);

        // Assert
        Assert.NotNull(result);
        var okayResult = Assert.IsType<OkObjectResult>(result);
        var actual = Assert.IsType<TeamInfoDto>(okayResult.Value);
        
        Assert.Equal(teamInfo.City, actual.City);
        Assert.Equal(teamInfo.Conference, actual.Conference);
        Assert.Equal(teamInfo.Division, actual.Division);
        Assert.Equal(teamInfo.LogoURL, actual.LogoURL);
        Assert.Equal(teamInfo.Name, actual.Name);
        Assert.Equal(teamInfo.Wins, actual.Wins);
        Assert.Equal(teamInfo.Losses, actual.Losses);
        Assert.Equal(teamInfo.Ties, actual.Ties);
    }

    [Fact]
    public async Task GetTeamInfo_WithInvalidName_ThrowsException()
    {
        //Arrange
        var teamName= "Invalid Team";
        
        var mediator = Substitute.For<IMediator>();
        
        mediator
            .Send(Arg.Any<GetTeamInfo.Command>(), Arg.Any<CancellationToken>())
            .Returns(Task.FromException<TeamInfoDto>(new Exception("Team not found")));
        
        var sut = new TeamController(mediator);
        
        //Act & Assert
        await Assert.ThrowsAsync<Exception>(() => sut.GetTeamInfo(teamName));
    }
}