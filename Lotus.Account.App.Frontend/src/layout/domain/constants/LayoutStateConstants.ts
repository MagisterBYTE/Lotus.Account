import type { ILayoutState } from '../types';
import { ViewSettingsConstants } from './ViewSettingsConstants';

export class LayoutStateConstants
{
  /**
   * Макет сайта по умолчанию для десктопного сайта
   */
  public static readonly Desktop: ILayoutState = {

    screenType: 'desktop',

    header:
    {
      height: ViewSettingsConstants.Desktop.headerHeight,
      isVisible: true,
      isVisibleUser: true
    },
    leftPanel:
    {
      isVisible: true,
      isOpen: false,
      maxWidth: ViewSettingsConstants.Desktop.leftPanelWidthMax,
      minWidth: ViewSettingsConstants.Desktop.leftPanelWidthMin,
      width: ViewSettingsConstants.Desktop.leftPanelWidthMin
    },
    rightPanel:
    {
      isVisible: false,
      isOpen: false,
      maxWidth: ViewSettingsConstants.Desktop.rightPanelWidthMax,
      minWidth: ViewSettingsConstants.Desktop.rightPanelWidthMin,
      width: ViewSettingsConstants.Desktop.rightPanelWidthMin
    },
    footer:
    {
      height: ViewSettingsConstants.Desktop.footerHeight,
      isVisible: true,
      isVisibleUser: true,
      isCollapsed: true
    }
  };
}