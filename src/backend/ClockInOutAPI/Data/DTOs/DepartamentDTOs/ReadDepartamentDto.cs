using System;
using System.ComponentModel.DataAnnotations;
using ClockInOutAPI.Data.DTOs.HRAdministratorDTOs;

namespace ClockInOutAPI.Data.DTOs.DepartamentDTOs
{
	public class ReadDepartamentDto
	{

        public int Id { get; set; }

        public string Name { get; set; }

        public int HRAdministratorId { get; set; }
    }
}

