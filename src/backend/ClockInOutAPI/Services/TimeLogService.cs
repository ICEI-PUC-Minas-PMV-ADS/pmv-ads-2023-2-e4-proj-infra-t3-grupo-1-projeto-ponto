    using System;
    using AutoMapper;
    using ClockInOutAPI.Data;
    using ClockInOutAPI.Data.DTOs.TimeLogDTOs;
    using ClockInOutAPI.Models;
    using Microsoft.EntityFrameworkCore;

    namespace ClockInOutAPI.Services
    {
	    public class TimeLogService
	    {
            private readonly ClockInOutContext _context;
            private readonly IMapper _mapper;

            public TimeLogService(ClockInOutContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<IEnumerable<ReadTimeLogDTO>> GetPosition()
            {
                IEnumerable<TimeLog> timeLog = await _context.TimeLogs.ToListAsync();
                IEnumerable<ReadTimeLogDTO> timeLogDto = _mapper.Map<IEnumerable<ReadTimeLogDTO>>(timeLog);
                return timeLogDto;
            }

            public async Task<ReadTimeLogDTO> GetTimeLogById(int timeLogId)
            {
            TimeLog timeLog = await _context.TimeLogs.FirstOrDefaultAsync(timeLog => timeLog.Id == timeLogId);
            if (timeLog != null)
                {
                ReadTimeLogDTO timeLogDto = _mapper.Map<ReadTimeLogDTO>(timeLog);
                    return timeLogDto;
                }
                return null;
            }

            public async Task<ReadTotalWorkHoursDto> CalculateTotalWorkHours(int employeeId ,DateTime startDate, DateTime endDate)
            {
                var workHours = TimeSpan.Zero;
                var sortedLogs = _context.TimeLogs
                    .Where(log => log.Timestamp >= startDate && log.Timestamp <= endDate && log.EmployeeId == employeeId )
                    .OrderBy(log => log.Timestamp)
                    .ToList();

                DateTime? lastEntryTime = null;
                int entryCount = 0;
                int exitCount = 0;

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
                            entryCount++;
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
                        exitCount++;
                    }
                }

                if (lastEntryTime.HasValue)
                {
                    var nextDayLogs = _context.TimeLogs
                        .Where(log => log.Timestamp > endDate && log.EmployeeId == employeeId)
                        .OrderBy(log => log.Timestamp)
                        .ToList();

                    var nextExit = nextDayLogs.FirstOrDefault(log => log.LogTypeValue == LogType.Exit);

                    if (nextExit != null)
                    {
                        workHours += (nextExit.Timestamp - lastEntryTime.Value);
                        exitCount++;
                        sortedLogs.Add(nextExit);
                    }
                }

                if (sortedLogs.Count % 2 != 0 || entryCount != exitCount)
                {
                    throw new InvalidOperationException("Os registros de entrada e saída não estão emparelhados corretamente.");
                }

            ReadTotalWorkHoursDto result = new();
            result.TotalWorkHours = workHours;
                return result;
            }

        public async Task<TimeLog> CreateTimeLog(CreateTimeLogDto timeLogDto)
            {
                TimeLog timeLog = _mapper.Map<TimeLog>(timeLogDto);
                timeLog.IsEdited = false;
                timeLog.JustificationId = null;
                _context.TimeLogs.Add(timeLog);
                await _context.SaveChangesAsync();
                return timeLog;
            }

            public async Task<bool> UpdateTimeLog(int timeLogId, UpdateTimeLogDto timeLogDto)
            {
                TimeLog timeLog = await _context.TimeLogs.FirstOrDefaultAsync(timeLog => timeLog.Id == timeLogId);

                if (timeLog == null) return false;
                timeLog.IsEdited = true;
                _mapper.Map(timeLogDto, timeLog);
                _context.SaveChanges();
                return true;
            }


            public async Task<bool> DeleteTimelog(int timeLogId)
            {
            TimeLog timeLog = await _context.TimeLogs.FirstOrDefaultAsync(timeLog => timeLog.Id == timeLogId);
                _context.TimeLogs.Remove(timeLog);
                await _context.SaveChangesAsync();
                return true;
            }


        }
    }

