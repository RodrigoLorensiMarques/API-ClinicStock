using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_ClinicStock.Migrations
{
    /// <inheritdoc />
    public partial class refactPropertiesV4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Medicine",
                table: "Medicine");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Material",
                table: "Material");

            migrationBuilder.RenameTable(
                name: "Medicine",
                newName: "medicine");

            migrationBuilder.RenameTable(
                name: "Material",
                newName: "material");

            migrationBuilder.RenameColumn(
                name: "Packaging",
                table: "medicine",
                newName: "packaging");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "medicine",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "medicine",
                newName: "amount");

            migrationBuilder.RenameColumn(
                name: "Milligram",
                table: "medicine",
                newName: "miligram");

            migrationBuilder.RenameColumn(
                name: "Packaging",
                table: "material",
                newName: "packaging");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "material",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "material",
                newName: "amount");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "material",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "packaging",
                table: "medicine",
                type: "VARCHAR(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "medicine",
                type: "VARCHAR(40)",
                maxLength: 40,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "packaging",
                table: "material",
                type: "VARCHAR(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "material",
                type: "VARCHAR(40)",
                maxLength: 40,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR");

            migrationBuilder.AddPrimaryKey(
                name: "PK_medicine",
                table: "medicine",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_material",
                table: "material",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_medicine",
                table: "medicine");

            migrationBuilder.DropPrimaryKey(
                name: "PK_material",
                table: "material");

            migrationBuilder.RenameTable(
                name: "medicine",
                newName: "Medicine");

            migrationBuilder.RenameTable(
                name: "material",
                newName: "Material");

            migrationBuilder.RenameColumn(
                name: "packaging",
                table: "Medicine",
                newName: "Packaging");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Medicine",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "amount",
                table: "Medicine",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "miligram",
                table: "Medicine",
                newName: "Milligram");

            migrationBuilder.RenameColumn(
                name: "packaging",
                table: "Material",
                newName: "Packaging");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Material",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "amount",
                table: "Material",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Material",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Packaging",
                table: "Medicine",
                type: "VARCHAR",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Medicine",
                type: "VARCHAR",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(40)",
                oldMaxLength: 40);

            migrationBuilder.AlterColumn<string>(
                name: "Packaging",
                table: "Material",
                type: "VARCHAR",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(20)",
                oldMaxLength: 20);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Material",
                type: "VARCHAR",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "VARCHAR(40)",
                oldMaxLength: 40);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Medicine",
                table: "Medicine",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Material",
                table: "Material",
                column: "Id");
        }
    }
}
