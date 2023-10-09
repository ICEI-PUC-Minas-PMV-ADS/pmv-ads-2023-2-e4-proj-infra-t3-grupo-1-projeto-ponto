using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.HRAdministratorDTOs
{
    public class UpdateHRAdministratorDto
	{
        [Required(ErrorMessage = "O campo 'FullName' é obrigatório.")]
        [MinLength(3, ErrorMessage = "O campo 'FullName' deve ter no mínimo 3 caracteres.")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "O campo 'Email' é obrigatório.")]
        [EmailAddress(ErrorMessage = "O campo 'Email' deve ser um endereço de email válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "O campo 'Name' é obrigatório.")]
        public string CNPJ { get; set; }
    }
}

