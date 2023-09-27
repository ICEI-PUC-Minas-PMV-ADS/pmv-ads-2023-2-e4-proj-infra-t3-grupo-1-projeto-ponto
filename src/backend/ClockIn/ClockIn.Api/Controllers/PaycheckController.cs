using System;
using ClockIn.Application.Interfaces;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ClockIn.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaycheckController : ControllerBase
    {
        private readonly IPaycheckService _paycheckService;
        public PaycheckController(IPaycheckService paycheckService)
        {
            _paycheckService = paycheckService;
        }

        [HttpGet("Employee/{employeeId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetPaychecksByEmployeeId(string employeeId)
        {
            try
            {
                var paychecks = await _paycheckService.GetPaychecksByEmployeeId(employeeId);
                return Ok(paychecks);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{paycheckId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetPaycheckById(string paycheckId)
        {
            try
            {
                var paychecks = await _paycheckService.GetPaycheckById(paycheckId);
                return Ok(paychecks);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("{employeeId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> CreatePaycheck(string employeeId, [FromQuery] DateOnly startDate, [FromQuery] DateOnly endDate)
        {
            try
            {
                var paycheck = await _paycheckService.CreatePaycheck(employeeId, startDate, endDate);
                return CreatedAtAction(nameof(GetPaycheckById), new { paycheckId = paycheck.Id }, paycheck);
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

        [HttpPut("{employeeId}/{paycheckId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> UpdatePaycheck(string employeeId, string paycheckId, [FromQuery] DateOnly startDate, [FromQuery] DateOnly endDate)
        {
            try
            {
                await _paycheckService.UpdatePaycheck(paycheckId, employeeId, startDate, endDate);
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

        [HttpDelete("{paycheckId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> DeletePaycheck(string paycheckId)
        {
            try
            {
                await _paycheckService.DeletePaycheck(paycheckId);
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


