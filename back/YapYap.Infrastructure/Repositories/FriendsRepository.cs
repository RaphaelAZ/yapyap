using MongoDB.Driver;
using YapYap.Core.Models;

namespace YapYap.Infrastructure.Repositories
{
    public class FriendsRepository
    {
        private readonly IMongoCollection<FriendRequest> _friendsRequests;

        public FriendsRepository(MongoContext context)
        {
            _friendsRequests = context._database.GetCollection<FriendRequest>("Friends");
        }

        public async Task<List<FriendRequest>> GetUserFriendsAsync(string userId)
        {
            var filter = Builders<FriendRequest>.Filter.And(
                Builders<FriendRequest>.Filter.Eq(r => r.Accepted, true),
                Builders<FriendRequest>.Filter.Or(
                    Builders<FriendRequest>.Filter.Eq(r => r.SenderId, userId),
                    Builders<FriendRequest>.Filter.Eq(r => r.ReceiverId, userId)
                )
            );

            return await _friendsRequests.Find(filter).ToListAsync();
        }

        public async Task<List<FriendRequest>> GetPendingRequestsAsync(string userId)
        {
            var filter = Builders<FriendRequest>.Filter.And(
                Builders<FriendRequest>.Filter.Eq(r => r.ReceiverId, userId),
                Builders<FriendRequest>.Filter.Eq(r => r.Accepted, false)
            );

            return await _friendsRequests.Find(filter).ToListAsync();
        }

        public async Task<FriendRequest> SendRequestAsync(string senderId, string receiverId)
        {
            var request = new FriendRequest
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                Accepted = false,
                SentAt = DateTime.UtcNow
            };

            await _friendsRequests.InsertOneAsync(request);
            return request;
        }

        public async Task<bool> AcceptRequestAsync(string requestId)
        {
            var update = Builders<FriendRequest>.Update.Set(r => r.Accepted, true);

            var result = await _friendsRequests.UpdateOneAsync(
                r => r.Id == requestId,
                update
            );

            return result.ModifiedCount > 0;
        }
    }
}

