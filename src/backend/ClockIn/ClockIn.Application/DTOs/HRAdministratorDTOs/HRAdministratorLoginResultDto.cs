using System;


namespace ClockIn.Application.DTOs.HRAdministratorDTOs
{
    public class HRAdministratorLoginResultDto
	{
        public ReadHRAdministratorDto HRAdministratorDto { get; set; }

        public string Token { get; set; }
    }
}

