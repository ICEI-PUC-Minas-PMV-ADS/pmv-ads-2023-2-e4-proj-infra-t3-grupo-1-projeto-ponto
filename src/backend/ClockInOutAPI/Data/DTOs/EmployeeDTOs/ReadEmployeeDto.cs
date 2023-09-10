using System;
using ClockInOutAPI.Models;
using System.ComponentModel.DataAnnotations;
using ClockInOutAPI.Data.DTOs.HRAdministratorDTOs;
using ClockInOutAPI.Data.DTOs.PositionDTOs;
using ClockInOutAPI.Data.DTOs.DepartamentDTOs;

namespace ClockInOutAPI.Data.DTOs.EmployeeDTOs
{
	public class ReadEmployeeDto
	{
        public string  Id { get; set; }

        public string FullName { get; set; }

        public DateOnly BirthDate { get; set; }

        public DateOnly HireDate { get; set; }

        public string CPF { get; set; }

        public int DailyWorkingHours { get; set; }

        public ReadHRAdministratorDto HRAdministrator { get; set; }

        public ReadPositionDto Position { get; set; }

        public ReadDepartamentDto Departament { get; set; }

    }
}

