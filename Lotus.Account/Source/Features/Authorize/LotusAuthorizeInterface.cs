using System.Security.Claims;

using Lotus.Repository;

namespace Lotus.Account
{
    /**
     * \defgroup AccountAuthorize Подсистема авторизации
     * \ingroup Account
     * \brief Подсистема авторизации.
     * @{
     */
    /// <summary>
    /// Интерфейса сервиса для авторизации пользователя.
    /// </summary>
    public interface ILotusAuthorizeService
    {
        /// <summary>
        /// Аутентификация пользователя.
        /// </summary>
        /// <param name="loginParameters">Параметры для аутентификации пользователя.</param>
        /// <returns>Информация о пользователе.</returns>
        Task<Response<UserAuthorizeInfo>> LoginAsync(LoginParametersDto loginParameters);

        /// <summary>
        /// Получения набора утверждений для указанного пользователя.
        /// </summary>
        /// <param name="userInfo">Информация о пользователе.</param>
        /// <param name="isCookie">Для куки или нет.</param>
        /// <returns>Набор утверждений.</returns>
        List<Claim> GetClaims(UserAuthorizeInfo userInfo, bool isCookie);

        /// <summary>
        /// Получение информации о пользователе для указанного идентификатора.
        /// </summary>
        /// <param name="hashId">Идентификатор пользователя.</param>
        /// <returns>Информация о пользователе.</returns>
        Task<Response<UserAuthorizeInfo>> GetUserInfoAsync(string hashId);

        /// <summary>
        /// Выход из статуса аутентификации пользователя.
        /// </summary>
        /// <returns>Задача.</returns>
        Task LogoutAsync();

        /// <summary>
        /// Регистрация нового пользователя.
        /// </summary>
        /// <param name="registerParameters">Параметры для регистрации нового пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Пользователь.</returns>
        Task<Response> RegisterAsync(RegisterParametersDto registerParameters, CancellationToken token);
    }
    /**@}*/
}