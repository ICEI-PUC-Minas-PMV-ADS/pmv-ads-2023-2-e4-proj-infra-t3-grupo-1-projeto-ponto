using System;
using Microsoft.AspNetCore.Mvc;
using ClockInOutAPI.Services;
using ClockInOutAPI.Data.DTOs.EmployeeDTOs;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class EmployeeController : ControllerBase
	{
        private readonly EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("{employeeId}")]
        public async Task<IActionResult> GetEmployee(int employeeId)
        {
            var res = await _employeeService.GetEmployee(employeeId);
            if (res != null)
            {
                return Ok(res);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto emplyeeDto)
        {
            await _employeeService.CreateEmployee(emplyeeDto);
            return Ok("Usuário cadastrado!");
        }

        //[HttpPut]


        [HttpDelete("{employeeId}")]
        public async Task<IActionResult> DeleteEmployee(int employeeId)
        {
            bool isDeleteSuccessful = await _employeeService.DeleteEmployee(employeeId);
            if (isDeleteSuccessful)
            {
                return NoContent();
            }
            return NotFound();
        }
    }
}

