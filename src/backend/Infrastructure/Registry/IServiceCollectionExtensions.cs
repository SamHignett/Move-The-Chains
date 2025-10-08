using Application.Interfaces;
using Domain.Registry;
using Infrastructure.Clients.Team.Tank01;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Registry;

public static class IServiceCollectionExtensions
{
    public static void ApplicationRegistry(this IServiceCollection services)
    {
        services.AddScoped<ITeamClient, Tank01TeamClient>();

        services.DomainRegistry();
    }
}

