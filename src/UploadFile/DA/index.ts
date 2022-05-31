import axios from "axios";
import {
  FileForGettingURL,
  PresignedData,
  PresignedDataField,
} from "../Constants/types";
import { getLocalStorage } from "../../Authentication/Actions/authentication";
import { off } from "process";
const APIPaths = {
  getS3PresignedURL:
    process.env.REACT_APP_SITE_API + "contracts/aws/presigned-url/",
};

//contracts/get-add-file-presigned-url/
const APIConfig = () => ({
  headers: {
    Authorization: `Bearer ${getLocalStorage(`accessToken`)}`,
    // Origin: process.env.REACT_APP_HOST,
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET, POST",
    // "Content-Type": "application/json",
  },
});
class UploadFileDA {
  get_s3_presigned_url = (fileInfo: FileForGettingURL) => {
    // console.log("APIConfig", APIConfig);
    // console.log("fileInfo", fileInfo);
    // console.log("accresss tokern", getLocalStorage(`accessToken`));

    return axios
      .post(APIPaths.getS3PresignedURL, { ...fileInfo }, APIConfig())
      .then((response) => {
        console.log(
          "🚀 ~ file: index.ts ~ line 21 ~ UploadFileDA ~ .then ~ response",
          response
        );
        return response.data;
      })
      .catch((err) => {
        console.log("🚀 ~ file: index.ts ~ line 28 ~ UploadFileDA ~ err", err);
        console.log(err.response.data);
        return err.response.data;
      });
  };
  upload_file_in_s3_bucket = (
    presignedPostData: PresignedData,
    file: any,
    onHandleFileProgress: any
  ) => {
    // create a form obj
    const formData = new FormData();

    // append the fields in presignedPostData in formData
    const presignedDataField: PresignedDataField = presignedPostData.fields;
    Object.keys(presignedDataField).forEach((key) => {
      formData.append(key, presignedDataField[key as keyof PresignedDataField]);
    });

    formData.append("file", file);

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      // crossDomain: true,
    };

    return axios
      .post(presignedPostData.url, formData, {
        axiosConfig,
        ...onHandleFileProgress,
      })
      .then(function (response) {
        console.log(
          "🚀 ~ file: index.ts ~ line 45 ~ upload_file_in_s3_bucket ~ .then ~ response",
          response
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
export default new UploadFileDA();
