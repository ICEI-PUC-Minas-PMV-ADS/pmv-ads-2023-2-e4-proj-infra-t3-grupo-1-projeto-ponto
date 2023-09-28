using System;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ClockIn.Infra.Data.Repositories
{
	public class JustificationRepository : IJustificationRepository
    {
        private readonly IMongoCollection<Justification> _justificationsCollection;


        public JustificationRepository(IOptions<MongoDbSettings> mongoDbSettings)
        {
            var mongoClient = new MongoClient(
                mongoDbSettings.Value.ConnectionString);

            var mongoDataBase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);

            _justificationsCollection = mongoDataBase.GetCollection<Justification>(
                mongoDbSettings.Value.JustificationsCollectionName);
        }

        public async Task<IEnumerable<Justification>> GetJustificationsByHRAdministrator(string hRAdministratorId)
        {
            var justification = await _justificationsCollection.Find(justification => justification.HRAdministratorId == hRAdministratorId).ToListAsync();
            if (justification != null)
            {
                return justification;
            }
            throw new DataNotFoundException("Nenhuma justificativa criada por esse usuário foi encontrada");
        }

        public async Task<Justification> GetJustificationById(string id)
        {
            try
            {
                var justification = await _justificationsCollection.Find(justification => justification.Id == id).FirstOrDefaultAsync();
                if (justification != null)
                {
                    return justification;
                }
                throw new DataNotFoundException("Justificativa não encontrada");
            }
            catch (Exception ex)
            {
                throw new FormatException("Id da justificativa invalido", ex);
            }
        }

        public async Task<Justification> CreateJustification(Justification newJustification)
        {
            try
            {
                await _justificationsCollection.InsertOneAsync(newJustification);
                return newJustification;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao criar justificativa", ex);
            }
        }

        public async Task<Justification> UpdateJustification(Justification updatedJustification)
        {
            try
            {
                await _justificationsCollection.ReplaceOneAsync(justification => justification.Id == updatedJustification.Id, updatedJustification);
                return updatedJustification;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao atualizar justificativa", ex);
            }
        }

        public async Task<Justification> DeleteJustification(Justification deletedJustification)
        {
            try
            {
                await GetJustificationById(deletedJustification.Id);
                await _justificationsCollection.DeleteOneAsync(justification => justification.Id == deletedJustification.Id);
                return deletedJustification;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar justificativa", ex);
            }
        }

        public async Task<List<Justification>> DeleteCascadeJustification(string hrAdministratorId)
        {
            try
            {
                List<Justification> justifications = await _justificationsCollection.Find(src => src.HRAdministratorId == hrAdministratorId).ToListAsync(); //?? throw new DataNotFoundException("Nenhuma justificativa criada por esse usuário foi encontrada");
                await _justificationsCollection.DeleteManyAsync(src => src.HRAdministratorId == hrAdministratorId);
                return justifications;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar justificativa", ex);
            }
        }
    }
}

