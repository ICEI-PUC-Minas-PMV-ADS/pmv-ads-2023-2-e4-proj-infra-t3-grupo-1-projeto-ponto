using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Domain.Interfaces
{
	public interface ITimeLogRepository
	{
        Task<IEnumerable<TimeLog>> GetTimeLogsByEmplyeeId(string employeeId);

        Task<TimeLog> GetTimeLogById(string id);

        Task<TimeLog> CreateTimeLog(TimeLog timeLog, bool createdByHR);

        Task<TimeLog> UpdateTimeLog(TimeLog timeLog);

        Task<TimeLog> DeleteTimelog(TimeLog timeLog);

        Task<List<TimeLog>> DeleteTimelogCascade(string employeeId);

        Task<List<TimeLog>> GetTimeLogsByEmployeeAndDateRange(string employeeId, DateTime startDate, DateTime endDate);

        Task<List<TimeLog>> GetNextDayLogsForEmployee(string employeeId, DateTime endDate);
    }
}

