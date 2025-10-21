using System.Diagnostics;
using Api.Registry;
using Application.Commands.Team;
using Application.Interfaces;
using Azure.Identity;
using Infrastructure.Clients.Team.Tank01;
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

builder.Services.AddHttpClient<ITeamClient, Tank01TeamClient>(client =>
{
    client.BaseAddress = new Uri("https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com");

    var appKey = builder.Configuration["Tank01:ApplicationKey"];
    
    if (!string.IsNullOrEmpty(appKey))
        client.DefaultRequestHeaders.Add("x-rapidapi-key", appKey);
});

builder.Services.AddCors(options =>
{
    var allowedOrigins = builder.Configuration
        .GetSection("CORSSettings:AllowedOrigins")
        .Get<string[]>() ?? [];

    options.AddPolicy("Default", policy =>
        policy.WithOrigins(allowedOrigins)
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