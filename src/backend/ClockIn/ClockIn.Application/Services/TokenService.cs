using System;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace ClockIn.Application.Services
{
	public class TokenService : ITokenService
    {

        public TokenService()
        {
        }

        public string GenerateToken(ApplicationUser applicationUser)
        {
            var key = Encoding.ASCII.GetBytes("87ˆ#FASDF1$23Bjd3hfsjd%3fsdf!asdlkjhb%$kljhl");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, applicationUser.UserName),
                new Claim(ClaimTypes.Role, applicationUser.Role),
                new Claim("id", applicationUser.Id)
                }),
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

