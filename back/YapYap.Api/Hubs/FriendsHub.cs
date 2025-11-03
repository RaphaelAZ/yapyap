using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace YapYap.Api.Hubs;

[Authorize]
public class FriendsHub : Hub
{
    public async Task NotifyFriendRequest(string receiverId)
    {
        await Clients.User(receiverId).SendAsync("FriendRequestReceived");
    }

    public async Task NotifyFriendAccepted(string receiverId)
    {
        await Clients.User(receiverId).SendAsync("FriendAccepted");
    }
}