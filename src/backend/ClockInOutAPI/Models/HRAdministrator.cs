using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ClockInOutAPI.Models
{
	public class HRAdministrator : ApplicationUser
    {
        [Required]
        public string CNPJ { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<Position> Positions { get; set; }
        public virtual ICollection<Departament> Departaments { get; set; }
        public virtual ICollection<Justification> Justifications { get; set; }

    }
}

