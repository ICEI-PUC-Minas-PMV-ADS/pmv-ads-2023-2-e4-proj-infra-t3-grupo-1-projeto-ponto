using System;
using ClockIn.Application.DTOs.TimeLogDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface ITimeLogService
	{
        Task<IEnumerable<ReadTimeLogDTO>> GetTimeLogsByEmplyeeId(string employeeId);

        Task<ReadTimeLogDTO> GetTimeLogById(string id);

        Task<IEnumerable<ReadTimeLogDTO>> GetTimeLogsByEmployeeAndDateRange(string employeeId, DateOnly startDate, DateOnly endDate);

        Task<TimeLog> CreateTimeLog(CreateTimeLogDto timeLog);

        Task UpdateTimeLog(string id, UpdateTimeLogDto timeLog);

        Task DeleteTimelog(string id);
    }
}

