using MongoDB.Driver;
using YapYap.Core.Models;

namespace YapYap.Infrastructure
{
    public class MongoContext
    {
        private readonly IMongoDatabase _database;
        public MongoContext(string connectionString, string dbName)
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(dbName);
        }

        public IMongoCollection<ChatMessage> Messages => _database.GetCollection<ChatMessage>("Messages");
    }
}
