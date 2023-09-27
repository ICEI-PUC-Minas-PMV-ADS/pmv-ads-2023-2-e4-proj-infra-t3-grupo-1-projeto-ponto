using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface ITokenService
	{
        string GenerateToken(ApplicationUser applicationUser);

    }
}

