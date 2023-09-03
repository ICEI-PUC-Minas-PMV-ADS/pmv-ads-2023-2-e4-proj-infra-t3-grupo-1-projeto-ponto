using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.Dtos
{
	public class UpdatePositionDto
	{
        public string Name { get; set; }

        public double HrValue { get; set; }

        public string HRAdministratorId { get; set; }
    }
}

