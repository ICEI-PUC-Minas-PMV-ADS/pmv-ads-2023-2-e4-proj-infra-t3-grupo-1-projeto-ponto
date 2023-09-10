using System;
using System.ComponentModel.DataAnnotations;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Data.DTOs.TimeLogDTOs
{
	public class CreateTimeLogDto
	{
        [Required]
        public DateTime Timestamp { get; set; }

        [Required]
        public int EmployeeId { get; set; }

        [Required]
        [LogTypeValidation]
        public LogType LogTypeValue { get; set; }
    }
}

