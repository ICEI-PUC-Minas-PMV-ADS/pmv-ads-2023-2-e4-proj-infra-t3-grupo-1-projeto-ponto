using System;
using ClockIn.Application.DTOs.PositionDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ClockIn.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;
        public PositionController(IPositionService positionService)
        {
            _positionService = positionService;
        }

        [HttpGet("hradministrator/{hRAdministratorId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> GetPositionsByHRAdministrator(string hRAdministratorId)
        {
            try
            {
                var postitions = await _positionService.GetPositionsByHRAdministrator(hRAdministratorId);
                return Ok(postitions);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{positionId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetPositionById(string positionId)
        {
            try
            {
                var position = await _positionService.GetPositionById(positionId);
                return Ok(position);
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

        [HttpPost]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> CreatePosition([FromBody] CreatePositionDto positionDto)
        {
            try
            {
                var position = await _positionService.CreatePosition(positionDto);
                return CreatedAtAction(nameof(GetPositionById), new { positionId = position.Id }, position);

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

        [HttpPut("{posiitonId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> UpdatePosition(string posiitonId, [FromBody] UpdatePositionDto positionDto)
        {
            try
            {
                await _positionService.UpdatePosition(posiitonId, positionDto);
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

        [HttpDelete("{posiitonId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> DeletePosition(string posiitonId)
        {
            try
            {
                await _positionService.DeletePosition(posiitonId);
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


