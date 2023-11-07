using System;
using ClockIn.Application.DTOs.PaycheckDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface IPaycheckService
	{
        Task<IEnumerable<ReadPaycheckDto>> GetPaychecksByEmployeeId(string employeeId);

        Task<ReadPaycheckDto> GetPaycheckById(string paycheckId);

        Task<Paycheck> CreatePaycheck(string employeeId, CreatePaycheckDto paycheckDto);

        Task UpdatePaycheck(string paychekId, string employeeId, UpdatePaycheckDto paycheckDto);

        Task DeletePaycheck(string id);
    }
}

