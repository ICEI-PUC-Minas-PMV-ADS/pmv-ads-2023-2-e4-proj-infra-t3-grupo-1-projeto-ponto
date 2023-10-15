using ClockIn.Application.DTOs.PaycheckDTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClockIn.Application.DTOs.Validations
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    public class DateValidation : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var model = (IStartDateEndDateComparable)validationContext.ObjectInstance;

            if (model.StartDate > model.EndDate)
            {
                return new ValidationResult("A data de final não pode ser menor que a data de inicio!");
            }

            return ValidationResult.Success;
        }
    }
}

public interface IStartDateEndDateComparable
{
    DateOnly StartDate { get; set; }
    DateOnly EndDate { get; set; }
}
