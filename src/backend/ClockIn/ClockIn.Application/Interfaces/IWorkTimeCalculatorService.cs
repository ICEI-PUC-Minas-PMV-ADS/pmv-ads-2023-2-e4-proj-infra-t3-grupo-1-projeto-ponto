using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface IWorkTimeCalculatorService
	{
        Task<WorkTimeTotal> CalculateWorkTotalTime(string employeeId, DateTime startDate, DateTime endDate);

    }
}

