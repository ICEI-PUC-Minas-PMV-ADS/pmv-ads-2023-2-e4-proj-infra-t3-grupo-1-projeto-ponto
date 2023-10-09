using System;
using System.ComponentModel.DataAnnotations;

namespace ClockIn.Application.DTOs.JustificationDTOs
{
    public class ReadJustificationDto
	{
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string HRAdministratorId { get; set; }
    }
}

