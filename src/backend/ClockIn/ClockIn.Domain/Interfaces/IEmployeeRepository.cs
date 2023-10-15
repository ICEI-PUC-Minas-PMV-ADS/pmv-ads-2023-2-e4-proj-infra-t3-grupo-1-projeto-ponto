using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Domain.Interfaces
{
	public interface IEmployeeRepository
	{
        Task CreateEmployee(Employee employee);

        Task<IEnumerable<Employee>> GetEmployeesByHRAdministrator(string id);

        Task<Employee> GetEmployeeById(string id);

        Task<IEnumerable<Employee>> GetEmployeeByPositionId(string positionId);

        Task<Employee> UpdateEmployee(Employee employee);

        Task<Employee> DeleteEmployee(Employee employee);
    }
}

