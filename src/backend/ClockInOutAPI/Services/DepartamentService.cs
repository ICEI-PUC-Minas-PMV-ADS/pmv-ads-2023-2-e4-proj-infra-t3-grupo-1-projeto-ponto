using System;
using AutoMapper;
using ClockInOutAPI.Data;
using ClockInOutAPI.Data.Dtos;
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
            IEnumerable<Department> departaments = await _context.Departments.ToListAsync();
            IEnumerable<ReadDepartamentDto> departamentsDto = _mapper.Map<IEnumerable<ReadDepartamentDto>>(departaments);
            return departamentsDto;
        }

        public async Task<ReadDepartamentDto> GetDepartamentById(int id)
        {
            Department department = await _context.Departments.FirstOrDefaultAsync(department => department.Id == id);
            if(department != null)
            {
                ReadDepartamentDto departamentDto = _mapper.Map<ReadDepartamentDto>(department);
                return departamentDto;
            }
            return null;
        }

        public async Task<Department> CreateDepartament(CreateDepartamentDto departamentDto)
        {
            Department department = _mapper.Map<Department>(departamentDto);
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();
            return department;
        }

        public async Task<bool> UpdateDepartament(int id, UpdateDepartamentDto departamentDto)
        {
            Department department = await _context.Departments.FirstOrDefaultAsync(departament => departament.Id == id);

            if (department == null) return false;

            _mapper.Map(departamentDto, department);
            _context.SaveChanges();

            return true;
        }

        public async Task<bool> DeleteDepartament(int id)
        {
            Department department = await _context.Departments.FirstOrDefaultAsync(departament => departament.Id == id);
            if (department == null) return false;

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

