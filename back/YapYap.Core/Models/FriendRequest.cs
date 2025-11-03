using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace YapYap.Core.Models;

public class FriendRequest
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string SenderId { get; set; } = default!;
    [BsonRepresentation(BsonType.ObjectId)]
    public string ReceiverId { get; set; } = default!;
    public DateTime SentAt { get; set; } = DateTime.UtcNow;
    public bool Accepted { get; set; } = false;
}