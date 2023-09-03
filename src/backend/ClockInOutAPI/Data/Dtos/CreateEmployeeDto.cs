using System;
using ClockInOutAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.Dtos
{
	public class CreateEmployeeDto
	{
        [Required(ErrorMessage = "Nome completo é obrigatório")]
        [MinLength(3)]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Email é obrigatório")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string RePassword { get; set; }

        [Required]
        public DateOnly BirthDate { get; set; }
        [Required]
        public DateOnly HireDate { get; set; }
        [Required]
        public string CPF { get; set; }
        [Required]
        public int DailyWorkingHours { get; set; }
        [Required]
        public string HRAdministratorId { get; set; }
        [Required]
        public int PositionId { get; set; }
        [Required]
        public int DepartamentId { get; set; }

    }
}

