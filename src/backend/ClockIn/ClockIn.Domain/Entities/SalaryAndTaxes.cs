using System;
namespace ClockIn.Domain.Entities
{
	public class SalaryAndTaxes
	{
        public double BaseSalary { get; set; }

        public double OvertimeHourlyRate { get; set; }

        public double TotalSalary { get; set; }

        public double INSSValue { get; set; }

        public double IRRFValue { get; set; }

        public double FGTSValue { get; set; }
    }
}

