using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.DTOs.DepartamentDTOs
{
	public class CreateDepartamentDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int HRAdministratorId { get; set; }
    }
}

