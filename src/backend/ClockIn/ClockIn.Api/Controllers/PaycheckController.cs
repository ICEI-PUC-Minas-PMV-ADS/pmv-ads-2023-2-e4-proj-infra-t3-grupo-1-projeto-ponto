﻿using System;
using ClockIn.Application.Interfaces;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using ClockIn.Application.DTOs.PaycheckDTOs;

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
                return Ok(ex.Message);
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
            catch (FormatException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{employeeId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> CreatePaycheck(string employeeId, [FromBody] CreatePaycheckDto paycheckDto)
        {
            try
            {
                var paycheck = await _paycheckService.CreatePaycheck(employeeId, paycheckDto);
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
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{employeeId}/{paycheckId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> UpdatePaycheck(string employeeId, string paycheckId, [FromBody] UpdatePaycheckDto paycheckDto)
        {
            try
            {
                await _paycheckService.UpdatePaycheck(paycheckId, employeeId, paycheckDto);
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
            catch (InvalidOperationException ex)
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


