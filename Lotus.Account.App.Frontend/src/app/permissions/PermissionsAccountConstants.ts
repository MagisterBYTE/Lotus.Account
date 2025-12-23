/**
 * Статический класс, содержащий константы разрешений для модуля "Аккаунт".
 * Используется для типизации и предотвращения ошибок при работе с разрешениями.
 */
export abstract class PermissionsAccountConstants
{
  /**
   * Разрешение на просмотр пользователей
   */
  public static readonly UserView = 'UserView';
  
  /**
   * Разрешение на добавление новых пользователей
   */
  public static readonly UserAdd = 'UserAdd';
  
  /**
   * Разрешение на редактирование пользователей
   */
  public static readonly UserEdit = 'UserEdit';
  
  /**
   * Разрешение на удаление пользователей
   */
  public static readonly UserRemove = 'UserRemove';

  /**
   * Разрешение на просмотр ролей
   */
  public static readonly RoleView = 'RoleView';
  
  /**
   * Разрешение на добавление новых ролей
   */
  public static readonly RoleAdd = 'RoleAdd';
  
  /**
   * Разрешение на редактирование ролей
   */
  public static readonly RoleEdit = 'RoleEdit';
  
  /**
   * Разрешение на удаление ролей
   */
  public static readonly RoleRemove = 'RoleRemove';

  /**
   * Разрешение на просмотр разрешений
   */
  public static readonly PermissionView = 'PermissionView';
  
  /**
   * Разрешение на добавление новых разрешений
   */
  public static readonly PermissionAdd = 'PermissionAdd';
  
  /**
   * Разрешение на редактирование разрешений
   */
  public static readonly PermissionEdit = 'PermissionEdit';
  
  /**
   * Разрешение на удаление разрешений
   */
  public static readonly PermissionRemove = 'PermissionRemove';

  /**
   * Разрешение на просмотр должностей
   */
  public static readonly PositionView = 'PositionView';
  
  /**
   * Разрешение на добавление новых должностей
   */
  public static readonly PositionAdd = 'PositionAdd';
  
  /**
   * Разрешение на редактирование должностей
   */
  public static readonly PositionEdit = 'PositionEdit';
  
  /**
   * Разрешение на удаление должностей
   */
  public static readonly PositionRemove = 'PositionRemove';
  
  /**
   * Разрешение на выбор должностей (использование в выпадающих списках и формах)
   */
  public static readonly PositionChoose = 'PositionChoose';

  /**
   * Разрешение на просмотр групп
   */
  public static readonly GroupView = 'GroupView';
  
  /**
   * Разрешение на добавление новых групп
   */
  public static readonly GroupAdd = 'GroupAdd';
  
  /**
   * Разрешение на редактирование групп
   */
  public static readonly GroupEdit = 'GroupEdit';
  
  /**
   * Разрешение на удаление групп
   */
  public static readonly GroupRemove = 'GroupRemove';
  
  /**
   * Разрешение на выбор групп (использование в выпадающих списках и формах)
   */
  public static readonly GroupChoose = 'GroupChoose';

  /**
   * Разрешение на просмотр направлений деятельности
   */
  public static readonly FieldActivityView = 'FieldActivityView';
  
  /**
   * Разрешение на добавление новых направлений деятельности
   */
  public static readonly FieldActivityAdd = 'FieldActivityAdd';
  
  /**
   * Разрешение на редактирование направлений деятельности
   */
  public static readonly FieldActivityEdit = 'FieldActivityEdit';
  
  /**
   * Разрешение на удаление направлений деятельности
   */
  public static readonly FieldActivityRemove = 'FieldActivityRemove';
  
  /**
   * Разрешение на выбор направлений деятельности (использование в выпадающих списках и формах)
   */
  public static readonly FieldActivityChoose = 'FieldActivityChoose';
}