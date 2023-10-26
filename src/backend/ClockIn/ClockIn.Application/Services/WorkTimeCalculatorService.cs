using System;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Enums;
using ClockIn.Domain.Interfaces;

namespace ClockIn.Application.Services
{
    public class WorkTimeCalculatorService : IWorkTimeCalculatorService
    {
        private readonly ITimeLogRepository _timeLogRepository;
        private readonly IEmployeeRepository _employeeRepository;


        public WorkTimeCalculatorService(ITimeLogRepository timeLogRepository, IEmployeeRepository employeeRepository)
        {
            _timeLogRepository = timeLogRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task<WorkTimeTotal> CalculateWorkTotalTime(string employeeId, DateTime startDate, DateTime endDate)
        {
            Employee employee = await _employeeRepository.GetEmployeeById(employeeId);
            List<TimeLog> sortedLogs = await _timeLogRepository.GetTimeLogsByEmployeeAndDateRange(employeeId, startDate, endDate);
            TimeSpan workHours = await CalculateWorkHours(sortedLogs, employeeId, endDate);
            int daysWorked = CalculateDaysWorked(sortedLogs);
            TimeSpan standardHours = CalculateStandardHours(employee, daysWorked, workHours);
            TimeSpan overtimeHours = TimeSpan.Zero;

            if (workHours > standardHours)
            {
                overtimeHours = CalculateOvertimeHours(workHours, standardHours);
            }

            WorkTimeTotal result = new()
            {
                TotalWorkHours = workHours,
                DaysWorked = daysWorked,
                OvertimeHours = overtimeHours,
                StandardHours = standardHours
            };
            return result;
        }

        private static TimeSpan CalculateOvertimeHours(TimeSpan workHours, TimeSpan standardHours)
        {
            TimeSpan overtimeHours = workHours - standardHours;

            if (overtimeHours < TimeSpan.Zero)
            {
                overtimeHours = TimeSpan.Zero;
            }

            return overtimeHours;
        }

        private static TimeSpan CalculateStandardHours(Employee employee, int daysWorked, TimeSpan workHours)
        {
            TimeSpan standardHours = TimeSpan.FromHours(employee.DailyWorkingHours * daysWorked);
            if (workHours == TimeSpan.Zero)
            {
                standardHours = TimeSpan.Zero;
            }
            return standardHours;
        }

        private async Task<TimeSpan> CalculateWorkHours(List<TimeLog> sortedLogs, string employeeId, DateTime endDate)
        {
            DateTime? lastEntryTime = null;
            TimeSpan workHours = TimeSpan.Zero;

            if (sortedLogs[0].LogTypeValue == LogType.Exit)
            {
                sortedLogs.Remove(sortedLogs[0]);
            }

            foreach (var log in sortedLogs)
            {
                if (log.LogTypeValue == LogType.Entry)
                {
                    if (!lastEntryTime.HasValue)
                    {
                        lastEntryTime = log.Timestamp;
                    }
                    else
                    {
                        lastEntryTime = null;
                    }
                }
                else if (log.LogTypeValue == LogType.Exit && lastEntryTime.HasValue)
                {
                    workHours += log.Timestamp - lastEntryTime.Value;
                    lastEntryTime = null;
                }
            }

            if (lastEntryTime.HasValue)
            {
                List<TimeLog> nextDayLogs = await _timeLogRepository.GetNextDayLogsForEmployee(employeeId, endDate);
                TimeLog? nextExit = nextDayLogs.FirstOrDefault(log => log.LogTypeValue == LogType.Exit);

                if (nextExit != null)
                {
                    workHours += (nextExit.Timestamp - lastEntryTime.Value);
                    sortedLogs.Add(nextExit);
                }
                else if (nextExit == null)
                {
                    sortedLogs.Remove(sortedLogs.Last());
                }
            }
            ValidateLogs(sortedLogs);

            return workHours;
        }

        private static int CalculateDaysWorked(List<TimeLog> sortedLogs)
        {
            int daysWorked = 1;
            TimeLog? previousLog = null;

            foreach (var log in sortedLogs)
            {
                if (previousLog != null)
                {
                    if (log.Timestamp.Date != previousLog.Timestamp.Date)
                    {
                        daysWorked++;
                        if (previousLog.Timestamp.Date < log.Timestamp.Date && previousLog.LogTypeValue == LogType.Entry)
                        {
                            daysWorked--;
                        }
                    }
                }
                previousLog = log;
            }

            return daysWorked;
        }

        private static bool IsEntryExitPairingValid(List<TimeLog> sortedLogs)
        {
            int entryCount = 0;
            int exitCount = 0;

            foreach (var log in sortedLogs)
            {
                if (log.LogTypeValue == LogType.Entry)
                {
                    entryCount++;
                }
                else if (log.LogTypeValue == LogType.Exit)
                {
                    exitCount++;
                }
            }

            return entryCount == exitCount;
        }

        private static void ValidateLogs(List<TimeLog> sortedLogs)
        {
            if (!IsEntryExitPairingValid(sortedLogs))
            {
                throw new InvalidOperationException("Os registros de entrada e saída não estão emparelhados corretamente.");
            }
            if (sortedLogs.Count == 0)
            {
                throw new InvalidOperationException("Nenhum registro encontrado!");
            }
        }

    }
}

