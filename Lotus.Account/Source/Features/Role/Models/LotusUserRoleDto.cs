using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountRole
    *@{*/
    /// <summary>
    /// Класс роли.
    /// </summary>
    public class UserRoleDto : IdentifierDtoId<int>, ILotusNameable
    {
        /// <summary>
        /// Наименование роли.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование роли.
        /// </summary>
        public string? DisplayName { get; set; }

        /// <summary>
        /// Список идентификатор разрешений для данной роли.
        /// </summary>
        public int[] PermissionIds { get; set; } = [];

        public override string ToString()
        {
            return Name;
        }
    }
    /**@}*/
}