using System;
using System.ComponentModel.DataAnnotations;
using ClockIn.Application.DTOs.Validations;
using ClockIn.Domain.Enums;

namespace ClockIn.Application.DTOs.TimeLogDTOs
{
    public class UpdateTimeLogDto
	{
        [Required(ErrorMessage = "O campo 'Timestamp' é obrigatório.")]
        public string Timestamp { get; set; }

        [Required(ErrorMessage = "O campo 'JustificationId' é obrigatório.")]
        public string JustificationId { get; set; }

        [Required(ErrorMessage = "O campo 'LogType' é obrigatório.")]
        [LogTypeValidation]
        public LogType LogTypeValue { get; set; }
    }
}

