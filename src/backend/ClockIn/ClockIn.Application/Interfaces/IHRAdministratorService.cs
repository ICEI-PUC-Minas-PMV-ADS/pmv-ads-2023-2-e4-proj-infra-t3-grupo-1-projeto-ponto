using System;
using ClockIn.Application.DTOs.HRAdministratorDTOs;

namespace ClockIn.Application.Interfaces
{
	public interface IHRAdministratorService
	{
        Task CreateHRAdministrator(CreateHRAdministratorDto hrAdmonistrator);

        Task<ReadHRAdministratorDto> GetHRAdministratorById(string id);

        Task UpdateHRAdministrator(string id, UpdateHRAdministratorDto hrAdmonistrator);

        Task DeleteHRAdministrator(string id);
    }
}

