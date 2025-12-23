using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Lotus.Account.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "security");

            migrationBuilder.EnsureSchema(
                name: "adm");

            migrationBuilder.CreateTable(
                name: "OpenIddictApplications",
                schema: "security",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ApplicationType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ClientId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    ClientSecret = table.Column<string>(type: "text", nullable: true),
                    ClientType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ConsentType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    DisplayNames = table.Column<string>(type: "text", nullable: true),
                    JsonWebKeySet = table.Column<string>(type: "text", nullable: true),
                    Permissions = table.Column<string>(type: "text", nullable: true),
                    PostLogoutRedirectUris = table.Column<string>(type: "text", nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    RedirectUris = table.Column<string>(type: "text", nullable: true),
                    Requirements = table.Column<string>(type: "text", nullable: true),
                    Settings = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictApplications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictScopes",
                schema: "security",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Descriptions = table.Column<string>(type: "text", nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    DisplayNames = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    Resources = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictScopes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserFieldActivity",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFieldActivity", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserGroup",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserNotification",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Topic = table.Column<string>(type: "text", nullable: true),
                    Sender = table.Column<string>(type: "text", nullable: true),
                    Importance = table.Column<int>(type: "integer", nullable: true),
                    Content = table.Column<string>(type: "text", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    IsArchive = table.Column<bool>(type: "boolean", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserNotification", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPermission",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPermission", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPosition",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPosition", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    DisplayName = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictAuthorizations",
                schema: "security",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ApplicationId = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    Scopes = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Subject = table.Column<string>(type: "character varying(400)", maxLength: 400, nullable: true),
                    Type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictAuthorizations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenIddictAuthorizations_OpenIddictApplications_Application~",
                        column: x => x.ApplicationId,
                        principalSchema: "security",
                        principalTable: "OpenIddictApplications",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Login = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    HashId = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    IsLockout = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutBeginDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LockoutEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Settings = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Surname = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Patronymic = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Birthday = table.Column<DateOnly>(type: "date", nullable: true),
                    Whereabouts = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    Interests = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    PostId = table.Column<int>(type: "integer", nullable: true),
                    AvatarId = table.Column<string>(type: "text", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_UserPosition_PostId",
                        column: x => x.PostId,
                        principalSchema: "adm",
                        principalTable: "UserPosition",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_User_UserRole_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "adm",
                        principalTable: "UserRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRolePermissionRelation",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<int>(type: "integer", nullable: false),
                    PermissionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRolePermissionRelation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRolePermissionRelation_UserPermission_PermissionId",
                        column: x => x.PermissionId,
                        principalSchema: "adm",
                        principalTable: "UserPermission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserRolePermissionRelation_UserRole_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "adm",
                        principalTable: "UserRole",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OpenIddictTokens",
                schema: "security",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ApplicationId = table.Column<string>(type: "text", nullable: true),
                    AuthorizationId = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyToken = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Payload = table.Column<string>(type: "text", nullable: true),
                    Properties = table.Column<string>(type: "text", nullable: true),
                    RedemptionDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ReferenceId = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Subject = table.Column<string>(type: "character varying(400)", maxLength: 400, nullable: true),
                    Type = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpenIddictTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpenIddictTokens_OpenIddictApplications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalSchema: "security",
                        principalTable: "OpenIddictApplications",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OpenIddictTokens_OpenIddictAuthorizations_AuthorizationId",
                        column: x => x.AuthorizationId,
                        principalSchema: "security",
                        principalTable: "OpenIddictAuthorizations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserFieldActivityRelation",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FieldActivityId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFieldActivityRelation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserFieldActivityRelation_UserFieldActivity_FieldActivityId",
                        column: x => x.FieldActivityId,
                        principalSchema: "adm",
                        principalTable: "UserFieldActivity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserFieldActivityRelation_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserGroupRelation",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroupRelation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGroupRelation_UserGroup_GroupId",
                        column: x => x.GroupId,
                        principalSchema: "adm",
                        principalTable: "UserGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserGroupRelation_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserMessage",
                schema: "adm",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: false),
                    Time = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uuid", nullable: true),
                    ReceiverId = table.Column<Guid>(type: "uuid", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMessage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserMessage_User_AuthorId",
                        column: x => x.AuthorId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserMessage_User_ReceiverId",
                        column: x => x.ReceiverId,
                        principalSchema: "adm",
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserGroup",
                columns: new[] { "Id", "Created", "DisplayName", "Modified", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Хранители", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Хранители" },
                    { 2, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Север", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Север" },
                    { 3, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Юг", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Юг" },
                    { 4, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Восток", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Восток" },
                    { 5, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Запад", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Запад" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserPermission",
                columns: new[] { "Id", "Created", "DisplayName", "Modified", "Name" },
                values: new object[,]
                {
                    { 101, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Просмотр пользователей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "UserView" },
                    { 102, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Добавление пользователей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "UserAdd" },
                    { 103, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Редактирование пользователей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "UserEdit" },
                    { 104, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Удаление пользователей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "UserRemove" },
                    { 201, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Просмотр ролей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "RoleView" },
                    { 202, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Добавление ролей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "RoleAdd" },
                    { 203, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Редактирование ролей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "RoleEdit" },
                    { 204, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Удаление ролей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "RoleRemove" },
                    { 301, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Просмотр разрешений", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "PermissionView" },
                    { 302, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Добавление разрешений", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "PermissionAdd" },
                    { 303, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Редактирование разрешений", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "PermissionEdit" },
                    { 304, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Удаление разрешений", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "PermissionRemove" },
                    { 401, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Просмотр должностей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "PositionView" },
                    { 402, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Добавление должностей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "PositionAdd" },
                    { 403, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Редактирование должностей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "PositionEdit" },
                    { 404, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Удаление должностей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "PositionRemove" },
                    { 405, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Выбор должностей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "PositionChoose" },
                    { 501, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Просмотр групп", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "GroupView" },
                    { 502, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Добавление групп", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "GroupAdd" },
                    { 503, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Редактирование групп", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "GroupEdit" },
                    { 504, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Удаление групп", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "GroupRemove" },
                    { 505, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Выбор групп", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "GroupChoose" },
                    { 601, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Просмотр направлений деятельности", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "FieldActivityView" },
                    { 602, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Добавление направлений деятельности", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "FieldActivityAdd" },
                    { 603, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Редактирование направлений деятельности", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "FieldActivityEdit" },
                    { 604, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Удаление направлений деятельности", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "FieldActivityRemove" },
                    { 605, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Выбор направлений деятельности", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "FieldActivityChoose" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserPosition",
                columns: new[] { "Id", "Created", "DisplayName", "Modified", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Инспектор", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Инспектор" },
                    { 2, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Старший инспектор", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Старший инспектор" },
                    { 3, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Ведущий специалист", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Ведущий специалист" },
                    { 4, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Начальник отдела", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Начальник отдела" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserRole",
                columns: new[] { "Id", "Created", "DisplayName", "Modified", "Name" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Администратор", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "admin" },
                    { 2, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Редактор", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "editor" },
                    { 3, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Редактор должностей", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "editorPost" },
                    { 4, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Редактор групп", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "editorGroup" },
                    { 100, new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Пользователь", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "user" }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "User",
                columns: new[] { "Id", "AvatarId", "Birthday", "Created", "Email", "EmailConfirmed", "HashId", "Interests", "IsLockout", "LockoutBeginDate", "LockoutEndDate", "Login", "Modified", "Name", "PasswordHash", "Patronymic", "PostId", "RoleId", "Settings", "Surname", "Whereabouts" },
                values: new object[,]
                {
                    { new Guid("085e924f-5e12-b19e-18ef-2a949292f68f"), null, new DateOnly(1983, 12, 25), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "group.manager@example.com", false, "6aae61b6e03db134b1247b7671d7673350836a32", null, false, null, null, "DepartmentManager", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Дмитрий", "5a85bbe33e342ac9b1a2ad2abb6125c3a100b197", "Николаевич", 4, 4, null, "Попов", null },
                    { new Guid("0af26bd1-a3bc-d5de-4ef0-789012345678"), null, new DateOnly(1997, 12, 15), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "julia.zhukova@example.com", false, "702a94f8f611881336b4029594dab9183ed6f7e5", null, false, null, null, "UserJuliaZhukova", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Юлия", "f898451c1aa7f8588c50cefd2bacb210b3e03d38", "Алексеевна", null, 100, null, "Жукова", null },
                    { new Guid("196f7248-1a23-4c45-b567-890123456789"), null, new DateOnly(1993, 2, 14), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "ivan.sidorov@example.com", false, "f782668d2499e6a4352906a23934082f2931ddcb", null, false, null, null, "UserIvanSidorov", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Иван", "0fc688ae3631ec2dde193be859af930dcfe99e32", "Михайлович", null, 100, null, "Сидоров", null },
                    { new Guid("1b037ce2-b4cd-e6ef-5f01-890123456789"), null, new DateOnly(1994, 5, 22), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "roman.kirillov@example.com", false, "e00751932586751e36d9bc7c94e1c1c4a1f287ce", null, false, null, null, "UserRomanKirillov", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Роман", "e59cdd89c7d2db6c6a15f811d329f8c0428f7995", "Олегович", null, 100, null, "Кириллов", null },
                    { new Guid("287a8359-2b34-5d56-c678-901234567890"), null, new DateOnly(1994, 6, 8), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "ekaterina.kuzmina@example.com", false, "cf93873eaf0fc9406ae5c5eace239003e91260c4", null, false, null, null, "UserEkaterinaKuzmina", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Екатерина", "6edcb8a7c16928ad141fa67d307fe55d6bc1df03", "Александровна", null, 100, null, "Кузьмина", null },
                    { new Guid("2c148df3-c5de-f7f0-6012-901234567890"), null, new DateOnly(1993, 8, 14), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "alena.semenova@example.com", false, "15c0ecc67e8435db7c684f7ed4e18f796fab41c1", null, false, null, null, "UserAlenaSemenova", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Алена", "487cc7ba340b0239e9bdbbdd0ba3c34573c8d6cc", "Дмитриевна", null, 100, null, "Семенова", null },
                    { new Guid("398b946a-3c45-6e67-d789-012345678901"), null, new DateOnly(1996, 9, 21), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "petr.volkov@example.com", false, "e243cb7da6970df8c7e435a77178b20473e13c0e", null, false, null, null, "UserPetrVolkov", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Петр", "0c43b441690a3e8864b80f1ffa2df97785a4a3c7", "Сергеевич", null, 100, null, "Волков", null },
                    { new Guid("3d259ef4-d6ef-08f1-7123-012345678901"), null, new DateOnly(1990, 1, 27), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "artem.gusev@example.com", false, "d557060eb2e72c6ed0c9861535203af315ac81fe", null, false, null, null, "UserArtemGusev", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Артем", "5c2368889e676fed0a01f9ccef9765b79e9488ab", "Васильевич", null, 100, null, "Гусев", null },
                    { new Guid("4a9c057b-4d56-7f78-e89a-123456789012"), null, new DateOnly(1990, 11, 3), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "natalia.fedorova@example.com", false, "f005398f4c86b4f0a102733be85a700dca8cbbcd", null, false, null, null, "UserNataliaFedorova", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Наталия", "daee69ffeb9f6caf8f909ad6deaaa0c9b7d05533", "Ивановна", null, 100, null, "Федорова", null },
                    { new Guid("4e36af05-e7f0-19f2-8234-123456789012"), null, new DateOnly(1987, 11, 9), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "larisa.titova@example.com", false, "a8400621ea9941bbf323f4742892b0f899da4d82", null, false, null, null, "UserLarisaTitova", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Лариса", "0c432e7051a5390da240440859dc78f5fb6cb909", "Юрьевна", null, 100, null, "Титова", null },
                    { new Guid("5bad168c-5e67-8089-f9ab-234567890123"), null, new DateOnly(1989, 1, 17), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "andrey.morozov@example.com", false, "6c78aeb8bfc4526b1fc7a8b19b1aecfdadb22072", null, false, null, null, "UserAndreyMorozov", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Андрей", "7db05ccba601bebeba0a44cdfa822c2cf90c8b91", "Петрович", null, 100, null, "Морозов", null },
                    { new Guid("5f47b006-f8f1-2af3-9345-234567890123"), null, new DateOnly(1996, 6, 3), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "pavel.rybakov@example.com", false, "149fd9f9da683e19e4ace04a7bd18af5c182d2c1", null, false, null, null, "UserPavelRybakov", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Павел", "858455381aafb12a1a9f3b5bea077296afcc2877", "Геннадьевич", null, 100, null, "Рыбаков", null },
                    { new Guid("6cbe279d-6f78-919a-0abc-345678901234"), null, new DateOnly(1992, 4, 29), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "tatiana.orlova@example.com", false, "c7440857ba3e5d406e53720d0701dbc4a66e4afd", null, false, null, null, "UserTatianaOrlova", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Татьяна", "98325980136d016b62bc5901b58d21bef2873a32", "Владимировна", null, 100, null, "Орлова", null },
                    { new Guid("7dcf38ae-7089-a2ab-1bcd-456789012345"), null, new DateOnly(1995, 7, 12), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "mikhail.belov@example.com", false, "000aa1ddf3ebb90bee3ff03be62392ced406d862", null, false, null, null, "UserMikhailBelov", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Михаил", "64ef46a98948a6b3004344a92439268f2821439c", "Андреевич", null, 100, null, "Белов", null },
                    { new Guid("8ed049bf-819a-b3bc-2cde-567890123456"), null, new DateOnly(1991, 10, 5), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "svetlana.komarova@example.com", false, "2afe5cf28a7dbd28a804df2c97a95f78916d24fa", null, false, null, null, "UserSvetlanaKomarova", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Светлана", "75846a576cd353c9c40189d1e0e0fd196c474cc8", "Николаевна", null, 100, null, "Комарова", null },
                    { new Guid("9fe15ac0-92ab-c4cd-3def-678901234567"), null, new DateOnly(1988, 3, 8), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "vladimir.egorov@example.com", false, "d907219b136d64dbde99cd146ab3640c20609e17", null, false, null, null, "UserVladimirEgorov", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Владимир", "6befe3e5862aaf5ad4d01a92506fb2ab3fc17500", "Викторович", null, 100, null, "Егоров", null },
                    { new Guid("a2183c9f-98ac-5b38-b28f-c43e3e3c9029"), null, new DateOnly(1990, 5, 15), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "maria.ivanova@example.com", false, "c6fb5e2653f796e04a2ed6f7d768f56f321c6113", null, false, null, null, "SeniorEditor", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Мария", "32c404655d2e85a15edca3d2e3fbc5a46548b366", "Петровна", 2, 2, null, "Иванова", null },
                    { new Guid("b3194d0a-09bd-6c49-c39a-d54f4f4da13a"), null, new DateOnly(1988, 7, 22), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "alex.smirnov@example.com", false, "a30ba3133f994b8e1ca4abf2932619990af3eebf", null, false, null, null, "ContentManager", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Алексей", "45e6b7fc636bea009563b827cc5bbe3dcf736866", "Александрович", 2, 2, null, "Смирнов", null },
                    { new Guid("c41a5e1b-1ace-7d5a-d4ab-e6505f5eb24b"), null, new DateOnly(1992, 3, 10), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "olga.petrova@example.com", false, "80ce6f5080b2d8495cca23a0f08fd72b4245525a", null, false, null, null, "Moderator", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Ольга", "e7b96f3e8611f382aacf582b5e1f3093e16e5396", "Сергеевна", 3, 2, null, "Петрова", null },
                    { new Guid("d52b6f2c-2bdf-8e6b-e5bc-f7616f6fc35c"), null, new DateOnly(1995, 11, 30), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "sergey.kuznetsov@example.com", false, "b91bd41bdd32e3697f8b038011b228c1676540ed", null, false, null, null, "AssistantEditor", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Сергей", "e97e7fab6e759c9b07f244c9992f326ed8d54b21", "Игоревич", 1, 2, null, "Кузнецов", null },
                    { new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"), null, new DateOnly(1984, 9, 19), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "dementevds@gmail.com", false, "de37c95205934914eed14aaab97c1b4c53d31566", null, false, null, null, "DanielDem", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Даниил", "012f28fd2973783520fa3115f886102a09c8a15e", "Сергеевич", null, 1, null, "Дементьев", null },
                    { new Guid("e63c702d-3cf0-9f7c-f6cd-08727070d46d"), null, new DateOnly(1991, 8, 5), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "elena.vorobeva@example.com", false, "5ca09651599ee9faaca9deff228b00a34fd7e75a", null, false, null, null, "NewsEditor", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Елена", "fa0ec050421ef5ba51fe018a5353bd4a8955836f", "Андреевна", 1, 2, null, "Воробьева", null },
                    { new Guid("f74d813e-4d01-a08d-07de-19838181e57e"), null, new DateOnly(1987, 4, 18), new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "hr.specialist@example.com", false, "896d92b3f39d0935ba3c34bef404e075a4ff4e29", null, false, null, null, "HrSpecialist", new DateTime(2025, 12, 21, 0, 0, 0, 0, DateTimeKind.Utc), "Анна", "ba7a813321daaa2e5e876e868c980ba01cb17c5e", "Владимировна", 1, 3, null, "Соколова", null }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserRolePermissionRelation",
                columns: new[] { "Id", "PermissionId", "RoleId" },
                values: new object[,]
                {
                    { 1, 101, 1 },
                    { 2, 102, 1 },
                    { 3, 103, 1 },
                    { 4, 104, 1 },
                    { 5, 201, 1 },
                    { 6, 202, 1 },
                    { 7, 203, 1 },
                    { 8, 204, 1 },
                    { 9, 301, 1 },
                    { 10, 302, 1 },
                    { 11, 303, 1 },
                    { 12, 304, 1 },
                    { 13, 401, 1 },
                    { 14, 402, 1 },
                    { 15, 403, 1 },
                    { 16, 404, 1 },
                    { 17, 405, 1 },
                    { 18, 501, 1 },
                    { 19, 502, 1 },
                    { 20, 503, 1 },
                    { 21, 504, 1 },
                    { 22, 505, 1 },
                    { 23, 601, 1 },
                    { 24, 602, 1 },
                    { 25, 603, 1 },
                    { 26, 604, 1 },
                    { 27, 605, 1 },
                    { 28, 201, 2 },
                    { 29, 301, 2 },
                    { 30, 401, 2 },
                    { 31, 405, 2 },
                    { 32, 501, 2 },
                    { 33, 505, 2 },
                    { 34, 601, 2 },
                    { 35, 605, 2 },
                    { 36, 401, 3 },
                    { 37, 402, 3 },
                    { 38, 403, 3 },
                    { 39, 404, 3 },
                    { 40, 405, 3 },
                    { 41, 201, 3 },
                    { 42, 301, 3 },
                    { 43, 501, 3 },
                    { 44, 505, 3 },
                    { 45, 601, 3 },
                    { 46, 605, 3 },
                    { 47, 501, 4 },
                    { 48, 502, 4 },
                    { 49, 503, 4 },
                    { 50, 504, 4 },
                    { 51, 505, 4 },
                    { 52, 201, 4 },
                    { 53, 301, 4 },
                    { 54, 401, 4 },
                    { 55, 405, 4 },
                    { 56, 601, 4 },
                    { 57, 605, 4 },
                    { 58, 101, 100 },
                    { 59, 201, 100 },
                    { 60, 301, 100 },
                    { 61, 401, 100 },
                    { 62, 501, 100 },
                    { 63, 601, 100 },
                    { 64, 405, 100 },
                    { 65, 505, 100 },
                    { 66, 605, 100 }
                });

            migrationBuilder.InsertData(
                schema: "adm",
                table: "UserGroupRelation",
                columns: new[] { "Id", "GroupId", "UserId" },
                values: new object[,]
                {
                    { 1, 1, new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018") },
                    { 2, 1, new Guid("a2183c9f-98ac-5b38-b28f-c43e3e3c9029") },
                    { 3, 1, new Guid("b3194d0a-09bd-6c49-c39a-d54f4f4da13a") },
                    { 4, 1, new Guid("085e924f-5e12-b19e-18ef-2a949292f68f") },
                    { 5, 2, new Guid("c41a5e1b-1ace-7d5a-d4ab-e6505f5eb24b") },
                    { 6, 2, new Guid("d52b6f2c-2bdf-8e6b-e5bc-f7616f6fc35c") },
                    { 7, 2, new Guid("e63c702d-3cf0-9f7c-f6cd-08727070d46d") },
                    { 8, 2, new Guid("f74d813e-4d01-a08d-07de-19838181e57e") },
                    { 9, 4, new Guid("196f7248-1a23-4c45-b567-890123456789") },
                    { 10, 4, new Guid("287a8359-2b34-5d56-c678-901234567890") },
                    { 11, 4, new Guid("398b946a-3c45-6e67-d789-012345678901") },
                    { 12, 4, new Guid("4a9c057b-4d56-7f78-e89a-123456789012") },
                    { 13, 3, new Guid("5bad168c-5e67-8089-f9ab-234567890123") },
                    { 14, 3, new Guid("6cbe279d-6f78-919a-0abc-345678901234") },
                    { 15, 3, new Guid("7dcf38ae-7089-a2ab-1bcd-456789012345") },
                    { 16, 3, new Guid("8ed049bf-819a-b3bc-2cde-567890123456") },
                    { 17, 5, new Guid("9fe15ac0-92ab-c4cd-3def-678901234567") },
                    { 18, 5, new Guid("0af26bd1-a3bc-d5de-4ef0-789012345678") },
                    { 19, 5, new Guid("1b037ce2-b4cd-e6ef-5f01-890123456789") },
                    { 20, 5, new Guid("2c148df3-c5de-f7f0-6012-901234567890") },
                    { 21, 4, new Guid("3d259ef4-d6ef-08f1-7123-012345678901") },
                    { 22, 3, new Guid("4e36af05-e7f0-19f2-8234-123456789012") },
                    { 23, 5, new Guid("5f47b006-f8f1-2af3-9345-234567890123") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictApplications_ClientId",
                schema: "security",
                table: "OpenIddictApplications",
                column: "ClientId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictAuthorizations_ApplicationId_Status_Subject_Type",
                schema: "security",
                table: "OpenIddictAuthorizations",
                columns: new[] { "ApplicationId", "Status", "Subject", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictScopes_Name",
                schema: "security",
                table: "OpenIddictScopes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_ApplicationId_Status_Subject_Type",
                schema: "security",
                table: "OpenIddictTokens",
                columns: new[] { "ApplicationId", "Status", "Subject", "Type" });

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_AuthorizationId",
                schema: "security",
                table: "OpenIddictTokens",
                column: "AuthorizationId");

            migrationBuilder.CreateIndex(
                name: "IX_OpenIddictTokens_ReferenceId",
                schema: "security",
                table: "OpenIddictTokens",
                column: "ReferenceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_PostId",
                schema: "adm",
                table: "User",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                schema: "adm",
                table: "User",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFieldActivityRelation_FieldActivityId",
                schema: "adm",
                table: "UserFieldActivityRelation",
                column: "FieldActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_UserFieldActivityRelation_UserId",
                schema: "adm",
                table: "UserFieldActivityRelation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupRelation_GroupId",
                schema: "adm",
                table: "UserGroupRelation",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroupRelation_UserId",
                schema: "adm",
                table: "UserGroupRelation",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_AuthorId",
                schema: "adm",
                table: "UserMessage",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_UserMessage_ReceiverId",
                schema: "adm",
                table: "UserMessage",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRolePermissionRelation_PermissionId",
                schema: "adm",
                table: "UserRolePermissionRelation",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRolePermissionRelation_RoleId",
                schema: "adm",
                table: "UserRolePermissionRelation",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OpenIddictScopes",
                schema: "security");

            migrationBuilder.DropTable(
                name: "OpenIddictTokens",
                schema: "security");

            migrationBuilder.DropTable(
                name: "UserFieldActivityRelation",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserGroupRelation",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserMessage",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserNotification",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserRolePermissionRelation",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "OpenIddictAuthorizations",
                schema: "security");

            migrationBuilder.DropTable(
                name: "UserFieldActivity",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserGroup",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "User",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserPermission",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "OpenIddictApplications",
                schema: "security");

            migrationBuilder.DropTable(
                name: "UserPosition",
                schema: "adm");

            migrationBuilder.DropTable(
                name: "UserRole",
                schema: "adm");
        }
    }
}
