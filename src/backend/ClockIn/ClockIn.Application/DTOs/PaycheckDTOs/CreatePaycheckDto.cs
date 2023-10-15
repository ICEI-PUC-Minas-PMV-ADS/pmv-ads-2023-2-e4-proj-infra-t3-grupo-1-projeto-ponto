using ClockIn.Application.DTOs.Validations;

namespace ClockIn.Application.DTOs.PaycheckDTOs
{
    [DateValidation]
    public class CreatePaycheckDto : IStartDateEndDateComparable
    {
        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }
    }
}
