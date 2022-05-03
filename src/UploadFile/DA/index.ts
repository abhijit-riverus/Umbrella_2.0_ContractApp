import axios from "axios";
import {
	FileForGettingURL,
	PresignedData,
	PresignedDataField,
} from "../Constants/types";
import { getLocalStorage } from "../../Authentication/Actions/authentication";
const APIPaths = {
	getS3PresignedURL:
		process.env.REACT_APP_SITE_API +
		"contracts/get-add-file-presigned-url/",
};
const APIConfig = () => ({
	headers: {
		Authorization: `Bearer ${getLocalStorage(`accessToken`)}`,
		Origin: process.env.REACT_APP_HOST,
		// "Access-Control-Allow-Origin": "*",
		// "Access-Control-Allow-Methods": "GET, POST",
		// "Content-Type": "application/json",
	},
});
class UploadFileDA {
	get_s3_presigned_url = (fileInfo: FileForGettingURL) => {
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
				console.log(
					"🚀 ~ file: index.ts ~ line 28 ~ UploadFileDA ~ err",
					err
				);
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
			formData.append(
				key,
				presignedDataField[key as keyof PresignedDataField]
			);
		});

		// append the file
		formData.append("file", file);

		// post the data on the s3 url
		return axios
			.post(presignedPostData.url, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				...onHandleFileProgress,
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
}
export default new UploadFileDA();
