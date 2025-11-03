using YapYap.Core.Services;
using YapYap.Infrastructure;
using YapYap.Infrastructure.Repositories;
using YapYap.Infrastructure.Services;

namespace YapYap.Api.Extensions
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddSingleton<MongoContext>(sp =>
            {
                var config = sp.GetRequiredService<IConfiguration>();
                var conn = config["Mongo:ConnectionString"] ?? "mongodb://localhost:27017";
                var db = config["Mongo:DatabaseName"] ?? "YapYapDb";
                return new MongoContext(conn, db);
            });
            services.AddSingleton<UserRepository>();
            services.AddSingleton<MessageRepository>();
            services.AddSingleton<FriendsRepository>();
            services.AddSingleton<IJwtService, JwtService>();

            return services;
        }
    }
}
