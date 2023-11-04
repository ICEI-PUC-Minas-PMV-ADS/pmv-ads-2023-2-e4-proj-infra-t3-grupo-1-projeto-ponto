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
            if (paychecks.Count != 0)
            {
                return paychecks;
            }
            throw new DataNotFoundException("Nenhum contracheque desse colaborador foi encontrado");
        }

        public async Task<Paycheck> GetPaycheckById(string id)
        {
            try
            {
                var paycheck = await _paychecksCollection.Find(paycheck => paycheck.Id == id).FirstOrDefaultAsync();
                if (paycheck != null)
                {
                    return paycheck;
                }
                throw new DataNotFoundException();
            }
            catch (DataNotFoundException ex)
            {
                throw new DataNotFoundException("Contracheque não encontrado", ex);
            }
            catch (Exception ex)
            {
                throw new FormatException("Id do contracheque invalido", ex);
            }
        }

        private static string FormatTimeSpan(TimeSpan timeSpan)
        {
            string TotalHours = timeSpan.Days > 0 ? ((int)timeSpan.TotalHours).ToString() : timeSpan.Hours.ToString();
            return $"{TotalHours:D2}:{timeSpan.Minutes:D2}:{timeSpan.Seconds:D2}";
        }

        public async Task<Paycheck> CreatePaycheck(Employee employee, DateOnly startDate, DateOnly endDate, WorkTimeTotal workTimeTotal, SalaryAndTaxes salaryAndTaxes)
        {

            try
            {

                Paycheck paycheck = new()
                {
                    StandardHours = FormatTimeSpan(workTimeTotal.StandardHours),
                    TotalHours = FormatTimeSpan(workTimeTotal.TotalWorkHours),
                    OvertimeHours = FormatTimeSpan(workTimeTotal.OvertimeHours),
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
                Paycheck payCheck = paycheck;

                await _paychecksCollection.InsertOneAsync(payCheck);
                return payCheck;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao criar contracheque", ex);
            }
        }

        public async Task<Paycheck> UpdatePaycheck(Paycheck updatedPayCheck, DateOnly startDate, DateOnly endDate, WorkTimeTotal workTimeTotal, SalaryAndTaxes salaryAndTaxes)
        {
            try
            {
                await GetPaycheckById(updatedPayCheck.Id);

                updatedPayCheck.StandardHours = FormatTimeSpan(workTimeTotal.StandardHours);
                updatedPayCheck.TotalHours = FormatTimeSpan(workTimeTotal.TotalWorkHours);
                updatedPayCheck.OvertimeHours = FormatTimeSpan(workTimeTotal.OvertimeHours);
                updatedPayCheck.DaysWorked = workTimeTotal.DaysWorked;
                updatedPayCheck.StartDate = startDate;
                updatedPayCheck.EndDate = endDate;
                updatedPayCheck.EmployeeId = updatedPayCheck.EmployeeId;
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

