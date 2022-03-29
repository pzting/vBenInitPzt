import { MockMethod } from "vite-plugin-mock";
import { resultPageSuccess, resultSuccess } from "../../mock/_util";


const roleList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 44; index++) {
    result.push({
      id: `1${index}`,
      roleId: `2${index}`,
      roleName: ["超级管理员", "管理员", "文章管理员", "普通用户"][index]
    });
  }
  return result;
})();


const authorityPointTree = (() => {
  const result: any[] = [];
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      pid: "",
      authPointId: `12${index}`,
      authPointName: "@cword(4,8)",
      url: `/api/${index}`,
      authPointDesc: "@cword(10,15)",
      children: (() => {
        const children: any[] = [];
        for (let j = 0; j < 4; j++) {
          children.push({
            id: `${index}-${j}`,
            pid: `23${index}-${j}`,
            authPointId: `123${index}-${j}`,
            authPointName: "@cword(4,8)",
            url: `/api/zi/${index}`,
            authPointDesc: "@cword(10,15)",
            children: (() => {
              const children: any[] = [];
              for (let k = 0; k < 4; k++) {
                children.push({
                  id: `${index}-${j}-${k}`,
                  pid: `232${index}-${j}-${k}`,
                  authPointId: `23${index}-${j}-${k}`,
                  authPointName: "@cword(4,8)",
                  url: `/api/zi/zi/${index}`,
                  authPointDesc: "@cword(10,15)",
                  children: undefined
                });
              }
              return children;
            })()
          });
        }
        return children;
      })()
    });
  }
  return result;
})();
const userPage = (() => {
  const result: any[] = [];
  for (let index = 0; index < 4; index++) {
    result.push({
      id: index + 1,
      accountName: "@cname()",
      username: "@cname()"
    });
  }
  return result;
})();
const authorityTree = (() => {
  const result: any[] = [];
  for (let index = 0; index < 3; index++) {
    result.push({
      id: `${index}`,
      parentAuthId: "",
      authId: `12${index}`,
      authName: "@cword(4,8)",
      authCode: `code${index}`,
      authDesc: "@cword(10,15)",
      children: (() => {
        const children: any[] = [];
        for (let j = 0; j < 4; j++) {
          children.push({
            id: `${index}-${j}`,
            parentAuthId: `23${index}-${j}`,
            authId: `12${index}-${j}`,
            authName: "@cword(4,8)",
            authCode: `code${index}`,
            authDesc: "@cword(10,15)",
            children: (() => {
              const children: any[] = [];
              for (let k = 0; k < 4; k++) {
                children.push({
                  id: `${index}-${j}-${k}`,
                  parentAuthId: `233${index}-${j}-${k}`,
                  authId: `12${index}-${j}-${k}`,
                  authName: "@cword(4,8)",
                  authCode: `code${index}`,
                  authDesc: "@cword(10,15)",
                  children: undefined
                });
              }
              return children;
            })()
          });
        }
        return children;
      })()
    });
  }
  return result;
})();

export default [

  /** 2022/3/23
   *作者:pzt
   *内容:权限点页面
   **/
  {
    url: "/basic-api/authorityPoint/tree",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ items: authorityPointTree });
    }
  },
  {
    url: "/basic-api/authorityPoint/addOrUpdate",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess(`${new Date().getTime()}`);
    }
  },

  /** 2022/3/23
   *作者:pzt
   *内容:权限页面
   **/
  {
    url: "/basic-api/authority/tree",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ items: authorityTree });
    }
  },
  {
    url: "/basic-api/authority/addOrUpdate",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess(`${new Date().getTime()}`);
    }
  },
  {
    url: "/basic-api/authority/ownAuthPointIds",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ items: ["230-0-0"] });
    }
  },

  /** 2022/3/24
   *作者:pzt
   *内容:角色页面
   **/
  {
    url: "/basic-api/role/list",
    timeout: 100,
    method: "post",
    /*response: () => {
      // return resultSuccess(roleList);
      return resultSuccess({page: {items: roleList, total: roleList.length}});
      // return resultError('Request failed', {code: 50008});
    },*/
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, roleList);
    }
  },
  {
    url: "/basic-api/role/all",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ items: roleList });
    }
  },
  {
    url: "/basic-api/role/addOrUpdate",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess(`${new Date().getTime()}`);
    }
  },
  {
    url: "/basic-api/role/ownAuthIds",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ items: ["121-0-0"] });
    }
  },
  {
    url: "/basic-api/role/ownDataAuths",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        items: [
          {
            id: "0-0-1",
            name: "测试"
          }
        ]
      });
    }
  },
  {
    url: "/basic-api/dataAuth/list",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        items: [
          {
            id: "120-0-0",
            name: "测试"
          }
        ]
      });
    }
  },
  {
    url: "/basic-api/dataAuth/page",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({
        items: [
          {
            id: "120-0-0",
            name: "测试"
          }
        ]
      });
    }
  },

  /** 2022/3/24
   *作者:pzt
   *内容:用户页面
   **/
  {
    url: "/basic-api/user/page",
    timeout: 100,
    method: "post",
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, userPage);
    }
  },
  {
    url: "/basic-api/user/addOrEdit",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess(`${new Date().getTime()}`);
    }
  },
  {
    url: "/basic-api/user/ownRoles",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ roles: [{ id: "1", roleId: "2", roleName: "角色" }] });
    }
  },
  {
    url: "/basic-api/user/resetPwd",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess(`${new Date().getTime()}`);
    }
  },

  /** 2022/3/27
   *作者:pzt
   *内容:修改密码
   **/
  {
    url: "/basic-api/user/updatePwd",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess(`${new Date().getTime()}`);
    }
  }
] as MockMethod[];
