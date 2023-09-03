using System;
using ClockInOutAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ClockInOutAPI.Data
{
	public class ClockInOutContext : DbContext
	{
		public ClockInOutContext(DbContextOptions<ClockInOutContext> opts) : base(opts)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<HRAdministrator> HRAdministrators { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}

