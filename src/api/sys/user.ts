import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/user/login',
  Logout = '/user/logout',
  GetUserInfo = '/user/info',
  getImageVCApi = '/getImageVC',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */


export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}



export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}

export const getImageVC = () => defHttp.post({ url: Api.getImageVCApi });
export function getUserInfo(params) {
  return defHttp.post({ url: Api.GetUserInfo, params });
}
export function doLogout() {
  return defHttp.post({ url: Api.Logout });
}
