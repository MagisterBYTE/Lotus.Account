namespace Lotus.Account
{
    /**
     * \defgroup AccountWebApiConstants Константы
     * \ingroup AccountWebApi
     * \brief Константы модуля.
     * @{
     */
    /// <summary>
    /// Константы для определения путей.
    /// </summary>
    public static class XRoutesConstants
    {
        /// <summary>
        /// Адрес сервера авторизации и валидации.
        /// </summary>
        public const string ServerUri = "ServerUri";

        //
        // Маршруты аутентификации по токену
        //
        /// <summary>
        /// Конечная точка для получения токена.
        /// </summary>
        public const string TokenEndpoint = "/connect/token";

        /// <summary>
        /// Конечная точка для получение информации пользователе.
        /// </summary>
        public const string UserInfoEndpoint = "/connect/userinfo";

        /// <summary>
        /// Конечная точка для выхода пользователя.
        /// </summary>
        public const string LogoutEndpoint = "/connect/logout";

        //
        // Маршруты аутентификации по куки
        //
        /// <summary>
        /// Конечная точка для входа пользователя через логин/пароль используя куки
        /// </summary>
        public const string LoginCookieEndpoint = "api/Authorize/LoginCookie";

        /// <summary>
        /// Конечная точка для получение информации пользователе
        /// </summary>
        public const string UserCookieEndpoint = "api/Authorize/GetUserInfoCookie";

        /// <summary>
        /// Конечная точка для выхода пользователя используя куки
        /// </summary>
        public const string LogoutCookieEndpoint = "api/Authorize/LogoutCookie";

        //
        // Маршруты аутентификации через Google
        //
        /// <summary>
        /// Конечная точка для входа пользователя через Google
        /// </summary>
        public const string LoginGoogleEndpoint = "api/Authorize/LoginGoogle";

        /// <summary>
        /// Конечная точка для регистрации пользователя.
        /// </summary>
        public const string RegisterEndpoint = "api/Authorize/Register";
    }
    /**@}*/
}