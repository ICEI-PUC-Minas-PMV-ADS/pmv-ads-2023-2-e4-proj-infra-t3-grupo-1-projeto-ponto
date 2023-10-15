using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.PositionDTOs
{
    public class UpdatePositionDto
	{
        [Required(ErrorMessage = "O campo 'Name' é obrigatório.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo 'HrValue' é obrigatório.")]
        [Range(0, double.MaxValue, ErrorMessage = "O valor não pode ser negativo.")]
        public double HrValue { get; set; }
    }
}

