using System;
using ClockInOutAPI.Data.DTOs.TimeLogDTOs;
using ClockInOutAPI.Models;
using ClockInOutAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClockInOutAPI.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class TimeLogController : ControllerBase
	{
		private readonly TimeLogService _timeLogService;

        public TimeLogController(TimeLogService timeLogService)
        {
            _timeLogService = timeLogService;
        }

        //[HttpGet]
        /*
        public async Task<IEnumerable<ReadTimeLogDTO>> GetTimesLog ()
        {
            return await _timeLogService.GetPosition();
        }
        */
        [HttpGet("logTypes")]
        public async Task<IActionResult> GetLogTypes()
        {
            ReadLogTypes logTypes = new();
            return Ok(logTypes);
        }


        [HttpGet("totalWorkHours/{employeeId}")]
        public async Task<IActionResult> TotalWorkHours(int employeeId, [FromQuery] DateTime StartDate, [FromQuery] DateTime EndDate)
        {
            ReadTotalWorkHoursDto result = await _timeLogService.CalculateTotalWorkHours(employeeId, StartDate, EndDate);

            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpGet("{timeLogId}")]
        public async Task<IActionResult> GetTimeLogById(int timeLogId)
        {
            ReadTimeLogDTO timeLogDto = await _timeLogService.GetTimeLogById(timeLogId);

            if(timeLogDto != null)
            {
                return Ok(timeLogDto);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreateTimeLog([FromBody] CreateTimeLogDto timeLogDto)
        {
            TimeLog timeLog = await _timeLogService.CreateTimeLog(timeLogDto);
            return CreatedAtAction(nameof(GetTimeLogById), new { timeLogId = timeLog.Id }, timeLogDto);
        }

        [HttpPut("{timeLogId}")]
        public async Task<IActionResult> UpdateTimeLog(int timeLogId, [FromBody] UpdateTimeLogDto timeLogDto)
        {
            bool isUpdateSuccessful = await _timeLogService.UpdateTimeLog(timeLogId, timeLogDto);
            if (isUpdateSuccessful)
            {
                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{timeLogId}")]
        public async Task<IActionResult> DeleteTimeLog(int timeLogId)
        {
            bool isDeleteSuccessful = await _timeLogService.DeleteTimelog(timeLogId);
            if (isDeleteSuccessful)
            {
                return NoContent();
            }
            return NotFound();
        }
    }

}


