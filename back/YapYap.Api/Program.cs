using YapYap.Api.Hubs;
using YapYap.Infrastructure;
using YapYap.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
              .WithOrigins("http://localhost:4200"));
});

builder.Services.AddSingleton<MongoContext>(sp => new MongoContext("mongodb://localhost:27017", "YapYap"));
builder.Services.AddSingleton<MessageRepository>();

builder.Services.AddSignalR();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors();
app.MapControllers();
app.MapHub<ChatHub>("/chatHub");

app.Run();