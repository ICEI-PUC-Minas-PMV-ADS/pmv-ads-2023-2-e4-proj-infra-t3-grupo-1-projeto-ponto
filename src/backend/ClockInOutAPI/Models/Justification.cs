using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Models
{
	public class Justification
	{
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
		public string Description { get; set; }

		public int HRAdministratorId { get; set; }
		public virtual HRAdministrator HRAdministrator { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<TimeLog> TimeLogs { get; set; }

        public Justification()
		{
		}
	}
}

