using Microsoft.EntityFrameworkCore;

namespace Lotus.Account
{
    /** \addtogroup AccountConfiguration
    *@{*/
    /// <summary>
    /// Статический класс для конфигурации и инициализации базы данных.
    /// </summary>
    public static class XDbSeed
    {
        #region Create methods
        /// <summary>
        /// Создание сущностей по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void Create(ModelBuilder modelBuilder)
        {
            CreatePost(modelBuilder);
            CreatePermission(modelBuilder);
            CreateRoles(modelBuilder);
            CreateRolePermission(modelBuilder);
            CreateUser(modelBuilder);
            CreateGroup(modelBuilder);
            CreateUserGroup(modelBuilder);
        }

        /// <summary>
        /// Создание пользователя (сущностей типа <see cref="User"/>) - Администратора системы и тестовых пользователей.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreateUser(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<User>();

            // Данные
            model.HasData(
                // Администраторы
                XUserConstants.Admin,

                // Редакторы
                XUserConstants.SeniorEditor,
                XUserConstants.ContentManager,
                XUserConstants.Moderator,
                XUserConstants.AssistantEditor,
                XUserConstants.NewsEditor,
                XUserConstants.HrSpecialist,
                XUserConstants.DepartmentManager,

                // Пользователи
                XUserConstants.UserIvanSidorov,
                XUserConstants.UserEkaterinaKuzmina,
                XUserConstants.UserPetrVolkov,
                XUserConstants.UserNataliaFedorova,
                XUserConstants.UserAndreyMorozov,
                XUserConstants.UserTatianaOrlova,
                XUserConstants.UserMikhailBelov,
                XUserConstants.UserSvetlanaKomarova,
                XUserConstants.UserVladimirEgorov,
                XUserConstants.UserJuliaZhukova,
                XUserConstants.UserRomanKirillov,
                XUserConstants.UserAlenaSemenova,
                XUserConstants.UserArtemGusev,
                XUserConstants.UserLarisaTitova,
                XUserConstants.UserPavelRybakov
            );
        }

        /// <summary>
        /// Создание взаимосвязи между пользователем и группой (сущностей типа <see cref="UserGroupRelation"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreateUserGroup(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserGroupRelation>();

            // Данные
            int idCounter = 1; // Счетчик для генерации уникальных ID

            var relations = new List<UserGroupRelation>();

            // Распределение пользователей по группам:

