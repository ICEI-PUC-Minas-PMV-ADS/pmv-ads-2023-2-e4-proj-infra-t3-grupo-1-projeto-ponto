using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Domain.Interfaces
{
	public interface IHRAdministratorRepository
	{
        Task<HRAdministrator> CreateHRAdministrator(HRAdministrator hrAdmonistrator);

        Task<HRAdministrator> GetHRAdministratorById(string id);

        Task<HRAdministrator> UpdateHRAdministrator(HRAdministrator hrAdmonistrator);

        Task<HRAdministrator> DeleteHRAdministrator(HRAdministrator hrAdmonistrator);

    }
}

