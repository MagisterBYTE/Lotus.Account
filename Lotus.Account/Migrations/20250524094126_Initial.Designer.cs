﻿// <auto-generated />
using System;
using Lotus.Account;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Lotus.Account.Migrations
{
    [DbContext(typeof(AccountDbContext))]
    [Migration("20250524094126_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Lotus.Account.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AvatarId")
                        .HasColumnType("uuid");

                    b.Property<DateOnly?>("Birthday")
                        .HasColumnType("date");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("Patronymic")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.Property<int?>("PostId")
                        .HasColumnType("integer");

                    b.Property<int?>("RoleId")
                        .HasColumnType("integer");

                    b.Property<string>("Surname")
                        .HasMaxLength(30)
                        .HasColumnType("character varying(30)");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("RoleId");

                    b.ToTable("User", "adm");

                    b.HasData(
                        new
                        {
                            Id = new Guid("e3182c8f-87bc-4e27-a27f-b32e3e2b8018"),
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "dementevds@gmail.com",
                            EmailConfirmed = false,
                            Login = "DanielDem",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Даниил",
                            PasswordHash = "012f28fd2973783520fa3115f886102a09c8a15e",
                            Patronymic = "Сергеевич",
                            RoleId = 1,
                            Surname = "Дементьев"
                        });
                });

            modelBuilder.Entity("Lotus.Account.UserFieldActivity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DisplayName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("UserFieldActivity", "adm");
                });

            modelBuilder.Entity("Lotus.Account.UserFieldActivityRelation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("FieldActivityId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("FieldActivityId");

                    b.HasIndex("UserId");

                    b.ToTable("UserFieldActivityRelation", "adm");
                });

            modelBuilder.Entity("Lotus.Account.UserGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DisplayName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("UserGroup", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Хранители",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Хранители"
                        },
                        new
                        {
                            Id = 2,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Север",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Север"
                        },
                        new
                        {
                            Id = 3,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Юг",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Юг"
                        },
                        new
                        {
                            Id = 4,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Восток",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Восток"
                        },
                        new
                        {
                            Id = 5,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Запад",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Запад"
                        });
                });

            modelBuilder.Entity("Lotus.Account.UserGroupRelation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("GroupId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.HasIndex("UserId");

                    b.ToTable("UserGroupRelation", "adm");
                });

            modelBuilder.Entity("Lotus.Account.UserMessage", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AuthorId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("ReceiverId")
                        .HasColumnType("uuid");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Time")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("ReceiverId");

                    b.ToTable("UserMessage", "adm");
                });

            modelBuilder.Entity("Lotus.Account.UserNotification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("Importance")
                        .HasColumnType("integer");

                    b.Property<bool>("IsArchive")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Sender")
                        .HasColumnType("text");

                    b.Property<string>("Topic")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("UserNotification", "adm");
                });

            modelBuilder.Entity("Lotus.Account.UserPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DisplayName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("UserPermission", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Администратор",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "admin"
                        },
                        new
                        {
                            Id = 2,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Модератор",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "editor"
                        },
                        new
                        {
                            Id = 3,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Пользователь",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "user"
                        });
                });

            modelBuilder.Entity("Lotus.Account.UserPosition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DisplayName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("UserPosition", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Инспектор",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Инспектор"
                        },
                        new
                        {
                            Id = 2,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Старший инспектор",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Старший инспектор"
                        },
                        new
                        {
                            Id = 3,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Ведущий специалист",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Ведущий специалист"
                        },
                        new
                        {
                            Id = 4,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Начальник отдела",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Начальник отдела"
                        });
                });

            modelBuilder.Entity("Lotus.Account.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DisplayName")
                        .HasMaxLength(40)
                        .HasColumnType("character varying(40)");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Id");

                    b.ToTable("UserRole", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Администратор",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "admin"
                        },
                        new
                        {
                            Id = 2,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Редактор",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "editor"
                        },
                        new
                        {
                            Id = 3,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            DisplayName = "Пользователь",
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "user"
                        });
                });

            modelBuilder.Entity("Lotus.Account.UserRolePermissionRelation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("Modified")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("PermissionId")
                        .HasColumnType("integer");

                    b.Property<int>("RoleId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PermissionId");

                    b.HasIndex("RoleId");

                    b.ToTable("UserRolePermissionRelation", "adm");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PermissionId = 1,
                            RoleId = 1
                        },
                        new
                        {
                            Id = 2,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PermissionId = 2,
                            RoleId = 2
                        },
                        new
                        {
                            Id = 3,
                            Created = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Modified = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PermissionId = 3,
                            RoleId = 3
                        });
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreApplication", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("ApplicationType")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("ClientId")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("ClientSecret")
                        .HasColumnType("text");

                    b.Property<string>("ClientType")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("ConcurrencyToken")
                        .IsConcurrencyToken()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("ConsentType")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text");

                    b.Property<string>("DisplayNames")
                        .HasColumnType("text");

                    b.Property<string>("JsonWebKeySet")
                        .HasColumnType("text");

                    b.Property<string>("Permissions")
                        .HasColumnType("text");

                    b.Property<string>("PostLogoutRedirectUris")
                        .HasColumnType("text");

                    b.Property<string>("Properties")
                        .HasColumnType("text");

                    b.Property<string>("RedirectUris")
                        .HasColumnType("text");

                    b.Property<string>("Requirements")
                        .HasColumnType("text");

                    b.Property<string>("Settings")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ClientId")
                        .IsUnique();

                    b.ToTable("OpenIddictApplications", "security");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreAuthorization", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("ApplicationId")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyToken")
                        .IsConcurrencyToken()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<DateTime?>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Properties")
                        .HasColumnType("text");

                    b.Property<string>("Scopes")
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Subject")
                        .HasMaxLength(400)
                        .HasColumnType("character varying(400)");

                    b.Property<string>("Type")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId", "Status", "Subject", "Type");

                    b.ToTable("OpenIddictAuthorizations", "security");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreScope", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyToken")
                        .IsConcurrencyToken()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Descriptions")
                        .HasColumnType("text");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text");

                    b.Property<string>("DisplayNames")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(200)
                        .HasColumnType("character varying(200)");

                    b.Property<string>("Properties")
                        .HasColumnType("text");

                    b.Property<string>("Resources")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("OpenIddictScopes", "security");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreToken", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("text");

                    b.Property<string>("ApplicationId")
                        .HasColumnType("text");

                    b.Property<string>("AuthorizationId")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyToken")
                        .IsConcurrencyToken()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<DateTime?>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("ExpirationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Payload")
                        .HasColumnType("text");

                    b.Property<string>("Properties")
                        .HasColumnType("text");

                    b.Property<DateTime?>("RedemptionDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ReferenceId")
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Status")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Subject")
                        .HasMaxLength(400)
                        .HasColumnType("character varying(400)");

                    b.Property<string>("Type")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id");

                    b.HasIndex("AuthorizationId");

                    b.HasIndex("ReferenceId")
                        .IsUnique();

                    b.HasIndex("ApplicationId", "Status", "Subject", "Type");

                    b.ToTable("OpenIddictTokens", "security");
                });

            modelBuilder.Entity("Lotus.Account.User", b =>
                {
                    b.HasOne("Lotus.Account.UserPosition", "Post")
                        .WithMany("Users")
                        .HasForeignKey("PostId");

                    b.HasOne("Lotus.Account.UserRole", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId");

                    b.Navigation("Post");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Lotus.Account.UserFieldActivityRelation", b =>
                {
                    b.HasOne("Lotus.Account.UserFieldActivity", null)
                        .WithMany()
                        .HasForeignKey("FieldActivityId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Lotus.Account.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Lotus.Account.UserGroupRelation", b =>
                {
                    b.HasOne("Lotus.Account.UserGroup", null)
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Lotus.Account.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("Lotus.Account.UserMessage", b =>
                {
                    b.HasOne("Lotus.Account.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");

                    b.HasOne("Lotus.Account.User", "Receiver")
                        .WithMany()
                        .HasForeignKey("ReceiverId");

                    b.Navigation("Author");

                    b.Navigation("Receiver");
                });

            modelBuilder.Entity("Lotus.Account.UserRolePermissionRelation", b =>
                {
                    b.HasOne("Lotus.Account.UserPermission", null)
                        .WithMany()
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Lotus.Account.UserRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreAuthorization", b =>
                {
                    b.HasOne("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreApplication", "Application")
                        .WithMany("Authorizations")
                        .HasForeignKey("ApplicationId");

                    b.Navigation("Application");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreToken", b =>
                {
                    b.HasOne("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreApplication", "Application")
                        .WithMany("Tokens")
                        .HasForeignKey("ApplicationId");

                    b.HasOne("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreAuthorization", "Authorization")
                        .WithMany("Tokens")
                        .HasForeignKey("AuthorizationId");

                    b.Navigation("Application");

                    b.Navigation("Authorization");
                });

            modelBuilder.Entity("Lotus.Account.UserPosition", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("Lotus.Account.UserRole", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreApplication", b =>
                {
                    b.Navigation("Authorizations");

                    b.Navigation("Tokens");
                });

            modelBuilder.Entity("OpenIddict.EntityFrameworkCore.Models.OpenIddictEntityFrameworkCoreAuthorization", b =>
                {
                    b.Navigation("Tokens");
                });
#pragma warning restore 612, 618
        }
    }
}
