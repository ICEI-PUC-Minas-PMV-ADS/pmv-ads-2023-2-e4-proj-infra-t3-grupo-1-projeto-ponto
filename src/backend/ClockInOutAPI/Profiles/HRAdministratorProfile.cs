using System;
using AutoMapper;
using ClockInOutAPI.Data.DTOs.HRAdministratorDTOs;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Profiles
{
	public class HRAdministratorProfile : Profile
 	{
		public HRAdministratorProfile()
		{
            CreateMap<CreateHRAdministratorDto, HRAdministrator>();
            CreateMap<UpdateHRAdministratorDto, HRAdministrator>();
            CreateMap<HRAdministrator, ReadHRAdministratorDto>();
        }
	}
}

