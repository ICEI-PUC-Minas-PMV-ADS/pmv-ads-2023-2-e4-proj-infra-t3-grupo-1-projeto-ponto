using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.Dtos
{
	public class ReadHRAdministratorDto
	{
        public string Id { get; set; }
        public string FullName { get; set; }

        public string Email { get; set; }

        public string CNPJ { get; set; }
    }
}

