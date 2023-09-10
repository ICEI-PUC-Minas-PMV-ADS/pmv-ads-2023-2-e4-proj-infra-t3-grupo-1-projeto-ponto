using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.DTOs.PositionDTOs
{
	public class CreatePositionDto
	{
        [Required]
        public string Name { get; set; }
        [Required]
        public double HrValue { get; set; }
        [Required]
        public int HRAdministratorId { get; set; }
    }
}

