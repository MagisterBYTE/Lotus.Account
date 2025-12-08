import type { ILayoutFooter } from "./LayoutFooter";
import type { ILayoutHeader } from "./LayoutHeader";
import type { ILayoutSidePanel } from "./LayoutSidePanel";
import type { TScreenType } from "./ScreenType";

/**
 * Состояние макета сайта
 */
export interface ILayoutState
{
  /**
   * Параметры типа/ориентация экрана
   */
  screenType: TScreenType;

  /**
   * Параметры шапки сайта
   */
  header: ILayoutHeader;

  /**
  * Параметры левой панели
  */
  leftPanel: ILayoutSidePanel;

  /**
  * Имена команд левой панели
  */
  leftPanelCommands?: string[];

  /**
  * Параметры правой панели
  */
  rightPanel: ILayoutSidePanel;

  /**
  * Имена команд правой панели
  */
  rightPanelCommands?: string[];

  /**
   * Параметры подвала сайта
   */
  footer: ILayoutFooter;
}