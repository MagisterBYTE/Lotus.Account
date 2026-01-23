namespace Lotus.Account
{
    /** \addtogroup AccountAuthorize
    *@{*/
    /// <summary>
    /// Класс для смены пароля
    /// </summary>
    public class ChangePasswordDto
    {
        #region Properties
        /// <summary>
        /// Текущий пароль.
        /// </summary>
        public string CurrentPassword { get; set; } = null!;

        /// <summary>
        /// Новый пароль.
        /// </summary>
        public string NewPassword { get; set; } = null!;

        /// <summary>
        /// Хешированное значение идентификатора для прямого доступа.
        /// </summary>
        public string HashId { get; set; } = null!;
        #endregion
    }
    /**@}*/
}