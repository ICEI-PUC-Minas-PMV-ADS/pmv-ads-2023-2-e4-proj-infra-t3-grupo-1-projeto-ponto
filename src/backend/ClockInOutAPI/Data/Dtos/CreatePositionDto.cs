using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.Dtos
{
	public class CreatePositionDto
	{
        [Required]
        public string Name { get; set; }
        [Required]
        public double HrValue { get; set; }
        [Required]
        public string HRAdministratorId { get; set; }
    }
}

