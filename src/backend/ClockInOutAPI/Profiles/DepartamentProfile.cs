using System;
using AutoMapper;
using ClockInOutAPI.Data.DTOs.DepartamentDTOs;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Profiles
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

