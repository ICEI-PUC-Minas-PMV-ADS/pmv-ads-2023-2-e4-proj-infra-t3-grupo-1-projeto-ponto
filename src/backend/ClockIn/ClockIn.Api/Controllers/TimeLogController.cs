using System;
using ClockIn.Application.DTOs.TimeLogDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ClockIn.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TimeLogController : ControllerBase
    {
        private readonly ITimeLogService _timeLogService;
        private readonly IWorkTimeCalculatorService _workTimeCalculatorService;
        public TimeLogController(IWorkTimeCalculatorService workTimeCalculatorService, ITimeLogService timeLogService)
        {
            _workTimeCalculatorService = workTimeCalculatorService;
            _timeLogService = timeLogService;
        }

        [HttpGet("employee/{employeeId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetTimeLogsByEmplyeeId(string employeeId)
        {
            try
            {
                var timeLogs = await _timeLogService.GetTimeLogsByEmplyeeId(employeeId);
                return Ok(timeLogs);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("employee/{employeeId}/Range")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetTimeLogsByEmployeeAndDateRange(string employeeId, [FromQuery] DateOnly startDate, [FromQuery] DateOnly endDate)
        {
            try
            {
                var timeLogs = await _timeLogService.GetTimeLogsByEmployeeAndDateRange(employeeId, startDate, endDate);
                return Ok(timeLogs);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("logTypes")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetLogTypes()
        {
            ReadLogTypes logTypes = new();
            return Ok(logTypes);
        }

        /*
        [HttpGet("totalWorkHours/{employeeId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> TotalWorkHours(string employeeId, [FromQuery] DateOnly startDate, [FromQuery] DateOnly endDate)
        {
            WorkTimeTotal result = await _workTimeCalculatorService.CalculateWorkTotalTime(employeeId, startDate.ToDateTime(TimeOnly.MinValue), endDate.ToDateTime(TimeOnly.MaxValue));

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest();
        }
        */

        [HttpGet("{timeLogId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetTimeLogById(string timeLogId)
        {
            try
            {
                var timeLogDto = await _timeLogService.GetTimeLogById(timeLogId);
                return Ok(timeLogDto);

            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("HRAdministrator")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> CreateTimeLogByHR([FromBody] CreateTimeLogDto timeLogDto)
        {
            try
            {
                timeLogDto.CreatedByHR = true;
                var timeLog = await _timeLogService.CreateTimeLog(timeLogDto);
                return CreatedAtAction(nameof(GetTimeLogById), new { timeLogId = timeLog.Id }, timeLog);
            }
            catch (DatabaseOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DataNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("employee")]
        [Authorize(Roles = "employee")]
        public async Task<IActionResult> CreateTimeLogByEmployee([FromBody] CreateTimeLogDto timeLogDto)
        {
            try
            {
                timeLogDto.CreatedByHR = false;
                var timeLog = await _timeLogService.CreateTimeLog(timeLogDto);
                return Ok(timeLog);
            }
            catch (DatabaseOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{timeLogId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> UpdateTimeLog(string timeLogId, [FromBody] UpdateTimeLogDto timeLogDto)
        {
            try
            {
                await _timeLogService.UpdateTimeLog(timeLogId, timeLogDto);
                return NoContent();
            }
            catch (DataNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DatabaseOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{timeLogId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> DeleteTimeLog(string timeLogId)
        {
            try
            {
                await _timeLogService.DeleteTimelog(timeLogId);
                return NoContent();
            }
            catch (DataNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DatabaseOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}


