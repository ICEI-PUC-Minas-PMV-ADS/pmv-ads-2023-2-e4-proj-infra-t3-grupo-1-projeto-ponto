using System;
using ClockIn.Application.DTOs.DepartamentDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ClockIn.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DepartamentController : ControllerBase
    {
        private readonly IDepartamentService _departamentService;
        public DepartamentController(IDepartamentService departamentService)
        {
            _departamentService = departamentService;
        }

        [HttpGet("hradministrator/{hRAdministratorId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> GetDepartamentsByHRAdministrator(string hRAdministratorId)
        {
            try
            {
                var departaments = await _departamentService.GetDepartamentsByHRAdministrator(hRAdministratorId);
                return Ok(departaments);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{departamentId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetDepartamentById(string departamentId)
        {
            try
            {
                ReadDepartamentDto departamentDto = await _departamentService.GetDepartamentById(departamentId);
                return Ok(departamentDto);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> CreateDepartament([FromBody] CreateDepartamentDto departamentDto)
        {
            try
            {
                var departament = await _departamentService.CreateDepartament(departamentDto); //implementar retorno para o get
                return CreatedAtAction(nameof(GetDepartamentById), new { departamentId = departament.Id }, departament);
            }
            catch (DatabaseOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize(Roles = "manager")]
        [HttpPut("{departamentId}")]
        public async Task<IActionResult> UpdateDepartament(string departamentId, [FromBody] UpdateDepartamentDto departamentDto)
        {
            try
            {
                await _departamentService.UpdateDepartament(departamentId, departamentDto);
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

        [Authorize(Roles = "manager")]
        [HttpDelete("{departamentId}")]
        public async Task<IActionResult> DeleteDepartament(string departamentId)
        {
            try
            {
                await _departamentService.DeleteDepartament(departamentId);
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


