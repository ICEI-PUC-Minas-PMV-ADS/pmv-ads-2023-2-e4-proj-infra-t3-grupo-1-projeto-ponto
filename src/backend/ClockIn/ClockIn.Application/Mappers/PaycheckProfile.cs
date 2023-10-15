using System;
using AutoMapper;
using ClockIn.Application.DTOs.PaycheckDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Mappers
{
	public class PaycheckProfile : Profile
    {
        public PaycheckProfile()
        {
            CreateMap<Paycheck, ReadPaycheckDto>().ReverseMap();
            CreateMap<UpdatePaycheckDto, Paycheck>().ReverseMap();
            CreateMap<CreatePaycheckDto, Paycheck>().ReverseMap();
        }
    }
}

