using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.DTOs.JustificationDTOs
{
	public class UpdateJustificationDto
	{
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}

