using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ClockInOutAPI.Models
{
	public class Employee : ApplicationUser
    {
        [Required]
        public DateOnly BirthDate { get; set; }
        [Required]
        public DateOnly HireDate { get; set; }
        [Required]
        public string CPF { get; set; }
        [Required]
        public int DailyWorkingHours { get; set; }

        [Required]
        public int HRAdministratorId { get; set; }
        public virtual HRAdministrator HRAdministrator { get; set; }

        public int PositionId { get; set; }
        public virtual  Position Position { get; set; }

        public int DepartamentId { get; set; }
        public virtual Departament Departament { get; set; }

        public virtual ICollection<TimeLog> TimeLog { get; set; }

    }
}

