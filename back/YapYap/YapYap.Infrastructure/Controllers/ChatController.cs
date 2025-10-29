using Microsoft.AspNetCore.Mvc;
using YapYap.Infrastructure.Repositories;

namespace YapYap.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly UserRepository _userRepo;
    private readonly MessageRepository _messRepo;
    private readonly string _jwtKey;
    private readonly IJwtService _jwtService;

    public ChatController(UserRepository userRepo, MessageRepository messRepo, IConfiguration config, IJwtService jwtService)
    {
        _userRepo = userRepo;
        _messRepo = messRepo;
        _jwtKey = config["Jwt:Key"] ?? "MaCleSecreteSuperLongue";
        _jwtService = jwtService;
    }
}