using MongoDB.Driver;
using YapYap.Core.Models;

namespace YapYap.Infrastructure.Repositories
{
    public class MessageRepository
    {
        private readonly IMongoCollection<ChatMessage> _messages;
        public MessageRepository(MongoContext context)
        {
            _messages = context._database.GetCollection<ChatMessage>("Messages");
        }

        public async Task<IEnumerable<ChatMessage>> GetMessagesAsync(string user1, string user2)
        {
            var filter = Builders<ChatMessage>.Filter.Or(
                Builders<ChatMessage>.Filter.And(
                    Builders<ChatMessage>.Filter.Eq(m => m.Sender, user1),
                    Builders<ChatMessage>.Filter.Eq(m => m.Receiver, user2)
                ),
                Builders<ChatMessage>.Filter.And(
                    Builders<ChatMessage>.Filter.Eq(m => m.Sender, user2),
                    Builders<ChatMessage>.Filter.Eq(m => m.Receiver, user1)
                )
            );
            return await _messages.Find(filter).SortBy(m => m.SentAt).ToListAsync();
        }

        public async Task AddMessageAsync(ChatMessage msg)
        {
            await _messages.InsertOneAsync(msg);
        }
    }
}
