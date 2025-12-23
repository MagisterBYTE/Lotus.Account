using Mapster;

namespace Lotus.Account
{
    /**
     * \defgroup AccountMapping Маппинг данных
     * \ingroup Account
     * \brief Маппинг данных.
     * @{
     */
    /// <summary>
    /// Статический класс для маппинга данных.
    /// </summary>
    public static class XMapping
    {
        public static void Init()
        {
            TypeAdapterConfig<UserRole, UserRoleDto>
                .NewConfig()
                .Map(x => x.PermissionIds, x => x.Permissions.Select(o => o.Id).ToArray());

            TypeAdapterConfig<UserRole, UserRoleDto>
                .NewConfig()
                .Map(dest => dest.PermissionIds, src => src.Permissions.Select(p => p.Id).ToArray());

            TypeAdapterConfig<User, UserAuthorizeInfo>
                .NewConfig()
                .Map(x => x.Role, x => x.Role)
                .Map(x => x.Permissions, x => x.Role.Permissions)
                .Map(x => x.Position, x => x.Post)
                .Map(x => x.Groups, x => x.Groups);
        }
    }
    /**@}*/
}