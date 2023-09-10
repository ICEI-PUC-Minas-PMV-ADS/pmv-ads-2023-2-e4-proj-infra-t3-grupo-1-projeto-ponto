using System;
using ClockInOutAPI.Data.DTOs.JustificationDTOs;
using ClockInOutAPI.Models;
using ClockInOutAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClockInOutAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JustificationController : ControllerBase
	{
		private readonly JustificationService _justificationService;

        public JustificationController(JustificationService justification)
        {
            _justificationService = justification;
        }

        [HttpGet]
        public async Task<IEnumerable<ReadJustificationDto>> GetJustifications()
        {
            return await _justificationService.GetJustifications();
        }

        [HttpGet("{justificationId}")]
        public async Task<IActionResult> GetJustificationById(int justificationId)
        {
            ReadJustificationDto justificarionDto = await _justificationService.GetJustificationById(justificationId);
            if (justificarionDto != null)
            {
                return Ok(justificarionDto);
            }
            return NotFound();
        }

        //Erro no redirecionamento
        [HttpPost]
        public async Task<IActionResult> CreateJustification([FromBody] CreateJustificationDto justificationDto)
        {
            Justification justification = await _justificationService.CreateJustification(justificationDto);
            return CreatedAtAction(nameof(GetJustificationById), new { departamentId = justification.Id }, justification);
        }

        [HttpPut("{departamentId}")]
        public async Task<IActionResult> UpdateJustification(int justificationId, [FromBody] UpdateJustificationDto justificarionDto)
        {
            bool isUpdateSuccessful = await _justificationService.UpdateJustification(justificationId, justificarionDto);
            if (isUpdateSuccessful)
            {
                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{justificationId}")]
        public async Task<IActionResult> DeleteJustification(int justificationId)
        {
            bool isDeleteSuccessful = await _justificationService.DeleteJustification(justificationId);
            if (isDeleteSuccessful)
            {
                return NoContent();
            }
            return NotFound();
        }
    }
}

