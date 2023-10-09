using System;
using ClockIn.Domain.Entities;

namespace ClockIn.Domain.Interfaces
{
	public interface IJustificationRepository
	{
        Task<Justification> CreateJustification(Justification justification);

        Task<IEnumerable<Justification>> GetJustificationsByHRAdministrator(string hRAdministratorId);

        Task<Justification> GetJustificationById(string id);

        Task<Justification> UpdateJustification(Justification justification);

        Task<Justification> DeleteJustification(Justification justification);

        Task<List<Justification>> DeleteCascadeJustification(string hrAdministratorId);

    }
}

