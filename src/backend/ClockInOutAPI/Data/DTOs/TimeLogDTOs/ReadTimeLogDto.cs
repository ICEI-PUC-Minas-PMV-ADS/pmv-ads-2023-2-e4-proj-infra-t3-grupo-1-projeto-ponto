using System;
using System.ComponentModel.DataAnnotations;
using ClockInOutAPI.Data.DTOs.JustificationDTOs;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Data.DTOs.TimeLogDTOs
{
	public class ReadTimeLogDTO
	{

        public int Id { get; set; }

        public DateTime Timestamp { get; set; }

        public bool IsEdited { get; set; }

        public string LogTyoeText { get; set; }

        public virtual ReadJustificationDto Justification { get; set; }

        public int EmployeeId { get; set; }



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

