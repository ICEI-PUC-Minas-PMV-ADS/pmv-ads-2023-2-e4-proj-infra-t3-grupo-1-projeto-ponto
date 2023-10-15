using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ClockIn.Domain.Entities
{
	public class Position
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public double HrValue { get; set; }

        public string HRAdministratorId { get; set; }
    }
}

