import { RefreshProxy } from 'lotus-core/modules/refreshProxy';
import { ValidationResult, type IValidateObject } from 'lotus-core/modules/validation';
import { LocalizationAccount } from '#localization';
import type { IAccountChangePassword } from './types';

export class AccountChangePassword extends RefreshProxy implements IAccountChangePassword, IValidateObject
{
  // #region Fields
  public currentPassword: string;
  public newPassword: string;
  public confirmPassword: string;
  public hashId: string;
  public validationStatus: ValidationResult;
  // #endregion

  constructor(hashId: string)
  {
    super();
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.hashId = hashId;
    this.validationStatus = new ValidationResult();
  }

  // #region Update methods
  public setCurrentPassword(currentPassword: string, isRefreshProxy: boolean = true): void
  {
    this.currentPassword = currentPassword;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setNewPassword(newPassword: string, isRefreshProxy: boolean = true): void
  {
    this.newPassword = newPassword;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setConfirmPassword(confirmPassword: string, isRefreshProxy: boolean = true): void
  {
    this.confirmPassword = confirmPassword;
    if (isRefreshProxy) this.onRefreshProxy();
  }
  // #endregion

  // #region IValidateObject
  public validate(): boolean 
  {
    this.validationStatus.clear();
    this.validationStatus.addErrorRequired('currentPassword', this.currentPassword);
    this.validationStatus.addErrorMaxString('currentPassword', this.currentPassword, 20);
    this.validationStatus.addErrorRequired('newPassword', this.newPassword);
    this.validationStatus.addErrorMaxString('newPassword', this.newPassword, 20);
    this.validationStatus.addErrorRequired('confirmPassword', this.confirmPassword);
    this.validationStatus.addErrorMaxString('confirmPassword', this.confirmPassword, 20);
    this.validationStatus.addErrorCustom('confirmPassword', this.confirmPassword === this.newPassword, LocalizationAccount.data.account.securityValidPassword);
    return this.validationStatus.isValid();
  }
  // #endregion
}