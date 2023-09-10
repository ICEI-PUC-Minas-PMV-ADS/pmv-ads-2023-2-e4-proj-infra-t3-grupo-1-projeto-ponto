using System;
using System.ComponentModel.DataAnnotations;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Data.DTOs.TimeLogDTOs
{
	public class UpdateTimeLogDto
	{
        [Required]
        public DateTime Timestamp { get; set; }

        [Required]
        public int JustificationId { get; set; }

        [Required]
        [LogTypeValidation]
        public LogType LogType { get; set; }
    }
}

