using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.Dtos
{
	public class CreateDepartamentDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string HRAdministratorId { get; set; }
    }
}

