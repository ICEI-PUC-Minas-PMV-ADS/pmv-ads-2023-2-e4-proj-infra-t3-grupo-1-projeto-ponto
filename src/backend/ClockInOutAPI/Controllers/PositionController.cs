using System;
using Microsoft.AspNetCore.Mvc;
using ClockInOutAPI.Services;
using ClockInOutAPI.Data.DTOs.PositionDTOs;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class PositionController : ControllerBase
	{

		private readonly PositionService _positionService;

        public PositionController(PositionService positionService)
        {
            _positionService = positionService;
        }

        [HttpGet]
        public async Task<IEnumerable<ReadPositionDto>> GetPositions()
        {
            return await _positionService.GetPosition();
        }

        [HttpGet("{positionId}")]
        public async Task<IActionResult> GetPositionById(int positionId)
        {
            var positionDto = await _positionService.GetPositionById(positionId);
            if(positionDto != null)
            {
                return Ok(positionDto);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreatePosition([FromBody] CreatePositionDto positionDto)
        {
            Position position = await _positionService.CreatePosition(positionDto);
            return CreatedAtAction(nameof(GetPositionById), new { positionId = position.Id }, positionDto);
        }

        [HttpPut("{posiitonId}")]
        public async Task<IActionResult> UpdatePosition(int posiitonId, [FromBody] UpdatePositionDto positionDto)
        {
            bool isUpdateSuccessful = await _positionService.UpdatePosition(posiitonId, positionDto);
            if (isUpdateSuccessful)
            {
                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{posiitonId}")]
        public async Task<IActionResult> DeletePosition(int posiitonId)
        {
            bool isDeleteSuccessful = await _positionService.DeletePosition(posiitonId);
            if (isDeleteSuccessful)
            {
                return NoContent();
            }
            return NotFound();
        }
    }
}

