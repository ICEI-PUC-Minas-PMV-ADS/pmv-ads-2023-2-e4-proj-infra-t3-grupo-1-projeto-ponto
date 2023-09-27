using System;
using AutoMapper;
using ClockIn.Application.DTOs.PaycheckDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;

namespace ClockIn.Application.Services
{
	public class PaycheckService : IPaycheckService
    {
        private readonly IPaycheckRepository _paycheckRepository;
        private readonly IWorkTimeCalculatorService _workTimeCalculatorService;
        private readonly ISalaryCalculatorService _salaryCalculatorService;
        private readonly IEmployeeRepository _employeeRepository;

        private readonly IMapper _mapper;

        public PaycheckService(IPaycheckRepository paycheckRepository, IMapper mapper, IEmployeeRepository employeeRepository, ISalaryCalculatorService salaryCalculatorService, IWorkTimeCalculatorService workTimeCalculatorService)
        {
            _paycheckRepository = paycheckRepository;
            _mapper = mapper;
            _employeeRepository = employeeRepository;
            _salaryCalculatorService = salaryCalculatorService;
            _workTimeCalculatorService = workTimeCalculatorService;
        }

        public async Task<IEnumerable<ReadPaycheckDto>> GetPaychecksByEmployeeId(string employeeId)
        {
            var paycheckEntity = await _paycheckRepository.GetPaychecksByEmployeeId(employeeId);
            return _mapper.Map<IEnumerable<ReadPaycheckDto>>(paycheckEntity);
        }

        public async Task<ReadPaycheckDto> GetPaycheckById(string paycheckId)
        {
            var paycheckEntity = await _paycheckRepository.GetPaycheckById(paycheckId);
            return _mapper.Map<ReadPaycheckDto>(paycheckEntity);
        }

        public async Task<Paycheck> CreatePaycheck(string employeeId, DateOnly startDate, DateOnly endDate)
        {
            Employee employee = await _employeeRepository.GetEmployeeById(employeeId);
            WorkTimeTotal workTimeTotal = await _workTimeCalculatorService.CalculateWorkTotalTime(employeeId, startDate.ToDateTime(TimeOnly.MinValue), endDate.AddDays(1).ToDateTime(TimeOnly.MinValue));
            SalaryAndTaxes employeeSalary = await _salaryCalculatorService.CalculateSalaryAndTaxes(workTimeTotal.StandardHours, workTimeTotal.TotalWorkHours, employeeId);
            var createdPaycheck = await _paycheckRepository.CreatePaycheck(employee, startDate, endDate, workTimeTotal, employeeSalary);
            return createdPaycheck;
        }

        public async Task UpdatePaycheck(string paychekId, string employeeId, DateOnly startDate, DateOnly endDate)
        {
            Paycheck payCheck = await _paycheckRepository.GetPaycheckById(paychekId);
            Employee employee = await _employeeRepository.GetEmployeeById(employeeId);
            WorkTimeTotal workTimeTotal = await _workTimeCalculatorService.CalculateWorkTotalTime(employeeId, startDate.ToDateTime(TimeOnly.MinValue), endDate.AddDays(1).ToDateTime(TimeOnly.MinValue));
            SalaryAndTaxes employeeSalary = await _salaryCalculatorService.CalculateSalaryAndTaxes(workTimeTotal.StandardHours, workTimeTotal.OvertimeHours, employeeId);
            await _paycheckRepository.UpdatePaycheck(employee, payCheck, startDate, endDate, workTimeTotal, employeeSalary);

        }

        public async Task DeletePaycheck(string id)
        {
            Paycheck payCheck = await _paycheckRepository.GetPaycheckById(id);
            await _paycheckRepository.DeletePaycheck(payCheck);
        }
    }
}

