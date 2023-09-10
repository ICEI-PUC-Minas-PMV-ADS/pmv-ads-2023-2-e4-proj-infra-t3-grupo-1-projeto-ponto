using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.DTOs.HRAdministratorDTOs
{
	public class ReadHRAdministratorDto
	{
        public int Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string CNPJ { get; set; }
    }
}

