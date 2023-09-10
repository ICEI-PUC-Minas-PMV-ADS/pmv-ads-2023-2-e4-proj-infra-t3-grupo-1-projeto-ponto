using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.DTOs.JustificationDTOs
{
	public class CreateJustificationDto
	{
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int HRAdministratorId { get; set; }
    }
}

