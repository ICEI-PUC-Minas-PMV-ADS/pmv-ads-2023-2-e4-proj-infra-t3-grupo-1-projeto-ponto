using System;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ClockIn.Infra.Data.Repositories
{
	public class DepartamentRepository : IDepartamentRepository
    {
        private readonly IMongoCollection<Departament> _departamentsCollection;
        private readonly IEmployeeRepository _employeeRepository;


        public DepartamentRepository(IOptions<MongoDbSettings> mongoDbSettings, IEmployeeRepository employeeRepository)
        {
            var mongoClient = new MongoClient(
                mongoDbSettings.Value.ConnectionString);

            var mongoDataBase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);

            _departamentsCollection = mongoDataBase.GetCollection<Departament>(
                mongoDbSettings.Value.DepartamentsCollectionName);
            _employeeRepository = employeeRepository;
        }

        public async Task<IEnumerable<Departament>> GetDepartamentsByHRAdministrator(string hRAdministratorId)
        {
            List<Departament> departaments = await _departamentsCollection.Find(departament => departament.HRAdministratorId == hRAdministratorId).ToListAsync();

            if (departaments.Count != 0)
            {
                return departaments;
            }
            throw new DataNotFoundException("Nenhum departamento criado por esse usuário foi encontrado");
        }

        public async Task<Departament> GetDepartamentById(string id)
        {
            Departament departament = await _departamentsCollection.Find(departament => departament.Id == id).FirstOrDefaultAsync();
            if (departament != null)
            {
                return departament;
            }
            throw new DataNotFoundException("Departamento não encontrado");
        }

        public async Task<Departament> CreateDepartament(Departament newDepartament)
        {
            try
            {
                await _departamentsCollection.InsertOneAsync(newDepartament);
                return newDepartament;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao criar departamento", ex);
            }
        }

        public async Task<Departament> UpdateDepartament(Departament updatedDepartament)
        {
            try
            {
                await GetDepartamentById(updatedDepartament.Id);
                await _departamentsCollection.ReplaceOneAsync(departament => departament.Id == updatedDepartament.Id, updatedDepartament);
                return updatedDepartament;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao atualizar departamento", ex);
            }
        }

        public async Task<Departament> DeleteDepartament(Departament deletedDepartament)
        {
            try
            {
                await GetDepartamentById(deletedDepartament.Id);
                await _departamentsCollection.DeleteOneAsync(departament => departament.Id == deletedDepartament.Id);
                var employees = await _employeeRepository.GetEmployeeByPositionId(deletedDepartament.Id);
                foreach (var employee in employees)
                {
                    await _employeeRepository.DeleteEmployee(employee);
                }
                return deletedDepartament;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar departamento", ex);
            }
        }

        public async Task<List<Departament>> DeleteCascadeDepartaments(string hrAdministratorId)
        {
            try
            {
                List<Departament> departaments = await _departamentsCollection.Find(src => src.HRAdministratorId == hrAdministratorId).ToListAsync(); //? throw new DataNotFoundException("Nenhum departamento criado por esse usuário foi encontrado");
                await _departamentsCollection.DeleteManyAsync(src => src.HRAdministratorId == hrAdministratorId);
                return departaments;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar departamento", ex);
            }
        }
    }
}

