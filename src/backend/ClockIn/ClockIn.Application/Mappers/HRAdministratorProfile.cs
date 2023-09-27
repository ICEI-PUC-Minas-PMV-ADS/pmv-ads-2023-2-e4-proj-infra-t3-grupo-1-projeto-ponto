using System;
using AutoMapper;
using ClockIn.Application.DTOs.HRAdministratorDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Mappers
{
	public class HRAdministratorProfile : Profile
    {
        public HRAdministratorProfile()
        {
            CreateMap<CreateHRAdministratorDto, ApplicationUser>();
            CreateMap<CreateHRAdministratorDto, HRAdministrator>();
            CreateMap<UpdateHRAdministratorDto, HRAdministrator>();
            CreateMap<HRAdministrator, ReadHRAdministratorDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.ApplicationUser.FullName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.ApplicationUser.Email));
        }
    }
}

