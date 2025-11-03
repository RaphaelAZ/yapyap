using MongoDB.Driver;
using YapYap.Core.Models;

namespace YapYap.Infrastructure.Seed;

public class DatabaseSeeder
{
    public static async Task SeedAsync(MongoContext context)
    {
        var users = new List<User>
        {
            new User { Username = "Alice", PasswordHash = BCrypt.Net.BCrypt.HashPassword("1234") },
            new User { Username = "Bob", PasswordHash = BCrypt.Net.BCrypt.HashPassword("1234") },
            new User { Username = "Charlie", PasswordHash = BCrypt.Net.BCrypt.HashPassword("1234") },
        };
        
        var usersCollection = context._database.GetCollection<User>("Users");
        if (!await usersCollection.Find(_ => true).AnyAsync())
        {
            await usersCollection.InsertManyAsync(users);
            Console.WriteLine("✅ Users seeded");
        }

        var friendsCollection = context._database.GetCollection<FriendRequest>("Friends");
        if (!await friendsCollection.Find(_ => true).AnyAsync())
        {
            var friendRequests = new List<FriendRequest>
            {
                new FriendRequest { SenderId = users[0].Id, ReceiverId = users[2].Id, Accepted = true, SentAt = DateTime.UtcNow.AddDays(-3) },
                new FriendRequest { SenderId = users[1].Id, ReceiverId = users[0].Id, Accepted = false, SentAt = DateTime.UtcNow.AddDays(-2) },
                new FriendRequest { SenderId = users[2].Id, ReceiverId = users[0].Id, Accepted = false, SentAt = DateTime.UtcNow.AddDays(-1) },
            };
            await friendsCollection.InsertManyAsync(friendRequests);
            Console.WriteLine("✅ Friend requests seeded");
        }
        
        var messagesCollection = context._database.GetCollection<ChatMessage>("Messages");
        if (!await messagesCollection.Find(_ => true).AnyAsync())
        {
            var messages = new List<ChatMessage>
            {
                new ChatMessage { Sender = users[0].Id, Receiver = users[1].Id, Content = "Salut Bob !", SentAt = DateTime.UtcNow.AddHours(-5) },
                new ChatMessage { Sender = users[1].Id, Receiver = users[0].Id, Content = "Salut Alice, ça va ?", SentAt = DateTime.UtcNow.AddHours(-4) },
                new ChatMessage { Sender = users[2].Id, Receiver = users[1].Id, Content = "Oui, merci !", SentAt = DateTime.UtcNow.AddHours(-3) },
                new ChatMessage { Sender = users[2].Id, Receiver = users[0].Id, Content = "Hello Alice", SentAt = DateTime.UtcNow.AddHours(-2) },
            };
            await messagesCollection.InsertManyAsync(messages);
            Console.WriteLine("✅ Messages seeded");
        }
    }
}