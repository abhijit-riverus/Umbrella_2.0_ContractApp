import axios, { AxiosRequestConfig } from "axios";
import React, { Component } from "react";
import { isNullOrUndefined } from "is-what";
import AnalysisActionGenerator from "../../../Analysis/Actions/gen";
import PreferenceConfigComponent from "../../../Analysis/Component/preferenceConfigComponent";
import {
	AdvancedFilter,
	AnalysisFilterStructure,
	ConfigItem,
	FilterStructure,
} from "../../../Analysis/State/analysisState";
import { HOST, SITE_API_BY_REALM_NAME } from "../../../Configuration/global";
import {
	IntermediateFilterStructure,
	iterateAnalysisFilter,
} from "../../../Utils/GeneralUtil/genUtils";
import { getMimeType } from "../../../Utils/UploadCheckUtil.ts/uploadCheckUtil";
import HeimdallUtil from "../../HeimdallChild/HeimdallUtil/heimdallUtil";
import Scrollable from "../../Scrollable/scrollable";
import CustomizedSnackbar from "../../Snackbars/Component/customizedSnackbar";
import { getKeyCloakRealmFromLS } from "../../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
interface Props {
	tableConfig: ConfigItem[];
	updatePreference: (
		display: boolean,
		columnName: string,
		refreshTable?: boolean
	) => void;
	initialFileIds: number[];
	filterFileIds: number[];
	csvLink: string;
	generateReport: (
		name: string,
		filter: AnalysisFilterStructure[],
		fileIds: number[],
		preference: string[]
	) => void;
	savedAppliedFilter: IntermediateFilterStructure[];
	saveAdvancedFilterStructure: FilterStructure;
	generateReportSuccess: (csvLink: string) => void;
	generateReportFailure: () => void;
	advancedFilters: AdvancedFilter[];
	savedAnalysisFiltersList: AnalysisFilterStructure[];
	analysisFileIds: number[];
}

interface State {
	docName: string;
	successBtn: boolean;
	initialFilterStructure: FilterStructure;
}

