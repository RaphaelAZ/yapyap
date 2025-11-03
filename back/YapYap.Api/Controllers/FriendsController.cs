using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using YapYap.Api.Hubs;
using YapYap.Infrastructure.Repositories;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FriendsController : ControllerBase
{
    private readonly FriendsRepository _repo;
    private readonly IHubContext<FriendsHub> _hubContext;

    public FriendsController(FriendsRepository repo, IHubContext<FriendsHub> hubContext)
    {
        _repo = repo;
        _hubContext = hubContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyFriends()
    {
        var userId = User.FindFirst("id")?.Value!;
        return Ok(await _repo.GetUserFriendsAsync(userId));
    }

    [HttpGet("pending")]
    public async Task<IActionResult> GetPendingRequests()
    {
        var userId = User.FindFirst("id")?.Value!;
        return Ok(await _repo.GetPendingRequestsAsync(userId));
    }

    [HttpPost("request/{receiverId}")]
    public async Task<IActionResult> SendFriendRequest(string receiverId)
    {
        var userId = User.FindFirst("id")?.Value!;
        var req = await _repo.SendRequestAsync(userId, receiverId);

        await _hubContext.Clients.User(receiverId)
            .SendAsync("FriendRequestReceived");

        return Ok(req);
    }

    [HttpPost("accept/{requestId}")]
    public async Task<IActionResult> AcceptFriendRequest(string requestId)
    {
        await _repo.AcceptRequestAsync(requestId);

        var requester = (await _repo
                .GetPendingRequestsAsync(User.FindFirst("id")?.Value!))
            .FirstOrDefault(r => r.Id == requestId)?.SenderId;

        if (requester != null)
            await _hubContext.Clients.User(requester)
                .SendAsync("FriendAccepted");

        return Ok();
    }
}