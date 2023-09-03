﻿using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Models
{
	public class Department
	{
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string HRAdministratorId { get; set; }
        public virtual HRAdministrator HRAdministrator { get; set; }
    }
}

