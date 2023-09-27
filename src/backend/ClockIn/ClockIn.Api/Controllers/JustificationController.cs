using System;
using ClockIn.Application.DTOs.JustificationDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ClockIn.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JustificationController : ControllerBase
    {
        private readonly IJustificationService _justificationService;
        public JustificationController(IJustificationService justificationService)
        {
            _justificationService = justificationService;
        }

        [HttpGet("hradministrator/{hRAdministratorId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> GetJustificationsByHRAdministrator(string hRAdministratorId)
        {
            try
            {
                var justifications = await _justificationService.GetJustificationsByHRAdministrator(hRAdministratorId);
                return Ok(justifications);

            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{justificationId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetJustificationById(string justificationId)
        {
            try
            {
                var justificarionDto = await _justificationService.GetJustificationById(justificationId);
                return Ok(justificarionDto);

            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> CreateJustification([FromBody] CreateJustificationDto justificationDto)
        {
            try
            {
                var justification = await _justificationService.CreateJustification(justificationDto);
                return CreatedAtAction(nameof(GetJustificationById), new { justificationId = justification.Id }, justification);
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

        [HttpPut("{departamentId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> UpdateJustification(string justificationId, [FromBody] UpdateJustificationDto justificarionDto)
        {
            try
            {
                await _justificationService.UpdateJustification(justificationId, justificarionDto);
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

        [HttpDelete("{justificationId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> DeleteJustification(string justificationId)
        {
            try
            {
                await _justificationService.DeleteJustification(justificationId);
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


