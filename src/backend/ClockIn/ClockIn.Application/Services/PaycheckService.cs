using System;
using System.Globalization;
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
            return _mapper.Map<IEnumerable<ReadPaycheckDto>>(paycheckEntity).Reverse();
        }

        public async Task<ReadPaycheckDto> GetPaycheckById(string paycheckId)
        {
            var paycheckEntity = await _paycheckRepository.GetPaycheckById(paycheckId);
            return _mapper.Map<ReadPaycheckDto>(paycheckEntity);
        }

        public async Task<Paycheck> CreatePaycheck(string employeeId, CreatePaycheckDto paycheckDto)
        {
            Employee employee = await _employeeRepository.GetEmployeeById(employeeId);
            WorkTimeTotal workTimeTotal = await _workTimeCalculatorService.CalculateWorkTotalTime(employeeId, paycheckDto.StartDate.ToDateTime(TimeOnly.MinValue), paycheckDto.EndDate.AddDays(1).ToDateTime(TimeOnly.MinValue));
            SalaryAndTaxes employeeSalary = await _salaryCalculatorService.CalculateSalaryAndTaxes(workTimeTotal.StandardHours, workTimeTotal.TotalWorkHours, workTimeTotal.OvertimeHours, employeeId);
            var createdPaycheck = await _paycheckRepository.CreatePaycheck(employee, paycheckDto.StartDate, paycheckDto.EndDate, workTimeTotal, employeeSalary);
            return createdPaycheck;
        }

        public async Task UpdatePaycheck(string paychekId, string employeeId, UpdatePaycheckDto paycheckDto)
        {
            Paycheck payCheck = await _paycheckRepository.GetPaycheckById(paychekId);
            string[] standardHoursSplit = paycheckDto.StandardHours.Split(":");
            string[] overtimeHourSplit = paycheckDto.OvertimeHours.Split(":");

            TimeSpan standardHours = new(int.Parse(standardHoursSplit[0]), int.Parse(standardHoursSplit[1]), int.Parse(standardHoursSplit[2]));
            TimeSpan overtimeHours = new(int.Parse(overtimeHourSplit[0]), int.Parse(overtimeHourSplit[1]), int.Parse(overtimeHourSplit[2]));

            var totalWorkHours = standardHours + overtimeHours;
            WorkTimeTotal workTimeTotal = new ()
            {
                StandardHours = standardHours,
                OvertimeHours = overtimeHours,
                TotalWorkHours = totalWorkHours,
                DaysWorked = paycheckDto.DaysWorked
            };
            SalaryAndTaxes employeeSalary = await _salaryCalculatorService.CalculateSalaryAndTaxes(workTimeTotal.StandardHours, workTimeTotal.TotalWorkHours, workTimeTotal.OvertimeHours, employeeId);
            await _paycheckRepository.UpdatePaycheck(payCheck, paycheckDto.StartDate, paycheckDto.EndDate, workTimeTotal, employeeSalary);

        }

        public async Task DeletePaycheck(string id)
        {
            Paycheck payCheck = await _paycheckRepository.GetPaycheckById(id);
            await _paycheckRepository.DeletePaycheck(payCheck);
        }
    }
}

