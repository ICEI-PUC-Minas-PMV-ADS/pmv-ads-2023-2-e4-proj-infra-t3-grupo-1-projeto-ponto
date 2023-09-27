using System;
using ClockIn.Domain.Enums;
using ClockIn.Domain.Validation;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClockIn.Domain.Entities
{
	public class TimeLog
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.DateTime)]
        public DateTime Timestamp { get; set; }

        public bool IsEdited { get; set; }

        [LogTypeValidation]
        [BsonRepresentation(BsonType.String)]
        public LogType LogTypeValue { get; set; }

        public string? JustificationId { get; set; }

        public string EmployeeId { get; set; }
    }
}

