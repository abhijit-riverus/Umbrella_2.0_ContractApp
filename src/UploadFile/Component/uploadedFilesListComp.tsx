import React from "react";
import { Table, ProgressBar, Badge } from "react-bootstrap";
import { File } from "../Constants/types";

interface Props {
	uploadedFiles: File[];
	uploadProgress: any;
}
const UploadedFileInfoComp = (props: Props) => {
	const { uploadedFiles, uploadProgress } = props;
	if (uploadedFiles && uploadedFiles.length > 0) {
		return (
			<Table responsive striped bordered hover size="sm">
				<thead>
					<tr>
						<td>File Name</td>
						<td>Size</td>
						<td colSpan={2}>Progress</td>
					</tr>
				</thead>
				<tbody>
					{uploadedFiles.map((file, i) => {
						return (
							<tr key={i}>
								<td
									width="50%"
									style={{
										whiteSpace: "normal",
										wordWrap: "break-word",
									}}
								>
									{file.name}
								</td>
								<td>{countTotalSizeInKB(file.size)}</td>

								<td
									width="40%"
									style={{
										whiteSpace: "normal",
										wordWrap: "break-word",
									}}
								>
									<h5>
										{uploadProgress[file.hash.toString()] <
										100 ? (
											<ProgressBar
												striped
												animated
												variant="success"
												now={
													uploadProgress[
														file.hash.toString()
													]
												}
											/>
										) : (
											<Badge bg="success">Uploaded</Badge>
										)}
									</h5>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	} else return <></>;
};
export default UploadedFileInfoComp;
const countTotalSizeInKB = (size: number) => {
	const gb = 1024 * 1024 * 1024;
	const mb = 1024 * 1024;
	const kb = 1024;
	if (size >= gb) {
		return `${(size / gb).toFixed(2).toString()}` + " GB";
	} else if (size >= mb) {
		return `${(size / mb).toFixed(2).toString()}` + " MB";
	} else if (size >= kb) {
		return `${(size / kb).toFixed(2).toString()}` + " KB";
	} else {
		return `${size.toFixed(3).toString()}` + " B";
	}
};
