using System.ComponentModel.DataAnnotations;

namespace Lotus.Account
{
    /** \addtogroup AccountAuthorize
	*@{*/
    /// <summary>
    /// Класс для регистрации нового пользователя через внешние провайдеры.
    /// </summary>
    public class LotusRegisterExternalParametersDto : RegisterParametersDto
    {
        /// <summary>
        /// Идентификатор внешнего провайдера.
        /// </summary>
        public string AuthProvider { get; set; }

        /// <summary>
        /// Идентификатор пользователя внешнего провайдера.
        /// </summary>
        public string ExternalAuthId { get; set; }
    }
    /**@}*/
}