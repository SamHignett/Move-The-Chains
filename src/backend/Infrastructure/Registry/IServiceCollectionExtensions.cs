using Application.Interfaces;
using Domain.Registry;
using Infrastructure.Clients.Team.Tank01;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Registry;

public static class ServiceCollectionExtensions
{
    public static void ApplicationRegistry(this IServiceCollection services)
    {
        services.AddScoped<ITeamClient, Tank01TeamClient>();
        services.DomainRegistry();
    }
}

