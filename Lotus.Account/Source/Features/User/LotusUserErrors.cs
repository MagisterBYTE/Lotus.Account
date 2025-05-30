using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountUser
    *@{*/
    /// <summary>
    /// Статический класс для определения ошибок подсистемы работы с пользователем.
    /// </summary>
    public static class XUserErrors
    {
        #region Fields
        /// <summary>
        /// Пользователь не найден.
        /// </summary>
        public static readonly Result UserNotFound = new()
        {
            Code = 1000,
            Message = "Пользователь не найден",
            Succeeded = false,
        };

        /// <summary>
        /// Настроена двухфакторная авторизация.
        /// </summary>
        public static readonly Result RequiresTwoFactor = new()
        {
            Code = 1002,
            Message = "Настроена двухфакторная авторизация",
            Succeeded = false,
        };

        /// <summary>
        /// Пользователь заблокирован.
        /// </summary>
        public static readonly Result UserLocked = new()
        {
            Code = 1003,
            Message = "Пользователь заблокирован",
            Succeeded = false,
        };

        /// <summary>
        /// Неверный пароль.
        /// </summary>
        public static readonly Result WrongPassword = new()
        {
            Code = 1004,
            Message = "Неверный пароль",
            Succeeded = false,
        };

        /// <summary>
        /// Данный логин уже используется.
        /// </summary>
        public static readonly Result LoginAlreadyUse = new()
        {
            Code = 1008,
            Message = "Данный логин уже используется",
            Succeeded = false,
        };

        /// <summary>
        /// Небезопасный пароль.
        /// </summary>
        public static readonly Result InsecurePassword = new()
        {
            Code = 1009,
            Message = "Небезопасный пароль",
            Succeeded = false,
        };

        /// <summary>
        /// Нельзя удалить предустановленных пользователей.
        /// </summary>
        public static readonly Result NotDeleteConst = new()
        {
            Code = 1010,
            Message = "Нельзя удалить предустановленных пользователей",
            Succeeded = false,
        };
        #endregion
    }
    /**@}*/
}