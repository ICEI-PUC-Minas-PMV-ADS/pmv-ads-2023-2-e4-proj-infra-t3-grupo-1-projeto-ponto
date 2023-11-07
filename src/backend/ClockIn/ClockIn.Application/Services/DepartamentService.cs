using System;
using AutoMapper;
using ClockIn.Application.DTOs.DepartamentDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;

namespace ClockIn.Application.Services
{
	public class DepartamentService : IDepartamentService
    {
        private readonly IDepartamentRepository _departamentRepository;
        private readonly IHRAdministratorRepository _hRAdministratorRepository;
        private readonly IMapper _mapper;

        public DepartamentService(IDepartamentRepository departamentRepository, IMapper mapper, IHRAdministratorRepository hRAdministratorRepository)
        {
            _departamentRepository = departamentRepository;
            _mapper = mapper;
            _hRAdministratorRepository = hRAdministratorRepository;
        }

        public async Task<IEnumerable<ReadDepartamentDto>> GetDepartamentsByHRAdministrator(string hRAdministratorId)
        {
            var departamentsEntity = await _departamentRepository.GetDepartamentsByHRAdministrator(hRAdministratorId);
            return _mapper.Map<IEnumerable<ReadDepartamentDto>>(departamentsEntity);
        }

        public async Task<ReadDepartamentDto> GetDepartamentById(string id)
        {
            var departamentEntity = await _departamentRepository.GetDepartamentById(id);
            return _mapper.Map<ReadDepartamentDto>(departamentEntity);
        }

        public async Task<Departament> CreateDepartament(CreateDepartamentDto departamentDto)
        {
            await _hRAdministratorRepository.GetHRAdministratorById(departamentDto.HRAdministratorId);
            var departamentEntity = _mapper.Map<Departament>(departamentDto);
            var createdDepartament = await _departamentRepository.CreateDepartament(departamentEntity);
            return createdDepartament;
        }

        public async Task UpdateDepartament(string id, UpdateDepartamentDto departamentDto)
        {
            var departamentEntity = await _departamentRepository.GetDepartamentById(id);
            await _hRAdministratorRepository.GetHRAdministratorById(departamentEntity.HRAdministratorId);
            _mapper.Map(departamentDto, departamentEntity);
            await _departamentRepository.UpdateDepartament(departamentEntity);
        }

        public async Task DeleteDepartament(string id)
        {
            var departamentEntity = await _departamentRepository.GetDepartamentById(id);
            await _departamentRepository.DeleteDepartament(departamentEntity);
        }
    }
}

