using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClockInOutAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddTypeLog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "JustificationId",
                table: "TimeLogs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "LogType",
                table: "TimeLogs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LogType",
                table: "TimeLogs");

            migrationBuilder.AlterColumn<int>(
                name: "JustificationId",
                table: "TimeLogs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
