using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_ClinicStock.Migrations
{
    /// <inheritdoc />
    public partial class refactDateProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastUpdateDate",
                table: "medicines",
                newName: "last_update_date");

            migrationBuilder.RenameColumn(
                name: "CreateDate",
                table: "medicines",
                newName: "create_date");

            migrationBuilder.RenameColumn(
                name: "LastUpdateDate",
                table: "materials",
                newName: "last_update_date");

            migrationBuilder.RenameColumn(
                name: "CreateDate",
                table: "materials",
                newName: "create_date");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "last_update_date",
                table: "medicines",
                newName: "LastUpdateDate");

            migrationBuilder.RenameColumn(
                name: "create_date",
                table: "medicines",
                newName: "CreateDate");

            migrationBuilder.RenameColumn(
                name: "last_update_date",
                table: "materials",
                newName: "LastUpdateDate");

            migrationBuilder.RenameColumn(
                name: "create_date",
                table: "materials",
                newName: "CreateDate");
        }
    }
}
