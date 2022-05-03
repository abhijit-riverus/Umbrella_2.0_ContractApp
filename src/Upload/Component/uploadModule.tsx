import React from "react";
import { ChunkState, FileInfo } from "../State/uploadState";
import { isNullOrUndefined } from "is-what";
import { UPLOADING } from "../../Constants/const";
import {
	checkUploadValidity,
	generateFileNameArray,
	UploadValidityObject,
} from "../../Utils/UploadCheckUtil.ts/uploadCheckUtil";

interface Props {
	uploadFiles: (fileChunk: any, fileList: FileInfo[]) => void;
	invokeInput: boolean;
	userName: string;
	fileList: FileInfo[];
	checkDuplicate: (fileNameArray: string[], file: File[]) => void;
	storeUploadValidity: (
		uploadValidityObject: UploadValidityObject,
		totalFiles: File[]
	) => void;
	toBeUploaded: File[];
}

interface State {
	selectedFile: any;
	loaded: number;
	chunkSize: number;
}

export default class UploadModule extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			selectedFile: [],
			loaded: 0,
			chunkSize: 10000 * 1024, // 10000 * 1024
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		let { toBeUploaded } = nextProps;
		if (
			toBeUploaded.length > 0 &&
			this.props.toBeUploaded !== toBeUploaded
		) {
			this.prepareUpload(toBeUploaded);
		}
	}

	render() {
		let { invokeInput } = this.props;
		if (invokeInput) {
			return (
				<>
					<button
						type="button"
						className="upload-yellow-btn"
						style={{ padding: "10px 50px" }}
						onClick={() => this.invokeHiddenInput()}
					>
						<img
							src="/static_images/upload-btn-img.svg"
							alt="btn-img"
						/>
						&nbsp;Upload
					</button>
					<form encType="multipart/form-data">
						<input
							style={{ visibility: "hidden" }}
							name="file"
							id="file-input"
							type="file"
							className="form-control upload-yellow-btn"
							multiple
							onChange={() => this.onChangeHandler(false)}
						/>
					</form>
				</>
			);
		} else {
			return (
				<div className="row">
					<div className="col-md-12 mt-5 text-center">
						<div className="tagline">
							Digitize your contracts and get instant insights!
						</div>
						<img
							onClick={() => this.invokeHiddenInput()}
							className="img-fluid cursor-pointer"
							src="/static_images/upload_graphics.svg"
							alt="upload"
						/>
						<p id="upload-bottom-row">
							We accept: <span id="file-type-name">PDF</span>{" "}
							<span id="file-type-name">DOCX</span>&nbsp;
							<span id="file-type-name">TXT</span>&nbsp;
							<span id="file-type-name">DOC</span>
						</p>
						<form encType="multipart/form-data">
							<input
								style={{ visibility: "hidden" }}
								name="file"
								id="file-input"
								type="file"
								className="form-control upload-yellow-btn"
								multiple
								onChange={() => this.onChangeHandler(false)}
							/>
						</form>
					</div>
				</div>
			);
		}
	}

	invokeHiddenInput() {
		let element = document.getElementById("file-input");
		if (!isNullOrUndefined(element)) {
			element.click();
		}
	}
	onChangeHandler = (externalSources: boolean, externalData?: any) => {
		// if (externalSources && externalData.action === 'picked') { //For GApi, sharepoint etc..
		//     this.setState({
		//         selectedFile: !isNullOrUndefined(externalData) ? externalData.docs : [],
		//         loaded: 0
		//     });
		//     if (!isNullOrUndefined(externalData) && externalData.action === 'picked') {
		//         this.onClickHandler();
		//     }
		// } else {
		let { checkDuplicate, storeUploadValidity } = this.props;
		let element = document.getElementById("file-input");
		let file: any;
		if (!isNullOrUndefined(element)) {
			file = (element as any).files;
			this.setState({
				selectedFile: file,
				loaded: 0,
			});
		}
		let uploadValidityObject = checkUploadValidity(file);
		storeUploadValidity(uploadValidityObject, file);
		if (uploadValidityObject.acceptedFiles.length > 0) {
			checkDuplicate(
				generateFileNameArray(uploadValidityObject.acceptedFiles),
				uploadValidityObject.acceptedFiles
			);
		}
	};

	prepareUpload = (selectedFile: File[]) => {
		let { uploadFiles, userName, fileList } = this.props;
		//const data = new FormData();
		let fileListNew: FileInfo[] = fileList;
		for (let i = 0; i < selectedFile.length; i++) {
			//data.append('file', selectedFile[i]);

			fileListNew.push({
				fileState: {
					fileId: -1,
					duplicateFileId: -1,
					name: selectedFile[i].name,
					uploadedBy: userName,
					size: selectedFile[i].size,
					time: new Date().toString(),
					progressState: {
						process: UPLOADING,
						percentage: 25,
					},
				},
				status: {
					fileId: -1,
					textract: false,
					analytics: false,
					normalization: false,
				},
			});

			this.prepareChunks(selectedFile[i], i, fileListNew);
		}
	};

	//File Chunking Logic
	prepareChunks = (file: any, fileId: number, fileListNew: FileInfo[]) => {
		let { uploadFiles } = this.props;

		const chunkSize: number = this.state.chunkSize;
		const chunksQuantity: number = Math.ceil(file.size / chunkSize);

		let chunksQueue: any = new Array(chunksQuantity)
			.fill(null)
			.map((_, index) => index)
			.reverse();
		for (let i = 0; i < chunksQuantity; i++) {
			if (!chunksQueue.length) {
				//console.log('All parts uploaded');
			}

			const chunkId = chunksQueue.pop();

			const begin = chunkId * chunkSize;
			const chunk = file.slice(begin, begin + chunkSize);

			let isLastChunkOfFile = false;
			if (chunksQuantity === chunkId + 1) {
				isLastChunkOfFile = true;
			}

			const chunkData: ChunkState = {
				chunk: chunk,
				chunkId: chunkId,
				chunksQuantity: chunksQuantity,
				fileId: fileId,
				fileName: file.name,
				fileSize: file.size,
				isLastChunkOfFile: isLastChunkOfFile,
			};

			uploadFiles(chunkData, fileListNew);
		}
	};
}
