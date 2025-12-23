namespace Lotus.Account
{
    /** \addtogroup AccountRole
    *@{*/
    /// <summary>
    /// Статический класс для определения констант и первоначальных данных подсистемы работы с ролями.
    /// </summary>
    public static class XUserRoleConstants
    {
        /// <summary>
        /// Роль администратора.
        /// </summary>
        public static readonly UserRole Admin = new()
        {
            Id = 1,
            Name = "admin",
            DisplayName = "Администратор",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Роль редактора/модератора.
        /// </summary>
        public static readonly UserRole Editor = new()
        {
            Id = 2,
            Name = "editor",
            DisplayName = "Редактор",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Роль редактора/модератора должностей.
        /// </summary>
        public static readonly UserRole EditorPost = new()
        {
            Id = 3,
            Name = "editorPost",
            DisplayName = "Редактор должностей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Роль редактора/модератора групп.
        /// </summary>
        public static readonly UserRole EditorGroup = new()
        {
            Id = 4,
            Name = "editorGroup",
            DisplayName = "Редактор групп",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Роль пользователя.
        /// </summary>
        public static readonly UserRole User = new()
        {
            Id = 100,
            Name = "user",
            DisplayName = "Пользователь",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };
    }
    /**@}*/
}