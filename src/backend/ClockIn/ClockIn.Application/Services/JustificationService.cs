using System;
using AutoMapper;
using ClockIn.Application.DTOs.JustificationDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;

namespace ClockIn.Application.Services
{
	public class JustificationService : IJustificationService
    {
        private readonly IJustificationRepository _justificationRepository;
        private readonly IHRAdministratorRepository _hRAdministratorRepository;

        private readonly IMapper _mapper;

        public JustificationService(IJustificationRepository justificationRepository, IMapper mapper, IHRAdministratorRepository hRAdministratorRepository)
        {
            _justificationRepository = justificationRepository;
            _mapper = mapper;
            _hRAdministratorRepository = hRAdministratorRepository;
        }

        public async Task<Justification> CreateJustification(CreateJustificationDto justificationDto)
        {
            await _hRAdministratorRepository.GetHRAdministratorById(justificationDto.HRAdministratorId);
            var justificationEntity = _mapper.Map<Justification>(justificationDto);
            var createdJustification = await _justificationRepository.CreateJustification(justificationEntity);
            return createdJustification;
        }

        public async Task<IEnumerable<ReadJustificationDto>> GetJustificationsByHRAdministrator(string hRAdministratorId)
        {
            var justificationEntity = await _justificationRepository.GetJustificationsByHRAdministrator(hRAdministratorId);
            return _mapper.Map<IEnumerable<ReadJustificationDto>>(justificationEntity);
        }

        public async Task<ReadJustificationDto> GetJustificationById(string id)
        {
            var justificationEntity = await _justificationRepository.GetJustificationById(id);
            return _mapper.Map<ReadJustificationDto>(justificationEntity);
        }

        public async Task UpdateJustification(string id, UpdateJustificationDto justificationDto)
        {
            var justificationEntity = await _justificationRepository.GetJustificationById(id);
            await _hRAdministratorRepository.GetHRAdministratorById(justificationEntity.HRAdministratorId);
            _mapper.Map(justificationDto, justificationEntity);
            await _justificationRepository.UpdateJustification(justificationEntity);
        }

        public async Task DeleteJustification(string id)
        {
            var justificationEntity = await _justificationRepository.GetJustificationById(id);
            await _justificationRepository.DeleteJustification(justificationEntity);
        }
    }
}

