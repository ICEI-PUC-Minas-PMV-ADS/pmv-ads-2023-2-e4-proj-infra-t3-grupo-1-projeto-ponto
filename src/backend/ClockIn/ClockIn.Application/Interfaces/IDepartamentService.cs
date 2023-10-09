using System;
using ClockIn.Application.DTOs.DepartamentDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface IDepartamentService
	{
        Task<IEnumerable<ReadDepartamentDto>> GetDepartamentsByHRAdministrator(string hRAdministratorId);

        Task<ReadDepartamentDto> GetDepartamentById(string id);

        Task<Departament> CreateDepartament(CreateDepartamentDto departament);

        Task UpdateDepartament(string id, UpdateDepartamentDto departament);

        Task DeleteDepartament(string id);
    }
}

