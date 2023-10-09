using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Domain.Interfaces
{
	public interface IPositionRepository
	{
        Task<Position> CreatePosition(Position position);

        Task<IEnumerable<Position>> GetPositionsByHRAdministrator(string hRAdministratorId);

        Task<Position> GetPositionById(string positionId);

        Task<Position> UpdatePosition(Position position);

        Task<Position> DeletePosition(Position position);

        Task<List<Position>> DeleteCascadePosition(string hrAdministratorId);

    }
}

