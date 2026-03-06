import { GuidHelper, ObjectHelper } from 'lotus-core/helpers';
import { RefreshProxy } from 'lotus-core/modules/refreshProxy';
import { ValidationResult } from 'lotus-core/modules/validation';
import { type IConstantable, type IEditable, type IDatasavable } from 'lotus-core/types';
import { Assert } from 'lotus-core/utils';
import type { IUserPermission, IUserPermissionDatasave } from './types/UserPermission';

/**
 * Разрешение
 */
export class UserPermission extends RefreshProxy implements IUserPermission, IConstantable, IEditable, IDatasavable<IUserPermissionDatasave>
{
  // #region Fields
  public readonly id: number;
  public name: string;
  public displayName?: string;
  public isConst?: boolean;
  public isNew: boolean;
  public datasave?: IUserPermissionDatasave;
  public validationStatus: ValidationResult = new ValidationResult();
  public key: string;
  // endregion

  constructor(datasave?: IUserPermissionDatasave)
  {
    super();
    if (datasave)
    {
      this.id = datasave.id;
      this.name = datasave.name;
      this.displayName = datasave.displayName;
      this.isNew = false;
      this.datasave = datasave;
    }
    else
    {
      this.id = 0;
      this.name = '';
      this.displayName = '';
      this.isNew = true;
    }
    this.key = GuidHelper.generateShortUUID();
  }

  // #region Update methods
  public setName(name: string, isRefreshProxy: boolean = true): void
  {
    this.name = name;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setDisplayName(displayName: string, isRefreshProxy: boolean = true): void
  {
    this.displayName = displayName;
    if (isRefreshProxy) this.onRefreshProxy();
  }
  // #endregion

  // #region IEditObject
  /**
   * Проверка необходимости сохранения объекта
   * Объект необходимо сохранить, если он новый или имеет изменения по сравнению с изначальным состоянием и прошел валидацию
   * @returns Статус необходимости сохранения объекта
   */
  public needSave(): boolean 
  {
    const hasChanges = this.hasChanges();

    if (hasChanges === false) return false;

    return this.validate();
  }

  /**
   * Проверка изменения объекта по сравнению с изначальным состоянием
   * @returns Статус изменения объекта
   */
  public hasChanges(): boolean 
  {
    if (!this.datasave) 
    {
      return true;
    }

    const currentState = this.toDatasave();

    const isEqual = ObjectHelper.equality(this.datasave, currentState
    );

    return !isEqual;
  }
  // #endregion

  // #region IResetObject
  /**
   * Возвращает статус возможности сброса изменений к изначальному состоянию
   * @returns Статус возможности сброса изменений
   */
  public canReset(): boolean
  {
    return Assert.existValue(this.datasave);
  }

  /**
   * Сброс изменений к изначальному состоянию
   */
  public resetState(isRefreshProxy: boolean = true): void
  {
    if (this.datasave)
    {
      this.name = this.datasave.name;
      this.displayName = this.datasave.displayName;
      if (isRefreshProxy) this.onRefreshProxy();
    }
  }

  /**
   * Сброс значения поля по его имени к изначальному состоянию
   * @param fieldName 
   */
  public resetField(fieldName: keyof IUserPermissionDatasave, isRefreshProxy: boolean = true): void
  {
    if (this.datasave)
    {
      switch (fieldName)
      {
        case 'id': break;
        case 'name': 
          {
            this.name = this.datasave.name; 
            if (isRefreshProxy) this.onRefreshProxy();
          }
          break;
        case 'displayName': 
          {
            this.displayName = this.datasave.displayName; 
            if (isRefreshProxy) this.onRefreshProxy();
          } break;
      }
    }
  }
  // #endregion

  // #region IValidate
  public validate():boolean
  {
    this.validationStatus.clear();
    this.validationStatus.addErrorRequired('name', this.name);
    this.validationStatus.addErrorMaxString('name', this.name, 20);
    this.validationStatus.addErrorRequired('displayName', this.displayName);
    this.validationStatus.addErrorMaxString('displayName', this.displayName, 60);
    return this.validationStatus.isValid();
  }
  // #endregion

  // #region IDatasavable
  public toDatasave(): IUserPermissionDatasave
  {
    const datasave: IUserPermissionDatasave =
    {
      id: this.isNew ? -1 : this.id,
      name: this.name,
      displayName: this.displayName
    };

    return datasave;
  }
  // #endregion
}