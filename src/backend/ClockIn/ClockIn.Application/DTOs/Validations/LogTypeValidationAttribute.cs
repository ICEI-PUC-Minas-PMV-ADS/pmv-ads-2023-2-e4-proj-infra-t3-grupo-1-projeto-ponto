using System;
using ClockIn.Application.DTOs;
using System.ComponentModel.DataAnnotations;
using ClockIn.Domain.Enums;

namespace ClockIn.Application.DTOs.Validations
{
	public class LogTypeValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is LogType logType && Enum.IsDefined(typeof(LogType), logType))
            {
                return ValidationResult.Success;
            }

            return new ValidationResult("O valor do logType é inválido.");
        }
    }
}