export default class GenerateReportModal extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			docName: "",
			successBtn: false,
			initialFilterStructure: {
				i: "filter",
				o: "AND",
				v: [],
			},
		};
	}

	onChangeDocName = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ docName: e.currentTarget.value });
	};

	componentWillReceiveProps(nextProps: Props) {
		if (nextProps.csvLink != this.props.csvLink) {
			//nothing
		}
	}

	downloadCSV = () => {
		let {
			initialFileIds,
			filterFileIds,
			tableConfig,
			generateReport,
			csvLink,
			savedAppliedFilter,
			saveAdvancedFilterStructure,
			generateReportSuccess,
			generateReportFailure,
			advancedFilters,
			savedAnalysisFiltersList,
			analysisFileIds,
		} = this.props;
		let { initialFilterStructure } = this.state;
		let name = this.state.docName;
		//let fileIds = filterFileIds.length > 0 ? filterFileIds : initialFileIds;
		let fileIds = analysisFileIds;
		let preference = this.getPreferences(tableConfig);
		let filter = savedAnalysisFiltersList;

		let config: AxiosRequestConfig = {
			responseType: "json",
			headers: {
				Authorization: HeimdallUtil.getTokenFromStorage().accessToken,
			},
		};
		axios
			.post(
				SITEAPI + "report/generate",
				{ name, filter, fileIds, preference },
				config
			)
			.then((result) => {
				var hiddenElement = document.createElement("a");
				hiddenElement.href = HOST + "/" + result.data.queryResult;
				hiddenElement.download = name + ".csv";
				hiddenElement.dispatchEvent(
					new MouseEvent(`click`, {
						bubbles: true,
						cancelable: true,
						view: window,
					})
				);
				generateReportSuccess(hiddenElement.href);
			})
			.catch((error) => {
				generateReportFailure();
			});
		// generateReport(name, filter, fileIds, preference);
		this.dismissModal();
	};

	getPreferences = (tableConfig: ConfigItem[]) => {
		let selectedPreferences: string[] = [];
		tableConfig.filter((configName) => {
			if (configName.display === true) {
				selectedPreferences.push(configName.item);
			}
		});
		return selectedPreferences;
	};

	render() {
		let { tableConfig, updatePreference, savedAnalysisFiltersList } =
			this.props;
		return (
			<div className="col-md-12 col-12">
				<div
					className="row modal"
					id="reportModal"
					aria-labelledby="reportModal"
				>
					<div className="col-md-12 modal-dialog">
						<div className="row">
							<div className="col-md-12 modal-content">
								<div className="row">
									<div className="col-md-12 modal-body">
										<span
											data-dismiss="modal"
											style={{
												float: "right",
												cursor: "pointer",
											}}
											id="request-close-btn"
										>
											<img
												src="/static_images/close-modal-icn.svg"
												alt="close"
											/>
										</span>
									</div>
									<div
										className="col-md-1"
										style={{
											borderTop: "1px solid #996C84",
											marginTop: "0.2rem",
										}}
									></div>
									<div className="col-md-4 modal-title">
										Generate report
									</div>
									<div
										className="col-md-7"
										style={{
											borderTop: "1px solid #996C84",
											marginTop: "0.2rem",
										}}
									></div>
									<form
										style={{
											width: "-webkit-fill-available",
										}}
									>
										<div className="modal-body modal-subtitle">
											{/* <div className="row"> */}
											<div
												className="report-header"
												style={{ textAlign: "left" }}
											>
												Report will be generated in
												Excel format.
												<div className="report-sub-header">
													With the applied filters
												</div>
											</div>
											{/* </div> */}
											<div
												className="my-4"
												style={{ height: "50px" }}
											>
												<div className="mb-1 report-field-heading">
													Name of the report
												</div>
												<div>
													<input
														type="text"
														id=""
														name="docname"
														className="docname-input float-left mr-1"
														placeholder="Report1"
														onChange={(e) => {
															this.setState({
																docName:
																	e
																		.currentTarget
																		.value,
															});
														}}
													/>
													{/* onChange={(e) => { this.setState({ docName: e.currentTarget.value }) }} */}
													{/* onChange={(e) => this.onChangeDocName(e)} */}
													<span className="doc-ext mt-3 float-left">
														.csv
													</span>
												</div>
											</div>
											{savedAnalysisFiltersList.length >
											0 ? (
												<div
													className="my-4"
													style={{ height: "80px" }}
												>
													<div className="mb-1 report-field-heading">
														Filters Applied
													</div>
													<div className="report-modal-filters-list">
														<Scrollable
															maxHeight={66}
														>
															{savedAnalysisFiltersList.length >
																0 &&
																savedAnalysisFiltersList.map(
																	(
																		filter,
																		i
																	) => (
																		<div
																			key={
																				i
																			}
																			className={
																				"report-modal-filters-text"
																			}
																		>
																			{iterateAnalysisFilter(
																				filter,
																				""
																			)}
																		</div>
																	)
																)}
														</Scrollable>
													</div>
												</div>
											) : (
												<div
													className="my-4"
													style={{ height: "80px" }}
												>
													<div className="mb-1 report-field-heading">
														Filters Applied
													</div>
													<div className="report-modal-filters-list"></div>
												</div>
											)}
											<div
												className="my-4"
												style={{ height: "50px" }}
											>
												{/* <span className="float-left placeholder">Select data points</span>
                                                <i className="fa fa-angle-down float-right"></i> */}
												<div className="mb-1 report-field-heading">
													Configuration
												</div>
												<PreferenceConfigComponent
													tableConfig={tableConfig}
													updatePreference={
														updatePreference
													}
												/>
											</div>
											<div
												className="my-4"
												style={{
													display: "flex",
													justifyContent: "center",
													lineHeight: "28px",
												}}
											>
												{this.state.docName !== "" ? (
													<button
														type="button"
														className="upload-yellow-btn"
														onClick={
															this.downloadCSV
														}
													>
														Download
													</button>
												) : (
													<button
														type="button"
														className="upload-yellow-btn"
														style={{
															background:
																"lightgrey",
														}}
													>
														Download
													</button>
												)}
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	dismissModal = () => {
		let dismissBtn = document.getElementById("request-close-btn");
		setTimeout(() => {
			dismissBtn?.click();
		}, 1500);
	};
}
