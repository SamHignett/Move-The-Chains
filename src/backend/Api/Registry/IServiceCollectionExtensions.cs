using Application.Interfaces;
using Domain.Registry;
using Infrastructure.Clients.Team.Tank01;

namespace MoveTheChains.Api.Registry;

public static class IServiceCollectionExtensions
{
    public static void ApiRegistry(this IServiceCollection services)
    {
        services.AddScoped<ITeamClient,Tank01TeamClient>();

        services.DomainRegistry();
    }
}