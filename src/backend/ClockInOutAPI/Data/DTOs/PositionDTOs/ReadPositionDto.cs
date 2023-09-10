using System;
using System.ComponentModel.DataAnnotations;
using ClockInOutAPI.Data.DTOs.HRAdministratorDTOs;
using ClockInOutAPI.Models;

namespace ClockInOutAPI.Data.DTOs.PositionDTOs
{
	public class ReadPositionDto
	{
        public int Id { get; set; }

        public string Name { get; set; }

        public double HrValue { get; set; }

        public int HRAdministratorId { get; set; }
    }
}

