using System;
using AutoMapper;
using ClockIn.Application.DTOs.JustificationDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Mappers
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

