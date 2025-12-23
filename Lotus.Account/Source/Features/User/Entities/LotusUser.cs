using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /**
     * \defgroup AccountUser Подсистема работы с пользователем
     * \ingroup Account
     * \brief Подсистема работы с пользователем.
     * @{
     */
    /// <summary>
    /// Класс для определения пользователя.
    /// </summary>
    public class User : EntityDb<Guid>, IUserIdentifier, ILotusPersonInfo
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "User";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="User"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<User>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);

            model.HasMany(user => user.FieldActivities)
                .WithMany(field => field.Users)
                .UsingEntity<UserFieldActivityRelation>(
                    field => field.HasOne<UserFieldActivity>()
                .WithMany()
                    .HasForeignKey(x => x.FieldActivityId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict),
                    user => user.HasOne<User>()
                .WithMany()
                    .HasForeignKey(x => x.UserId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict))
                .HasKey(nameof(UserFieldActivityRelation.Id));

            model.HasMany(user => user.Groups)
                .WithMany(group => group.Users)
                .UsingEntity<UserGroupRelation>(
                    group => group.HasOne<UserGroup>()
                .WithMany()
                    .HasForeignKey(x => x.GroupId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict),
                    user => user.HasOne<User>()
                .WithMany()
                    .HasForeignKey(x => x.UserId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Restrict))
                .HasKey(nameof(UserGroupRelation.Id));

            model
                .HasOne(user => user.Role)
                .WithMany(role => role.Users);

            model
                .HasOne(user => user.Post)
                .WithMany(post => post.Users);
        }
        #endregion

        #region Properties
        //
        // ИДЕНТИФИКАЦИЯ
        //
        /// <summary>
        /// Логин пользователя.
        /// </summary>
        [MaxLength(20)]
        public string Login { get; set; } = null!;

        /// <summary>
        /// Почта пользователя.
        /// </summary>
        [MaxLength(50)]
        public string Email { get; set; }

        /// <summary>
        /// Статус подтверждения почты.
        /// </summary>
        public bool EmailConfirmed { get; set; }

        /// <summary>
        /// Хешированное представление пароля.
        /// </summary>
        [MaxLength(256)]
        public string PasswordHash { get; set; } = null!;

        /// <summary>
        /// Хешированное значение идентификатора для прямого доступа.
        /// </summary>
        [MaxLength(256)]
        public string HashId { get; set; }

        /// <summary>
        /// Статус блокировки пользователя.
        /// </summary>
        public bool IsLockout { get; set; }

        /// <summary>
        /// Дата начала блокировки пользователя.
        /// </summary>
        public DateTime? LockoutBeginDate { get; set; }

        /// <summary>
        /// Дата окончания блокировки пользователя.
        /// </summary>
        public DateTime? LockoutEndDate { get; set; }

        //
        // НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ
        //
        /// <summary>
        /// Настройки пользователя в JSON формате.
        /// </summary>
        public string? Settings { get; set; }

        //
        // ПЕРСОНАЛЬНЫЕ ДАННЫЕ
        //
        /// <summary>
        /// Имя пользователя.
        /// </summary>
        [MaxLength(30)]
        public string? Name { get; set; }

        /// <summary>
        /// Фамилия пользователя.
        /// </summary>
        [MaxLength(30)]
        public string? Surname { get; set; }

        /// <summary>
        /// Отчество пользователя.
        /// </summary>
        [MaxLength(30)]
        public string? Patronymic { get; set; }

        /// <summary>
        /// День рождение.
        /// </summary>
        public DateOnly? Birthday { get; set; }

        /// <summary>
        /// Местонахождение пользователя.
        /// </summary>
        [MaxLength(30)]
        public string? Whereabouts { get; set; }

        /// <summary>
        /// Интересы пользователя.
        /// </summary>
        [MaxLength(250)]
        public string? Interests { get; set; }

        //
        // РОЛЬ И РАЗРЕШЕНИЯ
        //
        /// <summary>
        /// Роль.
        /// </summary>
        [ForeignKey(nameof(RoleId))]
        public UserRole Role { get; set; }

        /// <summary>
        /// Идентификатор роли.
        /// </summary>
        public int RoleId { get; set; }

        //
        // ДОЛЖНОСТЬ
        //
        /// <summary>
        /// Должность.
        /// </summary>
        [ForeignKey(nameof(PostId))]
        public UserPosition? Post { get; set; }

        /// <summary>
        /// Идентификатор должности.
        /// </summary>
        public int? PostId { get; set; }

        //
        // ГРУППЫ
        //
        /// <summary>
        /// Группы пользователя.
        /// </summary>
        public List<UserGroup>? Groups { get; set; }

        //
        // CФЕРЫ ДЕЯТЕЛЬНОСТИ
        //
        /// <summary>
        /// Сферы деятельности пользователя.
        /// </summary>
        public List<UserFieldActivity>? FieldActivities { get; set; }

        //
        // АВАТАР
        //
        /// <summary>
        /// Идентификатор аватара.
        /// </summary>
        public string? AvatarId { get; set; }
        #endregion
    }
    /**@}*/
}