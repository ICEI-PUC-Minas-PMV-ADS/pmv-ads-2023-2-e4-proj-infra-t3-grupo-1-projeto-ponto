using ClockIn.Application.Interfaces;
using ClockIn.Application.Services;
using ClockIn.Domain.Entities;
using ClockIn.Domain.Interfaces;
using System.Text;
using ClockIn.Infra.Data.Context;
using ClockIn.Infra.Data.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Database connections
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>
    (opts =>
    {
        opts.UseLazyLoadingProxies().UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    });

builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("ClockInDatabase"));


builder.Services.AddIdentity<ApplicationUser, IdentityRole>(opts =>
{
    opts.User.RequireUniqueEmail = true;
    opts.User.AllowedUserNameCharacters = null;
}).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders().AddRoles<IdentityRole>();

var key = Encoding.ASCII.GetBytes("87ˆ#FASDF1$23Bjd3hfsjd%3fsdf!asdlkjhb%$kljhl");
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})

    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IHRAdministratorRepository, HRAdministratorRepository>();
builder.Services.AddScoped<IPositionRepository, PositionRepository>();
builder.Services.AddScoped<IDepartamentRepository, DepartamentRepository>();
builder.Services.AddScoped<ITimeLogRepository, TimeLogRepository>();
builder.Services.AddScoped<IJustificationRepository, JustificationRepository>();
builder.Services.AddScoped<IPaycheckRepository, PaycheckRepository>();

builder.Services.AddScoped<IDepartamentService, DepartamentService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IHRAdministratorService, HRAdministratorService>();
builder.Services.AddScoped<IJustificationService, JustificationService>();
builder.Services.AddScoped<IPaycheckService, PaycheckService>();
builder.Services.AddScoped<IApplicationUserService, ApplicationUserService>();
builder.Services.AddScoped<IPositionService, PositionService>();
builder.Services.AddScoped<ISalaryCalculatorService, SalaryCalculatorService>();
builder.Services.AddScoped<ITimeLogService, TimeLogService>();
builder.Services.AddScoped<IWorkTimeCalculatorService, WorkTimeCalculatorService>();
builder.Services.AddScoped<ITokenService, TokenService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

