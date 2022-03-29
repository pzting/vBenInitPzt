import {
  RoleParams,
} from './model';
import {defHttp} from '/@/utils/http/axios';

enum Api {

  /** 2022/3/23
   *作者:pzt
   *内容:权限点页面
   **/
  authorityPointTreeApi = '/authorityPoint/tree',
  authorityPointSaveApi = '/authorityPoint/addOrUpdate',

  /** 2022/3/23
   *作者:pzt
   *内容:权限页面
   **/
  authorityTreeApi = '/authority/tree',
  authoritySaveApi = '/authority/addOrUpdate',
  authorityIdsApi = '/authority/ownAuthPointIds',

  /** 2022/3/23
   *作者:pzt
   *内容:角色页面
   **/
  roleListApi = '/role/list',
  roleAllApi = '/role/all',
  roleSaveApi = '/role/addOrUpdate',
  roleAuthIdsApi = '/role/ownAuthIds',
  roleDataIdsApi = '/role/ownDataAuths',
  dataAuthListApi = '/dataAuth/list',
  dataAuthPageApi = '/dataAuth/page',

  /** 2022/3/23
   *作者:pzt
   *内容:用户页面
   **/
  userPageApi = '/user/page',
  userSaveApi = '/user/addOrEdit',
  userRolesApi = '/user/ownRoles',
  userResetPwdApi = '/user/resetPwd',

  /** 2022/3/27
   *作者:pzt
   *内容:修改密码页面
   **/
  userUpdatePwdApi = '/user/updatePwd',
}


/** 2022/3/23
 *作者:pzt
 *内容:权限点页面
 **/
// defHttp.post({url: Api.setRoleStatus, params: {id, status}});
// defHttp.post({url: Api.IsAccountExist, params: {account}}, {errorMessageMode: 'none'});
export const authorityPointTree = (params) =>
  defHttp.post({url: Api.authorityPointTreeApi, params});
export const authorityPointSave = (params) =>
  defHttp.post({url: Api.authorityPointSaveApi, params});

/** 2022/3/23
 *作者:pzt
 *内容:权限页面
 **/
export const authorityTree = (params) => defHttp.post({url: Api.authorityTreeApi, params});
export const authoritySave = (params) => defHttp.post({url: Api.authoritySaveApi, params});
export const authorityIds = (params) => defHttp.post({url: Api.authorityIdsApi, params});

/** 2022/3/23
 *作者:pzt
 *内容:角色页面
 **/
export const roleList = (params:RoleParams) =>
  defHttp.post({url: Api.roleListApi, params}, {isTransformResponse: true});
export const roleAll = (params) => defHttp.post({url: Api.roleAllApi, params});
export const roleSave = (params) => defHttp.post({url: Api.roleSaveApi, params});
export const roleAuthIds = (params) => defHttp.post({url: Api.roleAuthIdsApi, params});
export const roleDataIds = (params) => defHttp.post({url: Api.roleDataIdsApi, params});
export const dataAuthList = (params) => defHttp.post({url: Api.dataAuthListApi, params});
export const dataAuthPage = (params) => defHttp.post({url: Api.dataAuthPageApi, params});

/** 2022/3/23
 *作者:pzt
 *内容:用户页面
 **/
export const userPage = (params) => defHttp.post({url: Api.userPageApi, params});
export const userSave = (params) => defHttp.post({url: Api.userSaveApi, params});
export const userRoles = (params) => defHttp.post({url: Api.userRolesApi, params});
export const userResetPwd = (params) => defHttp.post({url: Api.userResetPwdApi, params});

/** 2022/3/27
 *作者:pzt
 *内容:修改密码页面
 **/
export const userUpdatePwd = (params) => defHttp.post({url: Api.userUpdatePwdApi, params});
