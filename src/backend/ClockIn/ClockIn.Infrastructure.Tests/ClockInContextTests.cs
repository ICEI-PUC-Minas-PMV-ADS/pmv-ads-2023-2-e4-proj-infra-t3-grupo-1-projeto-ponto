using System;
using ClockIn.Infra.Data.Context;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver.Core.Configuration;

namespace ClockIn.Infrastructure.Tests
{
    public class ClockInContextTests
    {
        protected ApplicationDbContext context;

        [Fact]
        public void TestDBConnection()
        {
            //Arrange
            var connectionString = "server=clockin-db.cypx3jljksqs.sa-east-1.rds.amazonaws.com;database=clockin-db;user=admin;password=clockin123;port=3306";
            var option = new DbContextOptionsBuilder<ApplicationDbContext>();
            option.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            context = new ApplicationDbContext(option.Options);
            bool connected;

            //Act
            try
            {
                connected = context.Database.CanConnect();
            }
            catch(Exception ex)
            {
                throw new Exception("Não foi possivel conectar ao banco de dados");
            }

            //Asset
            Assert.True(connected);
        }
    }
}


