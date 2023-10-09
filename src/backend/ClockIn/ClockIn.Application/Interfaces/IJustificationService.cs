using System;
using ClockIn.Application.DTOs.JustificationDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface IJustificationService
	{
        Task<Justification> CreateJustification(CreateJustificationDto justification);

        Task<IEnumerable<ReadJustificationDto>> GetJustificationsByHRAdministrator(string hRAdministratorId);

        Task<ReadJustificationDto> GetJustificationById(string id);

        Task UpdateJustification(string id, UpdateJustificationDto justification);

        Task DeleteJustification(string id);
    }
}

