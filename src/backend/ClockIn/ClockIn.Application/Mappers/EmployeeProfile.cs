using System;
using AutoMapper;
using ClockIn.Application.DTOs.EmployeeDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Mappers
{
	public class EmployeeProfile : Profile
    {
        public EmployeeProfile()
        {
            CreateMap<CreateEmployeeDto, ApplicationUser>();
            CreateMap<CreateEmployeeDto, Employee>();
            CreateMap<UpdateEmployeeDto, Employee>();
            CreateMap<Employee, ReadEmployeeDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.ApplicationUser.FullName));

        }
    }
}

