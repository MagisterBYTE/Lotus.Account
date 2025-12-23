using Lotus.Repository;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.EntityFrameworkCore;

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
        #region Methods
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

            services.AddCors(options =>
            {
                options.AddPolicy(AllowLocalWithCredentials,
                    policy =>
                    {
                        policy.WithOrigins(frontSettings.MainUri)
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
                    //// Allow grant_type=client_credentials to be negotiated.
                    //options.AllowClientCredentialsFlow();

                    //// Disable token storage, which is not necessary for non-interactive flows like
                    //// grant_type=password, grant_type=client_credentials or grant_type=refresh_token.
                    //options.DisableTokenStorage();

                    //// Register the System.Net.Http integration.
                    //options.UseSystemNetHttp();

                    //// Add a client registration with the client identifier and secrets issued by the server.
                    //options.AddRegistration(new OpenIddictClientRegistration
                    //{
                    //    Issuer = new Uri("https://localhost:3000/", UriKind.Absolute),

                    //    ClientId = authSettings.Google.ClientId,
                    //    ClientSecret = authSettings.Google.ClientSecret
                    //});

                    //// Register the Web providers integrations.
                    //options.UseWebProviders()
                    //        .AddGoogle(options =>
                    //        {
                    //            options.SetClientId(authSettings.Google.ClientId)
                    //                   .SetClientSecret(authSettings.Google.ClientSecret)
                    //                   .SetRedirectUri("callback/login/twitter");
                    //        });
                })
                .AddCore(options =>
                {
                    // Configure OpenIddict to use the EF Core stores/models.
                    options.UseEntityFrameworkCore()
                    .UseDbContext<AccountDbContext>();
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
            // Добавление AccountDbContext для взаимодействия с базой данных учетных записей
            // Используем для корректной работы OpenIddict
            services.AddDbContext<AccountDbContext>(options =>
        {
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
            using var context = serviceScope.ServiceProvider.GetRequiredService<AccountDbContext>();

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