using System;
using System.Collections.Generic;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace ClockIn.Infrastructure.Tests
{
	public class DepartamentRepositoryTests
	{
        private readonly IDepartamentRepository _departamentRepository;
        protected ApplicationDbContext context;

        public DepartamentRepositoryTests()
        {
            var connectionString = "server=localhost;database=ClockIn;user=root;password=Matheus#14";
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
                .Options;

            context = new ApplicationDbContext(options);

            var service = new ServiceCollection();
            service.AddSingleton<ApplicationDbContext>(context);
            service.AddSingleton<IOptions<MongoDbSettings>>(Options.Create(new MongoDbSettings
            {
                ConnectionString = "mongodb+srv://admin:yo6Fjxg9Ec2NcaS3@cluster0.sttzsnb.mongodb.net/?retryWrites=true&w=majority",
                DatabaseName = "ClockIn",
                DepartamentsCollectionName = "Departaments",
                JustificationsCollectionName = "Justifications",
                PaychecksCollectionName = "Paychecks",
                PositionsCollectionName = "Positions",
                TimeLogsCollectionName = "TimeLogs"
            }));
            service.AddTransient<IDepartamentRepository, DepartamentRepository>();
            service.AddTransient<IEmployeeRepository, EmployeeRepository>();
            service.AddTransient<IPaycheckRepository, PaycheckRepository>();
            service.AddTransient<ITimeLogRepository, TimeLogRepository>();
            service.AddIdentity<ApplicationUser, IdentityRole>(opts =>
            {
                opts.User.RequireUniqueEmail = true;
                opts.User.AllowedUserNameCharacters = null;
            }).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders().AddRoles<IdentityRole>();

            var provider = service.BuildServiceProvider();
            _departamentRepository = provider.GetService<IDepartamentRepository>();

        }


        [Fact]
		public async void TestGetDpartamentsByHRAdministratorId()
		{
            //Arrange
            string hRAdministratorId = "8e3f668e-47c3-4eca-baae-a74a65cb3619";

			//Act
			IEnumerable<Departament> list = await _departamentRepository.GetDepartamentsByHRAdministrator(hRAdministratorId);

			//Assert
			Assert.NotNull(list);
		}

        [Fact]
        public async void TestCreateDepartament()
        {
            //Arrange
            Departament departament = new()
            {
                Name = "TesteUnitario",
                HRAdministratorId = "8e3f668e-47c3-4eca-baae-a74a65cb3619"
            };

            //Act
            Departament newDepartament = await _departamentRepository.CreateDepartament(departament);

            //Assert
            Assert.NotNull(newDepartament);

        }

        [Fact]
        public async void TestUpdateDepartament()
        {
            //Arrange
            Departament departament = new()
            {
                Id = "65121adf0d0a9551a21b3ad8",
                Name = "Novo nome",
                HRAdministratorId = "8e3f668e-47c3-4eca-baae-a74a65cb3619"
            };

            //Act
            Departament newDepartament = await _departamentRepository.UpdateDepartament(departament);

            //Assert
            Assert.NotNull(newDepartament);

        }

        [Fact]
        public async void TestDeleteDepartament()
        {
            //Arrange
            Departament departament = new()
            {
                Id = "65121adf0d0a9551a21b3ad8",
                Name = "Novo nome",
                HRAdministratorId = "8e3f668e-47c3-4eca-baae-a74a65cb3619"
            };

            //Act
            Departament newDepartament = await _departamentRepository.DeleteDepartament(departament);

            //Assert
            Assert.NotNull(newDepartament);

        }

    }
}

