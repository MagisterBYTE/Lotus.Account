using Lotus.Core;

namespace Lotus.Account
{
    /** \addtogroup AccountUser
    *@{*/
    /// <summary>
    /// Статический класс для определения констант и первоначальных данных подсистемы работы с пользователем.
    /// </summary>
    public static class XUserConstants
    {
        #region Fields
        /// <summary>
        /// Идентификатор администратора системы.
        /// </summary>
        public static readonly Guid AdminId = Guid.Parse("e3182c8f-87bc-4e27-a27f-b32e3e2b8018");

        /// <summary>
        /// Идентификатор старшего редактора.
        /// </summary>
        public static readonly Guid SeniorEditorId = Guid.Parse("a2183c9f-98ac-5b38-b28f-c43e3e3c9029");

        /// <summary>
        /// Идентификатор контент-менеджера.
        /// </summary>
        public static readonly Guid ContentManagerId = Guid.Parse("b3194d0a-09bd-6c49-c39a-d54f4f4da13a");

        /// <summary>
        /// Идентификатор модератора.
        /// </summary>
        public static readonly Guid ModeratorId = Guid.Parse("c41a5e1b-1ace-7d5a-d4ab-e6505f5eb24b");

        /// <summary>
        /// Идентификатор помощника редактора.
        /// </summary>
        public static readonly Guid AssistantEditorId = Guid.Parse("d52b6f2c-2bdf-8e6b-e5bc-f7616f6fc35c");

        /// <summary>
        /// Идентификатор редактора новостей.
        /// </summary>
        public static readonly Guid NewsEditorId = Guid.Parse("e63c702d-3cf0-9f7c-f6cd-08727070d46d");

        /// <summary>
        /// Идентификатор редактора должностей (специалист по кадрам).
        /// </summary>
        public static readonly Guid HrSpecialistId = Guid.Parse("f74d813e-4d01-a08d-07de-19838181e57e");

        /// <summary>
        /// Идентификатор редактора групп (руководитель отделов).
        /// </summary>
        public static readonly Guid DepartmentManagerId = Guid.Parse("085e924f-5e12-b19e-18ef-2a949292f68f");

        #endregion

