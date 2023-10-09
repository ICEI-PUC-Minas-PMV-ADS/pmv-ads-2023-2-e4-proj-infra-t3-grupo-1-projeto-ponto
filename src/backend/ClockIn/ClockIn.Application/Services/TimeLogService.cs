using System;
using AutoMapper;
using ClockIn.Application.DTOs.TimeLogDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;

namespace ClockIn.Application.Services
{
	public class TimeLogService : ITimeLogService
    {
        private readonly ITimeLogRepository _timeLogRepository;
        private readonly IEmployeeRepository _employeeRepository;

        private readonly IMapper _mapper;

        public TimeLogService(ITimeLogRepository timeLogRepository, IMapper mapper, IEmployeeRepository employeeRepository)
        {
            _timeLogRepository = timeLogRepository;
            _mapper = mapper;
            _employeeRepository = employeeRepository;
        }

        public async Task<IEnumerable<ReadTimeLogDTO>> GetTimeLogsByEmplyeeId(string employeeId)
        {
            var timeLogEntity = await _timeLogRepository.GetTimeLogsByEmplyeeId(employeeId);
            return _mapper.Map<IEnumerable<ReadTimeLogDTO>>(timeLogEntity);
        }

        public async Task<ReadTimeLogDTO> GetTimeLogById(string id)
        {
            var timeLogEntity = await _timeLogRepository.GetTimeLogById(id);
            return _mapper.Map<ReadTimeLogDTO>(timeLogEntity);
        }

        public async Task<IEnumerable<ReadTimeLogDTO>> GetTimeLogsByEmployeeAndDateRange(string employeeId, DateOnly startDate, DateOnly endDate)
        {
            var timeLogEntity = await _timeLogRepository.GetTimeLogsByEmployeeAndDateRange(employeeId, startDate.ToDateTime(TimeOnly.MinValue), endDate.AddDays(1).ToDateTime(TimeOnly.MinValue));
            return _mapper.Map<IEnumerable<ReadTimeLogDTO>>(timeLogEntity);
        }

        public async Task<TimeLog> CreateTimeLog(CreateTimeLogDto timeLogDto)
        {
            await _employeeRepository.GetEmployeeById(timeLogDto.EmployeeId);
            var timeLogEntity = _mapper.Map<TimeLog>(timeLogDto);
            var createdTimeLog = await _timeLogRepository.CreateTimeLog(timeLogEntity, timeLogDto.CreatedByHR);
            return createdTimeLog;
        }

        public async Task UpdateTimeLog(string id, UpdateTimeLogDto timeLogDto)
        {
            var timeLogEntity = await _timeLogRepository.GetTimeLogById(id);
            await _employeeRepository.GetEmployeeById(timeLogEntity.EmployeeId);
            _mapper.Map(timeLogDto, timeLogEntity);
            await _timeLogRepository.UpdateTimeLog(timeLogEntity);
        }

        public async Task DeleteTimelog(string id)
        {
            var timeLogEntity = await _timeLogRepository.GetTimeLogById(id);
            await _timeLogRepository.DeleteTimelog(timeLogEntity);
        }
    }
}

