import React from "react";
import { Row, Col, Card } from "react-bootstrap";
interface Props {
	totalFiles: number;
	totalSize: number;
}
const UploadedFileInfoComp = (props: Props) => {
	const { totalSize, totalFiles } = props;
	return (
		<Row>
			<Col>
				<Card>
					<Card.Body>
						<Card.Title>Total Files</Card.Title>
						<Card.Footer>
							<h2>{totalFiles}</h2>
						</Card.Footer>
					</Card.Body>
				</Card>
			</Col>
			<Col>
				<Card>
					<Card.Body>
						<Card.Title>Total Size</Card.Title>
						<Card.Footer>
							<h2>{countTotalSizeInKB(totalSize)}</h2>
						</Card.Footer>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};
export default UploadedFileInfoComp;

const countTotalSizeInKB = (size: number) => {
	const gb = 1024 * 1024 * 1024;
	const mb = 1024 * 1024;
	const kb = 1024;
	if (size >= gb) {
		return `${(size / gb).toFixed(3).toString()}` + " GB";
	} else if (size >= mb) {
		return `${(size / mb).toFixed(3).toString()}` + " MB";
	} else if (size >= kb) {
		return `${(size / kb).toFixed(3).toString()}` + " KB";
	} else {
		return `${size.toFixed(3).toString()}` + " B";
	}
};
