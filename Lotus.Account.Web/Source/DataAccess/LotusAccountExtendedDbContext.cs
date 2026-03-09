using Lotus.Web;

using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /// <summary>
    /// Расширенный контекст базы данных пользователей.
    /// </summary>
    public class AccountExtendedDbContext : AccountDbContext
    {
        // EF Core требует этот конструктор для правильной работы DI и миграций.
        // Мы принимаем DbContextOptions именно для НАШЕГО класса (MyExtendedDbContext)
        // и передаем их в базовый конструктор.
        public AccountExtendedDbContext(DbContextOptions<AccountExtendedDbContext> options)
            : base(options)
        {
        }

        public DbSet<Device> Devices => Set<Device>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 1. ОБЯЗАТЕЛЬНО вызываем base.
            // Там AccountDbContext (или OpenIddictDbContext) настраивает свои сущности.
            base.OnModelCreating(modelBuilder);

            // 2. Применяем ваши настройки схемы для OpenIddict
            // Теперь это безопасно, так как base.OnModelCreating уже добавил эти сущности в модель.
            XOpenIddictConfiguration.SetSchemeForTable(modelBuilder);

            // 3. Настраиваем Device (можно через Fluent API или здесь же)
            Device.ModelCreating(modelBuilder, XDbConstants.SchemeName);
        }
    }
}
