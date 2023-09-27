using System;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ClockIn.Infra.Data.Repositories
{
	public class PaycheckRepository : IPaycheckRepository
    {
        private readonly IMongoCollection<Paycheck> _paychecksCollection;

        public PaycheckRepository(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var mongoClient = new MongoClient(
                mongoDbSettings.Value.ConnectionString);

            var mongoDataBase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);

            _paychecksCollection = mongoDataBase.GetCollection<Paycheck>(
                mongoDbSettings.Value.PaychecksCollectionName);
        }

        public async Task<IEnumerable<Paycheck>> GetPaychecksByEmployeeId(string employeeId)
        {
            var paychecks = await _paychecksCollection.Find(paycheck => paycheck.EmployeeId == employeeId).ToListAsync();
            if (paychecks != null)
            {
                return paychecks;
            }
            throw new DataNotFoundException("Nenhum contracheque desse colaborador foi encontrado");
        }

        public async Task<Paycheck> GetPaycheckById(string id)
        {
            var paycheck = await _paychecksCollection.Find(paycheck => paycheck.Id == id).FirstOrDefaultAsync();
            if (paycheck != null)
            {
                return paycheck;
            }
            throw new DataNotFoundException("Contracheque não encontrado");
        }

        public async Task<Paycheck> CreatePaycheck(Employee employee, DateOnly startDate, DateOnly endDate, WorkTimeTotal workTimeTotal, SalaryAndTaxes salaryAndTaxes)
        {
            try
            {
                Paycheck payCheck = new()
                {
                    StandardHours = TimeOnly.FromTimeSpan(workTimeTotal.StandardHours),
                    TotalHours = TimeOnly.FromTimeSpan(workTimeTotal.TotalWorkHours),
                    OvertimeHours = TimeOnly.FromTimeSpan(workTimeTotal.OvertimeHours),
                    DaysWorked = workTimeTotal.DaysWorked,
                    StartDate = startDate,
                    EndDate = endDate,
                    EmployeeId = employee.Id,
                    BaseSalary = salaryAndTaxes.BaseSalary,
                    TotalSalary = salaryAndTaxes.TotalSalary,
                    OvertimeHourlyRate = salaryAndTaxes.OvertimeHourlyRate,
                    INSSValue = salaryAndTaxes.INSSValue,
                    IRRFValue = salaryAndTaxes.IRRFValue,
                    FGTSValue = salaryAndTaxes.FGTSValue,
                };

                await _paychecksCollection.InsertOneAsync(payCheck);
                return payCheck;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao criar contracheque", ex);
            }
        }

        public async Task<Paycheck> UpdatePaycheck(Employee employee, Paycheck updatedPayCheck, DateOnly startDate, DateOnly endDate, WorkTimeTotal workTimeTotal, SalaryAndTaxes salaryAndTaxes)
        {
            try
            {
                await GetPaycheckById(updatedPayCheck.Id);

                updatedPayCheck.StandardHours = TimeOnly.FromTimeSpan(workTimeTotal.StandardHours);
                updatedPayCheck.TotalHours = TimeOnly.FromTimeSpan(workTimeTotal.TotalWorkHours);
                updatedPayCheck.OvertimeHours = TimeOnly.FromTimeSpan(workTimeTotal.OvertimeHours);
                updatedPayCheck.DaysWorked = workTimeTotal.DaysWorked;
                updatedPayCheck.StartDate = startDate;
                updatedPayCheck.EndDate = endDate;
                updatedPayCheck.EmployeeId = employee.Id;
                updatedPayCheck.BaseSalary = salaryAndTaxes.BaseSalary;
                updatedPayCheck.TotalSalary = salaryAndTaxes.TotalSalary;
                updatedPayCheck.OvertimeHourlyRate = salaryAndTaxes.OvertimeHourlyRate;
                updatedPayCheck.INSSValue = salaryAndTaxes.INSSValue;
                updatedPayCheck.IRRFValue = salaryAndTaxes.IRRFValue;
                updatedPayCheck.FGTSValue = salaryAndTaxes.FGTSValue;

                await _paychecksCollection.ReplaceOneAsync(payCheck => payCheck.Id == updatedPayCheck.Id, updatedPayCheck);
                return updatedPayCheck;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao atualizar contracheque", ex);
            }
        }

        public async Task<Paycheck> DeletePaycheck(Paycheck deletedPayCheck)
        {
            try
            {
                await GetPaycheckById(deletedPayCheck.Id);
                await _paychecksCollection.DeleteOneAsync(payCheck => payCheck.Id == deletedPayCheck.Id);
                return deletedPayCheck;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar contracheque", ex);
            }
        }

        public async Task<List<Paycheck>> DeletePaycheckCascade(string employeeId)
        {
            try
            {
                List<Paycheck> paychecks = await _paychecksCollection.Find(src => src.EmployeeId == employeeId).ToListAsync(); //?? throw new DataNotFoundException("Nenhum registro de ponto criado por esse usuário foi encontrado");
                await _paychecksCollection.DeleteManyAsync(src => src.EmployeeId == employeeId);
                return paychecks;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar contracheque", ex);
            }
        }
    }
}

