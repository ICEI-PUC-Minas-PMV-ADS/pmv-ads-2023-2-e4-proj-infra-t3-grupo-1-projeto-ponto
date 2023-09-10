using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.DTOs.HRAdministratorDTOs
{
	public class CreateHRAdministratorDto
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
        public string CNPJ { get; set; }
    }
}

