import { MockMethod } from "vite-plugin-mock";
import { resultSuccess } from "../../mock/_util";

export default [
  {
    /** 2022/3/16
     *作者:pzt
     *内容:导入
     **/
    url: "/basic-api/file/upload",
    timeout: 100,
    method: "post",
    response: () => {
      return resultSuccess({ fileNo: `fileNo${new Date().toLocaleString()}` });
    }
  }
] as MockMethod[];
