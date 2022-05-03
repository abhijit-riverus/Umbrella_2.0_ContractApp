export interface FileForGettingURL {
	file_name: String;
	file_size: Number;
	file_hash: String;
}
export interface PresignedDataField {
	key: string;
	AWSAccessKeyId: string;
	policy: string;
	signature: string;
}
export interface PresignedData {
	url: string;
	fields: PresignedDataField;
}
export interface File {
	name: String;
	size: number;
	type: String;
	hash: String;
	status: String;
	// progress: number;
}