        #region Users
        /// <summary>
        /// Администратор системы.
        /// </summary>
        public static readonly User Admin = new()
        {
            Id = AdminId,
            Login = "DanielDem",
            PasswordHash = XHashHelper.GetHash("!198418dsfA!"),
            Email = "dementevds@gmail.com",
            Name = "Даниил",
            Surname = "Дементьев",
            Patronymic = "Сергеевич",
            Birthday = new DateOnly(1984, 9, 19),
            RoleId = XUserRoleConstants.Admin.Id,
            HashId = XHashHelper.GetHash(AdminId.ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Старший редактор системы.
        /// </summary>
        public static readonly User SeniorEditor = new()
        {
            Id = SeniorEditorId,
            Login = nameof(SeniorEditor),
            PasswordHash = XHashHelper.GetHash("EditorPass123!"),
            Email = "maria.ivanova@example.com",
            Name = "Мария",
            Surname = "Иванова",
            Patronymic = "Петровна",
            Birthday = new DateOnly(1990, 5, 15),
            RoleId = XUserRoleConstants.Editor.Id,
            HashId = XHashHelper.GetHash(SeniorEditorId.ToString()),
            PostId = XUserPositionConstants.ChiefInspector.Id,
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Контент-менеджер системы.
        /// </summary>
        public static readonly User ContentManager = new()
        {
            Id = ContentManagerId,
            Login = nameof(ContentManager),
            PasswordHash = XHashHelper.GetHash("EditorPass456!"),
            Email = "alex.smirnov@example.com",
            Name = "Алексей",
            Surname = "Смирнов",
            Patronymic = "Александрович",
            Birthday = new DateOnly(1988, 7, 22),
            RoleId = XUserRoleConstants.Editor.Id,
            HashId = XHashHelper.GetHash(ContentManagerId.ToString()),
            PostId = XUserPositionConstants.ChiefInspector.Id,
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Модератор системы.
        /// </summary>
        public static readonly User Moderator = new()
        {
            Id = ModeratorId,
            Login = nameof(Moderator),
            PasswordHash = XHashHelper.GetHash("EditorPass789!"),
            Email = "olga.petrova@example.com",
            Name = "Ольга",
            Surname = "Петрова",
            Patronymic = "Сергеевна",
            Birthday = new DateOnly(1992, 3, 10),
            RoleId = XUserRoleConstants.Editor.Id,
            HashId = XHashHelper.GetHash(ModeratorId.ToString()),
            PostId = XUserPositionConstants.LeadingSpecialist.Id,
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Помощник редактора системы.
        /// </summary>
        public static readonly User AssistantEditor = new()
        {
            Id = AssistantEditorId,
            Login = nameof(AssistantEditor),
            PasswordHash = XHashHelper.GetHash("EditorPass101!"),
            Email = "sergey.kuznetsov@example.com",
            Name = "Сергей",
            Surname = "Кузнецов",
            Patronymic = "Игоревич",
            Birthday = new DateOnly(1995, 11, 30),
            RoleId = XUserRoleConstants.Editor.Id,
            HashId = XHashHelper.GetHash(AssistantEditorId.ToString()),
            PostId = XUserPositionConstants.Inspector.Id,
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Редактор новостей системы.
        /// </summary>
        public static readonly User NewsEditor = new()
        {
            Id = NewsEditorId,
            Login = nameof(NewsEditor),
            PasswordHash = XHashHelper.GetHash("EditorPass112!"),
            Email = "elena.vorobeva@example.com",
            Name = "Елена",
            Surname = "Воробьева",
            Patronymic = "Андреевна",
            Birthday = new DateOnly(1991, 8, 5),
            RoleId = XUserRoleConstants.Editor.Id,
            HashId = XHashHelper.GetHash(NewsEditorId.ToString()),
            PostId = XUserPositionConstants.Inspector.Id,
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Редактор должностей - специалист по кадрам.
        /// </summary>
        public static readonly User HrSpecialist = new()
        {
            Id = HrSpecialistId,
            Login = nameof(HrSpecialist),
            PasswordHash = XHashHelper.GetHash("HRPass123!"),
            Email = "hr.specialist@example.com",
            Name = "Анна",
            Surname = "Соколова",
            Patronymic = "Владимировна",
            Birthday = new DateOnly(1987, 4, 18),
            RoleId = XUserRoleConstants.EditorPost.Id,
            HashId = XHashHelper.GetHash(HrSpecialistId.ToString()),
            PostId = XUserPositionConstants.Inspector.Id,
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Редактор групп - руководитель отделов.
        /// </summary>
        public static readonly User DepartmentManager = new()
        {
            Id = DepartmentManagerId,
            Login = nameof(DepartmentManager),
            PasswordHash = XHashHelper.GetHash("GroupPass123!"),
            Email = "group.manager@example.com",
            Name = "Дмитрий",
            Surname = "Попов",
            Patronymic = "Николаевич",
            Birthday = new DateOnly(1983, 12, 25),
            RoleId = XUserRoleConstants.EditorGroup.Id,
            HashId = XHashHelper.GetHash(DepartmentManagerId.ToString()),
            PostId = XUserPositionConstants.DepartmentHead.Id,
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserIvanSidorov = new()
        {
            Id = Guid.Parse("196f7248-1a23-4c45-b567-890123456789"),
            Login = nameof(UserIvanSidorov),
            PasswordHash = XHashHelper.GetHash("UserPass123!"),
            Email = "ivan.sidorov@example.com",
            Name = "Иван",
            Surname = "Сидоров",
            Patronymic = "Михайлович",
            Birthday = new DateOnly(1993, 2, 14),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("196f7248-1a23-4c45-b567-890123456789").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserEkaterinaKuzmina = new()
        {
            Id = Guid.Parse("287a8359-2b34-5d56-c678-901234567890"),
            Login = nameof(UserEkaterinaKuzmina),
            PasswordHash = XHashHelper.GetHash("UserPass456!"),
            Email = "ekaterina.kuzmina@example.com",
            Name = "Екатерина",
            Surname = "Кузьмина",
            Patronymic = "Александровна",
            Birthday = new DateOnly(1994, 6, 8),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("287a8359-2b34-5d56-c678-901234567890").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserPetrVolkov = new()
        {
            Id = Guid.Parse("398b946a-3c45-6e67-d789-012345678901"),
            Login = nameof(UserPetrVolkov),
            PasswordHash = XHashHelper.GetHash("UserPass789!"),
            Email = "petr.volkov@example.com",
            Name = "Петр",
            Surname = "Волков",
            Patronymic = "Сергеевич",
            Birthday = new DateOnly(1996, 9, 21),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("398b946a-3c45-6e67-d789-012345678901").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserNataliaFedorova = new()
        {
            Id = Guid.Parse("4a9c057b-4d56-7f78-e89a-123456789012"),
            Login = nameof(UserNataliaFedorova),
            PasswordHash = XHashHelper.GetHash("UserPass101!"),
            Email = "natalia.fedorova@example.com",
            Name = "Наталия",
            Surname = "Федорова",
            Patronymic = "Ивановна",
            Birthday = new DateOnly(1990, 11, 3),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("4a9c057b-4d56-7f78-e89a-123456789012").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserAndreyMorozov = new()
        {
            Id = Guid.Parse("5bad168c-5e67-8089-f9ab-234567890123"),
            Login = nameof(UserAndreyMorozov),
            PasswordHash = XHashHelper.GetHash("UserPass112!"),
            Email = "andrey.morozov@example.com",
            Name = "Андрей",
            Surname = "Морозов",
            Patronymic = "Петрович",
            Birthday = new DateOnly(1989, 1, 17),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("5bad168c-5e67-8089-f9ab-234567890123").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserTatianaOrlova = new()
        {
            Id = Guid.Parse("6cbe279d-6f78-919a-0abc-345678901234"),
            Login = nameof(UserTatianaOrlova),
            PasswordHash = XHashHelper.GetHash("UserPass131!"),
            Email = "tatiana.orlova@example.com",
            Name = "Татьяна",
            Surname = "Орлова",
            Patronymic = "Владимировна",
            Birthday = new DateOnly(1992, 4, 29),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("6cbe279d-6f78-919a-0abc-345678901234").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserMikhailBelov = new()
        {
            Id = Guid.Parse("7dcf38ae-7089-a2ab-1bcd-456789012345"),
            Login = nameof(UserMikhailBelov),
            PasswordHash = XHashHelper.GetHash("UserPass415!"),
            Email = "mikhail.belov@example.com",
            Name = "Михаил",
            Surname = "Белов",
            Patronymic = "Андреевич",
            Birthday = new DateOnly(1995, 7, 12),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("7dcf38ae-7089-a2ab-1bcd-456789012345").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserSvetlanaKomarova = new()
        {
            Id = Guid.Parse("8ed049bf-819a-b3bc-2cde-567890123456"),
            Login = nameof(UserSvetlanaKomarova),
            PasswordHash = XHashHelper.GetHash("UserPass161!"),
            Email = "svetlana.komarova@example.com",
            Name = "Светлана",
            Surname = "Комарова",
            Patronymic = "Николаевна",
            Birthday = new DateOnly(1991, 10, 5),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("8ed049bf-819a-b3bc-2cde-567890123456").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserVladimirEgorov = new()
        {
            Id = Guid.Parse("9fe15ac0-92ab-c4cd-3def-678901234567"),
            Login = nameof(UserVladimirEgorov),
            PasswordHash = XHashHelper.GetHash("UserPass718!"),
            Email = "vladimir.egorov@example.com",
            Name = "Владимир",
            Surname = "Егоров",
            Patronymic = "Викторович",
            Birthday = new DateOnly(1988, 3, 8),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("9fe15ac0-92ab-c4cd-3def-678901234567").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserJuliaZhukova = new()
        {
            Id = Guid.Parse("0af26bd1-a3bc-d5de-4ef0-789012345678"),
            Login = nameof(UserJuliaZhukova),
            PasswordHash = XHashHelper.GetHash("UserPass920!"),
            Email = "julia.zhukova@example.com",
            Name = "Юлия",
            Surname = "Жукова",
            Patronymic = "Алексеевна",
            Birthday = new DateOnly(1997, 12, 15),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("0af26bd1-a3bc-d5de-4ef0-789012345678").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserRomanKirillov = new()
        {
            Id = Guid.Parse("1b037ce2-b4cd-e6ef-5f01-890123456789"),
            Login = nameof(UserRomanKirillov),
            PasswordHash = XHashHelper.GetHash("UserPass121!"),
            Email = "roman.kirillov@example.com",
            Name = "Роман",
            Surname = "Кириллов",
            Patronymic = "Олегович",
            Birthday = new DateOnly(1994, 5, 22),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("1b037ce2-b4cd-e6ef-5f01-890123456789").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserAlenaSemenova = new()
        {
            Id = Guid.Parse("2c148df3-c5de-f7f0-6012-901234567890"),
            Login = nameof(UserAlenaSemenova),
            PasswordHash = XHashHelper.GetHash("UserPass232!"),
            Email = "alena.semenova@example.com",
            Name = "Алена",
            Surname = "Семенова",
            Patronymic = "Дмитриевна",
            Birthday = new DateOnly(1993, 8, 14),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("2c148df3-c5de-f7f0-6012-901234567890").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserArtemGusev = new()
        {
            Id = Guid.Parse("3d259ef4-d6ef-08f1-7123-012345678901"),
            Login = nameof(UserArtemGusev),
            PasswordHash = XHashHelper.GetHash("UserPass343!"),
            Email = "artem.gusev@example.com",
            Name = "Артем",
            Surname = "Гусев",
            Patronymic = "Васильевич",
            Birthday = new DateOnly(1990, 1, 27),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("3d259ef4-d6ef-08f1-7123-012345678901").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserLarisaTitova = new()
        {
            Id = Guid.Parse("4e36af05-e7f0-19f2-8234-123456789012"),
            Login = nameof(UserLarisaTitova),
            PasswordHash = XHashHelper.GetHash("UserPass454!"),
            Email = "larisa.titova@example.com",
            Name = "Лариса",
            Surname = "Титова",
            Patronymic = "Юрьевна",
            Birthday = new DateOnly(1987, 11, 9),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("4e36af05-e7f0-19f2-8234-123456789012").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };

        /// <summary>
        /// Пользователь системы.
        /// </summary>
        public static readonly User UserPavelRybakov = new()
        {
            Id = Guid.Parse("5f47b006-f8f1-2af3-9345-234567890123"),
            Login = nameof(UserPavelRybakov),
            PasswordHash = XHashHelper.GetHash("UserPass565!"),
            Email = "pavel.rybakov@example.com",
            Name = "Павел",
            Surname = "Рыбаков",
            Patronymic = "Геннадьевич",
            Birthday = new DateOnly(1996, 6, 3),
            RoleId = XUserRoleConstants.User.Id,
            HashId = XHashHelper.GetHash(Guid.Parse("5f47b006-f8f1-2af3-9345-234567890123").ToString()),
            Created = DateTime.UtcNow.Date,
            Modified = DateTime.UtcNow.Date,
        };
        #endregion
    }
    /**@}*/
}