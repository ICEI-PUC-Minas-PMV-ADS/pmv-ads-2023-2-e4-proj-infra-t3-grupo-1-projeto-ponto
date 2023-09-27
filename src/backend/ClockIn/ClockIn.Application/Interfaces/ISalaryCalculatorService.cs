using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface ISalaryCalculatorService
	{
        Task<SalaryAndTaxes> CalculateSalaryAndTaxes(TimeSpan standardHours, TimeSpan totalWorkHours, string employeeId);

    }
}

