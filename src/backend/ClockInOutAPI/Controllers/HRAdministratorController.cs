using System;
using Microsoft.AspNetCore.Mvc;
using ClockInOutAPI.Services;
using ClockInOutAPI.Data.DTOs.HRAdministratorDTOs;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class HRAdministratorController : ControllerBase
	{
		private readonly HRAdministratorService _hrAdministratorService;

        public HRAdministratorController(HRAdministratorService hrAdministratorService)
        {
            _hrAdministratorService = hrAdministratorService;
        }

        [HttpGet("{hrAdministratorId}")]
        public async Task<IActionResult> GetHRAdministrator(int hrAdministratorId)
        {
            var res = await _hrAdministratorService.GetHRAdministrator(hrAdministratorId);
            if(res != null)
            {
                return Ok(res);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreatHRAdministrator([FromBody] CreateHRAdministratorDto hrAdministratorDto)
        {
            await _hrAdministratorService.CreatHRAdministrator(hrAdministratorDto);
            return Ok("Usuário cadastrado!");
        }

        //[HttpPut]


        [HttpDelete("{hrAdministratorId}")]
        public async Task<IActionResult> DeleteHRAdministrator(int hrAdministratorId)
        {
            bool isDeleteSuccessful = await _hrAdministratorService.DeleteHRAdministrator(hrAdministratorId);
            if (isDeleteSuccessful)
            {
                return NoContent();
            }
            return NotFound();
        }

    }
}

