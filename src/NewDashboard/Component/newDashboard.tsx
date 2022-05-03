import React, { Component } from "react";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import { History } from "history";
import BarLoader from "../../UniversalComponents/Loader/barLoader";
import LinesLoader from "../../UniversalComponents/Loader/linesLoader";
import Scrollable from "../../UniversalComponents/Scrollable/scrollable";
import {
	NewDashboardData,
	NewDashboardFilterConfig,
	NewDashboardFilterStructure,
} from "../State/newDashboardState";
import { DarkTooltip } from "../../DocumentView/Component/documentInsights";
import { isNullOrUndefined } from "is-what";
import {
	getTermDate,
	truncateString,
} from "../../Utils/DataModifierUtil/dataModUtil";
import NumberLoader from "../../UniversalComponents/Loader/number";
import DocumentLibraryTablemodal from "../../UniversalComponents/Modals/DocumentLibraryModals/documentLibraryTableModal";
import NewAnalysisViewSearchesModal from "../../UniversalComponents/Modals/NewAnalysisModals/NewAnalysisViewSearchesModal/newAnalysisViewSearchesModal";
import NewAnalysisViewFiltersModal from "../../UniversalComponents/Modals/NewAnalysisModals/NewAnalysisViewFiltersModal/newAnalysisViewFiltersModal";
import { NewDashboardFilterAggregate } from "../State/newDashboardState";
import {
	addOrReplaceNewDashboardSearchFilters,
	generateNewDashboardSearchFilter,
	getNewDashboardSearchStrings,
	iterateNewDashboardFilter,
	removeAllNewDashboardSearchFilters,
	removeNewDashboardSearchFilter,
} from "../Utils/newDashboardUtils";
import NewDashboardQuickLook from "./newDashboardQuickLook";

interface Props {
	history: History;
	location: any;
	pageWatcher: (page: string) => void;
	newDashboardInitialFileIds: number[];
	newDashboardLoader: boolean;
	newDashboardFileIds: number[];
	newDashboardData: NewDashboardData[];
	newDashboardDataLoader: boolean;
	newDashboardSortedBy: string;
	newDashboardSortOrder: string;
	saveNewDashboardSort: (
		newDashboardSortedBy: string,
		newDashboardSortOrder: string
	) => void;
	getNewDashboardFileId: () => void;
	getNewDashboardInitialFileId: () => void;
	getNewDashboardData: (
		newDashboardFileIds: number[],
		sort: string,
		order: string
	) => void;
	newDashboardFilterConfig: NewDashboardFilterConfig[];
	getNewDashboardFilterConfig: () => void;
	getNewDashboardFilterAggregate: (
		value: string,
		level: number,
		page: string,
		sort: string,
		order: string,
		filter: NewDashboardFilterStructure[],
		segment: string,
		isFilterForwarded: boolean
	) => void;
	appliedFilter: NewDashboardFilterStructure[];
	saveNewDashboardFilter: (
		appliedFilter: NewDashboardFilterStructure[]
	) => void;
	applyNewDashboardFilter: (
		sort: string,
		filter: NewDashboardFilterStructure[],
		newDashboardSortedBy: string,
		newDashboardSortOrder: string
	) => void;
	saveNewDashboardConfiguration: (
		title: string,
		description: string,
		type: string,
		lastResultCount: number,
		filter: NewDashboardFilterStructure[]
	) => void;
	tagsAggregate: NewDashboardFilterAggregate[];
	typeTagsAggregateValues: NewDashboardFilterAggregate[];
	typeTagsAggregateLoader: boolean;
	partyAggregate: NewDashboardFilterAggregate[];
	partyAggregateValues: NewDashboardFilterAggregate[];
	partyAggregateLoader: boolean;
	termAggregate: NewDashboardFilterAggregate[];
	endDateAggregateValues: NewDashboardFilterAggregate[];
	endDateMinValue: string;
	endDateMaxValue: string;
	endDateLeftThumb: string;
	endDateRightThumb: string;
	endDateAggregateLoader: boolean;
}
interface State {
	scrollTop: boolean;
	selectedParties: string[];
	selectedFileName: string;
	modalType: string;
	searchTerm: string;
	multipleSearches: string[];
	multipleAppliedFilters: string[];
}

