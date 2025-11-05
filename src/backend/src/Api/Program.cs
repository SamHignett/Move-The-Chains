using System.Text.RegularExpressions;
using Api.Registry;
using Application.Commands.Team;
using Application.Interfaces;
using Azure.Identity;
using Infrastructure.Clients.Player.Tank01;
using Infrastructure.Clients.Team.Tank01;
using Infrastructure.Handlers;
using Infrastructure.Registry;

var builder = WebApplication.CreateBuilder(args);

var azureKeyVaultUri = builder.Configuration["KeyVault:VaultUri"];
if (!string.IsNullOrWhiteSpace(azureKeyVaultUri))
{
    try
    {
        builder.Configuration.AddAzureKeyVault(new Uri(azureKeyVaultUri), new DefaultAzureCredential());
    }
    catch (Exception e)
    {
        if (!builder.Environment.IsDevelopment())
        {
            Console.WriteLine(e);
            throw;
        }
    }
}

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetTeamInfo.Handler).Assembly));

builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.ApiRegistry();
builder.Services.ApplicationRegistry();

builder.Services.AddControllers();

builder.Services.AddMemoryCache();

builder.Services.AddTransient<CachingHandler>();

builder.Services.AddHttpClient<ITeamClient, Tank01TeamClient>(client =>
{
    client.BaseAddress = new Uri("https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com");

    var appKey = builder.Configuration["Tank01:ApplicationKey"];

    if (!string.IsNullOrEmpty(appKey))
        client.DefaultRequestHeaders.Add("x-rapidapi-key", appKey);
}).AddHttpMessageHandler<CachingHandler>();

builder.Services.AddHttpClient<IPlayerClient, Tank01PlayerClient>(client =>
{
    client.BaseAddress = new Uri("https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com");

    var appKey = builder.Configuration["Tank01:ApplicationKey"];
    
    if (!string.IsNullOrEmpty(appKey))
        client.DefaultRequestHeaders.Add("x-rapidapi-key", appKey);
}).AddHttpMessageHandler<CachingHandler>();


builder.Services.AddCors(options =>
{
    var allowedOrigins = builder.Configuration
        .GetSection("CORSSettings:AllowedOrigins")
        .Get<string[]>() ?? [];
    
    // Enable preview deployments from Azure Static Web Apps
    var previewRegex = new Regex(
        @"^https:\/\/ashy-mud-[a-z0-9\-]+\.westeurope\.1\.azurestaticapps\.net$",
        RegexOptions.IgnoreCase | RegexOptions.CultureInvariant | RegexOptions.Compiled);
    
    options.AddPolicy("Default", policy =>
        policy.SetIsOriginAllowed(origin =>
            {
                if (string.IsNullOrWhiteSpace(origin)) return false;
                if (allowedOrigins.Contains(origin, StringComparer.OrdinalIgnoreCase)) return true;

                if (!Uri.TryCreate(origin, UriKind.Absolute, out var uri)) return false;
                if (!uri.Scheme.Equals(Uri.UriSchemeHttps, StringComparison.OrdinalIgnoreCase)) return false;

                return previewRegex.IsMatch(origin);
            })
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("Default");

app.MapControllers();

app.Run();