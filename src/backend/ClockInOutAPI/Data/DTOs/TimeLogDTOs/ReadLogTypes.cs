using System;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Data.DTOs.TimeLogDTOs
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
            LogTypeNameExit = "Sída";
        }
    }
}

