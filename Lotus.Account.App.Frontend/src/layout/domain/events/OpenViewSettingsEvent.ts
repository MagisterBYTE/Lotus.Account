import type { IBaseEventCommandData } from 'lotus-core';

/**
 * Дискриминатор события об открытии визуальных настроек
 */
export const OpenViewSettingsEventDiscriminator:string = 'OpenViewSettingsEventDiscriminator';

/**
 * Данные события об открытии визуальных настроек
 */
export interface IOpenViewSettingsEventData extends IBaseEventCommandData 
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sender?:any;
}