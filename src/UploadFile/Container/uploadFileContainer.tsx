import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Badge } from "react-bootstrap";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import { History } from "history";
import AppActionGenerator from "../../App/Actions/actionGen";
import UploadedFileInfoComp from "../Component/uploadedFilesInfo";
import UploadFilesComp from "../Component/uploadFileComp";
import UploadedFileListComp from "../Component/uploadedFilesListComp";
import { isNullOrUndefined } from "is-what";
import UploadFileDA from "../DA";
import { File } from "../Constants/types";
const SparkMD5 = require("spark-md5");

interface Props {
	history: History;
	pageWatcher: (page: string) => void;
}

const acceptedFileTypes: String[] = ["PDF", "DOC", "DOCX", "TXT"];
const UploadFiles: React.FC<Props> = (props: Props) => {
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [uploadProgress, setUploadProgress] = useState<any>({});
	useEffect(() => {
		props.pageWatcher("addfiles");
	}, []);
	const invokeHiddenInput = () => {
		let element = document.getElementById("file-input");
		if (!isNullOrUndefined(element)) {
			element.click();
		}
	};

	const handleOnChangeFileUpload = (post: any) => {
		let files_ = uploadedFiles;
		const files = post.target.files;
		const uploadProgress_ = uploadProgress;
		if (files && files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				let file = post.target.files[i];
				let reader = new FileReader();
				if (file) {
					reader.readAsDataURL(file);
					reader.onload = () => {
						const hexHash = SparkMD5.hash(reader.result);
						console.log(file);
						console.log(hexHash);
						files_.push({
							name: file.name,
							size: file.size,
							type: file.type,
							hash: hexHash,
							status: "uploading",
						});
						uploadProgress_[hexHash] = 0;
						setUploadProgress({ ...uploadProgress_ });
						UploadFileDA.get_s3_presigned_url({
							file_hash: hexHash,
							file_name: file.name,
							file_size: file.size,
						})
							.then((response) => {
								const onHandleFileProgress = {
									onUploadProgress: function (
										progressEvent: any
									) {
										var percentCompleted = Math.round(
											(progressEvent.loaded * 100) /
												progressEvent.total
										);
										console.log(percentCompleted);
										const uploadProgress_ = uploadProgress;
										uploadProgress_[hexHash] =
											percentCompleted;
										setUploadProgress({
											...uploadProgress_,
										});
									},
								};

								if (response && response.presigned_url) {
									const s3Info = response.presigned_url;
									console.log(
										"🚀 ~ file: uploadFileContainer.tsx ~ line 83 ~ .then ~ s3Info",
										s3Info
									);
									UploadFileDA.upload_file_in_s3_bucket(
										s3Info,
										file,
										onHandleFileProgress
									);
								}
							})
							.catch((error) => {
								console.log(
									"🚀 ~ file: uploadFileContainer.tsx ~ line 77 ~ handleOnChangeFileUpload ~ error",
									error
								);
							});
						setUploadedFiles([...files_]);
					};
				}
			}
		}
	};
	return (
		<Container fluid>
			<Row>
				<Col md={1}>
					<SideNavbar history={props.history} />
				</Col>
				<Col style={{ marginTop: 100 }}>
					<ComponentHeaderRender />
					<hr />
					<Row>
						<Col md={6}>
							<UploadFilesComp
								invokeHiddenInput={invokeHiddenInput}
								handleOnChangeFileUpload={
									handleOnChangeFileUpload
								}
							/>
						</Col>
						<Col md={6}>
							<UploadedFileInfoComp
								totalFiles={uploadedFiles.length}
								totalSize={uploadedFiles.reduce(
									(n, { size }) => n + size,
									0
								)}
							/>
						</Col>
					</Row>
					<hr />
					<UploadedFileListComp
						uploadedFiles={uploadedFiles}
						uploadProgress={uploadProgress}
					/>
				</Col>
			</Row>
		</Container>
	);
};
const mapStateToProps = () => {
	return {};
};
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
	return {
		pageWatcher: (page: string) =>
			dispatch(AppActionGenerator.pageWatcher(page)),
	};
};

const ComponentHeaderRender = () => {
	return (
		<Row>
			<Col>
				<h4>
					UPLOAD FILES &nbsp;
					{acceptedFileTypes.map((type, i) => {
						return (
							<React.Fragment key={i}>
								<Badge key={i} bg="dark" text="light">
									{type}
								</Badge>{" "}
								&nbsp;
							</React.Fragment>
						);
					})}
				</h4>
			</Col>
		</Row>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);
