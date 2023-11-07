using System;

namespace ClockIn.Application.DTOs.EmployeeDTOs
{
    public class ReadEmployeeDto
	{
        public string  Id { get; set; }

        public string Email { get; set; }

        public string FullName { get; set; }

        public DateOnly BirthDate { get; set; }

        public DateOnly HireDate { get; set; }

        public string CPF { get; set; }

        public int DailyWorkingHours { get; set; }

        public string HRAdministratorId { get; set; }

        public string Position { get; set; }

        public string Departament { get; set; }
        
        public string PositionId { get; set; }

        public string DepartamentId { get; set; }
    }
}

