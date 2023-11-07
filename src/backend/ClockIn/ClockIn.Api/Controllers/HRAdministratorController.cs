using System;
using ClockIn.Application.DTOs.HRAdministratorDTOs;
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
    public class HRAdministratorController : ControllerBase
    {
        private readonly IHRAdministratorService _hRAdministratorService;
        private readonly IApplicationUserService _applicationUserService;


        public HRAdministratorController(IHRAdministratorService hRAdministratorService, IApplicationUserService applicationUserService)
        {
            _hRAdministratorService = hRAdministratorService;
            _applicationUserService = applicationUserService;
        }

        [HttpGet("{hrAdministratorId}")]
        [Authorize(Roles = "manager, employee")]
        public async Task<IActionResult> GetHRAdministratorById(string hrAdministratorId)
        {
            try
            {
                var hRAdministrator = await _hRAdministratorService.GetHRAdministratorById(hrAdministratorId);
                return Ok(hRAdministrator);
            }
            catch (DataNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateHRAdministrator([FromBody] CreateHRAdministratorDto hrAdministratorDto)
        {
            try
            {
                await _hRAdministratorService.CreateHRAdministrator(hrAdministratorDto);
                return Created("", "Usuário cadastrado!");
            }
            catch (DatabaseOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (IdentityFailedException ex)
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

                return Ok(loginResult);
            }
            catch (LoginFailedException ex)
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

        [HttpPut("{hrAdministratorId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> UpdateHRAdministrator(string hrAdministratorId, [FromBody] UpdateHRAdministratorDto hrAdministratorDto)
        {
            try
            {
                await _hRAdministratorService.UpdateHRAdministrator(hrAdministratorId, hrAdministratorDto);
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
        }


        [HttpDelete("{hrAdministratorId}")]
        [Authorize(Roles = "manager")]
        public async Task<IActionResult> DeleteHRAdministrator(string hrAdministratorId)
        {
            try
            {
                await _hRAdministratorService.DeleteHRAdministrator(hrAdministratorId);
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


