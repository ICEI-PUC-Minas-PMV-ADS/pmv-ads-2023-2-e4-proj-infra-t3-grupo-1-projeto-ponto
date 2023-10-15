using System;
using ClockIn.Domain.Enums;

namespace ClockIn.Application.DTOs.TimeLogDTOs
{
    public class ReadLogTypes
	{
		public LogType LogTypeEntry { get; set; }
        public string LogTypeNameEntry { get; set; }

        public LogType LogTypeExit { get; set; }
        public string LogTypeNameExit { get; set; }


        public ReadLogTypes()
        {
            LogTypeEntry = LogType.Entry;
            LogTypeNameEntry = "Entrada";
            LogTypeExit = LogType.Exit;
            LogTypeNameExit = "Saída";
        }
    }
}

