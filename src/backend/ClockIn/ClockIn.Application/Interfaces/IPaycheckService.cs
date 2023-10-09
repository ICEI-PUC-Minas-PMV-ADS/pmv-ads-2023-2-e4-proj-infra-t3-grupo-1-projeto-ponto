using System;
using ClockIn.Application.DTOs.PaycheckDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface IPaycheckService
	{
        Task<IEnumerable<ReadPaycheckDto>> GetPaychecksByEmployeeId(string employeeId);

        Task<ReadPaycheckDto> GetPaycheckById(string paycheckId);

        Task<Paycheck> CreatePaycheck(string employeeId, DateOnly startDate, DateOnly endDate);

        Task UpdatePaycheck(string paychekId, string employeeId, DateOnly startDate, DateOnly endDate);

        Task DeletePaycheck(string id);
    }
}

