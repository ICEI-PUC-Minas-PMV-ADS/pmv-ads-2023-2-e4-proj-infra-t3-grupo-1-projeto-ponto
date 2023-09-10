using System;
using AutoMapper;
using ClockInOutAPI.Data;
using ClockInOutAPI.Data.DTOs.JustificationDTOs;
using ClockInOutAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ClockInOutAPI.Services
{
	public class JustificationService
	{
		private readonly IMapper _mapper;
		private readonly ClockInOutContext _context;

        public JustificationService(IMapper mapper, ClockInOutContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<ReadJustificationDto>> GetJustifications()
        {
            IEnumerable<Justification> justifications = await _context.Justifications.ToListAsync();
            IEnumerable<ReadJustificationDto> justificarionDtos = _mapper.Map<IEnumerable<ReadJustificationDto>>(justifications);
            return justificarionDtos;
        }

        public async Task<ReadJustificationDto> GetJustificationById(int id)
        {
            Justification justification = await _context.Justifications.FirstOrDefaultAsync(justification => justification.Id == id);
            if (justification != null)
            {
                ReadJustificationDto justificarionDto = _mapper.Map<ReadJustificationDto>(justification);
                return justificarionDto;
            }
            return null;
        }

        public async Task<Justification> CreateJustification(CreateJustificationDto justificationDto)
        {
            Justification justification = _mapper.Map<Justification>(justificationDto);

            _context.Justifications.Add(justification);
            await _context.SaveChangesAsync();
            return justification;
        }

        public async Task<bool> UpdateJustification(int id, UpdateJustificationDto justificationDto)
        {
            Justification justification = await _context.Justifications.FirstOrDefaultAsync(justification => justification.Id == id);

            if (justification == null) return false;

            _mapper.Map(justificationDto, justification);
            _context.SaveChanges();

            return true;
        }

        public async Task<bool> DeleteJustification(int id)
        {
            Justification justification = await _context.Justifications.FirstOrDefaultAsync(Justification => Justification.Id == id);
            if (justification == null) return false;

            _context.Justifications.Remove(justification);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}

