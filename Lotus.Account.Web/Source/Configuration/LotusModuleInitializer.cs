using System.Security.Claims;

using Lotus.Repository;
using Lotus.Web;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.EntityFrameworkCore;

using static System.Net.WebRequestMethods;

namespace Lotus.Account
{
    /**
     * \defgroup AccountWebApiConfiguration Подсистема конфигурации и инициализации
     * \ingroup AccountWebApi
     * \brief Подсистема конфигурации и инициализации.
     * @{
     */
    /// <summary>
    /// Инициализация модуль WebApi учетной записи пользователя.
    /// </summary>
    public static class XModuleInitializer
    {
        #region Const
        /// <summary>
        /// Имя политики CORS для режима разработки.
        /// </summary>
        public const string AllowLocalWithCredentials = "AllowLocalWithCredentials";

        /// <summary>
        /// Имя политики CORS для продуктовой разработки.
        /// </summary>
        public const string AllowProdWithCredentials = "AllowProdWithCredentials";
        #endregion

        #region Methods
        /// <summary>
        /// Настройка сервисов политики CORS модуля учетной записи пользователя.
        /// </summary>
        /// <param name="services">Коллекция сервисов.</param>
        /// <param name="configuration">Параметры конфигурации.</param>
        /// <returns>Коллекция сервисов.</returns>
        public static IServiceCollection AddLotusAccountCors(this IServiceCollection services,
            IConfiguration configuration)
        {
            var frontSettings = configuration.GetSection(FrontSettings.Section).Get<FrontSettings>()!;
            
            const string devTunnels = "https://v0x6bfwb-5000.euw.devtunnels.ms";
            const string localFrontHttp = "http://192.168.0.103:3000";
            const string localFrontHttps = "https://192.168.0.103:3000";

            services.AddCors(options =>
            {
                options.AddPolicy(AllowLocalWithCredentials, 
                    policy =>
                    {
                        policy.WithOrigins(frontSettings.MainUri, devTunnels, localFrontHttp, localFrontHttps)
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials();
                    });
            });

            return services;
        }

        /// <summary>
        /// Настройка сервера OpenIddict.
        /// </summary>
        /// <param name="services">Коллекция сервисов.</param>
        /// <param name="configuration">Параметры конфигурации.</param>
        /// <param name="urlServer">Адрес сервера валидации.</param>
        /// <returns>Коллекция сервисов.</returns>
        public static IServiceCollection AddLotusAccountOpenIddictServices(this IServiceCollection services,
            IConfiguration configuration, string? urlServer)
        {
            // Получаем настройки из конфигурации
            var authSettings = configuration.GetSection("Authentication").Get<AuthenticationTypes>();

            // Register the OpenIddict core components.
            services.AddOpenIddict()
                .AddClient(options =>
                {
                })
                .AddCore(options =>
                {
                    // Configure OpenIddict to use the EF Core stores/models.
                    options.UseEntityFrameworkCore()
                    .UseDbContext<AccountExtendedDbContext>();
                })

                // Register the OpenIddict server components.
                .AddServer(options =>
                {
                    options
                        .AllowPasswordFlow()            // Пароль
                        .AllowClientCredentialsFlow()   // Приложение
                        .AllowRefreshTokenFlow()        // RefreshToken
                        .SetAccessTokenLifetime(TimeSpan.FromMinutes(60))
                        .SetRefreshTokenLifetime(TimeSpan.FromMinutes(60 * 4));

                    options
                        .SetTokenEndpointUris(uris: [XRoutesConstants.TokenEndpoint, XRememberMeConstants.TokenRememberMe])
                        .SetEndSessionEndpointUris(XRoutesConstants.LogoutEndpoint)
                        .SetUserInfoEndpointUris(XRoutesConstants.UserInfoEndpoint);

                    // Register the signing and encryption credentials.
                    options
                        .AddDevelopmentEncryptionCertificate()
                        .AddDevelopmentSigningCertificate();

                    options.AcceptAnonymousClients();

                    options
                        .AddEphemeralEncryptionKey()     //  В рабочей среде рекомендуется использовать сертификат X.509
                        .AddEphemeralSigningKey()
                        .DisableAccessTokenEncryption(); // Отключить шифрование токена

                    options.RegisterScopes(XOpenIddictConfiguration.GetScopesDefaults());

                    options
                        .UseAspNetCore()
                        .DisableTransportSecurityRequirement()
                        .EnableTokenEndpointPassthrough()
                        .EnableEndSessionEndpointPassthrough()
                        .EnableUserInfoEndpointPassthrough();
                })

                // Register the OpenIddict validation components.
                .AddValidation(options =>
                {
                    options.UseAspNetCore();
                    if (string.IsNullOrEmpty(urlServer))
                    {
                        options.UseLocalServer();
                    }
                    else
                    {
                        options.SetIssuer(urlServer);
                        options.UseSystemNetHttp();
                    }
                });

            return services;
        }

