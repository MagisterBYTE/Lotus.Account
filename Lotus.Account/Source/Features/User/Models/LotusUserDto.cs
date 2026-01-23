using System.ComponentModel.DataAnnotations;

using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountUser
    *@{*/
    /// <summary>
    /// Класс информатор пользователя.
    /// </summary>
    public class UserDto : IdentifierDtoId<Guid>
    {
        #region Properties
        //
        // ИДЕНТИФИКАЦИЯ
        //
        /// <summary>
        /// Логин пользователя.
        /// </summary>
        public string Login { get; set; } = null!;

        /// <summary>
        /// Никнейм пользователя.
        /// </summary>
        public string Nickname { get; set; } = string.Empty;

        /// <summary>
        /// Почта пользователя.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Статус потверждение почты.
        /// </summary>
        public bool EmailConfirmed { get; set; }

        /// <summary>
        /// Хешированное значение идентификатора для прямого доступа.
        /// </summary>
        public string? HashId { get; set; }

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
        public string? Patronymic { get; set; }

        /// <summary>
        /// День рождение.
        /// </summary>
        public DateOnly? Birthday { get; set; }

        //
        // РОЛЬ И РАЗРЕШЕНИЯ
        //
        /// <summary>
        /// Идентификатор роли.
        /// </summary>
        public int RoleId { get; set; }

        //
        // ДОЛЖНОСТЬ
        //
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
        public List<int>? GroupsIds { get; set; }

        //
        // CФЕРЫ ДЕЯТЕЛЬНОСТИ
        //
        /// <summary>
        /// Cферы деятельности пользователя.
        /// </summary>
        public List<int>? FieldActivitiesIds { get; set; }

        //
        // АВАТАР
        //
        /// <summary>
        /// Идентификатор аватарв.
        /// </summary>
        public string? AvatarId { get; set; }
        #endregion
    }
    /**@}*/
}