using Api.Player;
using Application.Commands.Player;
using Application.Models.Player;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;

namespace Api.Tests.Player;

public class PlayerControllerTests
{
    [Fact]
    public async Task GetPlayerInfo_WithValidName_ReturnsPlayerInfo()
    {
        // Arrange
        var playerName = "John Doe";
        var expectedPlayerInfo = new PlayerInfoDto
        {
            Name = "John Doe",
            Age = 25,
            Height = "6 ft 5 in",
            Weight = "220 lbs",
            School = "University of Sports",
            CurrentTeam = "Sports Team",
            Position = "Forward",
            HeadshotImageUrl = "http://example.com/headshot.jpg"
        };
        
        var mediator = Substitute.For<IMediator>();
        mediator
            .Send(Arg.Any<GetPlayerInfo.Command>(), Arg.Any<CancellationToken>())
            .Returns(expectedPlayerInfo);

        var sut = new PlayerController(mediator);

        // Act
        var result = await sut.GetPlayerInfo(playerName);

        // Assert
        Assert.NotNull(result);
        var okayResult = Assert.IsType<OkObjectResult>(result);
        var actual = Assert.IsType<PlayerInfoDto>(okayResult.Value);
        
        Assert.Equal(expectedPlayerInfo.Name, actual.Name);
        Assert.Equal(expectedPlayerInfo.Age, actual.Age);
        Assert.Equal(expectedPlayerInfo.Height, actual.Height);
        Assert.Equal(expectedPlayerInfo.Weight, actual.Weight);
        Assert.Equal(expectedPlayerInfo.School, actual.School);
        Assert.Equal(expectedPlayerInfo.CurrentTeam, actual.CurrentTeam);
        Assert.Equal(expectedPlayerInfo.Position, actual.Position);
        Assert.Equal(expectedPlayerInfo.HeadshotImageUrl, actual.HeadshotImageUrl);
    }
    
    [Fact]
    public async Task GetPlayerInfo_WithInvalidName_ThrowsExcpetion()
    {
        // Arrange
        var playerName = "Invalid Player";
        
        var mediator = Substitute.For<IMediator>();
        mediator
            .Send(Arg.Any<GetPlayerInfo.Command>(), Arg.Any<CancellationToken>())
            .Returns(Task.FromException<PlayerInfoDto>(new Exception("Player not found")));

        var sut = new PlayerController(mediator);

        // Act & Assert
        await Assert.ThrowsAsync<Exception>(() => sut.GetPlayerInfo(playerName));
    }
}