using System;
namespace ClockIn.Infra.Data.Context
{
	public class MongoDbSettings
	{
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string DepartamentsCollectionName { get; set; } = null!;

        public string JustificationsCollectionName { get; set; } = null!;

        public string PaychecksCollectionName { get; set; } = null!;

        public string PositionsCollectionName { get; set; } = null!;

        public string TimeLogsCollectionName { get; set; } = null!;

    }
}

