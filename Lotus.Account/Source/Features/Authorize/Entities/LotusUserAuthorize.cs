using Lotus.Core;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountAuthorize
    *@{*/
    /// <summary>
    /// Класс для определения авторизации пользователя.
    /// </summary>
    public class UserAuthorize : EntityDb<Guid>
    {
        #region Const
        /// <summary>
        /// Имя таблицы.
        /// </summary>
        public const string TABLE_NAME = "UserAuthorize";
        #endregion

        #region Models methods
        /// <summary>
        /// Конфигурирование модели для типа <see cref="UserAuthorize"/>.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void ModelCreating(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserAuthorize>();
            model.ToTable(TABLE_NAME, XDbConstants.SchemeName);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Идентификатор пользователя.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Идентификатор устройства пользователя.
        /// </summary>
        public int DeviceId { get; set; }

        /// <summary>
        /// Идентификатор провайдера.
        /// </summary>
        public string? AuthProvider { get; set; }

        /// <summary>
        /// Идентификатор пользователя внешнего провайдера.
        /// </summary>
        public string? ExternalAuthId { get; set; }

        /// <summary>
        /// Дата начало авторизации.
        /// </summary>
        public DateTime BeginAuth { get; set; }

        /// <summary>
        /// Дата окончания авторизации.
        /// </summary>
        public DateTime EndAuth { get; set; }
        #endregion
    }
    /**@}*/
}