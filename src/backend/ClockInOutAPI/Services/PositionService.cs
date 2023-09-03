using System;
using AutoMapper;
using ClockInOutAPI.Data;
using ClockInOutAPI.Models;
using ClockInOutAPI.Data.Dtos;
using Microsoft.EntityFrameworkCore;

namespace ClockInOutAPI.Services
{
	public class PositionService
	{
		private readonly ClockInOutContext _context;
		private readonly IMapper _mapper;

		public PositionService(ClockInOutContext context, IMapper mapper)
		{
            _context = context;
            _mapper = mapper;
        }

		public async Task<Position> CreatePosition(CreatePositionDto positionDto)
		{
			Position position = _mapper.Map<Position>(positionDto);
			_context.Positions.Add(position);
			await _context.SaveChangesAsync();
			return position;
		}

		public async Task<IEnumerable<ReadPositionDto>> GetPosition()
		{
			IEnumerable<Position> positions = await _context.Positions.ToListAsync();
			IEnumerable<ReadPositionDto> positionsDto = _mapper.Map<IEnumerable<ReadPositionDto>>(positions);
			return positionsDto;
		}

		public async Task<ReadPositionDto> GetSpecificPosition(int id)
		{
			var position = await _context.Positions.FirstOrDefaultAsync(position => position.Id == id);
			if(position != null)
			{
				ReadPositionDto positionDto = _mapper.Map<ReadPositionDto>(position);
				return positionDto;
            }
			return null;
		}

		public async Task<bool> UpdatePosition(int id, UpdatePositionDto positionDto)
		{
			var position = await _context.Positions.FirstOrDefaultAsync(position => position.Id == id);
			if (position == null) return false;

			_mapper.Map(positionDto, position);
			_context.SaveChanges();

			return true;
		}

		public async Task<bool> DeletePosition(int id)
		{
			var position = await _context.Positions.FirstOrDefaultAsync(position => position.Id == id);
			if (position == null) return false;

			_context.Positions.Remove(position);
			await _context.SaveChangesAsync();

			return true;
		}
    }
}

