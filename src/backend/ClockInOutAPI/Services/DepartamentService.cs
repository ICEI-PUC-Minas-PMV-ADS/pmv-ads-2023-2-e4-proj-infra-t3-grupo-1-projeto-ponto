using System;
using AutoMapper;
using ClockInOutAPI.Data;
using ClockInOutAPI.Data.DTOs.DepartamentDTOs;
using ClockInOutAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ClockInOutAPI.Services
{
	public class DepartamentService
	{
        private readonly ClockInOutContext _context;
        private readonly IMapper _mapper;

        public DepartamentService(ClockInOutContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ReadDepartamentDto>> GetDepartaments()
        {
            IEnumerable<Departament> departaments = await _context.Departaments.ToListAsync();
            IEnumerable<ReadDepartamentDto> departamentsDto = _mapper.Map<IEnumerable<ReadDepartamentDto>>(departaments);
            return departamentsDto;
        }

        public async Task<ReadDepartamentDto> GetDepartamentById(int id)
        {
            Departament Departament = await _context.Departaments.FirstOrDefaultAsync(Departament => Departament.Id == id);
            if(Departament != null)
            {
                ReadDepartamentDto departamentDto = _mapper.Map<ReadDepartamentDto>(Departament);
                return departamentDto;
            }
            return null;
        }

        public async Task<Departament> CreateDepartament(CreateDepartamentDto departamentDto)
        {
            Departament Departament = _mapper.Map<Departament>(departamentDto);
            _context.Departaments.Add(Departament);
            await _context.SaveChangesAsync();
            return Departament;
        }

        public async Task<bool> UpdateDepartament(int id, UpdateDepartamentDto departamentDto)
        {
            Departament Departament = await _context.Departaments.FirstOrDefaultAsync(departament => departament.Id == id);

            if (Departament == null) return false;

            _mapper.Map(departamentDto, Departament);
            _context.SaveChanges();

            return true;
        }

        public async Task<bool> DeleteDepartament(int id)
        {
            Departament Departament = await _context.Departaments.FirstOrDefaultAsync(departament => departament.Id == id);
            if (Departament == null) return false;

            _context.Departaments.Remove(Departament);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

