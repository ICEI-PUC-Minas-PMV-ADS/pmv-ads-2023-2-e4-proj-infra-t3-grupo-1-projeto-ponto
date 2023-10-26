using System;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;

namespace ClockIn.Application.Services
{
    public class SalaryCalculatorService : ISalaryCalculatorService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IPositionRepository _positionRepository;

        public SalaryCalculatorService(IEmployeeRepository employeeRepository, IPositionRepository positionRepository)
        {
            _employeeRepository = employeeRepository;
            _positionRepository = positionRepository;
        }

        public async Task<SalaryAndTaxes> CalculateSalaryAndTaxes(TimeSpan standardHours, TimeSpan totalWorkHours, TimeSpan totalOvertimeHours, string employeeId)
        {
            Employee employee = await _employeeRepository.GetEmployeeById(employeeId);
            Position position = await _positionRepository.GetPositionById(employee.PositionId);

            double _baseSalary = standardHours.TotalHours * position.HrValue;
            double _totalSalary = totalWorkHours.TotalHours * position.HrValue;
            double _overtimeHourlyRate = totalOvertimeHours.TotalHours * position.HrValue;

            double _iNSSvalue = 0;
            if (_totalSalary <= 1320) { _iNSSvalue = _totalSalary * 0.075; }
            else if (_totalSalary >= 1320.01 && _totalSalary <= 2571.29) { _iNSSvalue = _totalSalary * 0.09; }
            else if (_totalSalary >= 2571.30 && _totalSalary <= 3856.94) { _iNSSvalue = _totalSalary * 0.12; }
            else if (_totalSalary >= 3856.95 && _totalSalary <= 7507.49) { _iNSSvalue = _totalSalary * 0.14; }

            double _iRRFValue = _totalSalary - _iNSSvalue;
            if (_iRRFValue >= 1903.99 && _iRRFValue <= 2826.65) { _iRRFValue *= 0.075; }
            else if (_iRRFValue >= 2826.66 && _iRRFValue <= 3751.05) { _iRRFValue *= 0.15; }
            else if (_iRRFValue >= 3751.06 && _iRRFValue <= 4664.68) { _iRRFValue *= 0.225; }
            else if (_iRRFValue >= 4664.69) { _iRRFValue *= 0.275; }
            else { _iRRFValue = 0; }

            double _fGTSValue = _totalSalary * 0.08;

            _totalSalary -= _iNSSvalue - _iRRFValue;
            SalaryAndTaxes salaryAndTaxes = new()
            {
                BaseSalary = Math.Round(_baseSalary, 2),
                TotalSalary = Math.Round(_totalSalary, 2),
                OvertimeHourlyRate = Math.Round(_overtimeHourlyRate, 2),
                INSSValue = Math.Round(_iNSSvalue, 2),
                IRRFValue = Math.Round(_iRRFValue, 2),
                FGTSValue = Math.Round(_fGTSValue, 2),
            };

            return salaryAndTaxes;
        }
    }
}

