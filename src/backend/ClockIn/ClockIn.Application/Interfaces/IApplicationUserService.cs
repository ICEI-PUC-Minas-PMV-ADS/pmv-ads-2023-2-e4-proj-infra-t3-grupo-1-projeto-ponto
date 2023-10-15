using System;
using ClockIn.Application.DTOs.EmployeeDTOs;
using ClockIn.Application.DTOs.HRAdministratorDTOs;
using ClockIn.Application.DTOs.LoginDTOs;
using ClockIn.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ClockIn.Application.Interfaces
{
	public interface IApplicationUserService
	{
        Task<IdentityResult>Register(HRAdministrator? hRAdministrator, Employee? employee, ApplicationUser applicationUser, string password, string role);
        Task<LoginResultDto> Login(LoginRequestDto loginDto);
        Task Logout();
        Task<IdentityResult> Update(UpdateHRAdministratorDto? hrAdmonistratorDto, UpdateEmployeeDto? employeeDto, string id);
        Task<IdentityResult> UpdateUser(string email, string fullName, string userName, string id);
        Task<ApplicationUser> VerifyUserExistence(string email);
    }
}

