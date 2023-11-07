using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClockIn.Application.DTOs.Validations;

namespace ClockIn.Application.DTOs.PaycheckDTOs
{
    [DateValidation]
    public class UpdatePaycheckDto : IStartDateEndDateComparable
    {
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string StandardHours { get; set; }
        public string OvertimeHours { get; set; }
        public int DaysWorked { get; set; }

    }
}
