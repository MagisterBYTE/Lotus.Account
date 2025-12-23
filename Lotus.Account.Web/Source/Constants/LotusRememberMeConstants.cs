namespace Lotus.Account
{
    /** \addtogroup AccountWebApiConstants
    *@{*/
    /// <summary>
    /// Константы для технологии RememberMe позволяющая входить на сайт без учетных данных.
    /// </summary>
    public static class XRememberMeConstants
    {
        /// <summary>
        /// Имя заголовка запроса содержащий идентификатор пользователя
        /// </summary>
        public const string HeaderName = "x-rememberme";

        /// <summary>
        /// Имя куки содержащий идентификатор пользователя
        /// </summary>
        public const string CookieName = "lotus-x-rememberme";

        /// <summary>
        /// Конечная точка для получения токена в случае авторизации через куку RememberMe.
        /// </summary>
        public const string TokenRememberMe = "api/Authorize/RememberMe";

        /// <summary>
        /// Количество дней в течении которых можно входить на сайт без учетных данных
        /// </summary>
        public const int CountDays = 7;
    }
    /**@}*/
}