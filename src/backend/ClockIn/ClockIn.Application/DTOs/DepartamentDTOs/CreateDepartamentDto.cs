using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.DepartamentDTOs
{
    public class CreateDepartamentDto
    {
        [Required(ErrorMessage = "O campo 'Name' é obrigatório.")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "O campo 'Name' deve ter entre 2 e 50 caracteres.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo 'HRAdministratorId' é obrigatório.")]
        public string HRAdministratorId { get; set; }
    }
}

