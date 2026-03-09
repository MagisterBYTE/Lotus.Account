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
        /// <param name="deviceId">Идентификатор устройства пользователя.</param>
        /// <returns>Информация о пользователе.</returns>
        Task<Response<UserAuthorizeInfo>> LoginAsync(LoginParametersDto loginParameters, int deviceId);

        /// <summary>
        /// Логгировать внешних вход пользователя
        /// </summary>
        /// <param name="authProvider">Наименование внешнего провайдера.</param>
        /// <param name="email">Email.</param>
        /// <param name="deviceId">Идентификатор устройства пользователя.</param>
        /// <param name="avatarId">Аватар пользователя.</param>
        /// <returns>Информация о пользователе.</returns>
        Task LogExternalAsync(string authProvider, string email, int deviceId, string? avatarId);

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
        /// Получение информации о пользователе для указанного email.
        /// </summary>
        /// <param name="email">email.</param>
        /// <returns>Информация о пользователе.</returns>
        Task<Response<UserAuthorizeInfo>> GetUserInfoByEmailAsync(string email);

        /// <summary>
        /// Выход из статуса аутентификации пользователя.
        /// </summary>
        /// <param name="deviceId">Идентификатор устройства пользователя.</param>
        /// <returns>Задача.</returns>
        Task LogoutAsync(int deviceId);

        /// <summary>
        /// Регистрация нового пользователя.
        /// </summary>
        /// <param name="registerParameters">Параметры для регистрации нового пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Пользователь.</returns>
        Task<Response> RegisterAsync(RegisterParametersDto registerParameters, CancellationToken token);

        /// <summary>
        /// Регистрация нового пользователя через внешние провайдеры.
        /// </summary>
        /// <param name="parameters">Параметры для регистрации нового пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Пользователь.</returns>
        Task<Response<UserAuthorizeInfo>> RegisterExternalUserAsync(LotusRegisterExternalParametersDto parameters,
            CancellationToken token);

        /// <summary>
        /// Привязка внешнего профиля к пользователю.
        /// </summary>
        /// <param name="hashId">Хеш идентификатора пользователя.</param>
        /// <param name="provider">Провайдер.</param>
        /// <param name="externalId">Идентификатор пользователя внешнего провайдера.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Пользователь.</returns>
        Task<Response> LinkExternalAuthAsync(string hashId, string provider, string externalId, CancellationToken token);

        /// <summary>
        /// Обновление информации о пользователе.
        /// </summary>
        /// <param name="userInfo">Информация о пользователе.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Общий результат операции.</returns>
        Task<Response> UpdateUserInfo(UserAuthorizeInfo userInfo, CancellationToken token);

        /// <summary>
        /// Изменить пароль пользователя.
        /// </summary>
        /// <param name="changePassword">Данные для смены пароля.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Общий результат операции.</returns>
        Task<Response> ChangePassword(ChangePasswordDto changePassword, CancellationToken token);
    }
    /**@}*/
}