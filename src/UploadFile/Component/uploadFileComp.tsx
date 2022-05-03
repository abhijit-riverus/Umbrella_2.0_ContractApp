import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
interface Props {
	invokeHiddenInput: () => void;
	handleOnChangeFileUpload: (post: any) => void;
}

const UploadFilesComp = (props: Props) => {
	const { invokeHiddenInput, handleOnChangeFileUpload } = props;
	return (
		<Row>
			<Col style={{ textAlign: "center" }}>
				<div className="tagline">
					Digitize your contracts and get instant insights!
				</div>
				<Image
					onClick={() => invokeHiddenInput()}
					className="img-fluid cursor-pointer"
					src="/static_images/upload_graphics.svg"
					alt="upload"
				/>

				<form encType="multipart/form-data">
					<input
						style={{ visibility: "hidden" }}
						name="file"
						id="file-input"
						type="file"
						className="form-control upload-yellow-btn"
						multiple
						accept=".pdf,.doc,.docx,.txt"
						onChange={handleOnChangeFileUpload}
					/>
				</form>
			</Col>
		</Row>
	);
};
export default UploadFilesComp;
{
	/* <button
							type="button"
							className="upload-yellow-btn"
							style={{ padding: "10px 50px" }}
							// onClick={() => this.invokeHiddenInput()}
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
								// onChange={() => this.onChangeHandler(false)}
							/>
						</form>*/
}
