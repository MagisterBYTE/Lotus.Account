using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountPermission
    *@{*/
    /// <summary>
    /// Класс разрешения.
    /// </summary>
    public class UserPermissionDto : IdentifierDtoId<int>, ILotusNameable
    {
        /// <summary>
        /// Наименование разрешения.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование разрешения.
        /// </summary>
        public string? DisplayName { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
    /**@}*/
}