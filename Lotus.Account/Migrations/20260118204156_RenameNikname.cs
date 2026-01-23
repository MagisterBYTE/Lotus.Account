using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lotus.Account.Migrations
{
    /// <inheritdoc />
    public partial class RenameNikname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nikname",
                schema: "adm",
                table: "User",
                newName: "Nickname");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nickname",
                schema: "adm",
                table: "User",
                newName: "Nikname");
        }
    }
}
