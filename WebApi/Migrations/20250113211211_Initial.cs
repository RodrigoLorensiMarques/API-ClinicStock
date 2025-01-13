using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_ClinicStock.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "materials",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "VARCHAR(40)", maxLength: 40, nullable: false),
                    packaging = table.Column<string>(type: "VARCHAR(20)", maxLength: 20, nullable: false),
                    amount = table.Column<int>(type: "INTEGER", nullable: false),
                    create_date = table.Column<DateTime>(type: "SMALLDATETIME", nullable: false),
                    last_update_date = table.Column<DateTime>(type: "SMALLDATETIME", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_materials", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "medicines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "VARCHAR(40)", maxLength: 40, nullable: false),
                    miligram = table.Column<decimal>(type: "DECIMAL(18,0)", nullable: false),
                    packaging = table.Column<string>(type: "VARCHAR(20)", maxLength: 20, nullable: false),
                    amount = table.Column<int>(type: "INTEGER", nullable: false),
                    create_date = table.Column<DateTime>(type: "SMALLDATETIME", nullable: false),
                    last_update_date = table.Column<DateTime>(type: "SMALLDATETIME", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_medicines", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "materials");

            migrationBuilder.DropTable(
                name: "medicines");
        }
    }
}
