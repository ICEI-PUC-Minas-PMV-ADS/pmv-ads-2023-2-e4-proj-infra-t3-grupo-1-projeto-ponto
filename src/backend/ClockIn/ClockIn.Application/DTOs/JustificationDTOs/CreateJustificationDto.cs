using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.JustificationDTOs
{
    public class CreateJustificationDto
	{
        [Required(ErrorMessage = "O campo 'Name' é obrigatório.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo 'Description' é obrigatório.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "O campo 'HRAdministratorId' é obrigatório.")]
        public string HRAdministratorId { get; set; }
    }
}

