using System;
namespace ClockIn.Domain.Entities
{
	public class Employee
	{
        public string Id { get; set; }

        public DateOnly BirthDate { get; set; }

        public DateOnly HireDate { get; set; }

        public string CPF { get; set; }

        public int DailyWorkingHours { get; set; }

        public string PositionId { get; set; }

        public string DepartamentId { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        public string HRAdministratorId { get; set; }

        public virtual HRAdministrator HRAdministrator { get; set; }
    }
}

