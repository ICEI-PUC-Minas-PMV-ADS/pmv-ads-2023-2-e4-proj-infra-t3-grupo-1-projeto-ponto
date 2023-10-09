using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.LoginDTOs
{
    public class LoginRequestDto
    {
        [Required(ErrorMessage = "O campo 'Email' é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo 'Email' deve ser um endereço de email válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo 'Password' é obrigatório.")]
        public string Password { get; set; }
	}
}

