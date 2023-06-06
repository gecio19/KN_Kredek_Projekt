using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tello.Migrations
{
    /// <inheritdoc />
    public partial class AddNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Tables",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Details",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Details");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Cards");
        }
    }
}
