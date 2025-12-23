using System.Net;
using System.Security.Claims;

using Lotus.Repository;
using Lotus.Web;

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;
using OpenIddict.Validation.AspNetCore;

using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Lotus.Account
{
    public class GoogleAuth
    {
        public string ReturnUrl { get; set; }
    }

    /**
     * \defgroup AccountWebApiController Подсистема контролеров
     * \ingroup AccountWebApi
     * \brief Подсистема контролеров.
     * @{
     */
    /// <summary>
    /// Контролёр для авторизации и аутентификации пользователя.
    /// </summary>
    [ApiController]
    [Route($"{XConstants.PrefixApi}/[controller]")]
    public class AuthorizeController : ControllerBase
    {
        #region Const
        private const string AuthenticationSchemes = $"{CookieAuthenticationDefaults.AuthenticationScheme},{OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme}";
        #endregion

        #region Fields
        private readonly IOpenIddictApplicationManager _applicationManager;
        private readonly IOpenIddictAuthorizationManager _authorizationManager;
        private readonly IOpenIddictScopeManager _scopeManager;
        private readonly ILotusAuthorizeService _authorizeService;
        private readonly ILogger<AuthorizeController> _logger;
        #endregion

        #region Constructors
        /// <summary>
        /// Конструктор инициализирует объект класса указанными параметрами.
        /// </summary>
        /// <param name="applicationManager">Менеджер приложений.</param>
        /// <param name="authorizationManager">Менеджер авторизации.</param>
        /// <param name="scopeManager">Менеджер прав.</param>
        /// <param name="authorizeService">Сервис для авторизации пользователя.</param>
        /// <param name="logger">Сервис для логгирования.</param>
        public AuthorizeController(IOpenIddictApplicationManager applicationManager,
            IOpenIddictAuthorizationManager authorizationManager,
            IOpenIddictScopeManager scopeManager, ILotusAuthorizeService authorizeService,
            ILogger<AuthorizeController> logger)
        {
            _applicationManager = applicationManager;
            _authorizationManager = authorizationManager;
            _scopeManager = scopeManager;
            _authorizeService = authorizeService;
            _logger = logger;
        }
        #endregion

        #region Auth cookie
        /// <summary>
        /// Аутентификация пользователя через Cookie.
        /// </summary>
        /// <param name="loginParameters">Параметры входа.</param>
        /// <returns>Информация о пользователе.</returns>
        [HttpPost(nameof(LoginCookie))]
        public async Task<IActionResult> LoginCookie([FromBody] LoginParametersDto loginParameters)
        {
            var response = await _authorizeService.LoginAsync(loginParameters);

            const string cookieAuth = CookieAuthenticationDefaults.AuthenticationScheme;

            // 1. Неавторизован. Конкретная причина в сообщении 
            if (response.Result != null && response.Result.Succeeded == false)
            {
                return Unauthorized(response.Result);
            }

            var userInfo = response.Payload;

            // 2. Получаем claims для куки (ограниченный набор)
            var claims = _authorizeService.GetClaims(userInfo, true);

            // 3. Создаем identity и claimsPrincipal
            var claimsIdentity = new ClaimsIdentity(claims, cookieAuth);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            // 4. Заполняем параметры аутентификации
            var authProperties = new AuthenticationProperties
            {
                // true - постоянная кука, которая сохраняется после закрытия браузера, 
                // false - сессионная кука (удаляется при закрытии браузера)
                IsPersistent = loginParameters.RememberMe,

                // Абсолютное время истечения срока действия
                // Сессия живет 7 дней
                ExpiresUtc = loginParameters.RememberMe ? DateTimeOffset.UtcNow.AddDays(XRememberMeConstants.CountDays) : null,

                // Разрешает ли обновлять сессию (продлевать срок действия)
                // При true пользователь остаётся аутентифицированным при активности
                AllowRefresh = loginParameters.RememberMe,

                // Время создания билета аутентификации
                // Используется для расчёта возраста сессии
                IssuedUtc = DateTimeOffset.UtcNow
            };

            // 4. Создаем куку
            await HttpContext.SignInAsync(cookieAuth, claimsPrincipal, authProperties);

            var userName = claimsPrincipal.GetClaim(ClaimTypes.Name)!;
            _logger.LogInformation("Вход пользователя через Password: {User}", userName);

            userInfo.AuthScheme = cookieAuth;
            userInfo.AuthExpires = loginParameters.RememberMe ? DateTime.UtcNow.AddDays(XRememberMeConstants.CountDays) 
                : DateTime.UtcNow.AddHours(1);

            return Ok(userInfo);
        }

        /// <summary>
        /// Получение информации о статусе аутентификации текущего пользователя.
        /// </summary>
        /// <returns>Информация о статусе аутентификации текущего пользователя.</returns>
        [HttpGet(nameof(GetUserInfoCookie))]
        [Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserInfoCookie()
        {
            const string cookieAuth = CookieAuthenticationDefaults.AuthenticationScheme;

            var result = await HttpContext.AuthenticateAsync(cookieAuth)!;

            if(result.Succeeded == false)
            {
                return BadRequest(result.Failure);
            }

            var claimsPrincipal = result.Principal;

            if (claimsPrincipal is not null)
            {
                if (claimsPrincipal.Identity?.AuthenticationType == cookieAuth)
                {
                    // Всегда получаем актуальную информацию
                    var hashId = claimsPrincipal.GetClaim(ClaimTypes.NameIdentifier)!;

                    var response = await _authorizeService.GetUserInfoAsync(hashId);

                    var userInfo = response.Payload;

                    // 1. Неавторизован. Конкретная причина в сообщении 
                    if (response.Result != null && response.Result.Succeeded == false)
                    {
                        return Unauthorized(response.Result);
                    }

                    userInfo.AuthScheme = cookieAuth;

                    if (result.Properties is not null)
                    {

                    }

                    return new JsonResult(userInfo);
                }
                if (claimsPrincipal.Identity?.AuthenticationType == GoogleDefaults.AuthenticationScheme)
                {
                    // Есть минимальная информация в claims
                    var userInfo = new UserAuthorizeInfo(claimsPrincipal.Claims);
                    userInfo.AuthScheme = GoogleDefaults.AuthenticationScheme;
                    return new JsonResult(userInfo);
                }

                return Unauthorized("Пользователь не авторизован");
            }
            else
            {
                return Unauthorized("Пользователь не авторизован");
            }
        }

        /// <summary>
        /// Выход пользователя
        /// </summary>
        [HttpPost(nameof(LogoutCookie))]
        [Authorize]
        public async Task<IActionResult> LogoutCookie()
        {
            var userName = User.GetClaim(ClaimTypes.Name)!;

            // 1. Выходим из нашей куки
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            // 2. Если был вход через Google - выходим и оттуда
            if (User.FindFirstValue("AuthProvider") == "Google")
            {
                await HttpContext.SignOutAsync(GoogleDefaults.AuthenticationScheme);
            }

            // 3. Очищаем куку
            Response.Cookies.Delete(XRememberMeConstants.CookieName);

            _logger.LogInformation("Выход пользователя: {User}", userName);

            return Ok();
        }
        #endregion

        #region Auth token
        /// <summary>
        /// Аутентификация пользователя через токен.
        /// </summary>
        /// <returns>Общий результат работы.</returns>
        [HttpPost($"~{XRoutesConstants.TokenEndpoint}")]
        public async Task<IActionResult> LoginToken()
        {
            const string jwtAuth = OpenIddictServerAspNetCoreDefaults.AuthenticationScheme;

            var request = HttpContext.GetOpenIddictServerRequest() ??
                throw new InvalidOperationException("The OpenID Connect loginParameters cannot be retrieved.");

            if (request == null)
            {
                _logger.LogWarning("OpenID Connect loginParameters is null");
                return BadRequest("Invalid authentication loginParameters");
            }

            var rememberMe = HttpContext.GetRequestHeaderValueAsBool(XRememberMeConstants.HeaderName);

            if (request.GrantType == GrantTypes.Password)
            {
                LoginParametersDto parameters = new()
                {
                    Login = request.Username!,
                    Password = request.Password!,
                    RememberMe = rememberMe
                };

                //var device = HttpContext.GetDeviceFromRequest();
                //var browser = HttpContext.GetBrowserFromRequest();

                var response = await _authorizeService.LoginAsync(parameters);

                // 1. Неавторизован. Конкретная причина в сообщении 
                if (response.Result != null && response.Result.Succeeded == false)
                {
                    return Unauthorized(response.Result);
                }

                // 2. Получаем claims для токена (полный набор)
                var claims = _authorizeService.GetClaims(response.Payload, false);

                // 3. Создаем identity и claimsPrincipal
                var claimsIdentity = new ClaimsIdentity(claims, jwtAuth);
                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                // 4. Сопоставляем набор утверждений
                claimsPrincipal.SetScopes(XOpenIddictConfiguration.GetScopesDefaults());
                foreach (var claim in claimsPrincipal.Claims)
                {
                    claim.SetDestinations(GetDestinations(claim, claimsPrincipal));
                }

                if (rememberMe)
                {
                    var cookieOptions = new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.Lax,
                        Expires = DateTime.UtcNow.AddDays(XRememberMeConstants.CountDays)
                    };
                    HttpContext.Response.Cookies.Append(XRememberMeConstants.CookieName, response.Payload.HashId!, cookieOptions);
                }

                // Входим
                var resultSign = SignIn(claimsPrincipal, jwtAuth);

                var userName = claimsPrincipal.GetClaim(ClaimTypes.Name)!;
                _logger.LogInformation("Вход пользователя через Password: {User}", userName);

                return resultSign;
            }
            else
            {
                if (request.GrantType == GrantTypes.RefreshToken)
                {
                    // Retrieve the claims claimsPrincipal stored in the refresh token.
                    var result = await HttpContext.AuthenticateAsync(jwtAuth)!;

                    var claimsPrincipal = result.Principal!;

                    // 4. Сопоставляем набор утверждений
                    claimsPrincipal.SetScopes(XOpenIddictConfiguration.GetScopesDefaults());
                    foreach (var claim in claimsPrincipal.Claims)
                    {
                        claim.SetDestinations(GetDestinations(claim, claimsPrincipal));
                    }

                    // Входим
                    var resultSign = SignIn(claimsPrincipal, OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

                    var userName = claimsPrincipal.GetClaim(ClaimTypes.Name)!;
                    _logger.LogInformation("Вход пользователя через RefreshToken: {User}", userName);

                    return resultSign;
                }
                else
                {
                    return BadRequest();
                }
            }
        }

        /// <summary>
        /// Вход через куку RememberMe.
        /// </summary>
        /// <returns>Общий результат работы.</returns>
        [HttpPost(nameof(RememberMe))]
        public async Task<IActionResult> RememberMe()
        {
            const string jwtAuth = OpenIddictServerAspNetCoreDefaults.AuthenticationScheme;

            // Чтение HttpOnly куки
            if (Request.Cookies.TryGetValue(XRememberMeConstants.CookieName, out var hashId))
            {
                var response = await _authorizeService.GetUserInfoAsync(hashId);

                // 1. Неавторизован. Конкретная причина в сообщении 
                if (response.Result != null && response.Result.Succeeded == false)
                {
                    return Unauthorized(response.Result);
                }

                // 2. Получаем claims для токена (полный набор)
                var claims = _authorizeService.GetClaims(response.Payload, false);

                // 3. Создаем identity и claimsPrincipal
                var claimsIdentity = new ClaimsIdentity(claims, jwtAuth);
                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                // 4. Сопоставляем набор утверждений
                claimsPrincipal.SetScopes(XOpenIddictConfiguration.GetScopesDefaults());
                foreach (var claim in claimsPrincipal.Claims)
                {
                    claim.SetDestinations(GetDestinations(claim, claimsPrincipal));
                }

                // Входим
                var resultSign = SignIn(claimsPrincipal, jwtAuth);

                var userName = claimsPrincipal.GetClaim(ClaimTypes.Name)!;
                _logger.LogInformation("Вход пользователя через RememberMe: {User}", userName);

                return resultSign;

            }

            return BadRequest();
        }

        /// <summary>
        /// Выход из статуса аутентификации пользователя.
        /// </summary>
        /// <returns>Общий результат работы.</returns>
        [HttpPost($"~{XRoutesConstants.LogoutEndpoint}")]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> LogoutToken()
        {
            // Удаляем сессионные куки
            Response.Cookies.Delete(XRememberMeConstants.CookieName);

            await _authorizeService.LogoutAsync();

            return SignOut(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        /// <summary>
        /// Получить набор разрешений.
        /// </summary>
        /// <param name="claim"></param>
        /// <param name="principal"></param>
        /// <returns></returns>
        private IEnumerable<string> GetDestinations(Claim claim, ClaimsPrincipal principal)
        {
            // Note: by default, claims are NOT automatically included in the access and identity tokens.
            // To allow OpenIddict to serialize them, you must attach them a destination, that specifies
            // whether they should be included in access tokens, in identity tokens or in both.

            switch (claim.Type)
            {
                case Claims.Name:
                    yield return Destinations.AccessToken;

                    if (principal.HasScope(Scopes.Profile))
                    {
                        yield return Destinations.IdentityToken;
                    }

                    yield break;

                case Claims.Email:
                    yield return Destinations.AccessToken;

                    if (principal.HasScope(Scopes.Email))
                    {
                        yield return Destinations.IdentityToken;
                    }

                    yield break;

                case Claims.Role:
                    yield return Destinations.AccessToken;

                    if (principal.HasScope(Scopes.Roles))
                    {
                        yield return Destinations.IdentityToken;
                    }

                    yield break;

                // Never include the security stamp in the access and identity tokens, as it's a secret value.
                case "AspNet.Identity.SecurityStamp": yield break;

                default:
                    yield return Destinations.AccessToken;
                    yield break;
            }
        }

        #endregion

        #region Auth Google
        /// <summary>
        /// Аутентификация пользователя через Google.
        /// </summary>
        /// <param name="returnUrl">Url для возврата на фронт.</param>
        /// <returns>Общий результат работы.</returns>
        [HttpGet(nameof(LoginGoogle))]
        public async Task<ActionResult> LoginGoogle([FromQuery] string returnUrl = "/")
        {
            var authProperties = new AuthenticationProperties
            {
                RedirectUri = returnUrl,
                // Дополнительные параметры при необходимости
                Items =
                {
                    { "prompt", "select_account" } // Всегда показывать выбор аккаунта
                }
            };

            // Это инициирует OAuth-поток и перенаправит на Google
            return Challenge(authProperties, GoogleDefaults.AuthenticationScheme);
        }

        /// <summary>
        /// Получение информации о статусе аутентификации текущего пользователя.
        /// </summary>
        /// <returns>Информация о статусе аутентификации текущего пользователя.</returns>
        [HttpGet(nameof(GetUserInfoGoogle))]
        [Authorize(AuthenticationSchemes = GoogleDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserInfoGoogle()
        {
            var result = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme)!;
            var claimsPrincipal = result.Principal;

            if (claimsPrincipal is not null)
            {
                // Всегда получаем актуальную информацию
                var hashId = claimsPrincipal.GetClaim(ClaimTypes.NameIdentifier)!;

                var response = await _authorizeService.GetUserInfoAsync(hashId);

                // 1. Неавторизован. Конкретная причина в сообщении 
                if (response.Result != null && response.Result.Succeeded == false)
                {
                    return Unauthorized(response.Result);
                }
                return new JsonResult(response.Payload);
            }
            else
            {
                return BadRequest("Пользователь не авторизован");
            }
        }
        #endregion

        #region Main methods
        /// <summary>
        /// Регистрация нового пользователя.
        /// </summary>
        /// <param name="registerParameters">Параметры для регистрации нового пользователя.</param>
        /// <param name="token">Токен отмены.</param>
        /// <returns>Общий результат работы.</returns>
        [HttpPost(nameof(Register))]
        public async Task<IActionResult> Register([FromBody] RegisterParametersDto registerParameters,
            CancellationToken token)
        {
            var result = await _authorizeService.RegisterAsync(registerParameters, token);
            return SendResponse(result);
        }

        /// <summary>
        /// Отправка ответа с указанными данными.
        /// </summary>
        /// <param name="response">Базовый интерфейс получения данных.</param>
        /// <returns>Ответ.</returns>
        protected IActionResult SendResponse(ILotusResponse response)
        {
            if (response == null)
            {
                return BadRequest();
            }

            if (response.Result == null)
            {
                return Ok(response);
            }

            if (response.Result!.Succeeded)
            {
                if (response.Result.HttpCode.HasValue)
                {
                    switch (response.Result.HttpCode)
                    {
                        case HttpStatusCode.Created: return Created("", response);
                        case HttpStatusCode.NoContent: return NoContent();
                        default: return Ok(response);
                    }
                }
                else
                {
                    return Ok(response);
                }
            }
            else
            {
                if (response.Result.HttpCode.HasValue)
                {
                    switch (response.Result.HttpCode)
                    {
                        case HttpStatusCode.NotFound: return NotFound(response);
                        case HttpStatusCode.Forbidden: return Forbid();
                        default: return BadRequest(response);
                    }
                }
                else
                {
                    return BadRequest(response.Result);
                }
            }
        }
        #endregion
    }
    /**@}*/
}