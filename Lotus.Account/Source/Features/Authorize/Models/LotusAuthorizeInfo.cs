using System.Security.Claims;

using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountAuthorize
    *@{*/
    /// <summary>
    /// Класс определяющий минимальную информацию об авторизации пользователя.
    /// </summary>
    public class UserAuthorizeInfo : IUserIdentifier, ILotusPersonInfo
    {
        #region Properties
        //
        // АУТЕНТИФИКАЦИЯ
        //
        /// <summary>
        /// Схема авторизации.
        /// </summary>
        public string AuthScheme { get; set; } = string.Empty;

        /// <summary>
        /// Дата истечения строка авторизации. 
        /// </summary>
        public DateTime AuthExpires { get; set; } 

        //
        // ИДЕНТИФИКАЦИЯ
        //
        /// <summary>
        /// Логин пользователя.
        /// </summary>
        public string Login { get; set; } = string.Empty;

        /// <summary>
        /// Почта пользователя.
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Статус подтверждения почты.
        /// </summary>
        public bool EmailConfirmed { get; set; }

        /// <summary>
        /// Статус блокировки пользователя.
        /// </summary>
        public bool IsLockout { get; set; }

        /// <summary>
        /// Дата начала блокировки пользователя.
        /// </summary>
        public DateTime? LockoutBeginDate { get; set; }

        /// <summary>
        /// Дата окончания блокировки пользователя.
        /// </summary>
        public DateTime? LockoutEndDate { get; set; }

        /// <summary>
        /// Хешированное значение идентификатора для прямого доступа.
        /// </summary>
        public string HashId { get; set; }

        //
        // НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ
        //
        /// <summary>
        /// Настройки пользователя в JSON формате.
        /// </summary>
        public string? Settings { get; set; }

        //
        // ПЕРСОНАЛЬНЫЕ ДАННЫЕ
        //
        /// <summary>
        /// Имя пользователя.
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// Фамилия пользователя.
        /// </summary>
        public string? Surname { get; set; }

        /// <summary>
        /// Отчество пользователя.
        /// </summary>
        public string? Patronymic { get; set; }

        /// <summary>
        /// День рождение.
        /// </summary>
        public DateOnly? Birthday { get; set; }

        /// <summary>
        /// Местонахождение пользователя.
        /// </summary>
        public string? Whereabouts { get; set; }

        /// <summary>
        /// Интересы пользователя.
        /// </summary>
        public string? Interests { get; set; }

        //
        // РОЛЬ И РАЗРЕШЕНИЯ
        //
        /// <summary>
        /// Роль пользователя.
        /// </summary>
        public UserRoleDto Role { get; set; }

        /// <summary>
        /// Список разрешений пользователя.
        /// </summary>
        public UserPermissionDto[] Permissions { get; set; }

        //
        // ДОЛЖНОСТЬ
        //
        /// <summary>
        /// Должность пользователя.
        /// </summary>
        public UserPositionDto Position { get; set; }

        //
        // ГРУППЫ
        //
        /// <summary>
        /// Список групп пользователя
        /// </summary>
        public UserGroupDto[] Groups { get; set; }

        //
        // АВАТАР
        //
        /// <summary>
        /// Идентификатор аватара.
        /// </summary>
        public string? AvatarId { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор по умолчанию инициализирует объект класса предустановленными значениями.
        /// </summary>
        public UserAuthorizeInfo()
        {
        }

        /// <summary>
        /// Конструктор по инициализирует объект класса указанными утверждениями.
        /// </summary>
        /// <param name="claims">Список утверждений.</param>
        public UserAuthorizeInfo(IEnumerable<Claim> claims)
        {
            if(!claims.Any()) return;
            var first = claims.First();
            
            if(first.Issuer == "Google")
            {
                Email = claims.FindFirstValue(ClaimTypes.Email)?.DecodeUnicode() ?? string.Empty;
                Name = claims.FindFirstValue(ClaimTypes.GivenName)?.DecodeUnicode();
                Surname = claims.FindFirstValue(ClaimTypes.Surname)?.DecodeUnicode();
                AvatarId = claims.FindFirstValue("picture");
                EmailConfirmed = XBooleanConverter.Parse(claims.FindFirstValue("email_verified") ?? string.Empty);
            }
            else
            {
                Login = claims.FindFirstValue(ClaimTypes.Name)?.DecodeUnicode() ?? string.Empty;
                Email = claims.FindFirstValue(ClaimTypes.Email)?.DecodeUnicode() ?? string.Empty;
                Name = claims.FindFirstValue(XClaimsConstants.UserName)?.DecodeUnicode();
                Surname = claims.FindFirstValue(ClaimTypes.Surname)?.DecodeUnicode();
                AvatarId = claims.FindFirstValue("picture");
            }
        }
        #endregion
    }
    /**@}*/
}