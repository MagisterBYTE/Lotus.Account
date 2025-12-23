using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountGroup
    *@{*/
    /// <summary>
    /// Класс группы.
    /// </summary>
    public class UserGroupDto : IdentifierDtoId<int>, ILotusNameable
    {
        /// <summary>
        /// Наименование группы.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование группы.
        /// </summary>
        public string? DisplayName { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
    /**@}*/
}