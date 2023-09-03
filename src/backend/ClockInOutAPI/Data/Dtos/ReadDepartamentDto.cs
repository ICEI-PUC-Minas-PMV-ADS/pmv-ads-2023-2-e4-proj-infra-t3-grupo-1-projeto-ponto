using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.Dtos
{
	public class ReadDepartamentDto
	{

        public int Id { get; set; }

        public string Name { get; set; }

        public ReadHRAdministratorDto HRAdministrator { get; set; }
    }
}

