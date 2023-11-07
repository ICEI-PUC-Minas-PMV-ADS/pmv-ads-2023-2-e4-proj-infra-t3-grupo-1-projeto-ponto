using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.PositionDTOs
{
    public class ReadPositionDto
	{
        public string Id { get; set; }

        public string Name { get; set; }

        public double HrValue { get; set; }

        public string HRAdministratorId { get; set; }
    }
}

