using System;
using ClockIn.Application.DTOs.EmployeeDTOs;

namespace ClockIn.Application.Interfaces
{
	public interface IEmployeeService
	{
        Task CreateEmployee(CreateEmployeeDto employee);

        Task<IEnumerable<ReadEmployeeDto>> GetEmployeesByHRAdministrator(string id);

        Task<ReadEmployeeDto> GetEmployeeById(string id);

        Task UpdateEmployee(string id, UpdateEmployeeDto employee);

        Task DeleteEmployee(string id);
    }
}

