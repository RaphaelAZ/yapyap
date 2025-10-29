using YapYap.Infrastructure.Repositories;

namespace YapYap.YapYap.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddSingleton<UserRepository>();
            services.AddSingleton<MessageRepository>();
            services.AddSingleton<IJwtService, JwtService>();

            return services;
        }
    }
}
