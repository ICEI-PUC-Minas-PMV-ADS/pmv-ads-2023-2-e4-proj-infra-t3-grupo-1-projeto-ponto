using ClockInOutAPI.Data;
using ClockInOutAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ClockInOutAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Database connections
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ClockInOutContext>
    (opts =>
    {
        opts.UseLazyLoadingProxies().UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    });

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//services
//builder.Services.AddScoped<DepartamentService>();
builder.Services.AddScoped<EmployeeService>();
builder.Services.AddScoped<HRAdministratorService>();
builder.Services.AddScoped<PositionService>();
builder.Services.AddScoped<DepartamentService>();

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

app.UseAuthorization();

app.MapControllers();

app.Run();

