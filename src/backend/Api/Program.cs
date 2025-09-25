using System.Reflection;
using Application.Commands.Team;
using Application.Interfaces;
using Application.Registry;
using Infrastructure.Clients.Team.Tank01;
using MoveTheChains.Api.Registry;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetTeam.Handler).Assembly));

builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(x => x.AddMaps(Assembly.GetCallingAssembly()));

builder.Services.ApiRegistry();
builder.Services.ApplicationRegistry();

builder.Services.AddHttpClient<ITeamClient,Tank01TeamClient>( client =>
{
    client.BaseAddress = new Uri("https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com");
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
