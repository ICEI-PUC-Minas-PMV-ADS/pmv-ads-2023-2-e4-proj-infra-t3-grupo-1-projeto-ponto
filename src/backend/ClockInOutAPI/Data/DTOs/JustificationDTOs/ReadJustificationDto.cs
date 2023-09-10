using System;
using System.ComponentModel.DataAnnotations;
using ClockInOutAPI.Models;
using ClockInOutAPI.Data.DTOs.HRAdministratorDTOs;

namespace ClockInOutAPI.Data.DTOs.JustificationDTOs
{
	public class ReadJustificationDto
	{
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int HRAdministratorId { get; set; }
    }
}