            // 1. Администраторы и высшие редакторы - в группу "Хранители"
            relations.AddRange(new[]
            {
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.Guardians.Id, UserId = XUserConstants.AdminId },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.Guardians.Id, UserId = XUserConstants.SeniorEditorId },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.Guardians.Id, UserId = XUserConstants.ContentManagerId },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.Guardians.Id, UserId = XUserConstants.DepartmentManagerId },
            });

            // 2. Редакторы и специалисты - в группу "Север" (административный персонал)
            relations.AddRange(new[]
            {
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.North.Id, UserId = XUserConstants.ModeratorId },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.North.Id, UserId = XUserConstants.AssistantEditorId },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.North.Id, UserId = XUserConstants.NewsEditorId },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.North.Id, UserId = XUserConstants.HrSpecialistId },
            });

            // 3. Первые 4 обычных пользователя - в группу "Восток"
            relations.AddRange(new[]
            {
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.East.Id, UserId = XUserConstants.UserIvanSidorov.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.East.Id, UserId = XUserConstants.UserEkaterinaKuzmina.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.East.Id, UserId = XUserConstants.UserPetrVolkov.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.East.Id, UserId = XUserConstants.UserNataliaFedorova.Id },
            });

            // 4. Следующие 4 обычных пользователя - в группу "Юг"
            relations.AddRange(new[]
            {
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.South.Id, UserId = XUserConstants.UserAndreyMorozov.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.South.Id, UserId = XUserConstants.UserTatianaOrlova.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.South.Id, UserId = XUserConstants.UserMikhailBelov.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.South.Id, UserId = XUserConstants.UserSvetlanaKomarova.Id },
            });

            // 5. Оставшиеся 4 обычных пользователя - в группу "Запад"
            relations.AddRange(new[]
            {
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.West.Id, UserId = XUserConstants.UserVladimirEgorov.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.West.Id, UserId = XUserConstants.UserJuliaZhukova.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.West.Id, UserId = XUserConstants.UserRomanKirillov.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.West.Id, UserId = XUserConstants.UserAlenaSemenova.Id },
            });

            // 6. Последние 3 пользователя - распределяем по разным группам (чтобы группы были не пустыми)
            relations.AddRange(new[]
            {
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.East.Id, UserId = XUserConstants.UserArtemGusev.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.South.Id, UserId = XUserConstants.UserLarisaTitova.Id },
                new UserGroupRelation() { Id = idCounter++, GroupId = XUserGroupConstants.West.Id, UserId = XUserConstants.UserPavelRybakov.Id },
            });

            // Добавление всех связей в модель
            model.HasData(relations.ToArray());
        }

        /// <summary>
        /// Создание ролей (сущностей типа <see cref="UserRole"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreateRoles(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserRole>();

            // Данные
            model.HasData(XUserRoleConstants.Admin,
                XUserRoleConstants.Editor,
                XUserRoleConstants.EditorPost,
                XUserRoleConstants.EditorGroup,
                XUserRoleConstants.User);
        }

        /// <summary>
        /// Создание должностей (сущностей типа <see cref="UserPosition"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreatePost(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserPosition>();

            // Данные
            model.HasData(
                XUserPositionConstants.Inspector,
                XUserPositionConstants.ChiefInspector,
                XUserPositionConstants.LeadingSpecialist,
                XUserPositionConstants.DepartmentHead);
        }

        /// <summary>
        /// Создание разрешений (сущностей типа <see cref="UserPermission"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreatePermission(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserPermission>();

            // Данные - базовые роли
            model.HasData(
                // Разрешения для работы с пользователями
                XUserPermissionConstants.UserView,
                XUserPermissionConstants.UserAdd,
                XUserPermissionConstants.UserEdit,
                XUserPermissionConstants.UserRemove,

                // Разрешения для работы с ролями
                XUserPermissionConstants.RoleView,
                XUserPermissionConstants.RoleAdd,
                XUserPermissionConstants.RoleEdit,
                XUserPermissionConstants.RoleRemove,

                // Разрешения для работы с разрешениями
                XUserPermissionConstants.PermissionView,
                XUserPermissionConstants.PermissionAdd,
                XUserPermissionConstants.PermissionEdit,
                XUserPermissionConstants.PermissionRemove,

                // Разрешения для работы с должностями
                XUserPermissionConstants.PositionView,
                XUserPermissionConstants.PositionAdd,
                XUserPermissionConstants.PositionEdit,
                XUserPermissionConstants.PositionRemove,
                XUserPermissionConstants.PositionChoose,

                // Разрешения для работы с группами
                XUserPermissionConstants.GroupView,
                XUserPermissionConstants.GroupAdd,
                XUserPermissionConstants.GroupEdit,
                XUserPermissionConstants.GroupRemove,
                XUserPermissionConstants.GroupChoose,

                // Разрешения для работы с направлениями деятельности
                XUserPermissionConstants.FieldActivityView,
                XUserPermissionConstants.FieldActivityAdd,
                XUserPermissionConstants.FieldActivityEdit,
                XUserPermissionConstants.FieldActivityRemove,
                XUserPermissionConstants.FieldActivityChoose
            );
        }

        /// <summary>
        /// Создание взаимосвязи между ролью и разрешением (сущностей типа <see cref="UserRolePermissionRelation"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreateRolePermission(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserRolePermissionRelation>();

            // Данные
            int idCounter = 1; // Счетчик для генерации уникальных ID

            var relations = new List<UserRolePermissionRelation>();

            // 1. Для роли администратора - все доступные разрешения
            var adminRoleId = XUserRoleConstants.Admin.Id;
            var allPermissions = new[]
            {
                // Разрешения для работы с пользователями
                XUserPermissionConstants.UserView,
                XUserPermissionConstants.UserAdd,
                XUserPermissionConstants.UserEdit,
                XUserPermissionConstants.UserRemove,
        
                // Разрешения для работы с ролями
                XUserPermissionConstants.RoleView,
                XUserPermissionConstants.RoleAdd,
                XUserPermissionConstants.RoleEdit,
                XUserPermissionConstants.RoleRemove,
        
                // Разрешения для работы с разрешениями
                XUserPermissionConstants.PermissionView,
                XUserPermissionConstants.PermissionAdd,
                XUserPermissionConstants.PermissionEdit,
                XUserPermissionConstants.PermissionRemove,
        
                // Разрешения для работы с должностями
                XUserPermissionConstants.PositionView,
                XUserPermissionConstants.PositionAdd,
                XUserPermissionConstants.PositionEdit,
                XUserPermissionConstants.PositionRemove,
                XUserPermissionConstants.PositionChoose,
        
                // Разрешения для работы с группами
                XUserPermissionConstants.GroupView,
                XUserPermissionConstants.GroupAdd,
                XUserPermissionConstants.GroupEdit,
                XUserPermissionConstants.GroupRemove,
                XUserPermissionConstants.GroupChoose,
        
                // Разрешения для работы с направлениями деятельности
                XUserPermissionConstants.FieldActivityView,
                XUserPermissionConstants.FieldActivityAdd,
                XUserPermissionConstants.FieldActivityEdit,
                XUserPermissionConstants.FieldActivityRemove,
                XUserPermissionConstants.FieldActivityChoose
            };

            // Добавление всех разрешений для администратора
            foreach (var permission in allPermissions)
            {
                relations.Add(new UserRolePermissionRelation()
                {
                    Id = idCounter++,
                    RoleId = adminRoleId,
                    PermissionId = permission.Id,
                });
            }

            // 2. Для роли редактора - все доступные разрешения, за исключением работы с пользователями 
            // и возможности редактирования любых сущностей
            var editorRoleId = XUserRoleConstants.Editor.Id;
            var editorPermissions = new[]
            {
                // Разрешения для работы с ролями (только просмотр)
                XUserPermissionConstants.RoleView,
        
                // Разрешения для работы с разрешениями (только просмотр)
                XUserPermissionConstants.PermissionView,
        
                // Разрешения для работы с должностями (только просмотр и выбор)
                XUserPermissionConstants.PositionView,
                XUserPermissionConstants.PositionChoose,
        
                // Разрешения для работы с группами (только просмотр и выбор)
                XUserPermissionConstants.GroupView,
                XUserPermissionConstants.GroupChoose,
        
                // Разрешения для работы с направлениями деятельности (только просмотр и выбор)
                XUserPermissionConstants.FieldActivityView,
                XUserPermissionConstants.FieldActivityChoose
            };

            foreach (var permission in editorPermissions)
            {
                relations.Add(new UserRolePermissionRelation()
                {
                    Id = idCounter++,
                    RoleId = editorRoleId,
                    PermissionId = permission.Id
                });
            }

            // 3. Для роли редактора должностей - все доступные разрешения, за исключением работы 
            // с пользователями и возможности редактирования любых сущностей, кроме должности
            var editorPostRoleId = XUserRoleConstants.EditorPost.Id;
            var editorPostPermissions = new[]
            { 
                // Разрешения для работы с должностями (полный доступ)
                XUserPermissionConstants.PositionView,
                XUserPermissionConstants.PositionAdd,
                XUserPermissionConstants.PositionEdit,
                XUserPermissionConstants.PositionRemove,
                XUserPermissionConstants.PositionChoose,
        
                // Разрешения для работы с ролями (только просмотр)
                XUserPermissionConstants.RoleView,
        
                // Разрешения для работы с разрешениями (только просмотр)
                XUserPermissionConstants.PermissionView,
        
                // Разрешения для работы с группами (только просмотр и выбор)
                XUserPermissionConstants.GroupView,
                XUserPermissionConstants.GroupChoose,
        
                // Разрешения для работы с направлениями деятельности (только просмотр и выбор)
                XUserPermissionConstants.FieldActivityView,
                XUserPermissionConstants.FieldActivityChoose
            };

            foreach (var permission in editorPostPermissions)
            {
                relations.Add(new UserRolePermissionRelation()
                {
                    Id = idCounter++,
                    RoleId = editorPostRoleId,
                    PermissionId = permission.Id
                });
            }

            // 4. Для роли редактора групп - все доступные разрешения, за исключением работы 
            // с пользователями и возможности редактирования любых сущностей, кроме групп
            var editorGroupRoleId = XUserRoleConstants.EditorGroup.Id;
            var editorGroupPermissions = new[]
            {
                // Разрешения для работы с группами (полный доступ)
                XUserPermissionConstants.GroupView,
                XUserPermissionConstants.GroupAdd,
                XUserPermissionConstants.GroupEdit,
                XUserPermissionConstants.GroupRemove,
                XUserPermissionConstants.GroupChoose,
        
                // Разрешения для работы с ролями (только просмотр)
                XUserPermissionConstants.RoleView,
        
                // Разрешения для работы с разрешениями (только просмотр)
                XUserPermissionConstants.PermissionView,
        
                // Разрешения для работы с должностями (только просмотр и выбор)
                XUserPermissionConstants.PositionView,
                XUserPermissionConstants.PositionChoose,
        
                // Разрешения для работы с направлениями деятельности (только просмотр и выбор)
                XUserPermissionConstants.FieldActivityView,
                XUserPermissionConstants.FieldActivityChoose
            };

            foreach (var permission in editorGroupPermissions)
            {
                relations.Add(new UserRolePermissionRelation()
                {
                    Id = idCounter++,
                    RoleId = editorGroupRoleId,
                    PermissionId = permission.Id
                });
            }

            // 5. Для роли пользователя - все разрешения на просмотр и возможности выбора
            var userRoleId = XUserRoleConstants.User.Id;
            var userPermissions = new[]
            { 
                // Разрешения на просмотр
                XUserPermissionConstants.UserView,
                XUserPermissionConstants.RoleView,
                XUserPermissionConstants.PermissionView,
                XUserPermissionConstants.PositionView,
                XUserPermissionConstants.GroupView,
                XUserPermissionConstants.FieldActivityView,
        
                // Разрешения на выбор
                XUserPermissionConstants.PositionChoose,
                XUserPermissionConstants.GroupChoose,
                XUserPermissionConstants.FieldActivityChoose
            };

            foreach (var permission in userPermissions)
            {
                relations.Add(new UserRolePermissionRelation()
                {
                    Id = idCounter++,
                    RoleId = userRoleId,
                    PermissionId = permission.Id
                });
            }

            // Добавление всех связей в модель
            model.HasData(relations.ToArray());
        }

        /// <summary>
        /// Создание групп (сущностей типа <see cref="UserGroup"/>) по умолчанию.
        /// </summary>
        /// <param name="modelBuilder">Интерфейс для построения моделей.</param>
        public static void CreateGroup(ModelBuilder modelBuilder)
        {
            // Определение для таблицы
            var model = modelBuilder.Entity<UserGroup>();

            // Данные
            model.HasData(XUserGroupConstants.Guardians,
                XUserGroupConstants.North,
                XUserGroupConstants.South,
                XUserGroupConstants.East,
                XUserGroupConstants.West);
        }
        #endregion
    }
    /**@}*/
}