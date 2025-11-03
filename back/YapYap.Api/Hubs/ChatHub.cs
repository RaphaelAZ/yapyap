using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using YapYap.Core.Models;
using YapYap.Infrastructure.Repositories;

namespace YapYap.Api.Hubs;

[Authorize]
public class ChatHub : Hub
{
    private readonly MessageRepository _repo;

    public ChatHub(MessageRepository repo)
    {
        _repo = repo;
    }

    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirst("id")?.Value;
        await base.OnConnectedAsync();
    }

    public async Task JoinConversation(string otherUserId)
    {
        var userId = Context.User?.FindFirst("id")?.Value;
        if (userId == null) return;

        var groupName = GetGroupName(userId, otherUserId);

        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

        var messages = await _repo.GetMessagesAsync(userId, otherUserId);

        await Clients.Caller.SendAsync("LoadOldMessages", messages);
    }

    public async Task SendMessage(string receiverId, string content)
    {
        var senderId = Context.User?.FindFirst("id")?.Value;
        if (senderId == null) return;

        var msg = new ChatMessage
        {
            Sender = senderId,
            Receiver = receiverId,
            Content = content,
            SentAt = DateTime.UtcNow
        };

        await _repo.AddMessageAsync(msg);

        var groupName = GetGroupName(senderId, receiverId);

        await Clients.Group(groupName).SendAsync("ReceiveMessage", msg);
    }

    private static string GetGroupName(string user1, string user2)
    {
        var ids = new[] { user1, user2 }.OrderBy(id => id);
        return string.Join("-", ids);
    }
}
