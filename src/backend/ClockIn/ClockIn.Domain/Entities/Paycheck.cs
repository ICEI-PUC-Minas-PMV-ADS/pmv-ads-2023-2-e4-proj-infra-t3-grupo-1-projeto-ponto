using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClockIn.Domain.Entities
{
	public class Paycheck
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        public TimeOnly OvertimeHours { get; set; }

        public TimeOnly StandardHours { get; set; }

        public TimeOnly TotalHours { get; set; }

        public int DaysWorked { get; set; }

        public double BaseSalary { get; set; }

        public double OvertimeHourlyRate { get; set; }

        public double TotalSalary { get; set; }

        public double INSSValue { get; set; }

        public double IRRFValue { get; set; }

        public double FGTSValue { get; set; }

        public string EmployeeId { get; set; }
    }
}

