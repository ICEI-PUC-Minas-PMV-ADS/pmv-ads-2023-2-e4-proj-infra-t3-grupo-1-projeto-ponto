using System;
using AutoMapper;
using ClockInOutAPI.Data.Dtos;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Profiles
{
	public class DepartamentProfile : Profile
	{
		public DepartamentProfile()
		{
			CreateMap<CreateDepartamentDto, Department>();
			CreateMap<UpdateDepartamentDto, Department>();
			CreateMap<Department, ReadDepartamentDto>();
		}
	}
}

