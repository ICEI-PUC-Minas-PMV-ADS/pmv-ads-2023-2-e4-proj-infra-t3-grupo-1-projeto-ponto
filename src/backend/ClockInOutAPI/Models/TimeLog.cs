using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ClockInOutAPI.Models
{
	public class TimeLog
	{
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
        [Required]
        public bool IsEdited { get; set; }
        [Required]
        [LogTypeValidation]
        public LogType LogTypeValue { get; set; }

        public int? JustificationId { get; set; }
		public virtual Justification Justification { get; set; }

        [Required]
        public int EmployeeId { get; set; }
		public virtual Employee Employee { get; set; }

        public TimeLog()
        {
        }

    }
}

