using MongoDB.Driver;

namespace YapYap.Infrastructure
{
    public class MongoContext
    {
        public IMongoDatabase _database { get; }
        public MongoContext(string connectionString, string dbName)
        {
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(dbName);
        }
    }
}
