using System;
using AutoMapper;
using ClockIn.Application.DTOs.HRAdministratorDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;

namespace ClockIn.Application.Services
{
	public class HRAdministratorService : IHRAdministratorService
    {
        private readonly IHRAdministratorRepository _hRAdministratorRepository;
        private readonly IApplicationUserService _applicationUserService;
        private readonly IMapper _mapper;

        public HRAdministratorService(IHRAdministratorRepository hRAdministratorRepository, IMapper mapper, IApplicationUserService applicationUserService)
        {
            _hRAdministratorRepository = hRAdministratorRepository;
            _mapper = mapper;
            _applicationUserService = applicationUserService;

        }

        public async Task CreateHRAdministrator(CreateHRAdministratorDto hrAdmonistratorDto)
        {
            var applicationUserEntity = _mapper.Map<ApplicationUser>(hrAdmonistratorDto);
            var hRAdministratorEntity = _mapper.Map<HRAdministrator>(hrAdmonistratorDto);
            await _hRAdministratorRepository.CreateHRAdministrator(hRAdministratorEntity);
            await _applicationUserService.Register(hRAdministratorEntity, null, applicationUserEntity, hrAdmonistratorDto.Password, "manager");
        }

        public async Task<ReadHRAdministratorDto> GetHRAdministratorById(string id)
        {
            var hRAdministratorEntity = await _hRAdministratorRepository.GetHRAdministratorById(id);
            return _mapper.Map<ReadHRAdministratorDto>(hRAdministratorEntity);
        }

        public async Task UpdateHRAdministrator(string id, UpdateHRAdministratorDto hrAdmonistratorDto)
        {
            var hRAdministratorEntity = await _hRAdministratorRepository.GetHRAdministratorById(id);
            _mapper.Map(hrAdmonistratorDto, hRAdministratorEntity);
            await _applicationUserService.Update(hrAdmonistratorDto, null, hRAdministratorEntity.Id);
            await _hRAdministratorRepository.UpdateHRAdministrator(hRAdministratorEntity);
        }

        public async Task DeleteHRAdministrator(string id)
        {
            var hrAdmonistratorEntity = await _hRAdministratorRepository.GetHRAdministratorById(id);
            await _hRAdministratorRepository.DeleteHRAdministrator(hrAdmonistratorEntity);

        }
    }
}

