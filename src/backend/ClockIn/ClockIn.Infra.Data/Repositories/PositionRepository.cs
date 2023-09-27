using System;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ClockIn.Infra.Data.Repositories
{
    public class PositionRepository : IPositionRepository
    {
        private readonly IMongoCollection<Position> _positionsCollection;
        private readonly IEmployeeRepository _employeeRepository;


        public PositionRepository(IOptions<MongoDbSettings> mongoDbSettings, IEmployeeRepository employeeRepository)
        {
            var mongoClient = new MongoClient(
                mongoDbSettings.Value.ConnectionString);

            var mongoDataBase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);

            _positionsCollection = mongoDataBase.GetCollection<Position>(
                mongoDbSettings.Value.PositionsCollectionName);
            _employeeRepository = employeeRepository;
        }

        public async Task<IEnumerable<Position>> GetPositionsByHRAdministrator(string hRAdministratorId)
        {
            var postition = await _positionsCollection.Find(postition => postition.HRAdministratorId == hRAdministratorId).ToListAsync();
            if (postition != null)
            {
                return postition;
            }
            throw new DataNotFoundException("Nenhum cargo criado por esse usuário foi encontrado");
        }

        public async Task<Position> GetPositionById(string id)
        {
            var positions = await _positionsCollection.Find(position => position.Id == id).FirstOrDefaultAsync();
            if (positions != null)
            {
                return positions;
            }
            throw new DataNotFoundException("Cargo não encontrado");
        }

        public async Task<Position> CreatePosition(Position newPosition)
        {
            try
            {
                await _positionsCollection.InsertOneAsync(newPosition);
                return newPosition;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao criar cargo", ex);
            }
        }

        public async Task<Position> UpdatePosition(Position updatedPosition)
        {
            try
            {
                await _positionsCollection.ReplaceOneAsync(position => position.Id == updatedPosition.Id, updatedPosition);
                return updatedPosition;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao atualizar cargo", ex);
            }
        }

        public async Task<Position> DeletePosition(Position deletedPosition)
        {
            try
            {
                await GetPositionById(deletedPosition.Id);
                await _positionsCollection.DeleteOneAsync(position => position.Id == deletedPosition.Id);
                var employees = await _employeeRepository.GetEmployeeByPositionId(deletedPosition.Id);
                foreach (var employee in employees)
                {
                    await _employeeRepository.DeleteEmployee(employee);
                }
                return deletedPosition;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar cargo", ex);
            }
        }

        public async Task<List<Position>> DeleteCascadePosition(string hrAdministratorId)
        {
            try
            {
                List<Position> positions = await _positionsCollection.Find(src => src.HRAdministratorId == hrAdministratorId).ToListAsync(); //?? throw new DataNotFoundException("Nenhum cargo criado por esse usuário foi encontrado");
                await _positionsCollection.DeleteManyAsync(src => src.HRAdministratorId == hrAdministratorId);
                foreach (var position in positions)
                {
                    var employees = await _employeeRepository.GetEmployeeByPositionId(position.Id);
                    foreach (var employee in employees)
                    {
                        await _employeeRepository.DeleteEmployee(employee);
                    }
                }
                return positions;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar cargo", ex);
            }
        }
    }
}

