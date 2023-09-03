using System;
using ClockInOutAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.Dtos
{
	public class ReadEmployeeDto
	{
        public string  Id { get; set; }

        public string FullName { get; set; }

        public DateOnly BirthDate { get; set; }

        public DateOnly HireDate { get; set; }

        public string CPF { get; set; }

        public int DailyWorkingHours { get; set; }

        public string HRAdministratorId { get; set; }

        public int PositionId { get; set; }

        public int DepartamentId { get; set; }

    }
}

