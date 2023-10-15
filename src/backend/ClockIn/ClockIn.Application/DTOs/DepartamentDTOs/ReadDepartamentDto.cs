using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.DepartamentDTOs
{
    public class ReadDepartamentDto
	{

        public string Id { get; set; }

        public string Name { get; set; }

        public string HRAdministratorId { get; set; }
    }
}

