using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.DTOs.LoginDTOs
{
	public class LoginResultDto
	{
		public ApplicationUser ApplicationUser { get; set; }

		public string Token { get; set; }

		public LoginResultDto()
		{
		}
	}
}

