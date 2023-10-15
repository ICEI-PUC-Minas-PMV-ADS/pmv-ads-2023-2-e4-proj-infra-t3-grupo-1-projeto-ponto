using System;
using System.ComponentModel.DataAnnotations;
using ClockIn.Application.DTOs.Validations;
using ClockIn.Domain.Enums;

namespace ClockIn.Application.DTOs.TimeLogDTOs
{
    public class CreateTimeLogDto
	{
        [Required(ErrorMessage = "O campo 'Timestamp' é obrigatório.")]
        public DateTime Timestamp { get; set; }

        [Required(ErrorMessage = "O campo 'EmployeeId' é obrigatório.")]
        public string EmployeeId { get; set; }

        [Required(ErrorMessage = "O campo 'LogTypeValue' é obrigatório.")]
        [LogTypeValidation]
        public LogType LogTypeValue { get; set; }

        public bool CreatedByHR { get; set; }

        public string? JustificationId { get; set; }
    }
}

