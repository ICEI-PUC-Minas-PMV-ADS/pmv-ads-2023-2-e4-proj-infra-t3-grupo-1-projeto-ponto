using System;
using AutoMapper;
using ClockIn.Application.DTOs.TimeLogDTOs;
using ClockIn.Domain.Entities;

namespace ClockIn.Application.Mappers
{
	public class TimeLogProfile : Profile
    {
        public TimeLogProfile()
        {
            CreateMap<CreateTimeLogDto, TimeLog>()
                .ForMember(dest => dest.Timestamp, opt => opt.MapFrom(src => DateTime.Parse(src.Timestamp)));
            CreateMap<TimeLog, ReadTimeLogDTO>()
                .ConstructUsing((src, context) =>
                {
                    var logTypeValue = src.LogTypeValue;
                    ReadTimeLogDTO readTimeLog = new(logTypeValue)
                    {
                        Id = src.Id,
                        Timestamp = src.Timestamp,
                        IsEdited = src.IsEdited,
                        EmployeeId = src.EmployeeId
                    };

                    if (src.IsEdited) 
                    {
                        readTimeLog.JustificationId = src.JustificationId;
                    }

                    return readTimeLog;
                });

            CreateMap<UpdateTimeLogDto, TimeLog>()
                .ForMember(dest => dest.JustificationId, opt => opt.MapFrom(src => src.JustificationId))
                .ForMember(dest => dest.Timestamp, opt => opt.MapFrom(src => DateTime.Parse(src.Timestamp)));

        }
    }
}

