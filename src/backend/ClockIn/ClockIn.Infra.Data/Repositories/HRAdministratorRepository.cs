using System;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace ClockIn.Infra.Data.Repositories
{
	public class HRAdministratorRepository : IHRAdministratorRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IDepartamentRepository _departamentRepository;
        private readonly IJustificationRepository _justificationRepository;
        private readonly IPositionRepository _positionRepository;
        private readonly IPaycheckRepository _paycheckRepository;
        private readonly ITimeLogRepository _timeLogRepository;

        public HRAdministratorRepository(ApplicationDbContext context, IDepartamentRepository departamentRepository, IJustificationRepository justificationRepository, IPositionRepository positionRepository, ITimeLogRepository timeLogRepository, IPaycheckRepository paycheckRepository)
        {
            _context = context;
            _departamentRepository = departamentRepository;
            _justificationRepository = justificationRepository;
            _positionRepository = positionRepository;
            _timeLogRepository = timeLogRepository;
            _paycheckRepository = paycheckRepository;
        }

        public async Task<HRAdministrator> CreateHRAdministrator(HRAdministrator hrAdmonistrator)
        {
            try
            {
                _context.HRAdministrators.Add(hrAdmonistrator);
                await _context.SaveChangesAsync();
                return hrAdmonistrator;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao criar administrador RH", ex);
            }
        }

        public async Task<HRAdministrator> GetHRAdministratorById(string id)
        {
            var hrAdministrator = await _context.HRAdministrators.FirstOrDefaultAsync(hrAdmonistrator => hrAdmonistrator.Id == id);
            if (hrAdministrator != null)
            {
                return hrAdministrator;
            }
            throw new DataNotFoundException("Administrador RH não encontrado");
        }

        public async Task<HRAdministrator> UpdateHRAdministrator(HRAdministrator hrAdmonistrator)
        {
            try
            {
                _context.Update(hrAdmonistrator);
                await _context.SaveChangesAsync();
                return hrAdmonistrator;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao atualizar administrador RH", ex);
            }

        }

        public async Task<HRAdministrator> DeleteHRAdministrator(HRAdministrator hrAdmonistrator)
        {
            try
            {
                List<Employee> employees = await _context.Employees.Where(employee => employee.HRAdministratorId == hrAdmonistrator.Id).ToListAsync();

                foreach (Employee employee in employees)
                {
                    await _paycheckRepository.DeletePaycheckCascade(employee.Id);
                    await _timeLogRepository.DeleteTimelogCascade(employee.Id);
                }
                await _departamentRepository.DeleteCascadeDepartaments(hrAdmonistrator.Id);
                await _positionRepository.DeleteCascadePosition(hrAdmonistrator.Id);
                await _justificationRepository.DeleteCascadeJustification(hrAdmonistrator.Id);

                _context.HRAdministrators.Remove(hrAdmonistrator);
                await _context.SaveChangesAsync();

                return hrAdmonistrator;
            }
            catch (Exception ex)
            {
                throw new DatabaseOperationException("Erro ao deletar administrador RH", ex);
            }
        }
    }
}

