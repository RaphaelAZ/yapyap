using YapYap.Core.Models;
using YapYap.Infrastructure.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace YapYap.Api.Hubs
{
    public class ChatHub : Hub
    {
        private readonly MessageRepository _repo;

        public ChatHub(MessageRepository repo)
        {
            _repo = repo;
        }

        public async Task SendMessage(string sender, string receiver, string content)
        {
            var msg = new ChatMessage
            {
                Sender = sender,
                Receiver = receiver,
                Content = content
            };

            await _repo.AddMessageAsync(msg);

            await Clients.User(receiver).SendAsync("ReceiveMessage", msg);
            await Clients.User(sender).SendAsync("MessageSent", msg);
        }
    }
}
