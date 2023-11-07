using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface ISalaryCalculatorService
	{
        public Task<SalaryAndTaxes> CalculateSalaryAndTaxes(TimeSpan standardHours, TimeSpan totalWorkHours, TimeSpan totalOvertimeHours, string employeeId);

    }
}

