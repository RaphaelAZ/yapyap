public interface IJwtService
{
    string GenerateToken(string userId, string username);
}