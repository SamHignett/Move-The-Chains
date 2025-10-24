using Application.Interfaces;
using Domain.Registry;
using Infrastructure.Clients.Player.Tank01;
using Infrastructure.Clients.Team.Tank01;

namespace Api.Registry;

public static class ServiceCollectionExtensions
{
    public static void ApiRegistry(this IServiceCollection services)
    {
        services.AddScoped<ITeamClient, Tank01TeamClient>();
        services.AddScoped<IPlayerClient, Tank01PlayerClient>();
        
        services.DomainRegistry();
    }
}