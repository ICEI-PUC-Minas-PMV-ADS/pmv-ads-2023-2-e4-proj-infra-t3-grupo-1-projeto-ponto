using System;
using System.ComponentModel.DataAnnotations;
using ClockIn.Domain.Enums;
using ClockIn.Domain.Validation;

namespace ClockIn.Application.DTOs.TimeLogDTOs
{
    public class UpdateTimeLogDto
	{
        [Required(ErrorMessage = "O campo 'Timestamp' é obrigatório.")]
        public DateTime Timestamp { get; set; }

        [Required(ErrorMessage = "O campo 'JustificationId' é obrigatório.")]
        public string JustificationId { get; set; }

        [Required(ErrorMessage = "O campo 'LogType' é obrigatório.")]
        [LogTypeValidation]
        public LogType LogType { get; set; }
    }
}

