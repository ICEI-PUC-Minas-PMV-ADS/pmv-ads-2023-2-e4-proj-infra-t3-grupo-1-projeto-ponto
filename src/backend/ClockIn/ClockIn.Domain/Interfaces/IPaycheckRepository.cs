using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Domain.Interfaces
{
	public interface IPaycheckRepository
	{
        Task<IEnumerable<Paycheck>> GetPaychecksByEmployeeId(string employeeId);

        Task<Paycheck> GetPaycheckById(string paycheckId);

        Task<Paycheck> CreatePaycheck(Employee employee, DateOnly startDate, DateOnly endDate, WorkTimeTotal workTimeTotal, SalaryAndTaxes salaryAndTaxes);

        Task<Paycheck> UpdatePaycheck(Employee employee, Paycheck payCheck, DateOnly startDate, DateOnly endDate, WorkTimeTotal workTimeTotal, SalaryAndTaxes salaryAndTaxes);

        Task<Paycheck> DeletePaycheck(Paycheck payCheck);

        Task<List<Paycheck>> DeletePaycheckCascade(string employeeId);

    }
}

