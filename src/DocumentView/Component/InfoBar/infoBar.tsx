import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { SITE_API_BY_REALM_NAME } from "../../../Configuration/global";
import { QuickIntel } from "../../State/documentState";
import HeimdallUtil from "../../../UniversalComponents/HeimdallChild/HeimdallUtil/heimdallUtil";
import AxiosGateWay from "../../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";
import KeyPoints from "./keyPoints";
import { getBreadcrumbText } from "../Utils/docUtils";
import { getMimeType } from "../../../Utils/UploadCheckUtil.ts/uploadCheckUtil";
import { DarkTooltip } from "../documentInsights";
import { getKeyCloakRealmFromLS } from "../../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
interface Props {
	fileId: any;
	linkedPage: string;
	setTaskPage: (hideTaskPage: boolean) => void;
	setCurrentTask: (name: string, value: string, contractName: string) => void;
	getAllTasksData: (
		fileID: number,
		requestID: number,
		sort: string,
		order: string,
		selfAssigned: boolean,
		clauseType: string
	) => void;
	fileID: number;
	getClauseType: () => void;
	getDocumentTree: (fileID: number) => void;
	clauseModeStatus: boolean;
	saveClauseModeStatus: (clauseModeStatus: boolean) => void;
	getFolderHeading: () => void;
	setRequestID: (requestID: number) => void;
	setTaskOrigin: (origin: string) => void;
}

interface State {
	quickIntel: QuickIntel;
	hideTaskPage: boolean;
}

