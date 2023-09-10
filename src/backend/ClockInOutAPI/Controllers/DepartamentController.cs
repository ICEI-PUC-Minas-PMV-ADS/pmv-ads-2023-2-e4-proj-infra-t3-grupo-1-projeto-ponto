using System;
using ClockInOutAPI.Services;
using ClockInOutAPI.Data.DTOs.DepartamentDTOs;
using Microsoft.AspNetCore.Mvc;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class DepartamentController : ControllerBase
	{
		private readonly DepartamentService _departamentService;

        public DepartamentController(DepartamentService departamentService)
        {
            _departamentService = departamentService;
        }

        [HttpGet]
        public async Task<IEnumerable<ReadDepartamentDto>> GetDepartaments()
        {
            return await _departamentService.GetDepartaments();
        }

        [HttpGet("{departamentId}")]
        public async Task<IActionResult> GetDepartamentById(int departamentId)
        {
            ReadDepartamentDto departamentDto = await _departamentService.GetDepartamentById(departamentId);
            if (departamentDto != null)
            {
                return Ok(departamentDto);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartament([FromBody] CreateDepartamentDto departamentDto)
        {
            Departament departament = await _departamentService.CreateDepartament(departamentDto);
            return CreatedAtAction(nameof(GetDepartamentById), new { departamentId = departament.Id }, departamentDto);
        }

        [HttpPut("{departamentId}")]
        public async Task<IActionResult> UpdateDepartament(int departamentId, [FromBody] UpdateDepartamentDto departamentDto)
        {
            bool isUpdateSuccessful = await _departamentService.UpdateDepartament(departamentId, departamentDto);
            if (isUpdateSuccessful)
            {
                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{departamentId}")]
        public async Task<IActionResult> DeleteDepartament(int departamentId)
        {
            bool isDeleteSuccessful = await _departamentService.DeleteDepartament(departamentId);
            if (isDeleteSuccessful)
            {
                return NoContent();
            }
            return NotFound();
        }
    }
}

