using Microsoft.AspNetCore.Authentication.Cookies;

using OpenIddict.Validation.AspNetCore;

namespace Lotus.Account
{
    /** \addtogroup AccountWebApiConstants
    *@{*/
    /// <summary>
    /// Константы для определения схем авторизации.
    /// </summary>
    public static class XAuthSchemeConstants
    {
        #region Const
        public const string CookieAndOpenIddict = $"{CookieAuthenticationDefaults.AuthenticationScheme},{OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme}";
        #endregion
    }
    /**@}*/
}