using System;
using AutoMapper;
using ClockInOutAPI.Data.DTOs.TimeLogDTOs;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Profiles
{
	public class TimeLogProfile : Profile
	{
		public TimeLogProfile()
		{
			CreateMap<CreateTimeLogDto, TimeLog>();
			CreateMap<TimeLog, ReadTimeLogDTO>()
                .ConstructUsing((src, context) =>
				{
                    var logTypeValue = src.LogTypeValue;

                    return new ReadTimeLogDTO(logTypeValue)
                    {
                        Id = src.Id,
                        Timestamp = src.Timestamp,
                        IsEdited = src.IsEdited,
                        EmployeeId = src.EmployeeId
                    };
                });

			CreateMap<UpdateTimeLogDto, TimeLog>()
				.ForMember(dest => dest.JustificationId, opt => opt.MapFrom(src => src.JustificationId));
        }
	}
}

