using YapYap.Api.Hubs;

public static class SignalRExtensions
{
    public static IServiceCollection AddAppSignalR(this IServiceCollection services)
    {
        services.AddSignalR(options =>
        {
            options.EnableDetailedErrors = true;
        });

        return services;
    }

    public static void MapAppHubs(this WebApplication app)
    {
        app.MapHub<ChatHub>("/chathub");
        app.MapHub<FriendsHub>("/friendshub");
    }
}