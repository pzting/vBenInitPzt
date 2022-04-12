import { UploadApiResult } from "./model/uploadModel";
import { defHttp } from "/@/utils/http/axios";
import { UploadFileParams } from "/#/axios";
import { useGlobSetting } from "/@/hooks/setting";

const { uploadUrl = "" } = useGlobSetting();

enum Api {
  fileGetUrlApi = "/file/getUrl",
}

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  console.log(uploadUrl, "uploadUrl");
  console.log(defHttp, "defHttp");
  console.log(defHttp.uploadFile, "defHttp.uploadFile");
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress
    },
    params
  );
}


export const fileGetUrl = (params) =>
  defHttp.post({ url: Api.fileGetUrlApi, params });
