using System;
using ClockIn.Application.DTOs.HRAdministratorDTOs;
using ClockIn.Application.Interfaces;
using ClockIn.Application.Services;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Moq;

namespace ClockIn.Infrastructure.Tests
{
	public class HRAdministratorRepositoryTests
	{
		private readonly IHRAdministratorRepository _hRAdministratorRepository;
        private readonly IApplicationUserService _applicationUserService;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        protected ApplicationDbContext context;


        public HRAdministratorRepositoryTests()
		{
            var connectionString = "server=localhost;database=ClockIn;user=root;password=A#m152512";
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
            service.AddTransient<IHRAdministratorRepository, HRAdministratorRepository>();
            service.AddTransient<IEmployeeRepository, EmployeeRepository>();
            service.AddTransient<IPaycheckRepository, PaycheckRepository>();
            service.AddTransient<ITimeLogRepository, TimeLogRepository>();
            service.AddTransient<IJustificationRepository, JustificationRepository>();
            service.AddTransient<IPositionRepository, PositionRepository>();
            service.AddTransient<ITokenService, TokenService>();

            var loggerMock = new Mock<ILogger<UserManager<ApplicationUser>>>();
            var roleManagerLoggerMock = new Mock<ILogger<RoleManager<IdentityRole>>>();
            var signInManagerLoggerMock = new Mock<ILogger<SignInManager<ApplicationUser>>>();
            var dataProtectorTokenProviderLoggerMock = new Mock<ILogger<DataProtectorTokenProvider<ApplicationUser>>>();

            service.AddSingleton(loggerMock.Object);
            service.AddSingleton(roleManagerLoggerMock.Object);
            service.AddSingleton(signInManagerLoggerMock.Object);
            service.AddSingleton(dataProtectorTokenProviderLoggerMock.Object);

            service.AddIdentity<ApplicationUser, IdentityRole>(opts =>
            {
                opts.User.RequireUniqueEmail = true;
                opts.User.AllowedUserNameCharacters = null;
            }).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders().AddRoles<IdentityRole>();
            service.AddTransient<IApplicationUserService, ApplicationUserService>();

            var provider = service.BuildServiceProvider();
            _hRAdministratorRepository = provider.GetService<IHRAdministratorRepository>();
            _applicationUserService = provider.GetService<IApplicationUserService>();
        }

        [Fact]
        public async void TestCreateHRAdministrator()
        {
            //Arrange
            HRAdministrator hRAdministrator = new()
            {
                CNPJ = "26.822.007/0001-82"
            };
            HRAdministrator newHRAdministrator = await _hRAdministratorRepository.CreateHRAdministrator(hRAdministrator);
            ApplicationUser applicationUser = new()
            {
                FullName = "Teste",
                Email = "testestestt@unit.com"
            };
            string password = "Matheus#14";
            string role = "manager";

            //Act
            IdentityResult res = await _applicationUserService.Register(newHRAdministrator, null, applicationUser, password, role);

            //Assert
            Assert.True(res.Succeeded);
        }

        [Fact]
        public async void TestGetHRAdministrator()
        {
            //Arrange
            string hRAdministratorId = "e3c20325-f7db-4594-aae3-881b979ac58b"; //Alterar pelo ID do usuário criado no teste anterior
            //Act
            HRAdministrator hRAdministrator = await _hRAdministratorRepository.GetHRAdministratorById(hRAdministratorId);
            //Assert
            Assert.NotNull(hRAdministrator);
        }

        [Fact]
        public async void TestUpdateHRAdministrator()
        {
            //Arrange
            string hRAdministratorId = "e3c20325-f7db-4594-aae3-881b979ac58b"; //Alterar pelo ID do usuário criado no teste anterior
            UpdateHRAdministratorDto hrAdmonistratorDto = new()
            {
                Email = "novoemail@gmail.com",
                FullName = "Novo nome",
                CNPJ = "123456780",
            };

            var hRAdministratorEntity = await _hRAdministratorRepository.GetHRAdministratorById(hRAdministratorId);
            hRAdministratorEntity.CNPJ = hrAdmonistratorDto.CNPJ;

            //Act
            HRAdministrator hRAdministratorUpdated = await _hRAdministratorRepository.UpdateHRAdministrator(hRAdministratorEntity);
            IdentityResult result = await _applicationUserService.Update(hrAdmonistratorDto, null, hRAdministratorId);

            //Assert
            Assert.NotNull(hRAdministratorUpdated);
            Assert.True(result.Succeeded);
        }

        [Fact]
        public async void TestDeleteHRAdministrator()
        {
            //Arrange
            string hRAdministratorId = "e3c20325-f7db-4594-aae3-881b979ac58b"; //Alterar pelo ID do usuário criado no teste anterior
            HRAdministrator hRAdministrator = await _hRAdministratorRepository.GetHRAdministratorById(hRAdministratorId);

            //Act
            HRAdministrator hRAdministratorDeleted = await _hRAdministratorRepository.DeleteHRAdministrator(hRAdministrator);

            //Assert
            Assert.NotNull(hRAdministratorDeleted);
        }
    }
}

