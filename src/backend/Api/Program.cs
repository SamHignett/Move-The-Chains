using Api.Registry;
using Application.Commands.Team;
using Application.Interfaces;
using Infrastructure.Clients.Team.Tank01;
using Infrastructure.Registry;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetTeamInfo.Handler).Assembly));

builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

builder.Services.ApiRegistry();
builder.Services.ApplicationRegistry();

builder.Services.AddControllers();

builder.Services.AddHttpClient<ITeamClient, Tank01TeamClient>(client =>
{
    client.BaseAddress = new Uri("https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com");
    client.DefaultRequestHeaders.Add("x-rapidapi-key", builder.Configuration["Tank01:ApplicationKey"]);
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

app.UseCors(options =>
{
    var origins = builder.Configuration.GetSection("CORSSettings:AllowedOrigins").Get<string[]>();

    if (origins != null)
        options.WithOrigins(origins)
            .AllowAnyHeader()
            .AllowAnyMethod();
});

app.UseRouting();
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.Run();