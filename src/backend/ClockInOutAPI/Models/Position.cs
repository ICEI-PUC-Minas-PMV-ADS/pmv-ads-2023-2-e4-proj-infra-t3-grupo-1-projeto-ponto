﻿using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Models
{
	public class Position
	{
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double HrValue { get; set; }
        [Required]
        public int HRAdministratorId { get; set; }
        public virtual HRAdministrator HRAdministrator { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }


    }
}

