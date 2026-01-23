import { ValidationResult, type IValidateObject } from 'lotus-core/modules/validation';
import { UserAuthorizeInfo, type IUserAuthorizeInfo } from '#modules/auth';

export class AccountProfile extends UserAuthorizeInfo implements IValidateObject
{
  // #region Fields
  public validationStatus: ValidationResult;
  // #endregion

  constructor(info?: Partial<IUserAuthorizeInfo>)
  {
    super(info);
    this.validationStatus = new ValidationResult();
  }

  // #region IValidateObject
  public validate(): boolean 
  {
    this.validationStatus.clear();
    this.validationStatus.addErrorMaxString('nikName', this.nickname, 20);
    this.validationStatus.addErrorRequired('email', this.email);
    this.validationStatus.addErrorMaxString('email', this.email, 50);
    this.validationStatus.addErrorEmail('email', this.email);
    this.validationStatus.addErrorMaxString('name', this.name, 30);
    this.validationStatus.addErrorMaxString('surname', this.surname, 30);
    this.validationStatus.addErrorMaxString('patronymic', this.patronymic, 30);
    this.validationStatus.addErrorMaxString('whereabouts', this.whereabouts, 30);
    this.validationStatus.addErrorMaxString('interests', this.interests, 250);
    return this.validationStatus.isValid();
  }
  // #endregion
}
