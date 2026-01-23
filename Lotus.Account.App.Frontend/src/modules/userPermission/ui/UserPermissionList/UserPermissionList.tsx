import { LocalizationCore } from 'lotus-core/localization';
import { ResponseHelper, type IRequest, type IResponse, type IResponsePage } from 'lotus-core/modules/requestAndResponse';
import { TableView } from 'lotus-ui-react/components/DataView';
import { Notifications } from 'lotus-ui-react/modules/feedback';
import { UserPermissionService } from '../../UserPermissionService';
import { UserPermissionHelper } from '../../domain/UserPermissionHelper';
import { UserPermissionObjectInfo } from '../../domain/UserPermissionObjectInfo';
import type { IUserPermission } from '../../domain/types';

export function UserPermissionList()
{
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
  // #endregion

  return (
    <TableView<IUserPermission> 
      defaultColumn={{
        minSize: 100,
        maxSize: 300,
        size: 260
      }}
      displayColumnDefOptions={{
        'mrt-row-actions': 
        {
          size: 240,
          grow: true
        },
        'mrt-row-select': {
          size: 10, // adjust the size of the row select column
          grow: false // new in v2.8 (default is false for this column)
        },
        'mrt-row-numbers': {
          size: 10, // adjust the size of the row select column
          grow: false // new in v2.8 (default is false for this column)
        }
      }}
      enableColumnFilterModes={true}
      enableColumnResizing={true}
      enableEditing={true}
      enableRowActions={true}
      enableRowNumbers={true}
      enableRowSelection={true}
      enableSelectAll={true}
      initialState={{
        columnPinning: { right: ['mrt-row-actions'], left: ['mrt-row-expand', 'mrt-row-select'] }
      }}
      mantinePaperProps={{ style: { width: '100%' } }} 
      objectInfo={UserPermissionObjectInfo}
      positionActionsColumn='last' 
      onGetItems={onGetItems}
      onUpdateItem={onUpdateItem}
    />
  );
}