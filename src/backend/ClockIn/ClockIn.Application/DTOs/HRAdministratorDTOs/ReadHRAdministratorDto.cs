using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.HRAdministratorDTOs
{
    public class ReadHRAdministratorDto
	{
        public string Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string CNPJ { get; set; }
    }
}

