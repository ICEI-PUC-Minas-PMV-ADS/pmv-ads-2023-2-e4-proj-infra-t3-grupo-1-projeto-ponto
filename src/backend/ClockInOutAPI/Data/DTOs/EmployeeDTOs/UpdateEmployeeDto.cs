using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.DTOs.EmployeeDTOs
{
	public class UpdateEmployeeDto
	{
        [Required(ErrorMessage = "Email é obrigatório")]
        public string Email { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public DateOnly BirthDate { get; set; }
        [Required]
        public DateOnly HireDate { get; set; }
        [Required]
        public string CPF { get; set; }
        [Required]
        public int DailyWorkingHours { get; set; }
        [Required]
        public int PositionId { get; set; }
        [Required]
        public int DepartamentId { get; set; }
    }
}

