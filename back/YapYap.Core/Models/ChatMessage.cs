using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace YapYap.Core.Models
{
    public class ChatMessage
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = null!;
        [BsonRepresentation(BsonType.ObjectId)]
        public string Sender { get; set; } = null!;
        [BsonRepresentation(BsonType.ObjectId)]
        public string Receiver { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
}
