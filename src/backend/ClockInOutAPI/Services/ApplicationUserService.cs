using System;
using AutoMapper;
using ClockInOutAPI.Data;

namespace ClockInOutAPI.Services
{
	public class ApplicationUserService
	{
        private readonly ClockInOutContext _context;
        private readonly IMapper _mapper;

        public ApplicationUserService(ClockInOutContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}

