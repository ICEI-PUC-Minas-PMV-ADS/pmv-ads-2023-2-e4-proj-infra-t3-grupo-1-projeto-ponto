using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Domain.Interfaces
{
	public interface IDepartamentRepository
	{
        Task<IEnumerable<Departament>> GetDepartamentsByHRAdministrator(string hRAdministratorId);

        Task<Departament> GetDepartamentById(string id);

        Task<Departament> CreateDepartament(Departament departament);

        Task<Departament> UpdateDepartament(Departament departament);

        Task<Departament> DeleteDepartament(Departament departament);

        Task<List<Departament>> DeleteCascadeDepartaments(string hrAdministratorId);

    }
}

