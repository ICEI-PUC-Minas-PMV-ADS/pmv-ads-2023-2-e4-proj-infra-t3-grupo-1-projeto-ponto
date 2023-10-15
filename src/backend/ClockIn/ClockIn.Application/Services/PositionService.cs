using System;
using AutoMapper;
using ClockIn.Application.DTOs.PositionDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;

namespace ClockIn.Application.Services
{
	public class PositionService : IPositionService
    {
        private readonly IPositionRepository _positionRepository;
        private readonly IHRAdministratorRepository _hRAdministratorRepository;

        private readonly IMapper _mapper;

        public PositionService(IMapper mapper, IPositionRepository positionRepository, IHRAdministratorRepository hRAdministratorRepository)
        {
            _mapper = mapper;
            _positionRepository = positionRepository;
            _hRAdministratorRepository = hRAdministratorRepository;
        }

        public async Task<Position> CreatePosition(CreatePositionDto positionDto)
        {
            await _hRAdministratorRepository.GetHRAdministratorById(positionDto.HRAdministratorId);
            var positionEntity = _mapper.Map<Position>(positionDto);
            var createdPosition = await _positionRepository.CreatePosition(positionEntity);
            return createdPosition;
        }

        public async Task<IEnumerable<ReadPositionDto>> GetPositionsByHRAdministrator(string hRAdministratorId)
        {
            var positionEntity = await _positionRepository.GetPositionsByHRAdministrator(hRAdministratorId);
            return _mapper.Map<IEnumerable<ReadPositionDto>>(positionEntity);
        }

        public async Task<ReadPositionDto> GetPositionById(string id)
        {
            var positionEntity = await _positionRepository.GetPositionById(id);
            return _mapper.Map<ReadPositionDto>(positionEntity);
        }

        public async Task UpdatePosition(string id, UpdatePositionDto positionDto)
        {
            var positionEntity = await _positionRepository.GetPositionById(id);
            await _hRAdministratorRepository.GetHRAdministratorById(positionEntity.HRAdministratorId);
            _mapper.Map(positionDto, positionEntity);
            await _positionRepository.UpdatePosition(positionEntity);
        }

        public async Task DeletePosition(string id)
        {
            var positionEntity = await _positionRepository.GetPositionById(id);
            await _positionRepository.DeletePosition(positionEntity);
        }

        public Task DeleteCascadePositions(string hrAdministratorId)
        {
            throw new NotImplementedException();
        }
    }
}

