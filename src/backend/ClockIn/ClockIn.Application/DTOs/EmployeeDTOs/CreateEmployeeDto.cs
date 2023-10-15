using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.EmployeeDTOs
{
    public class CreateEmployeeDto
	{
        [Required(ErrorMessage = "O campo 'FullName' é obrigatório.")]
        [MinLength(3, ErrorMessage = "O campo 'FullName' deve ter no mínimo 3 caracteres.")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "O campo 'Email' é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo 'Email' deve ser um endereço de email válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo 'Password' é obrigatório.")]
        [MinLength(8, ErrorMessage = "A senha deve conter no mínimo 8 caracteres.")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$", ErrorMessage = "A senha deve conter pelo menos 1 caractere maiúsculo e 1 caractere especial.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "O campo 'RePassword' é obrigatório.")]
        [Compare("Password", ErrorMessage = "Os campos 'Password' e 'RePassword' devem ser iguais.")]
        public string RePassword { get; set; }

        [Required(ErrorMessage = "O campo 'BirthDate' é obrigatório.")]
        [DataType(DataType.Date, ErrorMessage = "O campo 'BirthDate' deve ser uma data válida.")]
        public DateOnly BirthDate { get; set; }

        [Required(ErrorMessage = "O campo 'HireDate' é obrigatório.")]
        [DataType(DataType.Date, ErrorMessage = "O campo 'HireDate' deve ser uma data válida.")]
        public DateOnly HireDate { get; set; }

        [Required(ErrorMessage = "O campo 'CPF' é obrigatório.")]
        public string CPF { get; set; }

        [Required(ErrorMessage = "O campo 'DailyWorkingHours' é obrigatório.")]
        [Range(1, 24, ErrorMessage = "O campo 'DailyWorkingHours' deve estar entre 1 e 24.")]
        public int DailyWorkingHours { get; set; }

        [Required(ErrorMessage = "O campo 'HRAdministratorId' é obrigatório.")]
        public string HRAdministratorId { get; set; }

        [Required(ErrorMessage = "O campo 'PositionId' é obrigatório.")]
        public string PositionId { get; set; }

        [Required(ErrorMessage = "O campo 'DepartamentId' é obrigatório.")]
        public string DepartamentId { get; set; }

    }
}

