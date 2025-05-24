using Lotus.Repository;

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
        /// <summary>
        /// Настройка сервера OpenIddict.
        /// </summary>
        /// <param name="services">Коллекция сервисов.</param>
        /// <param name="urlServer">Адрес сервера валидации.</param>
        /// <returns>Коллекция сервисов.</returns>
        public static IServiceCollection AddLotusAccountOpenIddictServices(this IServiceCollection services, string? urlServer)
        {
            // Register the OpenIddict core components.
            services.AddOpenIddict()
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
                        .SetAccessTokenLifetime(TimeSpan.FromMinutes(30))
                        .SetRefreshTokenLifetime(TimeSpan.FromMinutes(60));

                    options
                        .SetTokenEndpointUris(XRoutesConstants.TokenEndpoint)
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
            // Добавление CAccountDbContext для взаимодействия с базой данных учетных записей
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

            using var service_scope = application!.ApplicationServices!.GetService<IServiceScopeFactory>()!.CreateScope();
            using var context = service_scope.ServiceProvider.GetRequiredService<AccountDbContext>();

            try
            {
                await context.Database.MigrateAsync();
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc.ToString());
            }
        }
    }
    /**@}*/
}