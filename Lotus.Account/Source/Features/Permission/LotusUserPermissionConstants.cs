namespace Lotus.Account
{
    /** \addtogroup AccountPermission
    *@{*/
    /// <summary>
    /// Статический класс для определения констант и первоначальных данных подсистемы работы с разрешениями.
    /// </summary>
    public static class XUserPermissionConstants
    {
        /// <summary>
        /// Разрешение на просмотр пользователей.
        /// </summary>
        public static readonly UserPermission UserView = new()
        {
            Id = 101,
            Name = "UserView",
            DisplayName = "Просмотр пользователей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на добавление пользователей.
        /// </summary>
        public static readonly UserPermission UserAdd = new()
        {
            Id = 102,
            Name = "UserAdd",
            DisplayName = "Добавление пользователей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на редактирование пользователей.
        /// </summary>
        public static readonly UserPermission UserEdit = new()
        {
            Id = 103,
            Name = "UserEdit",
            DisplayName = "Редактирование пользователей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на удаление пользователей.
        /// </summary>
        public static readonly UserPermission UserRemove = new()
        {
            Id = 104,
            Name = "UserRemove",
            DisplayName = "Удаление пользователей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на просмотр ролей.
        /// </summary>
        public static readonly UserPermission RoleView = new()
        {
            Id = 201,
            Name = "RoleView",
            DisplayName = "Просмотр ролей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на добавление ролей.
        /// </summary>
        public static readonly UserPermission RoleAdd = new()
        {
            Id = 202,
            Name = "RoleAdd",
            DisplayName = "Добавление ролей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на редактирование ролей.
        /// </summary>
        public static readonly UserPermission RoleEdit = new()
        {
            Id = 203,
            Name = "RoleEdit",
            DisplayName = "Редактирование ролей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на удаление ролей.
        /// </summary>
        public static readonly UserPermission RoleRemove = new()
        {
            Id = 204,
            Name = "RoleRemove",
            DisplayName = "Удаление ролей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на просмотр разрешений.
        /// </summary>
        public static readonly UserPermission PermissionView = new()
        {
            Id = 301,
            Name = "PermissionView",
            DisplayName = "Просмотр разрешений",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на добавление разрешений.
        /// </summary>
        public static readonly UserPermission PermissionAdd = new()
        {
            Id = 302,
            Name = "PermissionAdd",
            DisplayName = "Добавление разрешений",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на редактирование разрешений.
        /// </summary>
        public static readonly UserPermission PermissionEdit = new()
        {
            Id = 303,
            Name = "PermissionEdit",
            DisplayName = "Редактирование разрешений",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на удаление разрешений.
        /// </summary>
        public static readonly UserPermission PermissionRemove = new()
        {
            Id = 304,
            Name = "PermissionRemove",
            DisplayName = "Удаление разрешений",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на просмотр должностей.
        /// </summary>
        public static readonly UserPermission PositionView = new()
        {
            Id = 401,
            Name = "PositionView",
            DisplayName = "Просмотр должностей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на добавление должностей.
        /// </summary>
        public static readonly UserPermission PositionAdd = new()
        {
            Id = 402,
            Name = "PositionAdd",
            DisplayName = "Добавление должностей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на редактирование должностей.
        /// </summary>
        public static readonly UserPermission PositionEdit = new()
        {
            Id = 403,
            Name = "PositionEdit",
            DisplayName = "Редактирование должностей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на удаление должностей.
        /// </summary>
        public static readonly UserPermission PositionRemove = new()
        {
            Id = 404,
            Name = "PositionRemove",
            DisplayName = "Удаление должностей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на выбор должностей.
        /// </summary>
        public static readonly UserPermission PositionChoose = new()
        {
            Id = 405,
            Name = "PositionChoose",
            DisplayName = "Выбор должностей",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на просмотр групп.
        /// </summary>
        public static readonly UserPermission GroupView = new()
        {
            Id = 501,
            Name = "GroupView",
            DisplayName = "Просмотр групп",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на добавление групп.
        /// </summary>
        public static readonly UserPermission GroupAdd = new()
        {
            Id = 502,
            Name = "GroupAdd",
            DisplayName = "Добавление групп",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на редактирование групп.
        /// </summary>
        public static readonly UserPermission GroupEdit = new()
        {
            Id = 503,
            Name = "GroupEdit",
            DisplayName = "Редактирование групп",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на удаление групп.
        /// </summary>
        public static readonly UserPermission GroupRemove = new()
        {
            Id = 504,
            Name = "GroupRemove",
            DisplayName = "Удаление групп",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на выбор групп.
        /// </summary>
        public static readonly UserPermission GroupChoose = new()
        {
            Id = 505,
            Name = "GroupChoose",
            DisplayName = "Выбор групп",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на просмотр направлений деятельности.
        /// </summary>
        public static readonly UserPermission FieldActivityView = new()
        {
            Id = 601,
            Name = "FieldActivityView",
            DisplayName = "Просмотр направлений деятельности",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на добавление направлений деятельности.
        /// </summary>
        public static readonly UserPermission FieldActivityAdd = new()
        {
            Id = 602,
            Name = "FieldActivityAdd",
            DisplayName = "Добавление направлений деятельности",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на редактирование направлений деятельности.
        /// </summary>
        public static readonly UserPermission FieldActivityEdit = new()
        {
            Id = 603,
            Name = "FieldActivityEdit",
            DisplayName = "Редактирование направлений деятельности",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на удаление направлений деятельности.
        /// </summary>
        public static readonly UserPermission FieldActivityRemove = new()
        {
            Id = 604,
            Name = "FieldActivityRemove",
            DisplayName = "Удаление направлений деятельности",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Разрешение на выбор направлений деятельности.
        /// </summary>
        public static readonly UserPermission FieldActivityChoose = new()
        {
            Id = 605,
            Name = "FieldActivityChoose",
            DisplayName = "Выбор направлений деятельности",
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };
    }
    /**@}*/
}