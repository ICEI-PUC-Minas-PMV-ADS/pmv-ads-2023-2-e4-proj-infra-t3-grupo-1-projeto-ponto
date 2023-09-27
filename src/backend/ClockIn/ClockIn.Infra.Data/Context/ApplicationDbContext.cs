using System;
using ClockIn.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ClockIn.Infra.Data.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<HRAdministrator> HRAdministrators { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApplicationUser>()
                .HasKey(a => a.Id);

            modelBuilder.Entity<Employee>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<HRAdministrator>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Employee>()
                .Property(e => e.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<HRAdministrator>()
                .HasKey(h => h.Id);

            modelBuilder.Entity<HRAdministrator>()
                .HasMany(e => e.Employees)
                .WithOne(e => e.HRAdministrator)
                .HasForeignKey(e => e.HRAdministratorId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HRAdministrator>()
                .HasOne(h => h.ApplicationUser)
                .WithOne(u => u.HRAdministrator)
                .HasForeignKey<ApplicationUser>(u => u.HRAdministratorId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.ApplicationUser)
                .WithOne(u => u.Employee)
                .HasForeignKey<ApplicationUser>(u => u.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);

            /*
                modelBuilder.Entity<ApplicationUser>()
                    .HasOne(e => e.Employee)
                    .WithOne(a => a.ApplicationUser)
                    .HasForeignKey<Employee>(e => e.ApplicationUserId)
                    .OnDelete(DeleteBehavior.Cascade);


                modelBuilder.Entity<ApplicationUser>()
                    .HasOne(h => h.HRAdministrator)
                    .WithOne(a => a.ApplicationUser)
                    .HasForeignKey<HRAdministrator>(h => h.ApplicationUserId)
                    .OnDelete(DeleteBehavior.Cascade);
            */

            base.OnModelCreating(modelBuilder);
        }
    }
}

