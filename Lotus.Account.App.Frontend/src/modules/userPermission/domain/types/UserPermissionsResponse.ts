import type { IResponsePage } from 'lotus-core/modules/requestAndResponse';
import type { IUserPermissionDatasave } from './UserPermission';

/**
 * Запрос на получения всех разрешений
 */
// oxlint-disable-next-line typescript/no-empty-object-type
export interface IUserPermissionsResponse extends IResponsePage<IUserPermissionDatasave> {}
