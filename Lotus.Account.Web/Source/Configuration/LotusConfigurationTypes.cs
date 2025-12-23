namespace Lotus.Account
{
    /** \addtogroup AccountWebApiConfiguration
    *@{*/
    /// <summary>
    /// Аутентификация через Google.
    /// </summary>
    public class GoogleAuthentication
    {
        /// <summary>
        /// Идентификатор пользователя.
        /// </summary>
        public string ClientId { get; set; }

        /// <summary>
        /// Секрет пользователя.
        /// </summary>
        public string ClientSecret { get; set; }
    }

    /// <summary>
    /// Класс определяющий все возможные способы аутентификации.
    /// </summary>
    public class AuthenticationTypes
    {
        /// <summary>
        /// Имя секции где располагается параметр.
        /// </summary>
        public const string Section = "Authentication";

        /// <summary>
        /// Идентификация через Google.
        /// </summary>
        public GoogleAuthentication Google { get; set; }
    }

    /// <summary>
    /// Класс определяющий параметры фронт приложения.
    /// </summary>
    public class FrontSettings
    {
        /// <summary>
        /// Имя секции где располагается параметр.
        /// </summary>
        public const string Section = "FrontSettings";

        /// <summary>
        /// Основной адрес фронт приложения.
        /// </summary>
        public string MainUri { get; set; }

        /// <summary>
        /// Адрес фронт приложения используемый для перенаправления.
        /// </summary>
        public string ReturnUrl { get; set; }
    }
    /**@}*/
}
