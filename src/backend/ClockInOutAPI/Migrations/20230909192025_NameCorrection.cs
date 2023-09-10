using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClockInOutAPI.Migrations
{
    /// <inheritdoc />
    public partial class NameCorrection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LogType",
                table: "TimeLogs",
                newName: "LogTypeValue");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LogTypeValue",
                table: "TimeLogs",
                newName: "LogType");
        }
    }
}
