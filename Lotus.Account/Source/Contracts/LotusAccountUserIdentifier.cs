namespace Lotus.Account
{
    /**
     * \defgroup AccountInterfaces Подсистема интерфейсов
     * \ingroup Account
     * \brief Подсистема интерфейсов модуля.
     * @{
     */
    /// <summary>
    /// Интерфейс для определения идентификационных данных пользователя.
    /// </summary>
    public interface IUserIdentifier
    {
        #region Properties
        /// <summary>
        /// Логин пользователя.
        /// </summary>
        public string Login { get; set; }

        /// <summary>
        /// Почта пользователя.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Статус подтверждения почты.
        /// </summary>
        public bool EmailConfirmed { get; set; }
        #endregion
    }
    /**@}*/
}