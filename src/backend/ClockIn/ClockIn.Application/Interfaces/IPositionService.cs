using System;
using ClockIn.Application.DTOs.PositionDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Interfaces
{
	public interface IPositionService 
	{
        Task<Position> CreatePosition(CreatePositionDto position);

        Task<IEnumerable<ReadPositionDto>> GetPositionsByHRAdministrator(string hRAdministratorId);

        Task<ReadPositionDto> GetPositionById(string id);

        Task UpdatePosition(string id, UpdatePositionDto position);

        Task DeletePosition(string id);
    }
}