export default class InfoBar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			quickIntel: {
				fileName: "",
				metaData: [],
			},
			hideTaskPage: true,
		};
	}

	componentDidMount() {
		AxiosGateWay.get(SITEAPI + "document/meta/" + this.props.fileId)
			.then((result) => {
				let parsed = result.data.queryResult as QuickIntel;
				this.setState({ quickIntel: parsed });
			})
			.catch((error) => {});
	}
	downloadFile() {
		let { quickIntel } = this.state;
		let config: AxiosRequestConfig = {
			responseType: "blob",
			headers: {
				Authorization: HeimdallUtil.getTokenFromStorage().accessToken,
			},
		};
		var element = document.createElement("a");
		axios
			.get(SITEAPI + "download/" + this.props.fileId, config)
			.then((result) => {
				var windowUrl = window.URL;
				if (typeof windowUrl.createObjectURL === "function") {
					var blob = new Blob([result.data], {
						type: "application/pdf",
					});
					var url = windowUrl.createObjectURL(blob);
					element.setAttribute("href", url);
					let mimeType = getMimeType(quickIntel.fileName);
					let downloadFormat = "";
					downloadFormat = quickIntel.fileName.replace(
						mimeType,
						".pdf"
					);
					element.setAttribute("download", downloadFormat);
					element.dispatchEvent(
						new MouseEvent(`click`, {
							bubbles: true,
							cancelable: true,
							view: window,
						})
					);
					windowUrl.revokeObjectURL(url);
				}
			})
			.catch((error) => {});
	}

	onClickTasks = (fileName: string) => {
		let {
			setTaskPage,
			setCurrentTask,
			getAllTasksData,
			fileID,
			getClauseType,
			setRequestID,
			setTaskOrigin,
		} = this.props;
		let { hideTaskPage } = this.state;
		setCurrentTask("", "", fileName);
		setTaskPage(hideTaskPage);
		getAllTasksData(fileID, 0, "", "", false, "");
		getClauseType();
		setRequestID(0);
		setTaskOrigin("infobar");
	};

	render() {
		let { quickIntel, hideTaskPage } = this.state;
		let { linkedPage, setTaskPage, fileID, clauseModeStatus } = this.props;
		return (
			<>
				<div className="row">
					<div className="col-md-12 mt-4 info-menu-container">
						<div className="row offset-md-1">
							<div
								className="col-md-12 ml-4"
								style={{
									paddingTop: "10px",
									paddingBottom: "10px",
								}}
							>
								<span
									className="cursor-pointer"
									onClick={() =>
										(window.location.href =
											"/" + linkedPage)
									}
								>
									<img
										className="cursor-pointer"
										src="/static_images/back-arrow.svg"
										alt="back-arrow"
									/>
									&nbsp;
									{getBreadcrumbText(linkedPage)}&nbsp;{">"}
									&nbsp;
								</span>
								<span>{quickIntel.fileName}</span>
								&nbsp;&nbsp;&nbsp;
								{/* <span className="cursor-pointer tooltip download-style" onClick={() => this.downloadFile()}><img src="/static_images/download-icn.svg" alt="download" style={{ paddingBottom: '30%' }} />
                                    <span className="tooltiptext">Download as PDF</span>
                                </span> */}
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 info-sub-menu-container">
						<div className="row offset-md-1">
							<div className="col-md-12 ml-3">
								<div className="row px-1 mx-4">
									<DarkTooltip
										title={"Download as PDF"}
										placement="bottom"
									>
										<span
											className="cursor-pointer tooltip download-style"
											onClick={() => this.downloadFile()}
										>
											<img
												src="/static_images/new-download-icn.svg"
												alt="download"
											/>
										</span>
									</DarkTooltip>
									{/* <DarkTooltip title={"Generate report"} placement="bottom">
                                        <span className="cursor-pointer tooltip download-style" style={{ marginLeft: '2rem' }}><img src="/static_images/generate-report-icn.svg" alt="generate-report" />
                                        </span>
                                    </DarkTooltip> */}
									<DarkTooltip
										title={"Hierarchy"}
										placement="bottom"
									>
										<span
											className="cursor-pointer tooltip download-style"
											style={{ marginLeft: "2rem" }}
											data-toggle="modal"
											data-target="#viewFileHierarchyModal"
											onClick={() =>
												this.props.getDocumentTree(
													fileID
												)
											}
										>
											<img
												src="/static_images/hierarchy-icn.svg"
												alt="hierarchy"
											/>
										</span>
									</DarkTooltip>
									<DarkTooltip
										title={"Add to clause library"}
										placement="bottom"
									>
										<span
											className="cursor-pointer tooltip download-style"
											style={{ marginLeft: "2rem" }}
											onClick={() =>
												this.switchClauseMode()
											}
										>
											{clauseModeStatus ? (
												<img
													src="/static_images/add-to-clause-lib-enabled-icn.svg"
													alt="add-to-clause"
												/>
											) : (
												<img
													src="/static_images/add-to-clause-lib-icn.svg"
													alt="add-to-clause"
												/>
											)}
										</span>
									</DarkTooltip>
									{clauseModeStatus && (
										<span
											style={{
												position: "relative",
												width: 0,
											}}
										>
											<div className="custom-div-add-clause-library">
												<span className="arrow-left"></span>
												<span className="text-white">
													You are now in clause mode
												</span>
												&nbsp;
												<span
													className="yellow-link cursor-pointer"
													onClick={() =>
														this.switchClauseMode()
													}
												>
													Turn Off
												</span>
											</div>
										</span>
									)}
									<DarkTooltip
										title={"Tasks"}
										placement="bottom"
									>
										<span
											className="cursor-pointer tooltip download-style"
											style={{ marginLeft: "2rem" }}
											onClick={() =>
												this.setState(
													{
														hideTaskPage:
															!hideTaskPage,
													},
													() =>
														this.onClickTasks(
															quickIntel.fileName
														)
												)
											}
										>
											<img
												src="/static_images/task-icn-1.svg"
												alt="tasks"
											/>
										</span>
									</DarkTooltip>
									{/* <KeyPoints metaData={quickIntel.metaData} /> */}
								</div>
							</div>
							{/* <div className="col-md-2" style={{ textAlign: 'right' }}>
                                <img src="/static_images/quick-intel.svg" alt="quick-intelligence" />
                            </div> */}
						</div>
					</div>
				</div>
			</>
		);
	}

	switchClauseMode() {
		let { clauseModeStatus } = this.props;
		this.props.saveClauseModeStatus(!clauseModeStatus);
		this.props.getFolderHeading();
	}
}
