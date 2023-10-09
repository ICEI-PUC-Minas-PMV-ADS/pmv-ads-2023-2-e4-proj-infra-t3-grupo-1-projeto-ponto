using System;
using ClockIn.Application.DTOs.EmployeeDTOs;
using ClockIn.Application.DTOs.LoginDTOs;
using ClockIn.Application.Exceptions;
using ClockIn.Application.Interfaces;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Microsoft.AspNetCore.Authentication;

namespace ClockIn.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IApplicationUserService _applicationUserService;

        public EmployeeController(IEmployeeService employeeService, IApplicationUserService applicationUserService)
        {
            _employeeService = employeeService;
            _applicationUserService = applicationUserService;
        }

        [HttpGet()]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> GetEmploGetEmployeesByHRAdministrator([FromQuery] string hradministratorId)
        {
            try
            {
                var employees = await _employeeService.GetEmployeesByHRAdministrator(hradministratorId);
                return Ok(employees);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{employeeId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetEmployeeById(string employeeId)
        {
            try
            {
                var employee = await _employeeService.GetEmployeeById(employeeId);
                return Ok(employee);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDto emplyeeDto)
        {
            try
            {
                await _employeeService.CreateEmployee(emplyeeDto);
                return Created("", "Usuário cadastrado!");
            }
            catch (DataNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DatabaseOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (IdentityFailedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (FormatException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginDto)
        {
            try
            {
                LoginResultDto loginResult = await _applicationUserService.Login(loginDto);
                ReadEmployeeDto readEmployeeDto = await _employeeService.GetEmployeeById(loginResult.ApplicationUser.EmployeeId);
                EmployeeLoginResultDto employeeLoginResultDto = new()
                {
                    EmployeeDto = readEmployeeDto,
                    Token = loginResult.Token
                };
                return Ok(employeeLoginResultDto);
            }
            catch (LoginFailedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DataNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("logout")]
        [AllowAnonymous]
        public async Task<IActionResult> Logout()
        {
            await _applicationUserService.Logout();
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
            return Ok();
        }

        [HttpPut("{employeeId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> UpdateEmployee(string employeeId, [FromBody] UpdateEmployeeDto employeeDto)
        {
            try
            {
                await _employeeService.UpdateEmployee(employeeId, employeeDto);
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
            catch (IdentityFailedException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (FormatException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{employeeId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> DeleteEmployee(string employeeId)
        {
            try
            {
                await _employeeService.DeleteEmployee(employeeId);
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


