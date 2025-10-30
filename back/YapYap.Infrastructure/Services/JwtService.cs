using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using YapYap.Core.Services;

namespace YapYap.Infrastructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly string _jwtKey;

        public JwtService(IConfiguration config)
        {
            _jwtKey = config["Jwt:Key"] ?? "MaCleSecreteSuperLongue";
        }

        public string GenerateToken(string userId, string username)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", userId),
                new Claim("username", username)
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}