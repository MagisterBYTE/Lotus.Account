using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountPosition
    *@{*/
    /// <summary>
    /// Класс должности.
    /// </summary>
    public class UserPositionDto : IdentifierDtoId<int>, ILotusNameable
    {
        /// <summary>
        /// Наименование должности.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Отображаемое наименование должности.
        /// </summary>
        public string? DisplayName { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
    /**@}*/
}