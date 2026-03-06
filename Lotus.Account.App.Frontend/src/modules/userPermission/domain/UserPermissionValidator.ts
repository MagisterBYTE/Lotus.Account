import { BaseValidator } from 'lotus-core/modules/validation';
import type { IUserPermission } from './types/UserPermission';

/**
 * Валидатор разрешений
 */
export class UserPermissionValidator extends BaseValidator
{
  // #region IValidator
  public override validate(obj: IUserPermission): boolean
  {
    this.validationStatus.clear();
    this.validationStatus.addErrorRequired('name', obj.name);
    this.validationStatus.addErrorMaxString('name', obj.name, 20);
    this.validationStatus.addErrorRequired('displayName', obj.displayName);
    this.validationStatus.addErrorMaxString('displayName', obj.displayName, 60);
    return this.validationStatus.isValid();
  }
  // #endregion
}