export default class NewDashboard extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			scrollTop: false,
			selectedParties: [],
			selectedFileName: "",
			modalType: "",
			searchTerm: "",
			multipleSearches: getNewDashboardSearchStrings(props.appliedFilter),
			multipleAppliedFilters: this.getAppliedFilters(props.appliedFilter),
		};
	}

	componentDidMount() {
		let { pageWatcher } = this.props;
		pageWatcher("dashboard");
		this.props.getNewDashboardFileId();
		this.props.getNewDashboardFilterConfig();
		this.props.saveNewDashboardFilter([]);
	}

	componentWillReceiveProps(nextProps: Props) {
		if (this.props.appliedFilter !== nextProps.appliedFilter) {
			this.setState({
				multipleSearches: getNewDashboardSearchStrings(
					nextProps.appliedFilter
				),
			});
			this.setState({
				multipleAppliedFilters: this.getAppliedFilters(
					nextProps.appliedFilter
				),
			});
		}

		if (
			this.props.newDashboardFilterConfig !==
				nextProps.newDashboardFilterConfig &&
			nextProps.newDashboardFilterConfig.length > 0
		) {
			nextProps.newDashboardFilterConfig.map((config, i) => {
				nextProps.getNewDashboardFilterAggregate(
					"",
					config.baseLevel,
					"newanalysis",
					config.sort,
					config.orderby,
					nextProps.appliedFilter,
					config.type,
					false
				); //0th aggregate
			});
		}

		if (this.props.tagsAggregate !== nextProps.tagsAggregate) {
			if (nextProps.tagsAggregate.length > 0) {
				nextProps.tagsAggregate.map((tags, i) => {
					nextProps.getNewDashboardFilterAggregate(
						tags.value,
						tags.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"tags",
						false
					);
				});
			}
		}

		if (this.props.partyAggregate !== nextProps.partyAggregate) {
			if (nextProps.partyAggregate.length > 0) {
				nextProps.partyAggregate.map((party, i) => {
					nextProps.getNewDashboardFilterAggregate(
						party.value,
						party.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"party",
						false
					);
				});
			}
		}

		if (this.props.termAggregate !== nextProps.termAggregate) {
			if (nextProps.termAggregate.length > 0) {
				nextProps.termAggregate.map((termBi, i) => {
					nextProps.getNewDashboardFilterAggregate(
						termBi.value,
						termBi.outputLevel,
						"newanalysis",
						"value",
						"ASC",
						nextProps.appliedFilter,
						"term",
						false
					);
				});
			}
		}

		if (this.props.newDashboardFileIds !== nextProps.newDashboardFileIds) {
			nextProps.getNewDashboardData(
				nextProps.newDashboardFileIds,
				nextProps.newDashboardSortedBy,
				nextProps.newDashboardSortOrder
			);

			if (nextProps.tagsAggregate.length > 0) {
				nextProps.tagsAggregate.map((tags, i) => {
					nextProps.getNewDashboardFilterAggregate(
						tags.value,
						tags.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"tags",
						false
					);
				});
			}
			if (nextProps.partyAggregate.length > 0) {
				nextProps.partyAggregate.map((party, i) => {
					nextProps.getNewDashboardFilterAggregate(
						party.value,
						party.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"party",
						false
					);
				});
			}

			if (nextProps.termAggregate.length > 0) {
				nextProps.termAggregate.map((termBi, i) => {
					nextProps.getNewDashboardFilterAggregate(
						termBi.value,
						termBi.outputLevel,
						"newanalysis",
						"value",
						"ASC",
						nextProps.appliedFilter,
						"term",
						false
					);
				});
			}
		}
	}

	render() {
		let {
			history,
			newDashboardFileIds,
			newDashboardSortOrder,
			newDashboardSortedBy,
			newDashboardLoader,
			newDashboardData,
			newDashboardDataLoader,
			newDashboardInitialFileIds,
			applyNewDashboardFilter,
			appliedFilter,
			getNewDashboardFilterAggregate,
			saveNewDashboardConfiguration,
			tagsAggregate,
			typeTagsAggregateLoader,
			typeTagsAggregateValues,
			partyAggregate,
			partyAggregateLoader,
			partyAggregateValues,
			newDashboardFilterConfig,
			endDateAggregateLoader,
			endDateAggregateValues,
			endDateLeftThumb,
			endDateMaxValue,
			endDateMinValue,
			endDateRightThumb,
			termAggregate,
			getNewDashboardData,
			getNewDashboardFileId,
			getNewDashboardFilterConfig,
			getNewDashboardInitialFileId,
			saveNewDashboardFilter,
			saveNewDashboardSort,
		} = this.props;
		let {
			modalType,
			selectedFileName,
			selectedParties,
			scrollTop,
			searchTerm,
			multipleSearches,
			multipleAppliedFilters,
		} = this.state;
		return (
			<>
				<div className="row">
					<div className="col-md-1" style={{ zIndex: 2 }}>
						<SideNavbar history={history} />
					</div>
					<div className="col-md-11 mt-5">
						<div className="row">
							<div className="col-md-12 mt-3">
								<div className="row">
									<div className="col-md-8 pl-0">
										<h4>Dashboard</h4>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12 mt-1">
								<NewDashboardQuickLook
									appliedFilter={appliedFilter}
									newDashboardSortedBy={newDashboardSortedBy}
									newDashboardSortOrder={
										newDashboardSortOrder
									}
									applyNewDashboardFilter={
										applyNewDashboardFilter
									}
									newDashboardFilterConfig={
										newDashboardFilterConfig
									}
									tagsAggregate={tagsAggregate}
									partyAggregate={partyAggregate}
									termAggregate={termAggregate}
									partyAggregateLoader={partyAggregateLoader}
									partyAggregateValues={partyAggregateValues}
									typeTagsAggregateLoader={
										typeTagsAggregateLoader
									}
									typeTagsAggregateValues={
										typeTagsAggregateValues
									}
									endDateLeftThumb={endDateLeftThumb}
									endDateMaxValue={endDateMaxValue}
									endDateMinValue={endDateMinValue}
									endDateRightThumb={endDateRightThumb}
									endDateAggregateLoader={
										endDateAggregateLoader
									}
									endDateAggregateValues={
										endDateAggregateValues
									}
									newDashboardFileIds={newDashboardFileIds}
									getNewDashboardFilterAggregate={
										getNewDashboardFilterAggregate
									}
								/>
							</div>
						</div>
						{newDashboardLoader === true ? (
							<BarLoader />
						) : (
							<>
								{!(
									newDashboardInitialFileIds &&
									newDashboardInitialFileIds.length > 0
								) ? (
									<div className="row">
										<div className="col-md-10 text-center mt-3 ml-5">
											<div className="tagline">
												Digitize your contracts and get
												instant insights!
											</div>
											<img
												className="cursor-pointer"
												alt="go-back"
												src="/static_images/go-back-upload-img.svg"
												onClick={() =>
													(window.location.href =
														"/addfiles")
												}
											/>
										</div>
									</div>
								) : (
									<div className="row">
										<div className="col-md-12 mt-3 pl-0">
											<div className="row">
												<div className="col-md-3">
													<div className="row">
														<div className="col-md-12 mt-4">
															<div className="total-documents-circle">
																{appliedFilter.length >
																	0 && (
																	<div className="new-analysis-applied-filter-div">
																		<img
																			className="new-analysis-applied-filter-img"
																			src="/static_images/new-analysis-applied-filter-icn.svg"
																			alt="filter-applied"
																			onClick={() =>
																				this.showAppliedFilters()
																			}
																		/>
																	</div>
																)}
																<div
																	style={{
																		marginTop:
																			"30px",
																	}}
																>
																	{newDashboardDataLoader ? (
																		<NumberLoader />
																	) : (
																		newDashboardFileIds.length
																	)}
																	/
																	{
																		newDashboardInitialFileIds.length
																	}
																</div>
																<div className="total-documents-text">
																	Documents
																</div>
																{appliedFilter.length >
																	0 && (
																	<div
																		className="new-analysis-clear-all cursor-pointer"
																		onClick={() =>
																			this.clearAppliedFilters()
																		}
																	>
																		Clear
																		all
																	</div>
																)}
															</div>
														</div>
													</div>
												</div>
												<div className="col-md-8 ml-4">
													{newDashboardDataLoader ===
														false && (
														<>
															<div className="row new-analysis-header-container">
																<div className="col-md-3 new-analysis-search-bar-doc-title new-analysis-search-bar-header">
																	&nbsp;&nbsp;&nbsp;Documents
																	in system
																</div>
																<div className="col-md-5 new-analysis-search-bar-header">
																	<span className="new-analysis-search-input">
																		<input
																			type="text"
																			placeholder={
																				"Enter text"
																			}
																			style={{
																				width: "97%",
																				border: "none",
																				outline:
																					"none",
																			}}
																			value={
																				searchTerm
																			}
																			onChange={(
																				e
																			) =>
																				this.onInputChange(
																					e
																				)
																			}
																		/>
																	</span>
																</div>
																<div className="col-md-2 new-analysis-search-bar-header">
																	<span
																		className="new-analysis-search-button cursor-pointer"
																		onClick={() =>
																			this.applySearch()
																		}
																	>
																		<img
																			src="/static_images/search-inline-dark-icn.svg"
																			alt="search"
																		/>
																		&nbsp;Search
																	</span>
																</div>
																<div className="col-md-2 new-analysis-search-bar-header">
																	{multipleSearches.length >
																		0 && (
																		<div
																			className="new-analysis-clear-all cursor-pointer"
																			onClick={() =>
																				this.resetSearchFilters()
																			}
																		>
																			Reset
																			search
																		</div>
																	)}
																</div>
															</div>
															{multipleSearches.length >
																0 && (
																<div className="row new-analysis-header-container">
																	<div className="col-md-11 new-analysis-search-bar-header">
																		{multipleSearches
																			.slice(
																				0,
																				5
																			)
																			.map(
																				(
																					search: string,
																					i
																				) => (
																					<span
																						className="new-analysis-search-tile"
																						key={
																							i
																						}
																					>
																						<DarkTooltip
																							title={
																								search
																							}
																							placement="right-end"
																						>
																							<span>
																								{truncateString(
																									search,
																									15
																								)}
																								&nbsp;
																								<img
																									className="cursor-pointer"
																									src="/static_images/cross-cancel-icn.svg"
																									alt="cancel"
																									onClick={() =>
																										this.removeSearch(
																											search
																										)
																									}
																								/>
																							</span>
																						</DarkTooltip>
																					</span>
																				)
																			)}
																		{multipleSearches.length >
																			5 && (
																			<span
																				className="extra-count cursor-pointer"
																				onClick={() =>
																					this.setViewFiltersModal()
																				}
																			>
																				&nbsp;&nbsp;
																				{"+" +
																					(multipleSearches.length -
																						5)}
																			</span>
																		)}
																	</div>
																</div>
															)}
														</>
													)}
													{newDashboardDataLoader ===
													false ? (
														<div className="row new-analysis-header-container">
															<div
																className="col-md-5 new-analysis-header cursor-pointer"
																onClick={() =>
																	this.applySort(
																		"title"
																	)
																}
															>
																&nbsp;&nbsp;&nbsp;Title&nbsp;
																{newDashboardSortedBy ===
																	"title" &&
																	newDashboardSortOrder ===
																		"descending" && (
																		<img
																			className="cursor-pointer"
																			src="/static_images/up-arrow.svg"
																			alt="up-arrow"
																		/>
																	)}
																{newDashboardSortedBy ===
																	"title" &&
																	newDashboardSortOrder ===
																		"ascending" && (
																		<img
																			className="cursor-pointer"
																			src="/static_images/down-arrow.svg"
																			alt="down-arrow"
																		/>
																	)}
															</div>
															<div
																className="col-md-2 new-analysis-header cursor-pointer"
																onClick={() =>
																	this.applySort(
																		"date"
																	)
																}
															>
																&nbsp;Start
																Date&nbsp;
																{newDashboardSortedBy ===
																	"date" &&
																	newDashboardSortOrder ===
																		"descending" && (
																		<img
																			className="cursor-pointer"
																			src="/static_images/up-arrow.svg"
																			alt="up-arrow"
																		/>
																	)}
																{newDashboardSortedBy ===
																	"date" &&
																	newDashboardSortOrder ===
																		"ascending" && (
																		<img
																			className="cursor-pointer"
																			src="/static_images/down-arrow.svg"
																			alt="down-arrow"
																		/>
																	)}
															</div>
															<div
																className="col-md-5 new-analysis-header"
																style={{
																	background:
																		"#ffffff",
																}}
															>
																Parties
															</div>
														</div>
													) : (
														<div className="row new-analysis-header-container">
															<div
																className="col-md-5 new-analysis-header"
																style={{
																	background:
																		"#ffffff",
																}}
															>
																&nbsp;&nbsp;&nbsp;Title
															</div>
															<div
																className="col-md-2 new-analysis-header"
																style={{
																	background:
																		"#ffffff",
																}}
															>
																Start Date
															</div>
															<div
																className="col-md-5 new-analysis-header"
																style={{
																	background:
																		"#ffffff",
																}}
															>
																Parties
															</div>
														</div>
													)}
													<div className="row">
														<div
															className="col-md-12 upload-list-container"
															style={{
																height: "31vh",
																boxShadow:
																	"0px 4px 10px rgba(0, 0, 0, 0.1)",
															}}
														>
															{newDashboardDataLoader ? (
																<LinesLoader
																	animatedLines={[
																		{
																			width: 100,
																			height: 15,
																		},
																		{
																			width: 100,
																			height: 15,
																		},
																		{
																			width: 100,
																			height: 15,
																		},
																		{
																			width: 100,
																			height: 15,
																		},
																		{
																			width: 100,
																			height: 15,
																		},
																		{
																			width: 100,
																			height: 15,
																		},
																		{
																			width: 100,
																			height: 15,
																		},
																		{
																			width: 100,
																			height: 15,
																		},
																		{
																			width: 100,
																			height: 15,
																		},
																		{
																			width: 100,
																			height: 15,
																		},
																	]}
																/>
															) : (
																<Scrollable
																	maxHeight={
																		210
																	}
																	minHeight={
																		"31vh"
																	}
																>
																	{newDashboardData.map(
																		(
																			data: NewDashboardData,
																			i
																		) => (
																			<React.Fragment
																				key={
																					i
																				}
																			>
																				<div
																					className="row upload-file-item"
																					style={{
																						height: "45px",
																						padding:
																							"0.5%",
																						border: "none",
																						boxShadow:
																							"none",
																						background:
																							i %
																								2 ===
																							0
																								? "#F8F8F8"
																								: "#FFFFFF",
																					}}
																				>
																					<div
																						style={{
																							display:
																								"contents",
																						}}
																					>
																						<div
																							className="col-md-5 uploadedby-style title-style"
																							style={{
																								display:
																									"initial",
																							}}
																							onClick={() =>
																								window.open(
																									"/document/dashboard/" +
																										btoa(
																											data.fileid.toString()
																										),
																									"_blank"
																								)
																							}
																						>
																							<>
																								{!isNullOrUndefined(
																									data.title
																								) &&
																								data
																									.title
																									.length >
																									0 ? (
																									data
																										.title
																										.length >
																									40 ? (
																										<DarkTooltip
																											title={
																												data.title
																											}
																											placement="right-end"
																										>
																											<span className="dotted-line">
																												{data.title.slice(
																													0,
																													40
																												) +
																													"..."}
																												&nbsp;
																											</span>
																										</DarkTooltip>
																									) : (
																										<span className="cursor-pointer">
																											{
																												data.title
																											}
																										</span>
																									)
																								) : !isNullOrUndefined(
																										data.file_name
																								  ) &&
																								  data
																										.file_name
																										.length >
																										0 ? (
																									data
																										.file_name
																										.length >
																									40 ? (
																										<DarkTooltip
																											title={
																												data.file_name
																											}
																											placement="right-end"
																										>
																											<span className="dotted-line">
																												{data.file_name.slice(
																													0,
																													40
																												) +
																													"..."}
																											</span>
																										</DarkTooltip>
																									) : (
																										<span className="cursor-pointer">
																											{
																												data.file_name
																											}
																										</span>
																									)
																								) : (
																									<img
																										src="/static_images/empty-dash.svg"
																										alt="none"
																									/>
																								)}
																								&nbsp;
																								<DarkTooltip
																									title={
																										data.file_name
																									}
																									placement="right-end"
																								>
																									<img
																										src="/static_images/info-icn.svg"
																										alt="empty"
																									/>
																								</DarkTooltip>
																							</>
																						</div>
																						<div className="col-md-2 uploadedby-style">
																							{!isNullOrUndefined(
																								data
																									.term_start[0]
																							) &&
																							data
																								.term_start[0]
																								.length >
																								0 ? (
																								<span>
																									{getTermDate(
																										data
																											.term_start[0]
																									)}
																								</span>
																							) : (
																								<img
																									src="/static_images/empty-dash.svg"
																									alt="none"
																								/>
																							)}
																						</div>
																						<div
																							className="col-md-5 file-parties"
																							style={{
																								height: "45px",
																								overflow:
																									"hidden",
																								fontFamily:
																									"Roboto",
																								fontSize:
																									"13px",
																								border: "none",
																							}}
																						>
																							{data
																								.party
																								.length ===
																								0 && (
																								<img
																									src="/static_images/empty-dash.svg"
																									alt="empty-dash"
																								></img>
																							)}
																							{data
																								.party
																								.length <
																								2 &&
																								data.party.map(
																									(
																										partyItem,
																										i
																									) =>
																										i <
																											2 && (
																											<DarkTooltip
																												key={
																													i
																												}
																												title={
																													partyItem
																												}
																												placement="left-end"
																											>
																												<span>
																													{partyItem.length >
																													18 ? (
																														<>
																															{i >
																																0 && (
																																<>
																																	&nbsp;
																																</>
																															)}
																															{truncateString(
																																partyItem,
																																18
																															)}
																															{i <
																																1 && (
																																<>
																																	,
																																</>
																															)}
																														</>
																													) : (
																														<>
																															{i >
																																0 && (
																																<>
																																	&nbsp;
																																</>
																															)}
																															{
																																partyItem
																															}
																															{i <
																																1 &&
																																data
																																	.party
																																	.length >
																																	1 && (
																																	<>
																																		,
																																	</>
																																)}
																														</>
																													)}
																												</span>
																											</DarkTooltip>
																										)
																								)}
																							{data
																								.party
																								.length >=
																								2 &&
																								data.party.map(
																									(
																										partyItem,
																										i
																									) => (
																										<span
																											key={
																												i
																											}
																										>
																											{i <
																											2 ? (
																												partyItem.length >
																												18 ? (
																													<>
																														{i >
																															0 && (
																															<>
																																&nbsp;
																															</>
																														)}
																														<DarkTooltip
																															title={
																																partyItem
																															}
																															placement="left-end"
																														>
																															<>
																																{truncateString(
																																	partyItem,
																																	18
																																)}
																															</>
																														</DarkTooltip>
																														{i <
																															1 && (
																															<>
																																,
																															</>
																														)}
																													</>
																												) : (
																													<>
																														{i >
																															0 && (
																															<>
																																&nbsp;
																															</>
																														)}
																														{
																															partyItem
																														}
																														{i <
																															1 &&
																															data
																																.party
																																.length >
																																2 && (
																																<>
																																	,
																																</>
																															)}
																													</>
																												)
																											) : i ===
																											  2 ? (
																												<span
																													className="extra-count cursor-pointer"
																													onClick={() =>
																														this.setModal(
																															"List",
																															data.file_name,
																															data.party
																														)
																													}
																												>
																													&nbsp;
																													{"+" +
																														(data
																															.party
																															.length -
																															2)}
																												</span>
																											) : (
																												<>
																													{" "}
																												</>
																											)}
																										</span>
																									)
																								)}
																						</div>
																					</div>
																				</div>
																			</React.Fragment>
																		)
																	)}
																</Scrollable>
															)}
														</div>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-md-12 mt-3"></div>
											</div>
										</div>
									</div>
								)}
								{scrollTop && (
									<div
										className="new-analysis-go-to-top"
										onClick={() =>
											window.scrollTo({
												top: 0,
												behavior: "smooth",
											})
										}
									>
										<img
											src="/static_images/go-to-top.svg"
											alt="go-to-top"
										/>
										Top
									</div>
								)}
								<DocumentLibraryTablemodal
									type={"List Dashboard"}
									title={selectedFileName}
									parties={[]}
									tags={[]}
									list={selectedParties}
									initialFileIds={[]}
								/>
								<button
									style={{ display: "none" }}
									type="button"
									data-toggle="modal"
									data-target="#documentLibraryTableModal"
									id="documentLibraryTableButton"
								></button>
								<NewAnalysisViewSearchesModal
									title={"Searches"}
									list={
										multipleSearches.length > 5
											? multipleSearches.slice(5)
											: []
									}
									removeSearch={(searchTerm) =>
										this.removeSearch(searchTerm)
									}
									pageType={"dashboard"}
								/>
								<button
									style={{ display: "none" }}
									type="button"
									data-toggle="modal"
									data-target="#newAnalysisViewSearchesModal"
									id="newAnalysisViewSearchesModalButton"
								></button>
								<NewAnalysisViewFiltersModal
									title={"Filters applied"}
									list={multipleAppliedFilters}
									pageType={"dashboard"}
								/>
								<button
									style={{ display: "none" }}
									type="button"
									data-toggle="modal"
									data-target="#newAnalysisViewFiltersModal"
									id="newAnalysisViewFiltersModalButton"
								></button>
							</>
						)}
					</div>
				</div>
			</>
		);
	}

	setModal(modalType: string, fileTitle: string, partyStringArray: string[]) {
		this.setState({
			modalType: modalType,
			selectedFileName: fileTitle,
			selectedParties: partyStringArray,
		});
		let link = document.getElementById("documentLibraryTableButton");
		!isNullOrUndefined(link) && link.click();
	}

	setViewFiltersModal() {
		let link = document.getElementById(
			"newAnalysisViewSearchesModalButton"
		);
		!isNullOrUndefined(link) && link.click();
	}

	toggleGoToTop() {
		if (window.pageYOffset > 600) {
			this.setState({ scrollTop: true });
		}
		if (window.pageYOffset < 600) {
			this.setState({ scrollTop: false });
		}
	}

	onInputChange(event: any) {
		event.preventDefault();
		this.setState({ searchTerm: event.target.value });
	}

	applySearch() {
		let { appliedFilter, newDashboardSortOrder, newDashboardSortedBy } =
			this.props;
		let { searchTerm } = this.state;
		if (searchTerm.length > 0) {
			let tempSearchFilter = generateNewDashboardSearchFilter(searchTerm);
			let tempAppliedFilters = addOrReplaceNewDashboardSearchFilters(
				tempSearchFilter,
				appliedFilter
			);
			this.props.applyNewDashboardFilter(
				"",
				tempAppliedFilters,
				newDashboardSortedBy,
				newDashboardSortOrder
			);
			this.setState({ searchTerm: "" });
		}
	}

	removeSearch(searchTerm: string) {
		let { appliedFilter, newDashboardSortOrder, newDashboardSortedBy } =
			this.props;
		let tempAppliedFilters = removeNewDashboardSearchFilter(
			searchTerm,
			appliedFilter
		);
		this.props.applyNewDashboardFilter(
			"",
			tempAppliedFilters,
			newDashboardSortedBy,
			newDashboardSortOrder
		);
	}

	resetSearchFilters() {
		let { appliedFilter, newDashboardSortOrder, newDashboardSortedBy } =
			this.props;
		let tempAppliedFilters: NewDashboardFilterStructure[] =
			removeAllNewDashboardSearchFilters(appliedFilter);
		this.props.applyNewDashboardFilter(
			"",
			tempAppliedFilters,
			newDashboardSortedBy,
			newDashboardSortOrder
		);
	}

	applySort(sortBy: string) {
		let {
			newDashboardSortOrder,
			newDashboardSortedBy,
			newDashboardFileIds,
		} = this.props;
		let sortOrder: string = "";
		if (sortBy === "title" && newDashboardSortedBy !== sortBy) {
			sortOrder = "ascending";
		} else if (sortBy === "date" && newDashboardSortedBy !== sortBy) {
			sortOrder = "ascending";
		} else if (sortBy === newDashboardSortedBy) {
			if (newDashboardSortOrder === "ascending") {
				sortOrder = "descending";
			} else {
				sortOrder = "ascending";
			}
		} else {
			sortOrder = "ascending";
		}
		this.props.saveNewDashboardSort(sortBy, sortOrder);
		this.props.getNewDashboardData(newDashboardFileIds, sortBy, sortOrder);
	}

	clearAppliedFilters() {
		let { newDashboardSortedBy, newDashboardSortOrder } = this.props;
		this.props.applyNewDashboardFilter(
			"",
			[],
			newDashboardSortedBy,
			newDashboardSortOrder
		);
		this.setState({
			scrollTop: false,
			selectedParties: [],
			selectedFileName: "",
			modalType: "",
			searchTerm: "",
			multipleSearches: getNewDashboardSearchStrings([]),
			multipleAppliedFilters: this.getAppliedFilters([]),
		});
	}

	getAppliedFilters(appliedFilters: NewDashboardFilterStructure[]) {
		let appliedFiltersStringArray: string[] = [];
		for (let i = 0; i < appliedFilters.length; i++) {
			let filterString: string = iterateNewDashboardFilter(
				appliedFilters[i],
				""
			);
			appliedFiltersStringArray.push(filterString);
		}
		appliedFiltersStringArray = appliedFiltersStringArray.sort();
		return appliedFiltersStringArray;
	}

	showAppliedFilters() {
		let { appliedFilter } = this.props;
		this.setState({
			multipleAppliedFilters: this.getAppliedFilters(appliedFilter),
		});
		let link = document.getElementById("newAnalysisViewFiltersModalButton");
		!isNullOrUndefined(link) && link.click();
	}
}
