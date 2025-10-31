using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YapYap.Infrastructure.Repositories;

namespace YapYap.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly MessageRepository _messageRepo;

        public MessagesController(MessageRepository messageRepo)
        {
            _messageRepo = messageRepo;
        }

        [HttpGet("{otherUserId}")]
        [Authorize]
        public async Task<IActionResult> GetConversation(string otherUserId)
        {
            var userId = User.FindFirst("id")?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var messages = await _messageRepo.GetMessagesAsync(userId, otherUserId);
            return Ok(messages);
        }
    }
}
