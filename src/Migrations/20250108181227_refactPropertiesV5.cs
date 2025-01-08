using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_ClinicStock.Migrations
{
    /// <inheritdoc />
    public partial class refactPropertiesV5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_medicine",
                table: "medicine");

            migrationBuilder.DropPrimaryKey(
                name: "PK_material",
                table: "material");

            migrationBuilder.RenameTable(
                name: "medicine",
                newName: "medicines");

            migrationBuilder.RenameTable(
                name: "material",
                newName: "materials");

            migrationBuilder.AddPrimaryKey(
                name: "PK_medicines",
                table: "medicines",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_materials",
                table: "materials",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_medicines",
                table: "medicines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_materials",
                table: "materials");

            migrationBuilder.RenameTable(
                name: "medicines",
                newName: "medicine");

            migrationBuilder.RenameTable(
                name: "materials",
                newName: "material");

            migrationBuilder.AddPrimaryKey(
                name: "PK_medicine",
                table: "medicine",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_material",
                table: "material",
                column: "id");
        }
    }
}
