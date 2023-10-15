using System;
using System.ComponentModel.DataAnnotations;
using ClockIn.Domain.Enums;

namespace ClockIn.Application.DTOs.TimeLogDTOs

{
    public class ReadTimeLogDTO
	{

        public string Id { get; set; }

        public DateTime Timestamp { get; set; }

        public bool IsEdited { get; set; }

        public string LogTyoeText { get; set; }

        public string JustificationId { get; set; }

        public string Justification { get; set; }

        public string EmployeeId { get; set; }

        public LogType LogTypeValue { get; set; }

        public ReadTimeLogDTO(LogType LogTypeValue)
        {
            if (LogTypeValue == LogType.Entry)
            {
                LogTyoeText = "Entrada";
            }
            else
            {
                LogTyoeText = "Saida";
            }
        }
    }
}

