using System;
using AutoMapper;
using ClockInOutAPI.Data.Dtos;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Profiles
{
	public class PositionProfile : Profile
	{
		public PositionProfile()
		{
            CreateMap<CreatePositionDto, Position>();
            CreateMap<UpdatePositionDto, Position>();
            CreateMap<Position, ReadPositionDto>();
        }
	}
}

