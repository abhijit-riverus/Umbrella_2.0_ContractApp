import axios, { AxiosRequestConfig } from "axios";
import React, { Component } from "react";
import { isNullOrUndefined } from "is-what";
import { ConfigItem } from "../../../../Analysis/State/analysisState";
import { HOST, SITE_API_BY_REALM_NAME } from "../../../../Configuration/global";
import {
	NewAnalysisFilterStructure,
	NewAnalysisTableConfig,
} from "../../../../NewAnalysis/State/newAnalysisState";
import { iterateNewAnalysisFilter } from "../../../../NewAnalysis/Utils/newAnalysisUtils";
import HeimdallUtil from "../../../HeimdallChild/HeimdallUtil/heimdallUtil";
import Scrollable from "../../../Scrollable/scrollable";
import PreferenceConfig from "./PreferenceConfig";
import { getKeyCloakRealmFromLS } from "../../../../Authentication/Actions/authentication";

const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());

interface Props {
	newAnalysisTableConfig: NewAnalysisTableConfig[];
	appliedFilter: NewAnalysisFilterStructure[];
	newAnalysisFileIds: number[];
	setExportStatusLoader: (exportFileLoader: boolean) => void;
}

interface State {
	docName: string;
	businessIntelligence: boolean;
	clauseText: boolean;
	preference: string[];
}

export default class NewAnalysisExportToExcelModal extends Component<
	Props,
	State
> {
	constructor(props: Props) {
		super(props);

		this.state = {
			docName: "",
			businessIntelligence: true,
			clauseText: false,
			preference: [],
		};
	}

	onChangeDocName = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ docName: e.currentTarget.value });
	};

	componentWillReceiveProps(nextProps: Props) {}

	downloadExcel = () => {
		let { appliedFilter, newAnalysisTableConfig, newAnalysisFileIds } =
			this.props;
		let { preference, businessIntelligence, clauseText, docName } =
			this.state;
		if (docName.length > 0 && preference.length > 0) {
			let name = docName;
			let fileIds = newAnalysisFileIds;
			let filter = appliedFilter;

			this.props.setExportStatusLoader(true);
			let config: AxiosRequestConfig = {
				responseType: "json",
				headers: {
					Authorization:
						HeimdallUtil.getTokenFromStorage().accessToken,
				},
			};
			axios
				.post(
					SITEAPI + "report/newanalysis/generate",
					{
						name: name,
						businessIntelligence: businessIntelligence,
						clauseText: clauseText,
						preference: preference,
						filter: filter,
						fileIds: fileIds,
					},
					config
				)
				.then((result) => {
					var hiddenElement = document.createElement("a");
					hiddenElement.href = HOST + "/" + result.data.queryResult;
					hiddenElement.download = name + ".xlsx";
					hiddenElement.dispatchEvent(
						new MouseEvent(`click`, {
							bubbles: true,
							cancelable: true,
							view: window,
						})
					);
					console.log("Exported excel successfully");
					this.props.setExportStatusLoader(false);
				})
				.catch((error) => {
					//export to excel failed
					console.log("Exporting to excel failed");
				});
		}
		this.dismissModal();
	};

	render() {
		let { appliedFilter, newAnalysisTableConfig } = this.props;
		let { businessIntelligence, clauseText, docName } = this.state;
		return (
			<div className="col-md-12 col-12">
				<div
					className="row modal"
					id="newAnalysisExportToExcelModal"
					aria-labelledby="newAnalysisExportToExcelModal"
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
											id="export-to-excel-close-btn"
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
										Export to Excel
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
													Name
												</div>
												<div>
													<input
														type="text"
														name="docname"
														className="docname-input float-left mr-1"
														placeholder="Enter text"
														onChange={(e) => {
															this.setState({
																docName:
																	e
																		.currentTarget
																		.value,
															});
														}}
													/>
													<span className="doc-ext mt-3 float-left">
														.xlsx
													</span>
												</div>
											</div>
											<div className="my-4">
												<div className="row">
													<div className="col-md-6">
														<input
															type="checkbox"
															value="biPoint"
															id={"biPoint"}
															checked={
																businessIntelligence ===
																true
																	? true
																	: false
															}
															onChange={(e) =>
																this.setState({
																	businessIntelligence:
																		!businessIntelligence,
																})
															}
														/>
														&nbsp;
														<label
															className={
																"cursor-pointer"
															}
															htmlFor={"biPoint"}
															style={{
																display:
																	"inline",
															}}
														>
															Business
															Intelligence
														</label>
													</div>
													<div className="col-md-6">
														<input
															type="checkbox"
															value="clauseText"
															id={"clauseText"}
															checked={
																clauseText ===
																true
																	? true
																	: false
															}
															onChange={(e) =>
																this.setState({
																	clauseText:
																		!clauseText,
																})
															}
														/>
														&nbsp;
														<label
															className={
																"cursor-pointer"
															}
															htmlFor={
																"clauseText"
															}
															style={{
																display:
																	"inline",
															}}
														>
															Clause Text
														</label>
													</div>
												</div>
											</div>
											{appliedFilter.length > 0 ? (
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
															{appliedFilter.length >
																0 &&
																appliedFilter.map(
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
																			{iterateNewAnalysisFilter(
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
												<div className="mb-1 report-field-heading">
													Configuration
												</div>
												<PreferenceConfig
													tableConfig={
														newAnalysisTableConfig
													}
													updateSelectedDatapoints={(
														selectedDatapoints: string[]
													) =>
														this.setState({
															preference:
																selectedDatapoints,
														})
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
												{this.state.docName !== "" &&
												this.state.preference.length >
													0 ? (
													<button
														type="button"
														className="upload-yellow-btn"
														onClick={
															this.downloadExcel
														}
													>
														Export
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
														Export
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
		this.setState({
			docName: "",
			businessIntelligence: true,
			clauseText: false,
			preference: [],
		});
		let dismissBtn = document.getElementById("export-to-excel-close-btn");
		setTimeout(() => {
			dismissBtn?.click();
		}, 200);
	};
}
