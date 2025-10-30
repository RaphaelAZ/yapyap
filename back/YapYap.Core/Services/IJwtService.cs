namespace YapYap.Core.Services
{
    public interface IJwtService
    {
        string GenerateToken(string userId, string username);
    }
}
