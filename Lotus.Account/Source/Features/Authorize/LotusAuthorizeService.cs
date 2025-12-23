using System.Security.Claims;

using Lotus.Core;
using Lotus.Repository;

using Mapster;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountAuthorize
    *@{*/
    /// <summary>
    /// Сервис для авторизации пользователя.
    /// </summary>
    public class AuthorizeService : ILotusAuthorizeService
    {
        #region Fields
        private readonly ILotusDataStorage _dataStorage;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="dataStorage">Интерфейс для работы с сущностями.</param>
        public AuthorizeService(ILotusDataStorage dataStorage)
        {
            _dataStorage = dataStorage;
        }
        #endregion

        #region ILotusAuthorizeService methods
        /// <inheritdoc/>
        public async Task<Response<UserAuthorizeInfo>> LoginAsync(LoginParametersDto loginParameters)
        {
            var users = _dataStorage.Query<User>();

            // 1. Пробуем найти пользователя с таким именем
            var user = await users.
                Include(x => x.Role).
                ThenInclude(x => x.Permissions).
                FirstOrDefaultAsync(x => (x.Login == loginParameters.Login || x.Email == loginParameters.Login));

            if (user == null)
            {
                return Response<UserAuthorizeInfo>.Failed(XUserErrors.UserNotFound);
            }

            // 2. Проверка блокировки
            if (user.IsLockout)
            {
                if (user.LockoutEndDate.HasValue && user.LockoutEndDate.Value < DateTime.UtcNow)
                {
                    // Разблокируем
                    user.IsLockout = false;
                    user.LockoutBeginDate = null;
                    user.LockoutEndDate = null;

                    _dataStorage.Update(user);
                    await _dataStorage.SaveChangesAsync();
                }
                else
                {
                    return Response<UserAuthorizeInfo>.Failed(XUserErrors.UserLocked);
                }
            }

            // 3. Проверяем пароль
            var singInResult = XHashHelper.VerifyHash(loginParameters.Password, user.PasswordHash);

            if (singInResult == false)
            {
                return Response<UserAuthorizeInfo>.Failed(XUserErrors.WrongPassword);
            }

            var userInfo = user.Adapt<UserAuthorizeInfo>();

            return Response<UserAuthorizeInfo>.Succeed(userInfo);
        }

        /// <inheritdoc/>
        public List<Claim> GetClaims(UserAuthorizeInfo userInfo, bool isCookie)
        {
            var baseClaims = new List<Claim>
            {
                new(ClaimTypes.Name, userInfo.Login!),
                new(ClaimTypes.Email, userInfo.Email!),
                new(ClaimTypes.Role, userInfo.Role.Name ?? "unknown"),
                new(XClaimsConstants.UserName, userInfo.GetShortName()),
            };

            if (isCookie)
            {
                // Для кук сохраняем идентификатор пользователя
                baseClaims.Insert(0, new(ClaimTypes.NameIdentifier, userInfo.HashId));
                return baseClaims;
            }
            else
            {
                // Для токена сохраняем еще и все права
                baseClaims.Add(new(XClaimsConstants.UserPermissions, string.Join(XCharHelper.Comma, userInfo.Permissions)));
                return baseClaims;
            }
        }

        /// <inheritdoc/>
        public async Task<Response<UserAuthorizeInfo>> GetUserInfoAsync(string hashId)
        {
            var users = _dataStorage.Query<User>();

            // Пробуем найти пользователя с таким именем
            var user = await users.
                Include(x => x.Role).
                ThenInclude(x => x.Permissions).
                FirstOrDefaultAsync((x) => x.HashId == hashId);

            if (user == null)
            {
                return Response<UserAuthorizeInfo>.Failed(XUserErrors.UserNotFound);
            }

            if (user.IsLockout)
            {
                return Response<UserAuthorizeInfo>.Failed(XUserErrors.UserLocked);
            }

            var userInfo = user.Adapt<UserAuthorizeInfo>();

            return Response<UserAuthorizeInfo>.Succeed(userInfo);
        }

        /// <inheritdoc/>
        public async Task LogoutAsync()
        {
            await Task.CompletedTask;
        }

        /// <inheritdoc/>
        public async Task<Response> RegisterAsync(RegisterParametersDto registerParameters, CancellationToken token)
        {
            var users = _dataStorage.Query<User>();
            var user = await users.FirstOrDefaultAsync(x => x.Login == registerParameters.Login);

            if (user is not null)
            {
                return Response.Failed(XUserErrors.LoginAlreadyUse);
            }

            if (registerParameters.Password.Length < 5)
            {
                return Response.Failed(XUserErrors.InsecurePassword);
            }

            // Создаем нового пользователя
            user = new User
            {
                Login = registerParameters.Login,
                Email = registerParameters.Email,
                PasswordHash = XHashHelper.GetHash(registerParameters.Password),
                Name = registerParameters.Name,
                Surname = registerParameters.Surname,
                Patronymic = registerParameters.Patronymic,
            };

            await _dataStorage.AddAsync(user, token);
            await _dataStorage.SaveChangesAsync(token);

            return Response.Succeed();
        }
        #endregion
    }
    /**@}*/
}