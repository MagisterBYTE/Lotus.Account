using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lotus.Account.Migrations
{
    /// <inheritdoc />
    public partial class AddNikname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Nikname",
                schema: "adm",
                table: "User",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("085e924f-5e12-b19e-18ef-2a949292f68f"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("0af26bd1-a3bc-d5de-4ef0-789012345678"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("196f7248-1a23-4c45-b567-890123456789"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("1b037ce2-b4cd-e6ef-5f01-890123456789"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("287a8359-2b34-5d56-c678-901234567890"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("2c148df3-c5de-f7f0-6012-901234567890"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("398b946a-3c45-6e67-d789-012345678901"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("3d259ef4-d6ef-08f1-7123-012345678901"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("4a9c057b-4d56-7f78-e89a-123456789012"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("4e36af05-e7f0-19f2-8234-123456789012"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("5bad168c-5e67-8089-f9ab-234567890123"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("5f47b006-f8f1-2af3-9345-234567890123"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("6cbe279d-6f78-919a-0abc-345678901234"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("7dcf38ae-7089-a2ab-1bcd-456789012345"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("8ed049bf-819a-b3bc-2cde-567890123456"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("9fe15ac0-92ab-c4cd-3def-678901234567"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("a2183c9f-98ac-5b38-b28f-c43e3e3c9029"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("b3194d0a-09bd-6c49-c39a-d54f4f4da13a"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("c41a5e1b-1ace-7d5a-d4ab-e6505f5eb24b"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("d52b6f2c-2bdf-8e6b-e5bc-f7616f6fc35c"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("e63c702d-3cf0-9f7c-f6cd-08727070d46d"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("f74d813e-4d01-a08d-07de-19838181e57e"),
                columns: new[] { "Created", "Modified", "Nikname" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), "" });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 101,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 102,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 103,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 104,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 201,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 202,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 203,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 204,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 301,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 302,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 303,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 304,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 401,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 402,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 403,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 404,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 405,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 501,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 502,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 503,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 504,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 505,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 601,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 602,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 603,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 604,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 605,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPosition",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPosition",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPosition",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPosition",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 100,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Utc) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nikname",
                schema: "adm",
                table: "User");

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("085e924f-5e12-b19e-18ef-2a949292f68f"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("0af26bd1-a3bc-d5de-4ef0-789012345678"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("196f7248-1a23-4c45-b567-890123456789"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("1b037ce2-b4cd-e6ef-5f01-890123456789"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("287a8359-2b34-5d56-c678-901234567890"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("2c148df3-c5de-f7f0-6012-901234567890"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("398b946a-3c45-6e67-d789-012345678901"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("3d259ef4-d6ef-08f1-7123-012345678901"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("4a9c057b-4d56-7f78-e89a-123456789012"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("4e36af05-e7f0-19f2-8234-123456789012"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("5bad168c-5e67-8089-f9ab-234567890123"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("5f47b006-f8f1-2af3-9345-234567890123"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("6cbe279d-6f78-919a-0abc-345678901234"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("7dcf38ae-7089-a2ab-1bcd-456789012345"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("8ed049bf-819a-b3bc-2cde-567890123456"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("9fe15ac0-92ab-c4cd-3def-678901234567"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("a2183c9f-98ac-5b38-b28f-c43e3e3c9029"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("b3194d0a-09bd-6c49-c39a-d54f4f4da13a"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("c41a5e1b-1ace-7d5a-d4ab-e6505f5eb24b"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("d52b6f2c-2bdf-8e6b-e5bc-f7616f6fc35c"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("e63c702d-3cf0-9f7c-f6cd-08727070d46d"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "User",
                keyColumn: "Id",
                keyValue: new Guid("f74d813e-4d01-a08d-07de-19838181e57e"),
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserGroup",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 101,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 102,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 103,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 104,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 201,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 202,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 203,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 204,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 301,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 302,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 303,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 304,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 401,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 402,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 403,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 404,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 405,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 501,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 502,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 503,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 504,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 505,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 601,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 602,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 603,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 604,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPermission",
                keyColumn: "Id",
                keyValue: 605,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPosition",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPosition",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPosition",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserPosition",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });

            migrationBuilder.UpdateData(
                schema: "adm",
                table: "UserRole",
                keyColumn: "Id",
                keyValue: 100,
                columns: new[] { "Created", "Modified" },
                values: new object[] { new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc) });
        }
    }
}
