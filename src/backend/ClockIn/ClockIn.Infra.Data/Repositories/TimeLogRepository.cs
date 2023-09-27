using System;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ClockIn.Infra.Data.Repositories
{
	public class TimeLogRepository : ITimeLogRepository
    {
        private readonly IMongoCollection<TimeLog> _timelogsCollection;

        public TimeLogRepository(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var mongoClient = new MongoClient(
                mongoDbSettings.Value.ConnectionString);

            var mongoDataBase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);

            _timelogsCollection = mongoDataBase.GetCollection<TimeLog>(
                mongoDbSettings.Value.TimeLogsCollectionName);
        }

        public async Task<IEnumerable<TimeLog>> GetTimeLogsByEmplyeeId(string employeeId)
        {
            var timeLogs = await _timelogsCollection.Find(timeLog => timeLog.EmployeeId == employeeId).ToListAsync();
            if (timeLogs != null)
            {
                return timeLogs;
            }
            throw new DataNotFoundException("Nenhum registro de ponto criado por esse usuário foi encontrado");


        }

        public async Task<TimeLog> GetTimeLogById(string id)
        {
            TimeLog timeLog = await _timelogsCollection.Find(timeLog => timeLog.Id == id).FirstOrDefaultAsync();
            //timeLog.Timestamp = TimeZoneInfo.ConvertTimeFromUtc(timeLog.Timestamp, TimeZoneInfo.Local);
            if (timeLog != null)
            {
                return timeLog;
            }
            throw new DataNotFoundException("Registro de ponto não encontrado");
        }

        public async Task<TimeLog> CreateTimeLog(TimeLog newTimeLog, bool createdByHR)
        {
            try
            {
                //newTimeLog.Timestamp = TimeZoneInfo.ConvertTimeToUtc(newTimeLog.Timestamp);
                if (createdByHR)
                {
                    newTimeLog.IsEdited = true;
                }
                else
                {
                    newTimeLog.IsEdited = false;
                    newTimeLog.JustificationId = null;
                }
                await _timelogsCollection.InsertOneAsync(newTimeLog);
                return newTimeLog;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao criar registro de ponto", ex);
            }

        }

        public async Task<TimeLog> UpdateTimeLog(TimeLog updatedTimeLog)
        {
            try
            {
                updatedTimeLog.IsEdited = true;
                await _timelogsCollection.ReplaceOneAsync(timeLog => timeLog.Id == updatedTimeLog.Id, updatedTimeLog);
                return updatedTimeLog;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao atualizar registro de ponto", ex);
            }
        }


        public async Task<TimeLog> DeleteTimelog(TimeLog deletedTimeLog)
        {
            try
            {
                await GetTimeLogById(deletedTimeLog.Id);
                await _timelogsCollection.DeleteOneAsync(timeLog => timeLog.Id == deletedTimeLog.Id);
                return deletedTimeLog;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar registro de ponto", ex);
            }
        }

        public async Task<List<TimeLog>> DeleteTimelogCascade(string employeeId)
        {
            try
            {
                List<TimeLog> timeLogs = await _timelogsCollection.Find(src => src.EmployeeId == employeeId).ToListAsync(); //?? throw new DataNotFoundException("Nenhum registro de ponto criado por esse usuário foi encontrado");
                await _timelogsCollection.DeleteManyAsync(src => src.EmployeeId == employeeId);
                return timeLogs;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar registro de ponto", ex);
            }
        }

        public async Task<List<TimeLog>> GetTimeLogsByEmployeeAndDateRange(string employeeId, DateTime startDate, DateTime endDate)
        {
            DateTime startDateUTC = TimeZoneInfo.ConvertTimeFromUtc(startDate, TimeZoneInfo.Local);
            DateTime endDateUTC = TimeZoneInfo.ConvertTimeFromUtc(endDate, TimeZoneInfo.Local);

            var timeLogs = await _timelogsCollection
                .Find(log => log.Timestamp >= startDateUTC && log.Timestamp < endDateUTC && log.EmployeeId == employeeId)
                .SortBy(log => log.Timestamp)
                .ToListAsync();

            //foreach(TimeLog timelog in timeLogs)
            //{
            //    timelog.Timestamp = TimeZoneInfo.ConvertTimeFromUtc(timelog.Timestamp, TimeZoneInfo.Local);
            //}
            if (timeLogs != null)
            {
                return timeLogs;
            }
            throw new DataNotFoundException("Nenhum registro de ponto encontrado");
        }

        public async Task<List<TimeLog>> GetNextDayLogsForEmployee(string employeeId, DateTime endDate)
        {
            DateTime endDateUTC = TimeZoneInfo.ConvertTimeFromUtc(endDate, TimeZoneInfo.Local);
            var nextDayLogs = await _timelogsCollection
                .Find(log => log.Timestamp > endDate && log.EmployeeId == employeeId)
                .SortBy(log => log.Timestamp)
                .ToListAsync();

            //foreach(TimeLog timelog in nextDayLogs)
            //{
            //    timelog.Timestamp = TimeZoneInfo.ConvertTimeFromUtc(timelog.Timestamp, TimeZoneInfo.Local);
            //}
            if (nextDayLogs != null)
            {
                return nextDayLogs;
            }
            throw new DataNotFoundException("Nenhum registro de ponto encontrado");
        }
    }
}

