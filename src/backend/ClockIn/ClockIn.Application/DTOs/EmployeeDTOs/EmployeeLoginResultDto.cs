using System;
namespace ClockIn.Application.DTOs.EmployeeDTOs
{
    public class EmployeeLoginResultDto
	{
		public ReadEmployeeDto EmployeeDto { get; set; }
		public string Token { get; set; }
		public EmployeeLoginResultDto()
		{
		}
	}
}

