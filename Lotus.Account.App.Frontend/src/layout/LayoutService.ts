import type { TCssWidth } from 'lotus-ui-react/types';
import { LayoutStateConstants, ViewSettingsConstants } from './domain/constants';
import type { ILayoutState, TScreenType } from './domain/types';

/**
 * Сервис для работы с токенами
 */
class LayoutServiceClass
{
  // #region Static fields
  /**
  * Ключ под которым сохраняется макет сайта
  */
  public static readonly LayoutStateKey: string = 'lotus-layout-state' as const;

  private static _layoutService: LayoutServiceClass;

  public static get Instance(): LayoutServiceClass 
  {
    return (this._layoutService || (this._layoutService = new this()));
  }
  // #endregion

  // #region Static methods
  /**
   * Загрузка макета сайта из локального хранилища 
   * @returns Макет сайта или макет сайта по умолчанию
   */
  public static loadFromStorage(): ILayoutState
  {
    const value = localStorage.getItem(LayoutServiceClass.LayoutStateKey);
    if (value)
    {
      const layoutState: ILayoutState = JSON.parse(value);
      return layoutState;
    }
    else
    {
      return LayoutStateConstants.Desktop;
    }
  }

  /**
   * Сохранение текущего макета сайта в локальное хранилище
   * @param layoutState Макет сайта
   */
  public static saveToStorage(layoutState: ILayoutState)
  {
    const value = JSON.stringify(layoutState);
    localStorage.setItem(LayoutServiceClass.LayoutStateKey, value);
  }
  // #endregion

  // #region Fields
  public layoutState: ILayoutState;
  // #endregion

  constructor()
  {
    this.layoutState = { ...LayoutStateConstants.Desktop };
  }

  // #region LayoutState methods
  public setScreenType(screenType: TScreenType)
  {
    switch (screenType)
    {
      case 'desktop':
        {
          this.layoutState.header.isVisible = true;
          this.layoutState.header.height = ViewSettingsConstants.Desktop.headerHeight;

          this.layoutState.leftPanel.maxWidth = ViewSettingsConstants.Desktop.leftPanelWidthMax;
          this.layoutState.leftPanel.minWidth = ViewSettingsConstants.Desktop.leftPanelWidthMin;
          this.layoutState.leftPanel.width = ViewSettingsConstants.Desktop.leftPanelWidthMin;
          this.layoutState.rightPanel.maxWidth = ViewSettingsConstants.Desktop.rightPanelWidthMax;
          this.layoutState.rightPanel.minWidth = ViewSettingsConstants.Desktop.rightPanelWidthMin;
          this.layoutState.rightPanel.width = ViewSettingsConstants.Desktop.rightPanelWidthMin;

          this.layoutState.footer.height = ViewSettingsConstants.Desktop.footerHeight;
          this.layoutState.footer.isVisible = true;
        } break;
      case 'landscape':
        {
          this.layoutState.header.isVisible = false;

          this.layoutState.leftPanel.maxWidth = ViewSettingsConstants.Landscape.leftPanelWidthMax;
          this.layoutState.leftPanel.minWidth = ViewSettingsConstants.Landscape.leftPanelWidthMin;
          this.layoutState.leftPanel.width = ViewSettingsConstants.Landscape.leftPanelWidthMin;
          this.layoutState.rightPanel.maxWidth = ViewSettingsConstants.Landscape.rightPanelWidthMax;
          this.layoutState.rightPanel.minWidth = ViewSettingsConstants.Landscape.rightPanelWidthMin;
          this.layoutState.rightPanel.width = ViewSettingsConstants.Landscape.rightPanelWidthMin;

          this.layoutState.footer.isVisible = false;
        } break;
      case 'portrait':
        {
          this.layoutState.header.isVisible = true;
          this.layoutState.header.height = ViewSettingsConstants.Portrait.headerHeight;

          this.layoutState.leftPanel.maxWidth = ViewSettingsConstants.Portrait.leftPanelWidthMax;
          this.layoutState.leftPanel.minWidth = ViewSettingsConstants.Portrait.leftPanelWidthMin;
          this.layoutState.leftPanel.width = ViewSettingsConstants.Portrait.leftPanelWidthMin;
          this.layoutState.rightPanel.maxWidth = ViewSettingsConstants.Portrait.rightPanelWidthMax;
          this.layoutState.rightPanel.minWidth = ViewSettingsConstants.Portrait.rightPanelWidthMin;
          this.layoutState.rightPanel.width = ViewSettingsConstants.Portrait.rightPanelWidthMin;

          this.layoutState.footer.height = ViewSettingsConstants.Portrait.footerHeight;
          this.layoutState.footer.isVisible = true;
        } break;
    }
  }

  public showHeader(visible: boolean)
  {
    this.layoutState.header.isVisible = visible;
  }

  public showHeaderUser(visible: boolean)
  {
    this.layoutState.header.isVisibleUser = visible;
  }

  public showLeftPanel(visible: boolean)
  {
    this.layoutState.leftPanel.isVisible = visible;
  }

  public openLeftPanel(open: boolean)
  {
    this.layoutState.leftPanel.isOpen = open;
  }

  public setWidthLeftPanel(width: TCssWidth)
  {
    this.layoutState.leftPanel.width = width;
  }

  public addCommandLeftPanel(commandName: string)
  {
    if (this.layoutState.leftPanelCommands)
    {
      if (this.layoutState.leftPanelCommands.includes(commandName) === false)
      {
        this.layoutState.leftPanelCommands.push(commandName);
      }
    }
    else
    {
      this.layoutState.leftPanelCommands = [commandName];
    }
  }

  public removeCommandLeftPanel(commandName: string)
  {
    if (this.layoutState.leftPanelCommands)
    {
      this.layoutState.leftPanelCommands = this.layoutState.leftPanelCommands.filter(x => x !== commandName);
    }
  }

  public setCommandsLeftPanel(commandsName: string[])
  {
    this.layoutState.leftPanelCommands = [...commandsName];
  }

  public showRightPanel(visible: boolean)
  {
    this.layoutState.rightPanel.isVisible = visible;
  }

  public openRightPanel(open: boolean)
  {
    this.layoutState.rightPanel.isOpen = open;
  }

  public showFooter(visible: boolean)
  {
    this.layoutState.footer.isVisible = visible;
  }

  public showFooterUser(visible: boolean)
  {
    this.layoutState.footer.isVisibleUser = visible;
  }

  public collapseFooter(collapsed: boolean)
  {
    this.layoutState.footer.isCollapsed = collapsed;
  }
  // #endregion
}

/**
 * Глобальный доступ к сервису по формированию макета сайта 
 */
export const LayoutService = LayoutServiceClass.Instance;
