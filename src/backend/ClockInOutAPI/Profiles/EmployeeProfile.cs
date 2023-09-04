﻿using System;
using AutoMapper;
using ClockInOutAPI.Data.Dtos;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Profiles
{
	public class EmployeeProfile : Profile
	{
		public EmployeeProfile()
		{
            CreateMap<CreateEmployeeDto, Employee>();
            CreateMap<UpdateEmployeeDto, Employee>();
            CreateMap<Employee, ReadEmployeeDto>();
        }
	}
}
