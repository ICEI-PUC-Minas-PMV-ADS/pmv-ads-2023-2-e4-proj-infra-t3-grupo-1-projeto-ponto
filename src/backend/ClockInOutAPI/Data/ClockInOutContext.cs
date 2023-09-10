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
        public DbSet<Departament> Departaments { get; set; }
        public DbSet<Justification> Justifications { get; set; }
        public DbSet<TimeLog> TimeLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HRAdministrator>()
                 .HasMany(e => e.Departaments)
                 .WithOne(e => e.HRAdministrator)
                 .HasForeignKey(e => e.HRAdministratorId)
                 .HasPrincipalKey(e => e.Id)
                 .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<HRAdministrator>()
                .HasMany(e => e.Justifications)
                .WithOne(e => e.HRAdministrator)
                .HasForeignKey(e => e.HRAdministratorId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<HRAdministrator>()
                .HasMany(e => e.Positions)
                .WithOne(e => e.HRAdministrator)
                .HasForeignKey(e => e.HRAdministratorId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<HRAdministrator>()
                .HasMany(e => e.Employees)
                .WithOne(e => e.HRAdministrator)
                .HasForeignKey(e => e.HRAdministratorId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Cascade);



            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Departament)
                .WithMany(e => e.Employees)
                .HasForeignKey(e => e.DepartamentId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Position)
                .WithMany(e => e.Employees)
                .HasForeignKey(e => e.PositionId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TimeLog>()
                .HasOne(e => e.Employee)
                .WithMany(e => e.TimeLog)
                .HasForeignKey(e => e.EmployeeId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<TimeLog>()
                .HasOne(e => e.Justification)
                .WithMany(e => e.TimeLogs)
                .HasForeignKey(e => e.JustificationId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TimeLog>()
                .Property(timeLog => timeLog.JustificationId)
                .IsRequired(false);

        }
    }
}

