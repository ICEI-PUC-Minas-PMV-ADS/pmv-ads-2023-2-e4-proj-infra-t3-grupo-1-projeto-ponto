using System;
using System.ComponentModel.DataAnnotations;

namespace ClockInOutAPI.Data.DTOs.PositionDTOs
{
	public class UpdatePositionDto
	{
        public string Name { get; set; }

        public double HrValue { get; set; }
    }
}

