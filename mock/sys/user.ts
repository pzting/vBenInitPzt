import { MockMethod } from "vite-plugin-mock";
import { resultError, resultSuccess, getRequestToken, requestParams } from "../_util";

export function createFakeUserList() {
  return [
    {
      userId: "1",
      username: "vben",
      realName: "Vben Admin",
      avatar: "https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640",
      desc: "manager",
      password: "123456",
      token: "fakeToken1",
      homePath: "/dashboard/analysis",
      roles: [
        {
          roleName: "Super Admin",
          value: "super"
        }
      ]
    },
    {
      userId: "2",
      username: "test",
      password: "123456",
      realName: "test user",
      avatar: "https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640",
      desc: "tester",
      token: "fakeToken2",
      homePath: "/dashboard/workbench",
      roles: [
        {
          roleName: "Tester",
          value: "test"
        }
      ]
    },
    {
      userId: "4",
      username: "pzt",
      password: "s123456",
      realName: "pzt",
      avatar: "https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640",
      desc: "adminer",
      token: "fakeToken4",
      homePath: "/system/role",
      auths: ["pzt", "czwk", "admin"]
    }
  ];
}

const fakeCodeList: any = {
  "1": ["1000", "3000", "5000"],

  "2": ["2000", "4000", "6000"]
};
export default [
  // mock user login
  {
    url: "/basic-api/login",
    timeout: 200,
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      );
      if (!checkUser) {
        return resultError("Incorrect account or password！");
      }
      const { userId, username: _username, token, realName, desc, roles } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc
      });
    }
  },
  {
    url: "/basic-api/getUserInfo",
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError("Invalid token");
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError("The corresponding user information was not obtained!");
      }
      return resultSuccess(checkUser);
    }
  },
  {
    url: "/basic-api/getPermCode",
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError("Invalid token");
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError("Invalid token!");
      }
      const codeList = fakeCodeList[checkUser.userId];

      return resultSuccess(codeList);
    }
  },
  {
    url: "/basic-api/logout",
    timeout: 200,
    method: "get",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError("Invalid token");
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError("Invalid token!");
      }
      return resultSuccess(undefined, { message: "Token has been destroyed" });
    }
  },
  {
    url: "/basic-api/testRetry",
    statusCode: 405,
    method: "get",
    response: () => {
      return resultError("Error!");
    }
  },

  /** 2022/3/28
   *作者:pzt
   *内容:登录页面
   **/
  {
    url: "/basic-api/user/login",
    timeout: 200,
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password
      );
      if (!checkUser) {
        return resultError("Incorrect insurance or password！");
      }
      const { userId, username: _username, token, realName, desc, roles } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc
      });
    }
  },
  {
    url: "/basic-api/user/info",
    method: "post",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError("Invalid token");
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError("The corresponding user information was not obtained!");
      }
      return resultSuccess(checkUser);
    }
  },
  {
    url: "/basic-api/user/logout",
    timeout: 200,
    method: "post",
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError("Invalid token");
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError("Invalid token!");
      }
      return resultSuccess(undefined, { message: "Token has been destroyed" });
    }
  },
  {
    url: "/basic-api/getImageVC",
    timeout: 200,
    method: "post",
    response: () => {
      return resultSuccess(
        {
          imgData:
            "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",
          trackId: `${new Date().getTime()}`
        },
        { message: "Token has been destroyed" }
      );
    }
  }
] as MockMethod[];
