using Microsoft.AspNetCore.Mvc;
using YapYap.Infrastructure.Repositories;

namespace YapYap.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserRepository _userRepo;
    private readonly string _jwtKey;
    private readonly IJwtService _jwtService;

    public AuthController(UserRepository userRepo, IConfiguration config, IJwtService jwtService)
    {
        _userRepo = userRepo;
        _jwtKey = config["Jwt:Key"] ?? "MaCleSecreteSuperLongue";
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AuthDto dto)
    {
        try
        {
            var user = await _userRepo.CreateUserAsync(dto.Username, dto.Password);
            return Ok(new { user.Id, user.Username });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthDto dto)
    {
        var user = await _userRepo.GetByUsernameAsync(dto.Username);
        if (user == null || !_userRepo.VerifyPassword(user, dto.Password))
            return Unauthorized(new { message = "Username or password invalid" });

        var token = _jwtService.GenerateToken(user.Id, user.Username);
        return Ok(new { token, userId = user.Id, username = user.Username });
    }
}
public record AuthDto(string Username, string Password);