using System;
using AutoMapper;
using ClockInOutAPI.Models;
using ClockInOutAPI.Data.Dtos;
using ClockInOutAPI.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ClockInOutAPI.Services
{
	public class EmployeeService 
	{
        private readonly ClockInOutContext _context;
        private readonly IMapper _mapper;

        public EmployeeService(ClockInOutContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task CreateEmployee(CreateEmployeeDto employeeDto)
        {          
            Employee employee = _mapper.Map<Employee>(employeeDto);
            var passwordHasher = new PasswordHasher<Employee>();
            employee.Password = passwordHasher.HashPassword(employee, employee.Password);
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<ReadEmployeeDto> GetEmployee(int id)
        {
            Employee employee = await _context.Employees.FirstOrDefaultAsync(employee => employee.Id == id);
            if(employee != null)
            {
                ReadEmployeeDto employeeDto = _mapper.Map<ReadEmployeeDto>(employee);
                return employeeDto;
            }
            return null;
        }

        public async Task<ApplicationUser> UpdateEmployee(int id, UpdateEmployeeDto employeeDto)
        {
            Employee employee = await _context.Employees.FirstOrDefaultAsync(employee => employee.Id == id);
            if (employee != null)
            {
                _mapper.Map(employeeDto, employee);
                _context.SaveChanges();
            }
            return null;
        }

        public async Task<bool> DeleteEmployee(int id)
        {
            Employee employee = await _context.Employees.FirstOrDefaultAsync(employee => employee.Id == id);
            if (employee != null)
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
            }
            return false;
        }
    }
}

