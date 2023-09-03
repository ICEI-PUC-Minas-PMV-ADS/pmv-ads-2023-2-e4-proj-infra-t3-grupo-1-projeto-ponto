using System;
using System.ComponentModel.DataAnnotations;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Data.Dtos
{
	public class ReadPositionDto
	{
        public string Id { get; set; }

        public string Name { get; set; }

        public double HrValue { get; set; }

        public ReadHRAdministratorDto HRAdministrator { get; set; }
    }
}

