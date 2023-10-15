using System;
using AutoMapper;
using ClockIn.Application.DTOs.DepartamentDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Mappers
{
	public class DepartamentProfile : Profile
    {
        public DepartamentProfile()
        {
            CreateMap<CreateDepartamentDto, Departament>();
            CreateMap<UpdateDepartamentDto, Departament>();
            CreateMap<Departament, ReadDepartamentDto>();
        }
    }
}

