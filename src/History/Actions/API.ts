import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";

export default class FileUploadAPI {
  public static getUserUploads(url: string) {
    // console.log("Get User Uploads");
    return AxiosGateWay.get(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
  public static deleteFile(url: string) {
    return AxiosGateWay.get(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
}
