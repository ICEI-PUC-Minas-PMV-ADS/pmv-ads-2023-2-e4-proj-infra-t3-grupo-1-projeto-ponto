using System;
using ClockIn.Application.DTOs.EmployeeDTOs;
using ClockIn.Application.DTOs.HRAdministratorDTOs;
using ClockIn.Application.DTOs.LoginDTOs;
using ClockIn.Application.Exceptions;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace ClockIn.Application.Services
{
	public class ApplicationUserService : IApplicationUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IHRAdministratorRepository _hRAdministratorRepository;

        private readonly ITokenService _tokenService;

        public ApplicationUserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ITokenService tokenService, IEmployeeRepository employeeRepository, IHRAdministratorRepository hRAdministratorRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _employeeRepository = employeeRepository;
            _hRAdministratorRepository = hRAdministratorRepository;
        }

        public async Task<LoginResultDto> Login(LoginRequestDto loginDto)
        {
            var res = await _signInManager.PasswordSignInAsync(loginDto.Email, loginDto.Password, false, false);
            if (res.Succeeded)
            {
                var applicationUser = await _userManager.FindByEmailAsync(loginDto.Email);

                string token = _tokenService.GenerateToken(applicationUser);

                LoginResultDto loginResult = new()
                {
                    Token = token
                };
                return loginResult;
            }
            throw new LoginFailedException("Falha no login: Credenciais inválidas.");
        }

        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<IdentityResult>Register(HRAdministrator? hRAdministrator, Employee? employee, ApplicationUser applicationUser, string password, string role)
        {

            applicationUser.UserName = applicationUser.Email;
            applicationUser.Role = role;
            if (employee != null)
            {
                applicationUser.EmployeeId = employee.Id;
                applicationUser.HRAdministratorId = null;
            }
            if (hRAdministrator != null)
            {
                applicationUser.HRAdministratorId = hRAdministrator.Id;
                applicationUser.EmployeeId = null;
            }
            applicationUser.Employee = employee;
            applicationUser.HRAdministrator = hRAdministrator;
            var existingUser = await VerifyUserExistence(applicationUser.Email);

            if (existingUser != null)
            {
                if (hRAdministrator != null)
                {
                    await _hRAdministratorRepository.DeleteHRAdministrator(hRAdministrator);
                }
                else
                {
                    await _employeeRepository.DeleteEmployee(employee);
                }

                throw new IdentityFailedException("Email já cadastrado na base de dados, entre em contato com o suporte para redefinir a senha");
            }
            var result = await _userManager.CreateAsync(applicationUser, password);
            
            if (!result.Succeeded)
            {
                if (hRAdministrator != null)
                {
                    await _hRAdministratorRepository.DeleteHRAdministrator(hRAdministrator);
                    throw new IdentityFailedException("Erro ao criar administrador RH");
                }
                else
                {
                    await _employeeRepository.DeleteEmployee(employee);
                    throw new IdentityFailedException("Erro ao criar colaborador");
                }
            }
            return result;
        }

        public async Task<IdentityResult> Update(UpdateHRAdministratorDto? hrAdmonistratorDto, UpdateEmployeeDto? employeeDto, string id)
        {
            try
            {
                IdentityResult res = IdentityResult.Success;

                if (hrAdmonistratorDto != null)
                {
                    res = await UpdateUser(hrAdmonistratorDto.Email, hrAdmonistratorDto.FullName, hrAdmonistratorDto.Email, id);
                }
                if (employeeDto != null)
                {
                    res = await UpdateUser(employeeDto.Email, employeeDto.FullName, employeeDto.Email, id);
                }

                return res;
            }
            catch (IdentityFailedException ex)
            {
                throw ex;
            }
        }

        public async Task<ApplicationUser> VerifyUserExistence(string email)
        {
           return await _userManager.FindByEmailAsync(email);
        }


        public async Task<IdentityResult> UpdateUser(string email, string fullName, string userName, string id)
        {
            var applicationUser = _userManager.Users.FirstOrDefault(user => user.HRAdministratorId == id || user.EmployeeId == id)
                ?? throw new IdentityFailedException("Nenhum ApplicationUser que se relaciona com essa Id de Administrador RH ou Colaborador foi encontrado ");
            applicationUser.Email = email;
            applicationUser.NormalizedEmail = email.ToUpper();
            applicationUser.FullName = fullName;
            applicationUser.UserName = userName;
            var existingUser = await VerifyUserExistence(email);
            if(existingUser != null && existingUser.Id != applicationUser.Id)
            {
                throw new IdentityFailedException("Email ja cadastrado na base de dados");
            }

            var updateResult = await _userManager.UpdateAsync(applicationUser);
            if (!updateResult.Succeeded)
            {
                throw new IdentityFailedException("Erro ao atualizar o usuário");
            }

            return updateResult;
        }
    }
}

