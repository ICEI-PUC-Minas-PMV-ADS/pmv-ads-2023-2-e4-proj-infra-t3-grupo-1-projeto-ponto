using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.Dtos
{
	public class UpdateDepartamentDto
	{
        [Required]
        public string Name { get; set; }
        [Required]
        public string HRAdministratorId { get; set; }
    }
}

