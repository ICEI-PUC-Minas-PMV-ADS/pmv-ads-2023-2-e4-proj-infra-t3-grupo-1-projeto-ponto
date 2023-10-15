using System;

namespace ClockIn.Application.DTOs.PaycheckDTOs

{
    public class ReadPaycheckDto
	{
        public string Id { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        public TimeOnly OvertimeHours { get; set; }

        public TimeOnly StandardHours { get; set; }

        public TimeOnly TotalHours { get; set; }

        public int DaysWorked { get; set; }

        public double BaseSalary { get; set; }

        public double OvertimeHourlyRate { get; set; }

        public double TotalSalary { get; set; }

        public double INSSValue { get; set; }

        public double IRRFValue { get; set; }

        public double FGTSValue { get; set; }

        public string EmployeeId { get; set; }
    }
}