        /// <summary>
        /// Настройка сервисов аутентификации модуля учетной записи пользователя.
        /// </summary>
        /// <param name="services">Коллекция сервисов.</param>
        /// <param name="configuration">Параметры конфигурации.</param>
        /// <returns>Коллекция сервисов.</returns>
        public static IServiceCollection AddLotusAccountAuthentication(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddAuthentication(options =>
            {
                // Основная схема для аутентификации через куки
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                // Схема для автоматического входа (SignIn)
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;

                // Схема для вызова Challenge (редирект на провайдера)
                options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
            })
            .AddCookie(options =>
            {
                options.Cookie.Name = XRememberMeConstants.CookieName;
                options.Cookie.SameSite = SameSiteMode.None;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromDays(XRememberMeConstants.CountDays);
            })
            .AddGoogle((googleOptions) =>
            {
                var authSettings = configuration.GetSection(AuthenticationTypes.Section).Get<AuthenticationTypes>()!;
                var frontSettings = configuration.GetSection(FrontSettings.Section).Get<FrontSettings>()!;

                googleOptions.ClientId = authSettings.Google.ClientId;
                googleOptions.ClientSecret = authSettings.Google.ClientSecret;
                googleOptions.ReturnUrlParameter = frontSettings.ReturnUrl;

                googleOptions.CallbackPath = "/signin-google";

                // Сохраняем access_token и refresh_token в свойствах
                googleOptions.SaveTokens = true;

                // Маппинг дополнительных claim'ов
                googleOptions.ClaimActions.MapJsonKey("picture", "picture");
                googleOptions.ClaimActions.MapJsonKey("locale", "locale");
                googleOptions.ClaimActions.MapJsonKey("email_verified", "email_verified");

                // Расширяем области доступа
                googleOptions.Scope.Add("profile");
                googleOptions.Scope.Add("email");
                googleOptions.Scope.Add("openid");

                // Важно: для локальной разработки
                googleOptions.AccessType = "offline";

                // Области доступа
                googleOptions.Scope.Add("email");
                googleOptions.Scope.Add("profile");

                // Это событие срабатывает сразу после успешной проверки токена от Google
                googleOptions.Events.OnTicketReceived = async context =>
                {
                    try
                    {
                        if (context.Principal is null) return;

                        // Сервисы
                        var deviceService = context.HttpContext.RequestServices.GetRequiredService<ILotusDeviceService>();
                        var authorizeService = context.HttpContext.RequestServices.GetRequiredService<ILotusAuthorizeService>();

                        // Устройство входа
                        var device = context.HttpContext.GetDeviceFromRequest();
                        var deviceId = (await deviceService.GetOrAddAsync(device, CancellationToken.None)).Id;

                        // Извлекаем минимальную информация в claims
                        var userInfo = new UserAuthorizeInfo(context.Principal.Claims);

                        // Получаем email
                        var email = userInfo.Email;

                        // 1. Достаем URL аватара (который мы замапили через MapJsonKey)
                        var pictureUrl = context.Principal?.FindFirstValue("picture");

                        if (string.IsNullOrEmpty(pictureUrl))
                        {
                            // Логгируем вход
                            await authorizeService.LogExternalAsync("Google", email, deviceId, null);
                            return;
                        }

                        // 2. Получаем HttpClient из DI (лучше использовать IHttpClientFactory)
                        var clientFactory = context.HttpContext.RequestServices.GetRequiredService<IHttpClientFactory>();
                        var httpClient = clientFactory.CreateClient();

                        // 3. Скачиваем байты картинки
                        var imageBytes = await httpClient.GetByteArrayAsync(pictureUrl);

                        // 4. Превращаем в Base64
                        var base64Avatar = Convert.ToBase64String(imageBytes);
                        var avatar64 = $"data:image/jpeg;base64,{base64Avatar}";

                        // Логгируем вход и аватар
                        await authorizeService.LogExternalAsync("Google", email, deviceId, avatar64);

                    }
                    catch (Exception)
                    {

                    }
                };
            });

            return services;
        }

