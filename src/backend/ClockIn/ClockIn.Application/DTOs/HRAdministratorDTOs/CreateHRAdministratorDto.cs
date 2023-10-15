using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.HRAdministratorDTOs
{
    public class CreateHRAdministratorDto
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

        [Required(ErrorMessage = "O campo 'CNPJ' é obrigatório.")]
        public string CNPJ { get; set; }
    }
}

