using MongoDB.Driver;
using YapYap.Api.Extensions;
using YapYap.Infrastructure;
using YapYap.Infrastructure.Seed;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfrastructure();
builder.Services.AddAppCors();
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddAppSignalR();

var app = builder.Build();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

var mongoContext = app.Services.GetRequiredService<MongoContext>();
await DatabaseSeeder.SeedAsync(mongoContext);

app.MapAppHubs();

app.Run();