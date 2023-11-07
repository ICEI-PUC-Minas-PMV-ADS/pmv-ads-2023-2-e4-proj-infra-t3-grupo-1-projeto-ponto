using System;
namespace ClockIn.Domain.Entities
{
	public class HRAdministrator
	{
        public string Id { get; set; }

        public string CNPJ { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}

