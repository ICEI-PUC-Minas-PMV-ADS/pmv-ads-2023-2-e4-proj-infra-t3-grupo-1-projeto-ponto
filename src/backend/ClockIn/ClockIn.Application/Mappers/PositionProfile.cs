using System;
using AutoMapper;
using ClockIn.Application.DTOs.PositionDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Mappers
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

