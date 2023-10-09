using System;
using AutoMapper;
using ClockIn.Application.DTOs.EmployeeDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;

namespace ClockIn.Application.Services
{
	public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IApplicationUserService _applicationUserService;
        private readonly IHRAdministratorRepository _hRAdministratorRepository;
        private readonly IDepartamentRepository _departamentRepository;
        private readonly IPositionRepository _positionRepository;
        private readonly IMapper _mapper;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper, IApplicationUserService applicationUserService, IHRAdministratorRepository hRAdministratorRepository, IDepartamentRepository departamentRepository, IPositionRepository positionRepository)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
            _applicationUserService = applicationUserService;
            _hRAdministratorRepository = hRAdministratorRepository;
            _departamentRepository = departamentRepository;
            _positionRepository = positionRepository;
        }

        public async Task CreateEmployee(CreateEmployeeDto employeeDto)
        {
            var applicationUserEntity = _mapper.Map<CreateEmployeeDto, ApplicationUser>(employeeDto);
            var employeeEntity = _mapper.Map<CreateEmployeeDto, Employee>(employeeDto);

            await _hRAdministratorRepository.GetHRAdministratorById(employeeDto.HRAdministratorId);
            await _positionRepository.GetPositionById(employeeDto.PositionId);
            await _departamentRepository.GetDepartamentById(employeeDto.DepartamentId);

            await _employeeRepository.CreateEmployee(employeeEntity);
            await _applicationUserService.Register(null, employeeEntity, applicationUserEntity, employeeDto.Password, "employee");
        }

        public async Task<IEnumerable<ReadEmployeeDto>> GetEmployeesByHRAdministrator(string id)
        {
            var employeeEntity = await _employeeRepository.GetEmployeesByHRAdministrator(id);
            return _mapper.Map<IEnumerable<ReadEmployeeDto>>(employeeEntity);
        }

        public async Task<ReadEmployeeDto> GetEmployeeById(string id)
        {
            var employeeEntity = await _employeeRepository.GetEmployeeById(id);
            return _mapper.Map<ReadEmployeeDto>(employeeEntity);
        }

        public async Task UpdateEmployee(string id, UpdateEmployeeDto employeeDto)
        {
            var employeeEntity = await _employeeRepository.GetEmployeeById(id);

            await _positionRepository.GetPositionById(employeeDto.PositionId);
            await _departamentRepository.GetDepartamentById(employeeDto.DepartamentId);

            _mapper.Map(employeeDto, employeeEntity);
            await _applicationUserService.Update(null, employeeDto, employeeEntity.Id);
            await _employeeRepository.UpdateEmployee(employeeEntity);
        }

        public async Task DeleteEmployee(string id)
        {
            var employeeEntity = await _employeeRepository.GetEmployeeById(id);
            await _employeeRepository.DeleteEmployee(employeeEntity);

        }
    }
}

