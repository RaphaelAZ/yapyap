using MongoDB.Driver;

namespace YapYap.Infrastructure.Repositories;

public class UserRepository
{
    private readonly IMongoCollection<User> _users;

    public UserRepository(MongoContext context)
    {
        _users = context._database.GetCollection<User>("Users");
    }

    public async Task<User> CreateUserAsync(string username, string password)
    {
        var existing = await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
        if (existing != null)
            throw new Exception("Username already exists");

        var user = new User
        {
            Username = username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
        };

        await _users.InsertOneAsync(user);
        return user;
    }

    public async Task<User?> GetByUsernameAsync(string username)
    {
        return await _users.Find(u => u.Username == username).FirstOrDefaultAsync();
    }

    public async Task<User?> GetByIdAsync(string id)
    {
        return await _users.Find(u => u.Id == id).FirstOrDefaultAsync();
    }

    public bool VerifyPassword(User user, string password)
    {
        return BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
    }
}
