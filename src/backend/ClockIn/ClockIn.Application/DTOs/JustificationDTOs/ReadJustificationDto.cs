using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.JustificationDTOs
{
    public class ReadJustificationDto
	{
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int HRAdministratorId { get; set; }
    }
}

