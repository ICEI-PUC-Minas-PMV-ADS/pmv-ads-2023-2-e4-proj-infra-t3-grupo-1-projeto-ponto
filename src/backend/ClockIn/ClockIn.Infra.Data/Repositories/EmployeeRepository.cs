using System;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ClockIn.Infra.Data.Repositories
{
	public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IPaycheckRepository _paycheckRepository;
        private readonly ITimeLogRepository _timeLogRepository;

        public EmployeeRepository(ApplicationDbContext context, IPaycheckRepository paycheckRepository, ITimeLogRepository timeLogRepository)
        {
            _context = context;
            _paycheckRepository = paycheckRepository;
            _timeLogRepository = timeLogRepository;
        }

        public async Task CreateEmployee(Employee employee)
        {
            try
            {
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao criar colaborador", ex);
            }
        }

        public async Task<IEnumerable<Employee>> GetEmployeesByHRAdministrator(string id)
        {
            var employees = await _context.Employees.Where(emplyee => emplyee.HRAdministratorId == id).ToListAsync();
            if (employees != null)
            {
                return employees;
            }
            throw new DataNotFoundException("Nenhum colaborador criado por esse usuário");
        }

        public async Task<Employee> GetEmployeeById(string id)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(employee => employee.Id == id);
            if (employee != null)
            {
                return employee;
            }
            throw new DataNotFoundException("Colaborador não encontrado");
        }

        public async Task<IEnumerable<Employee>> GetEmployeeByPositionId(string positionId)
        {
            var employees = await _context.Employees.Where(employee => employee.PositionId == positionId).ToListAsync();
            if (employees != null)
            {
                return employees;
            }
            throw new DataNotFoundException("Nenhum colaborador encontrado");
        }

        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            try
            {
                _context.Update(employee);
                await _context.SaveChangesAsync();
                return employee;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao atualizar colaborador", ex);
            }
        }

        public async Task<Employee> DeleteEmployee(Employee employee)
        {
            try
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
                await _paycheckRepository.DeletePaycheckCascade(employee.Id);
                await _timeLogRepository.DeleteTimelogCascade(employee.Id);

                return employee;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar colaborador departamento", ex);
            }
        }
    }
}

