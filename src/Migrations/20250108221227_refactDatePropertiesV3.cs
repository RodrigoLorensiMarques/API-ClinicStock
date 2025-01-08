using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_ClinicStock.Migrations
{
    /// <inheritdoc />
    public partial class refactDatePropertiesV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "last_update_date",
                table: "medicines",
                type: "SMALLDATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "create_date",
                table: "medicines",
                type: "SMALLDATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "last_update_date",
                table: "materials",
                type: "SMALLDATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "create_date",
                table: "materials",
                type: "SMALLDATETIME",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "last_update_date",
                table: "medicines",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "SMALLDATETIME");

            migrationBuilder.AlterColumn<DateTime>(
                name: "create_date",
                table: "medicines",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "SMALLDATETIME");

            migrationBuilder.AlterColumn<DateTime>(
                name: "last_update_date",
                table: "materials",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "SMALLDATETIME");

            migrationBuilder.AlterColumn<DateTime>(
                name: "create_date",
                table: "materials",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "SMALLDATETIME");
        }
    }
}
