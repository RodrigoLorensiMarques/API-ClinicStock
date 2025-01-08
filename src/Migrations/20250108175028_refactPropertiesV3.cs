using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_ClinicStock.Migrations
{
    /// <inheritdoc />
    public partial class refactPropertiesV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Packaging",
                table: "Medicine",
                type: "VARCHAR",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Packaging",
                table: "Material",
                type: "VARCHAR",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "Amount",
                table: "Material",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "DECIMAL(18,0)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Packaging",
                table: "Medicine",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "Packaging",
                table: "Material",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR");

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "Material",
                type: "DECIMAL(18,0)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }
    }
}
