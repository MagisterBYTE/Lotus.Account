import { LocalizationCore } from 'lotus-core/localization';
import { ResponseHelper, type IRequest, type IResponse, type IResponsePage } from 'lotus-core/modules/requestAndResponse';
import type { TKey } from 'lotus-core/types';
import { TableView, TableViewPropsPreset } from 'lotus-ui-react/components/DataView';
import { Notifications } from 'lotus-ui-react/modules/feedback';
import { UserPermissionService } from '../../UserPermissionService';
import { UserPermissionHelper, UserPermissionObjectInfo, UserPermissionValidator } from '../../domain';
import type { IUserPermission } from '../../domain/types';

export function UserPermissionList()
{
  const validator = new UserPermissionValidator();

  // #region Table methods
  const onGetItems = async (filter: IRequest): Promise<IResponsePage<IUserPermission>> =>
  {
    try
    {
      const response = await UserPermissionService.getAll(filter);
      const result = ResponseHelper.transformPage(response, UserPermissionHelper.fromDatasave);
      return result;
    }
    catch (error)
    {
      const response = ResponseHelper.responsePageFromErrorResult<IUserPermission>(error);
      Notifications.showError(error, { title: LocalizationCore.data.actions.gettingFailed });
      return Promise.resolve(response);
    }
  };

  const onUpdateItem = async (item: IUserPermission): Promise<IResponse<IUserPermission>> =>
  {
    try
    {
      const datasave = UserPermissionHelper.toDatasave(item);
      const response = await UserPermissionService.update(datasave);
      Notifications.showSuccess(LocalizationCore.data.actions.savingSucceed);
      const result = ResponseHelper.transform(response, UserPermissionHelper.fromDatasave);
      return result;
    }
    catch (error)
    {
      const response = ResponseHelper.responseFromErrorResult(error, item);
      Notifications.showError(error, { title: LocalizationCore.data.actions.savingFailed });
      return Promise.resolve(response);
    }
  };

  const onDeleteItem = async (id: TKey): Promise<IResponse> =>
  {
    try
    {
      const response = await UserPermissionService.remove(Number(id));
      Notifications.showSuccess(LocalizationCore.data.actions.deletingSucceed);
      return response;
    }
    catch (error)
    {
      const response = ResponseHelper.responseFromErrorResult(error);
      Notifications.showError(error, { title: LocalizationCore.data.actions.deletingFailed });
      return Promise.resolve(response);
    }
  };
  // #endregion

  return (
    <TableView<IUserPermission> 
      objectInfo={UserPermissionObjectInfo}
      validator={validator}
      onDeleteItem={onDeleteItem}
      onGetItems={onGetItems}
      onUpdateItem={onUpdateItem}
      {...TableViewPropsPreset.getCrud()}
    />
  );
}