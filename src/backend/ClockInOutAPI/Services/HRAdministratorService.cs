using System;
using AutoMapper;
using ClockInOutAPI.Data;
using ClockInOutAPI.Data.Dtos;
using ClockInOutAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ClockInOutAPI.Services
{
	public class HRAdministratorService 
	{
        private readonly ClockInOutContext _context;
        private readonly IMapper _mapper;

        public HRAdministratorService(ClockInOutContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task CreatHRAdministrator(CreateHRAdministratorDto hrAdmonistratorDto)
        {
            HRAdministrator hrAdmonistrator = _mapper.Map<HRAdministrator>(hrAdmonistratorDto);
            var passwordHasher = new PasswordHasher<HRAdministrator>();
            hrAdmonistrator.Password = passwordHasher.HashPassword(hrAdmonistrator, hrAdmonistrator.Password);
            _context.HRAdministrators.Add(hrAdmonistrator);
            await _context.SaveChangesAsync();
        }

        public async Task<ReadHRAdministratorDto> GetHRAdministrator(int id)
        {
            HRAdministrator hrAdmonistrator = await _context.HRAdministrators.FirstOrDefaultAsync(hrAdmonistrator => hrAdmonistrator.Id == id);
            if (hrAdmonistrator != null)
            {
                ReadHRAdministratorDto hrAdministratorDto= _mapper.Map<ReadHRAdministratorDto>(hrAdmonistrator);
                return hrAdministratorDto; 
            }
            return null;
        }

        public async Task<ApplicationUser> UpdateHRAdministrator(int id, UpdateHRAdministratorDto hrAdmonistratorDto)
        {
            HRAdministrator hrAdmonistrator = await _context.HRAdministrators.FirstOrDefaultAsync(hrAdmonistrator => hrAdmonistrator.Id == id);
            if (hrAdmonistrator != null)
            {
                _mapper.Map(hrAdmonistratorDto, hrAdmonistrator);
                _context.SaveChanges();
            }
            return null;

        }

        public async Task<bool> DeleteHRAdministrator(int id)
        {
            HRAdministrator hrAdmonistrator = await _context.HRAdministrators.FirstOrDefaultAsync(hrAdmonistrator => hrAdmonistrator.Id == id);
            if (hrAdmonistrator != null)
            {
                _context.HRAdministrators.Remove(hrAdmonistrator);
                await _context.SaveChangesAsync();
            }
            return false;
        }
    }
}

