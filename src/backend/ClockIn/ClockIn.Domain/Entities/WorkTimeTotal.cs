using System;
namespace ClockIn.Domain.Entities
{
	public class WorkTimeTotal
	{
        public TimeSpan TotalWorkHours { get; set; }

        public TimeSpan StandardHours { get; set; }

        public TimeSpan OvertimeHours { get; set; }

        public int DaysWorked { get; set; }
    }
}

