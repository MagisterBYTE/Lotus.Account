import { FunctionHelper } from 'lotus-core/helpers';
import { RefreshProxy } from 'lotus-core/modules/refreshProxy';

export class AccountProfile extends RefreshProxy
{
  public nickName: string;
  public email: string;

  constructor()
  {
    super();
    this.nickName = '';
    this.email = '';
    FunctionHelper.bindAllMethods(this);
  }

  public setNickName(nickName: string, isRefreshProxy: boolean = false)
  {
    this.nickName = nickName;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setEmail(email: string, isRefreshProxy: boolean = false)
  {
    this.email = email;
    if (isRefreshProxy) this.onRefreshProxy();
  }
}
