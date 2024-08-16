import { CommandServiceClass, ICommand, EventCommand, NavigationCommand, CommandService } from 'lotus-core-react';
import { localizationAccount } from 'localization';
import { routesAccount } from 'app/routes';

class AdminCommandsClass extends CommandServiceClass
{
  private static _AdminCommands: AdminCommandsClass;

  public static override get Instance(): AdminCommandsClass
  {
    return this._AdminCommands || (this._AdminCommands = new this());
  }

  // #region Properties
  /**
   * Управление ролями
   */
  roles: ICommand;

  /**
   * Управление разрешениями
   */
  permissions: ICommand;

  /**
   * Управление должностями
   */
  positions: ICommand;

  /**
   * Управление группами
   */
  groups: ICommand;
  // #endregion

  constructor()
  {
    super();

    this.roles = new NavigationCommand('userRoles', routesAccount.userRoles);
    this.roles = new EventCommand('userRoles');
    this.roles.label = localizationAccount.role.roles;
    this.roles.group = 'admin';
    this.commands.push(this.roles);

    this.permissions = new NavigationCommand('userPermissions', routesAccount.userPermissions);
    this.permissions.label = localizationAccount.permission.permissions;
    this.permissions.group = 'admin';
    this.commands.push(this.permissions);

    this.positions = new NavigationCommand('userPositions', routesAccount.userPositions);
    this.positions.label = localizationAccount.position.positions;
    this.positions.group = 'admin';
    this.commands.push(this.positions);

    this.groups = new NavigationCommand('userGroups', routesAccount.userGroups);
    this.groups.label = localizationAccount.group.groups;
    this.groups.group = 'admin';
    this.commands.push(this.groups);

    CommandService.addCommands(this.commands);
  }
}

/**
 * Глобальный доступ к командам связанным с управлением пользователями
 */
export const AdminCommands = AdminCommandsClass.Instance;
