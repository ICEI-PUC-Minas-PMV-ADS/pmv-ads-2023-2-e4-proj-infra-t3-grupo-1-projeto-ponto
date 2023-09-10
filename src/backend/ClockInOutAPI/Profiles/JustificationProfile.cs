using System;
using AutoMapper;
using ClockInOutAPI.Data.DTOs.JustificationDTOs;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Profiles
{
	public class JustificationProfile : Profile
	{
		public JustificationProfile()
		{
			CreateMap<CreateJustificationDto, Justification>();
			CreateMap<Justification, ReadJustificationDto>();
			CreateMap<UpdateJustificationDto, Justification>();
		}
	}
}