        /// <summary>
        /// Настройка сервисов модуля учетной записи пользователя.
        /// </summary>
        /// <param name="services">Коллекция сервисов.</param>
        /// <returns>Коллекция сервисов.</returns>
        public static IServiceCollection AddLotusAccountServices(this IServiceCollection services)
        {
            services.AddScoped<ILotusDataStorage, DataStorageContextAccount>();
            services.AddScoped<ILotusUserService, UserService>();
            services.AddScoped<ILotusAuthorizeService, AuthorizeService>();
            services.AddScoped<ILotusUserGroupService, UserGroupService>();
            services.AddScoped<ILotusUserNotificationService, UserNotificationService>();
            services.AddScoped<ILotusUserPositionService, UserPositionService>();
            services.AddScoped<ILotusUserPermissionService, UserPermissionService>();
            services.AddScoped<ILotusUserRoleService, UserRoleService>();
            services.AddScoped<ILotusDeviceService, DeviceService>();

            XMapping.Init();

            return services;
        }

        /// <summary>
        /// Добавление в коллекцию сервисов базы данных.
        /// </summary>
        /// <param name="services">Коллекция сервисов.</param>
        /// <param name="configuration">Конфигурация.</param>
        /// <param name="connectString">Строка для подключения к базе данных. По умолчанию значение равно <see cref="XDbConstants.ConnectingUserDb"/>.</param>
        /// <param name="replaceMigrationHistoryTableName">Переместить таблицу миграции в схему <see cref="XDbConstants.SchemeName"/>.</param>
        /// <returns>Коллекция сервисов.</returns>
        public static IServiceCollection AddLotusAccountDatabaseServices(this IServiceCollection services,
            IConfiguration configuration, string connectString = XDbConstants.ConnectingUserDb,
            bool replaceMigrationHistoryTableName = true)
        {
            // Добавление AccountExtendedDbContext для взаимодействия с базой данных учетных записей
            // Используем для корректной работы OpenIddict
            services.AddDbContext<AccountExtendedDbContext>(options =>
            {
                // Нужно как то добавить модель Device

                // Добавляем сервисы OpenIddict
                options.UseOpenIddict();
                options.UseNpgsql(configuration.GetConnectionString(connectString),
                    optionsBuilder =>
                    {
                        if (replaceMigrationHistoryTableName)
                        {
                            optionsBuilder.MigrationsHistoryTable(XDbConstants.MigrationHistoryTableName,
                                XDbConstants.SchemeName);
                        }
                    });
            });

            // 2. ВАЖНО: Связываем базовый тип контекста с новым.
            // Теперь все сервисы (UserService и др.), которые хотят AccountDbContext, 
            // получат ваш AccountExtendedDbContext из контейнера.
            services.AddScoped<AccountDbContext>(provider =>
                provider.GetRequiredService<AccountExtendedDbContext>());

            return services;
        }

        /// <summary>
        /// Инициализация базы данных.
        /// </summary>
        /// <param name="application">Построитель web-приложения.</param>
        /// <returns>Задача.</returns>
        public static async Task InitLotusAccountDatabase(this IApplicationBuilder application)
        {
            ArgumentNullException.ThrowIfNull(application);

            using var serviceScope = application!.ApplicationServices!.GetService<IServiceScopeFactory>()!.CreateScope();
            using var context = serviceScope.ServiceProvider.GetRequiredService<AccountExtendedDbContext>();

            try
            {
                await context.Database.MigrateAsync();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc.ToString());
            }
        }
        #endregion
    }
    /**@}*/
}