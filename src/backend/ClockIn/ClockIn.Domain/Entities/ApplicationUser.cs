using System;
using Microsoft.AspNetCore.Identity;

namespace ClockIn.Domain.Entities
{
	public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }

        public string Role { get; set; }

        public string? EmployeeId { get; set; }

        public string? HRAdministratorId { get; set; }

        public virtual Employee? Employee { get; set; }

        public virtual HRAdministrator? HRAdministrator { get; set; }

        public ApplicationUser() : base() { }
    }
}

