import React, { Component } from "react";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import { History } from "history";
import BarLoader from "../../UniversalComponents/Loader/barLoader";
import LinesLoader from "../../UniversalComponents/Loader/linesLoader";
import Scrollable from "../../UniversalComponents/Scrollable/scrollable";
import {
	LocalNewAnalysisFilterStructure,
	NewAnalysisData,
	NewAnalysisFilterAggregate,
	NewAnalysisFilterConfig,
	NewAnalysisFilterStructure,
	NewAnalysisTableConfig,
} from "../State/newAnalysisState";
import { DarkTooltip } from "../../DocumentView/Component/documentInsights";
import { isNullOrUndefined } from "is-what";
import {
	getTermDate,
	truncateString,
} from "../../Utils/DataModifierUtil/dataModUtil";
import NumberLoader from "../../UniversalComponents/Loader/number";
import NewAnalysisQuickLook from "./newAnalysisQuickLook";
import DocumentLibraryTablemodal from "../../UniversalComponents/Modals/DocumentLibraryModals/documentLibraryTableModal";
import {
	addOrReplaceNewAnalysisSearchFilters,
	generateNewAnalaysisSearchFilter,
	getNewAnalysisSearchStrings,
	iterateNewAnalysisFilter,
	removeAllNewAnalysisSearchFilters,
	removeNewAnalysisSearchFilter,
} from "../Utils/newAnalysisUtils";
import NewAnalysisViewSearchesModal from "../../UniversalComponents/Modals/NewAnalysisModals/NewAnalysisViewSearchesModal/newAnalysisViewSearchesModal";
import NewAnalysisViewFiltersModal from "../../UniversalComponents/Modals/NewAnalysisModals/NewAnalysisViewFiltersModal/newAnalysisViewFiltersModal";
import NewAnalysisSaveConfigModal from "../../UniversalComponents/Modals/NewAnalysisModals/NewAnalysisSaveConfigModal/NewAnalysisSaveConfigModal";
import { SavedConfigurationData } from "../../Reports/State/reportsState";
import createHistory from "history/createBrowserHistory";
import NewAnalysisExportToExcelModal from "../../UniversalComponents/Modals/NewAnalysisModals/NewAnalysisExportToExcel/NewAnalysisExportToExcelModal";

interface Props {
	history: History;
	location: any;
	pageWatcher: (page: string) => void;
	newAnalysisInitialFileIds: number[];
	newAnalysisLoader: boolean;
	newAnalysisFileIds: number[];
	newAnalysisData: NewAnalysisData[];
	newAnalysisDataLoader: boolean;
	newAnalysisSortedBy: string;
	newAnalysisSortOrder: string;
	newAnalysisTableConfig: NewAnalysisTableConfig[];
	newAnalysisTableConfigLoader: boolean;
	getNewAnalysisTableConfig: () => void;
	saveNewAnalysisSort: (
		newAnalysisSortedBy: string,
		newAnalysisSortOrder: string
	) => void;
	updateConfigurationCount: (count: number, ssid: number) => void;
	getNewAnalysisFileId: () => void;
	getNewAnalysisInitialFileId: () => void;
	getNewAnalysisData: (
		newAnalysisFileIds: number[],
		sort: string,
		order: string
	) => void;
	newAnalysisFilterConfig: NewAnalysisFilterConfig[];
	getNewAnalysisFilterConfig: () => void;
	getNewAnalysisFilterAggregate: (
		value: string,
		level: number,
		page: string,
		sort: string,
		order: string,
		filter: NewAnalysisFilterStructure[],
		segment: string,
		isFilterForwarded: boolean
	) => void;
	appliedFilter: NewAnalysisFilterStructure[];
	saveNewAnalysisFilter: (
		appliedFilter: NewAnalysisFilterStructure[]
	) => void;
	applyNewAnalysisFilter: (
		sort: string,
		filter: NewAnalysisFilterStructure[],
		newAnalysisSortedBy: string,
		newAnalysisSortOrder: string
	) => void;
	saveNewAnalysisConfiguration: (
		title: string,
		description: string,
		type: string,
		lastResultCount: number,
		filter: NewAnalysisFilterStructure[]
	) => void;
	getNewAnalysisFilterCount: (filter: NewAnalysisFilterStructure[]) => void;
	newAnalysisFilteredCount: number;
	saveNewAnalysisCurrency: (currencyName: string, typeName: string) => void;
	clauseAggregate: NewAnalysisFilterAggregate[];
	clausePresentAggregateValues: NewAnalysisFilterAggregate[];
	clauseAbsentAggregateValues: NewAnalysisFilterAggregate[];
	clauseAggregateLoader: boolean;
	clausePresentAggregateLoader: boolean;
	clauseAbsentAggregateLoader: boolean;
	tagsAggregate: NewAnalysisFilterAggregate[];
	natureTagsAggregateValues: NewAnalysisFilterAggregate[];
	natureTagsAggregateLoader: boolean;
	typeTagsAggregateValues: NewAnalysisFilterAggregate[];
	typeTagsAggregateLoader: boolean;
	groupTagsAggregateValues: NewAnalysisFilterAggregate[];
	groupsTagsAggregateLoader: boolean;
	partyAggregate: NewAnalysisFilterAggregate[];
	partyAggregateValues: NewAnalysisFilterAggregate[];
	partyAggregateLoader: boolean;
	renewalAggregate: NewAnalysisFilterAggregate[];
	confidentialityAggregate: NewAnalysisFilterAggregate[];
	confidentialityNatureAggregateValues: NewAnalysisFilterAggregate[];
	confidentialityNatureAggregateLoader: boolean;
	changeOfControlAggregate: NewAnalysisFilterAggregate[];
	changeOfControlIntersectionAggregateValues: NewAnalysisFilterAggregate[];
	changeOfControlIntersectionLoader: boolean;
	terminationAggregate: NewAnalysisFilterAggregate[];
	terminationAtConvinienceAggregateValues: NewAnalysisFilterAggregate[];
	terminationAtConvinienceAggregateLoader: boolean;
	terminationEventAggregateValues: NewAnalysisFilterAggregate[];
	terminationEventAggregateLoader: boolean;
	eventOfDefaultAggregate: NewAnalysisFilterAggregate[];
	eventOfDefaultEventAggregateValues: NewAnalysisFilterAggregate[];
	eventOfDefaultEventAggregateLoader: boolean;
	forceMajeureAggregate: NewAnalysisFilterAggregate[];
	forceMajuereEventAggregateValues: NewAnalysisFilterAggregate[];
	forceMajuereEventAggregateLoader: boolean;
	governingLawAggregate: NewAnalysisFilterAggregate[];
	governingLawJurisdictionAggregateValues: NewAnalysisFilterAggregate[];
	governingLawJurisdictionAggregateLoader: boolean;
	disputeResolutionAggregate: NewAnalysisFilterAggregate[];
	disputeResolutionVenueAggregateValues: NewAnalysisFilterAggregate[];
	disputeResolutionVenueAggregateLoader: boolean;
	disputeResolutionOthersAggregateValues: NewAnalysisFilterAggregate[];
	disputeResolutionOthersAggregateLoader: boolean;
	disputeResolutionArbitrationAggregateValues: NewAnalysisFilterAggregate[];
	disputeResolutionArbitrationAggregateLoader: boolean;
	disputeResolutionActStatuteAggregateValues: NewAnalysisFilterAggregate[];
	disputeResolutionActStatuteAggregateLoader: boolean;
	disputeResolutionPanelAggregateValues: NewAnalysisFilterAggregate[];
	disputeResolutionPanelAggregateLoader: boolean;
	disputeResolutionNegotiationAggregateValues: NewAnalysisFilterAggregate[];
	disputeResolutionNegotiationAggregateLoader: boolean;
	disputeResolutionMediationAggregateValues: NewAnalysisFilterAggregate[];
	disputeResolutionMediationAggregateLoader: boolean;
	disputeResolutionConciliationAggregateValues: NewAnalysisFilterAggregate[];
	disputeResolutionConciliationAggregateLoader: boolean;
	consentAggregate: NewAnalysisFilterAggregate[];
	consentTypeAggregateValues: NewAnalysisFilterAggregate[];
	consentTypeAggregateLoader: boolean;
	consentAuthorityAggregateValues: NewAnalysisFilterAggregate[];
	consentAuthorityAggregateLoader: boolean;
	termAggregate: NewAnalysisFilterAggregate[];
	startDateAggregateValues: NewAnalysisFilterAggregate[];
	startDateMinValue: string;
	startDateMaxValue: string;
	startDateLeftThumb: string;
	startDateRightThumb: string;
	startDateAggregateLoader: boolean;
	endDateAggregateValues: NewAnalysisFilterAggregate[];
	endDateMinValue: string;
	endDateMaxValue: string;
	endDateLeftThumb: string;
	endDateRightThumb: string;
	endDateAggregateLoader: boolean;
	paymentAggregate: NewAnalysisFilterAggregate[];
	paymentCurrencyAggregateValues: NewAnalysisFilterAggregate[];
	paymentAmountAggregateValues: NewAnalysisFilterAggregate[];
	paymentAmountAggregateLoader: boolean;
	paymentAmountMinValue: string;
	paymentAmountMaxValue: string;
	paymentAmountLeftThumb: string;
	paymentAmountRightThumb: string;
	paymentAmountCurrency: string;
	paymentCurrencyAggregateLoader: boolean;
	indemnityAggregate: NewAnalysisFilterAggregate[];
	indemnityCurrencyAggregateValues: NewAnalysisFilterAggregate[];
	indemnityAmountAggregateValues: NewAnalysisFilterAggregate[];
	indemnityAmountAggregateLoader: boolean;
	indemnityAmountMinValue: string;
	indemnityAmountMaxValue: string;
	indemnityAmountLeftThumb: string;
	indemnityAmountRightThumb: string;
	indemnityAmountCurrency: string;
	indemnityCurrencyAggregateLoader: boolean;
	limitationOfLiabilityAggregate: NewAnalysisFilterAggregate[];
	limitationOfLiabilityCurrencyAggregateValues: NewAnalysisFilterAggregate[];
	limitationOfLiabilityAmountAggregateValues: NewAnalysisFilterAggregate[];
	limitationOfLiabilityAmountAggregateLoader: boolean;
	limitationOfLiabilityAmountMinValue: string;
	limitationOfLiabilityAmountMaxValue: string;
	limitationOfLiabilityAmountLeftThumb: string;
	limitationOfLiabilityAmountRightThumb: string;
	limitationOfLiabilityAmountCurrency: string;
	limitationOfLiabilityCurrencyAggregateLoader: boolean;
	indemnityPayerAggregateValues: NewAnalysisFilterAggregate[];
	indemnityPayerAggregateLoader: boolean;
	indemnityPayeeAggregateValues: NewAnalysisFilterAggregate[];
	indemnityPayeeAggregateLoader: boolean;
	indemnityTriggeringEventAggregateValues: NewAnalysisFilterAggregate[];
	indemnityTriggeringEventAggregateLoader: boolean;
	indemnityExtentOfCostsAggregateValues: NewAnalysisFilterAggregate[];
	indemnityExtentOfCostsAggregateLoader: boolean;
	nonCompeteAggregate: NewAnalysisFilterAggregate[];
	nonCompeteTerritoryAggregateValues: NewAnalysisFilterAggregate[];
	nonCompeteTerritoryAggregateLoader: boolean;
	sublettingAssignmentAggregate: NewAnalysisFilterAggregate[];
	sublettingAssignmentConsentAggregateValues: NewAnalysisFilterAggregate[];
	sublettingAssignmentConsentAggregateLoader: boolean;
	sublettingAssignmentNoticeAggregateValues: NewAnalysisFilterAggregate[];
	sublettingAssignmentNoticeAggregateLoader: boolean;
}
interface State {
	scrollTop: boolean;
	selectedParties: string[];
	selectedFileName: string;
	modalType: string;
	searchTerm: string;
	multipleSearches: string[];
	multipleAppliedFilters: string[];
	selectedConfigData: SavedConfigurationData;
	exportFileLoader: boolean;
}

export default class NewAnalysis extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			scrollTop: false,
			selectedParties: [],
			selectedFileName: "",
			modalType: "",
			searchTerm: "",
			multipleSearches: getNewAnalysisSearchStrings(props.appliedFilter),
			multipleAppliedFilters: this.getAppliedFilters(props.appliedFilter),
			selectedConfigData: {
				id: "",
				title: "",
				description: "",
				type: "",
				last_result_count: "",
				last_result_count_timestamp: "",
				createdon: "",
				createdby: "",
				filter: [],
			},
			exportFileLoader: false,
		};
	}

	componentDidMount() {
		let {
			pageWatcher,
			location,
			newAnalysisSortOrder,
			newAnalysisSortedBy,
			history,
		} = this.props;
		pageWatcher("analysis");

		if (
			location.state !== undefined &&
			location.state !== null &&
			location.state.selectedSavedConfig !== undefined &&
			location.state.selectedSavedConfig !== null
		) {
			let appliedConfig: SavedConfigurationData =
				location.state.selectedSavedConfig;
			this.props.getNewAnalysisInitialFileId();
			this.props.getNewAnalysisFilterConfig();
			this.props.applyNewAnalysisFilter(
				"",
				appliedConfig.filter,
				newAnalysisSortedBy,
				newAnalysisSortOrder
			);
			this.setState({ selectedConfigData: appliedConfig });
			//clear location.state data from history
			history.replace(location.pathname, null);
		} else {
			this.props.getNewAnalysisFileId();
			this.props.getNewAnalysisFilterConfig();
			this.props.saveNewAnalysisFilter([]);
		}
		this.props.getNewAnalysisTableConfig();
		document.addEventListener("scroll", (e) => this.toggleGoToTop());
	}

	componentWillReceiveProps(nextProps: Props) {
		let isFilterForwarded: boolean =
			this.state.selectedConfigData.id !== null &&
			this.state.selectedConfigData.id !== ""
				? true
				: false;

		if (this.props.appliedFilter !== nextProps.appliedFilter) {
			this.setState({
				multipleSearches: getNewAnalysisSearchStrings(
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
			this.props.newAnalysisFilterConfig !==
				nextProps.newAnalysisFilterConfig &&
			nextProps.newAnalysisFilterConfig.length > 0
		) {
			nextProps.newAnalysisFilterConfig.map((config, i) => {
				nextProps.getNewAnalysisFilterAggregate(
					"",
					config.baseLevel,
					"newanalysis",
					config.sort,
					config.orderby,
					nextProps.appliedFilter,
					config.type,
					isFilterForwarded
				); //0th aggregate
			});
		}

		if (this.props.clauseAggregate !== nextProps.clauseAggregate) {
			if (nextProps.clauseAggregate.length > 0) {
				nextProps.clauseAggregate.map((clause, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						clause.value,
						clause.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"clause",
						isFilterForwarded
					); //1th aggregate
				});
			}
		}

		if (this.props.tagsAggregate !== nextProps.tagsAggregate) {
			if (nextProps.tagsAggregate.length > 0) {
				nextProps.tagsAggregate.map((tags, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						tags.value,
						tags.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"tags",
						isFilterForwarded
					);
				});
			}
		}

		if (this.props.partyAggregate !== nextProps.partyAggregate) {
			if (nextProps.partyAggregate.length > 0) {
				nextProps.partyAggregate.map((party, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						party.value,
						party.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"party",
						isFilterForwarded
					);
				});
			}
		}

		if (this.props.renewalAggregate !== nextProps.renewalAggregate) {
			if (nextProps.renewalAggregate.length > 0) {
				nextProps.renewalAggregate.map((renewal, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						renewal.value,
						renewal.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"renewal",
						isFilterForwarded
					);
				});
			}
		}

		if (
			this.props.confidentialityAggregate !==
			nextProps.confidentialityAggregate
		) {
			if (nextProps.confidentialityAggregate.length > 0) {
				nextProps.confidentialityAggregate.map(
					(confidentialityBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							confidentialityBi.value,
							confidentialityBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"confidentiality",
							isFilterForwarded
						);
					}
				);
			}
		}

		if (
			this.props.changeOfControlAggregate !==
			nextProps.changeOfControlAggregate
		) {
			if (nextProps.changeOfControlAggregate.length > 0) {
				nextProps.changeOfControlAggregate.map(
					(changeofControlBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							changeofControlBi.value,
							changeofControlBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"changeofControl",
							isFilterForwarded
						);
					}
				);
			}
		}

		if (
			this.props.terminationAggregate !== nextProps.terminationAggregate
		) {
			if (nextProps.terminationAggregate.length > 0) {
				nextProps.terminationAggregate.map((terminationBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						terminationBi.value,
						terminationBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"termination",
						isFilterForwarded
					);
				});
			}
		}

		if (
			this.props.eventOfDefaultAggregate !==
			nextProps.eventOfDefaultAggregate
		) {
			if (nextProps.eventOfDefaultAggregate.length > 0) {
				nextProps.eventOfDefaultAggregate.map((eventOfDefaultBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						eventOfDefaultBi.value,
						eventOfDefaultBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"eventsofdefault",
						isFilterForwarded
					);
				});
			}
		}

		if (
			this.props.forceMajeureAggregate !== nextProps.forceMajeureAggregate
		) {
			if (nextProps.forceMajeureAggregate.length > 0) {
				nextProps.forceMajeureAggregate.map((forceMajeureBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						forceMajeureBi.value,
						forceMajeureBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"forcemajeure",
						isFilterForwarded
					);
				});
			}
		}

		if (
			this.props.governingLawAggregate !== nextProps.governingLawAggregate
		) {
			if (nextProps.governingLawAggregate.length > 0) {
				nextProps.governingLawAggregate.map((governingLawBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						governingLawBi.value,
						governingLawBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"governinglaw",
						isFilterForwarded
					);
				});
			}
		}

		if (
			this.props.disputeResolutionAggregate !==
			nextProps.disputeResolutionAggregate
		) {
			if (nextProps.disputeResolutionAggregate.length > 0) {
				nextProps.disputeResolutionAggregate.map(
					(disputeResolutionBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							disputeResolutionBi.value,
							disputeResolutionBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"disputeresolution",
							isFilterForwarded
						);
					}
				);
			}
		}

		if (this.props.consentAggregate !== nextProps.consentAggregate) {
			if (nextProps.consentAggregate.length > 0) {
				nextProps.consentAggregate.map((consentBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						consentBi.value,
						consentBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"consent",
						isFilterForwarded
					);
				});
			}
		}

		if (this.props.termAggregate !== nextProps.termAggregate) {
			if (nextProps.termAggregate.length > 0) {
				nextProps.termAggregate.map((termBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						termBi.value,
						termBi.outputLevel,
						"newanalysis",
						"value",
						"ASC",
						nextProps.appliedFilter,
						"term",
						isFilterForwarded
					);
				});
			}
		}

		if (this.props.paymentAggregate !== nextProps.paymentAggregate) {
			if (nextProps.paymentAggregate.length > 0) {
				nextProps.paymentAggregate.map((paymentBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						paymentBi.value,
						paymentBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"paymentobligation",
						isFilterForwarded
					);
				});
			}
		}

		if (this.props.indemnityAggregate !== nextProps.indemnityAggregate) {
			if (nextProps.indemnityAggregate.length > 0) {
				nextProps.indemnityAggregate.map((indemnityBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						indemnityBi.value,
						indemnityBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"indemnity",
						isFilterForwarded
					);
				});
			}
		}

		if (
			this.props.limitationOfLiabilityAggregate !==
			nextProps.limitationOfLiabilityAggregate
		) {
			if (nextProps.limitationOfLiabilityAggregate.length > 0) {
				nextProps.limitationOfLiabilityAggregate.map(
					(limitationOfLiabilityBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							limitationOfLiabilityBi.value,
							limitationOfLiabilityBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"limitationofliability",
							isFilterForwarded
						);
					}
				);
			}
		}

		if (this.props.nonCompeteAggregate !== nextProps.nonCompeteAggregate) {
			if (nextProps.nonCompeteAggregate.length > 0) {
				nextProps.nonCompeteAggregate.map((nonCompeteBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						nonCompeteBi.value,
						nonCompeteBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"noncompete",
						isFilterForwarded
					);
				});
			}
		}

		if (
			this.props.sublettingAssignmentAggregate !==
			nextProps.sublettingAssignmentAggregate
		) {
			if (nextProps.sublettingAssignmentAggregate.length > 0) {
				nextProps.sublettingAssignmentAggregate.map(
					(sublettingAssignmentBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							sublettingAssignmentBi.value,
							sublettingAssignmentBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"sublettingassignment",
							isFilterForwarded
						);
					}
				);
			}
		}

		if (this.props.newAnalysisFileIds !== nextProps.newAnalysisFileIds) {
			nextProps.getNewAnalysisData(
				nextProps.newAnalysisFileIds,
				nextProps.newAnalysisSortedBy,
				nextProps.newAnalysisSortOrder
			);

			if (nextProps.clauseAggregate.length > 0) {
				nextProps.clauseAggregate.map((clause, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						clause.value,
						clause.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"clause",
						isFilterForwarded
					);
				});
			}
			if (nextProps.tagsAggregate.length > 0) {
				nextProps.tagsAggregate.map((tags, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						tags.value,
						tags.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"tags",
						isFilterForwarded
					);
				});
			}
			if (nextProps.partyAggregate.length > 0) {
				nextProps.partyAggregate.map((party, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						party.value,
						party.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"party",
						isFilterForwarded
					);
				});
			}
			if (nextProps.renewalAggregate.length > 0) {
				nextProps.renewalAggregate.map((renewal, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						renewal.value,
						renewal.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"renewal",
						isFilterForwarded
					);
				});
			}
			if (nextProps.confidentialityAggregate.length > 0) {
				nextProps.confidentialityAggregate.map(
					(confidentialityBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							confidentialityBi.value,
							confidentialityBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"confidentiality",
							isFilterForwarded
						);
					}
				);
			}
			if (nextProps.changeOfControlAggregate.length > 0) {
				nextProps.changeOfControlAggregate.map(
					(changeofControlBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							changeofControlBi.value,
							changeofControlBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"changeofControl",
							isFilterForwarded
						);
					}
				);
			}
			if (nextProps.terminationAggregate.length > 0) {
				nextProps.terminationAggregate.map((terminationBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						terminationBi.value,
						terminationBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"termination",
						isFilterForwarded
					);
				});
			}
			if (nextProps.eventOfDefaultAggregate.length > 0) {
				nextProps.eventOfDefaultAggregate.map((eventOfDefaultBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						eventOfDefaultBi.value,
						eventOfDefaultBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"eventsofdefault",
						isFilterForwarded
					);
				});
			}
			if (nextProps.forceMajeureAggregate.length > 0) {
				nextProps.forceMajeureAggregate.map((forceMajeureBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						forceMajeureBi.value,
						forceMajeureBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"forcemajeure",
						isFilterForwarded
					);
				});
			}
			if (nextProps.governingLawAggregate.length > 0) {
				nextProps.governingLawAggregate.map((governingLawBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						governingLawBi.value,
						governingLawBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"governinglaw",
						isFilterForwarded
					);
				});
			}
			if (nextProps.disputeResolutionAggregate.length > 0) {
				nextProps.disputeResolutionAggregate.map(
					(disputeResolutionBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							disputeResolutionBi.value,
							disputeResolutionBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"disputeresolution",
							isFilterForwarded
						);
					}
				);
			}
			if (nextProps.consentAggregate.length > 0) {
				nextProps.consentAggregate.map((consentBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						consentBi.value,
						consentBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"consent",
						isFilterForwarded
					);
				});
			}
			if (nextProps.termAggregate.length > 0) {
				nextProps.termAggregate.map((termBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						termBi.value,
						termBi.outputLevel,
						"newanalysis",
						"value",
						"ASC",
						nextProps.appliedFilter,
						"term",
						isFilterForwarded
					);
				});
			}
			if (nextProps.paymentAggregate.length > 0) {
				nextProps.paymentAggregate.map((paymentBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						paymentBi.value,
						paymentBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"paymentobligation",
						isFilterForwarded
					);
				});
			}
			if (nextProps.indemnityAggregate.length > 0) {
				nextProps.indemnityAggregate.map((indemnityBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						indemnityBi.value,
						indemnityBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"indemnity",
						isFilterForwarded
					);
				});
			}
			if (nextProps.limitationOfLiabilityAggregate.length > 0) {
				nextProps.limitationOfLiabilityAggregate.map(
					(limitationOfLiabilityBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							limitationOfLiabilityBi.value,
							limitationOfLiabilityBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"limitationofliability",
							isFilterForwarded
						);
					}
				);
			}
			if (nextProps.nonCompeteAggregate.length > 0) {
				nextProps.nonCompeteAggregate.map((nonCompeteBi, i) => {
					nextProps.getNewAnalysisFilterAggregate(
						nonCompeteBi.value,
						nonCompeteBi.outputLevel,
						"newanalysis",
						"count",
						"DESC",
						nextProps.appliedFilter,
						"noncompete",
						isFilterForwarded
					);
				});
			}
			if (nextProps.sublettingAssignmentAggregate.length > 0) {
				nextProps.sublettingAssignmentAggregate.map(
					(sublettingAssignmentBi, i) => {
						nextProps.getNewAnalysisFilterAggregate(
							sublettingAssignmentBi.value,
							sublettingAssignmentBi.outputLevel,
							"newanalysis",
							"count",
							"DESC",
							nextProps.appliedFilter,
							"sublettingassignment",
							isFilterForwarded
						);
					}
				);
			}

			if (isFilterForwarded) {
				if (
					nextProps.newAnalysisFileIds !== undefined &&
					nextProps.newAnalysisFileIds !== null &&
					this.props.newAnalysisInitialFileIds ===
						nextProps.newAnalysisInitialFileIds
				) {
					let lastCount: number = Number(
						this.state.selectedConfigData.last_result_count
					);
					if (lastCount !== nextProps.newAnalysisFileIds.length) {
						let savedConfigId: number = Number(
							this.state.selectedConfigData.id
						);
						// nextProps.updateConfigurationCount(nextProps.newAnalysisFileIds.length, savedConfigId);
						console.log(
							"Updated count " +
								nextProps.newAnalysisFileIds.length +
								" ssId " +
								savedConfigId
						);
					}
				}
				/* console.log('Clear Applied State');
                this.setState({
                    selectedConfigData: {
                        id: '',
                        title: '',
                        description: '',
                        type: '',
                        last_result_count: '',
                        last_result_count_timestamp: '',
                        createdon: '',
                        createdby: '',
                        filter: []
                    } 
                }); */
			}
		}
	}

	render() {
		let {
			history,
			newAnalysisFileIds,
			newAnalysisSortOrder,
			newAnalysisSortedBy,
			newAnalysisLoader,
			newAnalysisData,
			newAnalysisDataLoader,
			newAnalysisInitialFileIds,
			applyNewAnalysisFilter,
			appliedFilter,
			getNewAnalysisFilterAggregate,
			newAnalysisTableConfig,
			clauseAbsentAggregateValues,
			clauseAggregate,
			clausePresentAggregateValues,
			clauseAggregateLoader,
			clauseAbsentAggregateLoader,
			clausePresentAggregateLoader,
			getNewAnalysisFilterCount,
			saveNewAnalysisConfiguration,
			saveNewAnalysisCurrency,
			newAnalysisFilteredCount,
			tagsAggregate,
			natureTagsAggregateValues,
			natureTagsAggregateLoader,
			typeTagsAggregateLoader,
			typeTagsAggregateValues,
			groupTagsAggregateValues,
			groupsTagsAggregateLoader,
			partyAggregate,
			partyAggregateLoader,
			partyAggregateValues,
			newAnalysisFilterConfig,
			renewalAggregate,
			confidentialityAggregate,
			confidentialityNatureAggregateLoader,
			confidentialityNatureAggregateValues,
			changeOfControlAggregate,
			changeOfControlIntersectionAggregateValues,
			changeOfControlIntersectionLoader,
			terminationAggregate,
			terminationAtConvinienceAggregateLoader,
			terminationAtConvinienceAggregateValues,
			terminationEventAggregateLoader,
			terminationEventAggregateValues,
			disputeResolutionActStatuteAggregateLoader,
			disputeResolutionActStatuteAggregateValues,
			disputeResolutionAggregate,
			disputeResolutionArbitrationAggregateLoader,
			disputeResolutionArbitrationAggregateValues,
			disputeResolutionConciliationAggregateLoader,
			disputeResolutionConciliationAggregateValues,
			disputeResolutionMediationAggregateLoader,
			disputeResolutionMediationAggregateValues,
			disputeResolutionNegotiationAggregateLoader,
			disputeResolutionNegotiationAggregateValues,
			disputeResolutionOthersAggregateLoader,
			disputeResolutionOthersAggregateValues,
			disputeResolutionPanelAggregateLoader,
			disputeResolutionPanelAggregateValues,
			disputeResolutionVenueAggregateLoader,
			disputeResolutionVenueAggregateValues,
			consentAggregate,
			consentAuthorityAggregateLoader,
			consentAuthorityAggregateValues,
			consentTypeAggregateLoader,
			consentTypeAggregateValues,
			eventOfDefaultAggregate,
			eventOfDefaultEventAggregateLoader,
			eventOfDefaultEventAggregateValues,
			forceMajeureAggregate,
			forceMajuereEventAggregateLoader,
			forceMajuereEventAggregateValues,
			governingLawAggregate,
			governingLawJurisdictionAggregateLoader,
			governingLawJurisdictionAggregateValues,
			termAggregate,
			startDateAggregateLoader,
			startDateAggregateValues,
			startDateLeftThumb,
			startDateMaxValue,
			startDateMinValue,
			startDateRightThumb,
			endDateAggregateLoader,
			endDateAggregateValues,
			endDateLeftThumb,
			endDateMaxValue,
			endDateMinValue,
			endDateRightThumb,
			paymentAggregate,
			paymentAmountAggregateLoader,
			paymentAmountAggregateValues,
			paymentAmountCurrency,
			paymentAmountLeftThumb,
			paymentAmountMaxValue,
			paymentAmountMinValue,
			paymentAmountRightThumb,
			paymentCurrencyAggregateLoader,
			paymentCurrencyAggregateValues,
			limitationOfLiabilityAggregate,
			limitationOfLiabilityAmountAggregateLoader,
			limitationOfLiabilityAmountAggregateValues,
			limitationOfLiabilityAmountCurrency,
			limitationOfLiabilityAmountLeftThumb,
			limitationOfLiabilityAmountMaxValue,
			limitationOfLiabilityAmountMinValue,
			limitationOfLiabilityAmountRightThumb,
			limitationOfLiabilityCurrencyAggregateLoader,
			limitationOfLiabilityCurrencyAggregateValues,
			indemnityAggregate,
			indemnityAmountAggregateLoader,
			indemnityAmountAggregateValues,
			indemnityAmountCurrency,
			indemnityAmountLeftThumb,
			indemnityAmountMaxValue,
			indemnityAmountMinValue,
			indemnityAmountRightThumb,
			indemnityCurrencyAggregateLoader,
			indemnityCurrencyAggregateValues,
			indemnityExtentOfCostsAggregateLoader,
			indemnityExtentOfCostsAggregateValues,
			indemnityPayeeAggregateLoader,
			indemnityPayeeAggregateValues,
			indemnityPayerAggregateLoader,
			indemnityPayerAggregateValues,
			indemnityTriggeringEventAggregateLoader,
			indemnityTriggeringEventAggregateValues,
			nonCompeteAggregate,
			nonCompeteTerritoryAggregateLoader,
			nonCompeteTerritoryAggregateValues,
			sublettingAssignmentAggregate,
			sublettingAssignmentConsentAggregateLoader,
			sublettingAssignmentConsentAggregateValues,
			sublettingAssignmentNoticeAggregateLoader,
			sublettingAssignmentNoticeAggregateValues,
		} = this.props;
		let {
			modalType,
			selectedFileName,
			selectedParties,
			scrollTop,
			searchTerm,
			multipleSearches,
			multipleAppliedFilters,
			exportFileLoader,
			selectedConfigData,
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
										<h4>
											Analysis
											{selectedConfigData.id !== "" && (
												<>
													&nbsp;&gt;&nbsp;
													{selectedConfigData.title}
												</>
											)}
										</h4>
									</div>
									{(newAnalysisDataLoader ||
										newAnalysisLoader) !== true && (
										<>
											<div className="col-md-2 pl-0">
												<span
													className="new-analysis-export-button cursor-pointer"
													onClick={() =>
														this.setExportToExcelModal()
													}
													style={{
														padding:
															exportFileLoader
																? "7px 25px"
																: "7px 43px",
													}}
												>
													Export
													{exportFileLoader && (
														<span>
															ing&nbsp;
															<img
																src="/static_images/small-loader.svg"
																alt="small-loader"
															/>
														</span>
													)}
												</span>
											</div>
											<div className="col-md-1 pl-0">
												<span
													className="new-analysis-save-config cursor-pointer"
													onClick={() =>
														this.saveConfigurationModal()
													}
													style={{
														background:
															appliedFilter.length ===
															0
																? "#C4C4C4"
																: "linear-gradient(180deg, #FFEF5A, #FBCE2F)",
													}}
												>
													Save
												</span>
											</div>
										</>
									)}
								</div>
							</div>
						</div>
						{newAnalysisLoader === true ? (
							<BarLoader />
						) : (
							<>
								{!(
									newAnalysisInitialFileIds &&
									newAnalysisInitialFileIds.length > 0
								) ? (
									<div className="row">
										<div className="col-md-10 text-center mt-5 ml-5">
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
										<div className="col-md-12 mt-4 pl-0">
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
																	{newAnalysisDataLoader ? (
																		<NumberLoader />
																	) : (
																		newAnalysisFileIds.length
																	)}
																	/
																	{
																		newAnalysisInitialFileIds.length
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
													{newAnalysisDataLoader ===
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
													{newAnalysisDataLoader ===
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
																{newAnalysisSortedBy ===
																	"title" &&
																	newAnalysisSortOrder ===
																		"descending" && (
																		<img
																			className="cursor-pointer"
																			src="/static_images/up-arrow.svg"
																			alt="up-arrow"
																		/>
																	)}
																{newAnalysisSortedBy ===
																	"title" &&
																	newAnalysisSortOrder ===
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
																{newAnalysisSortedBy ===
																	"date" &&
																	newAnalysisSortOrder ===
																		"descending" && (
																		<img
																			className="cursor-pointer"
																			src="/static_images/up-arrow.svg"
																			alt="up-arrow"
																		/>
																	)}
																{newAnalysisSortedBy ===
																	"date" &&
																	newAnalysisSortOrder ===
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
																height: "35vh",
																boxShadow:
																	"0px 4px 10px rgba(0, 0, 0, 0.1)",
															}}
														>
															{newAnalysisDataLoader ? (
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
																		250
																	}
																	minHeight={
																		"35vh"
																	}
																>
																	{newAnalysisData.map(
																		(
																			data: NewAnalysisData,
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
																									"/document/analysis/" +
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
												<div className="col-md-12 mt-3">
													<NewAnalysisQuickLook
														newAnalysisFileIds={
															newAnalysisFileIds
														}
														newAnalysisSortedBy={
															newAnalysisSortedBy
														}
														newAnalysisSortOrder={
															newAnalysisSortOrder
														}
														applyNewAnalysisFilter={
															applyNewAnalysisFilter
														}
														getNewAnalysisFilterAggregate={
															getNewAnalysisFilterAggregate
														}
														appliedFilter={
															appliedFilter
														}
														isFilterForwarded={
															this.state
																.selectedConfigData
																.id !== null &&
															this.state
																.selectedConfigData
																.id !== ""
																? true
																: false
														}
														clearForwardedFilter={() =>
															this.clearForwardedFilter()
														}
														clauseAggregate={
															clauseAggregate
														}
														clausePresentAggregateValues={
															clausePresentAggregateValues
														}
														clauseAbsentAggregateValues={
															clauseAbsentAggregateValues
														}
														clauseAggregateLoader={
															clauseAggregateLoader
														}
														clausePresentAggregateLoader={
															clausePresentAggregateLoader
														}
														clauseAbsentAggregateLoader={
															clauseAbsentAggregateLoader
														}
														getNewAnalysisFilterCount={
															getNewAnalysisFilterCount
														}
														newAnalysisFilteredCount={
															newAnalysisFilteredCount
														}
														saveNewAnalysisCurrency={
															saveNewAnalysisCurrency
														}
														tagsAggregate={
															tagsAggregate
														}
														natureTagsAggregateValues={
															natureTagsAggregateValues
														}
														natureTagsAggregateLoader={
															natureTagsAggregateLoader
														}
														typeTagsAggregateValues={
															typeTagsAggregateValues
														}
														typeTagsAggregateLoader={
															typeTagsAggregateLoader
														}
														groupTagsAggregateValues={
															groupTagsAggregateValues
														}
														groupsTagsAggregateLoader={
															groupsTagsAggregateLoader
														}
														partyAggregate={
															partyAggregate
														}
														partyAggregateValues={
															partyAggregateValues
														}
														partyAggregateLoader={
															partyAggregateLoader
														}
														newAnalysisFilterConfig={
															newAnalysisFilterConfig
														}
														renewalAggregate={
															renewalAggregate
														}
														confidentialityAggregate={
															confidentialityAggregate
														}
														confidentialityNatureAggregateValues={
															confidentialityNatureAggregateValues
														}
														confidentialityNatureAggregateLoader={
															confidentialityNatureAggregateLoader
														}
														changeOfControlAggregate={
															changeOfControlAggregate
														}
														changeOfControlIntersectionAggregateValues={
															changeOfControlIntersectionAggregateValues
														}
														changeOfControlIntersectionLoader={
															changeOfControlIntersectionLoader
														}
														terminationAggregate={
															terminationAggregate
														}
														terminationAtConvinienceAggregateLoader={
															terminationAtConvinienceAggregateLoader
														}
														terminationAtConvinienceAggregateValues={
															terminationAtConvinienceAggregateValues
														}
														terminationEventAggregateLoader={
															terminationEventAggregateLoader
														}
														terminationEventAggregateValues={
															terminationEventAggregateValues
														}
														eventOfDefaultAggregate={
															eventOfDefaultAggregate
														}
														eventOfDefaultEventAggregateLoader={
															eventOfDefaultEventAggregateLoader
														}
														eventOfDefaultEventAggregateValues={
															eventOfDefaultEventAggregateValues
														}
														forceMajeureAggregate={
															forceMajeureAggregate
														}
														forceMajuereEventAggregateLoader={
															forceMajuereEventAggregateLoader
														}
														forceMajuereEventAggregateValues={
															forceMajuereEventAggregateValues
														}
														disputeResolutionActStatuteAggregateLoader={
															disputeResolutionActStatuteAggregateLoader
														}
														disputeResolutionActStatuteAggregateValues={
															disputeResolutionActStatuteAggregateValues
														}
														disputeResolutionAggregate={
															disputeResolutionAggregate
														}
														disputeResolutionArbitrationAggregateLoader={
															disputeResolutionArbitrationAggregateLoader
														}
														disputeResolutionArbitrationAggregateValues={
															disputeResolutionArbitrationAggregateValues
														}
														disputeResolutionConciliationAggregateLoader={
															disputeResolutionConciliationAggregateLoader
														}
														disputeResolutionConciliationAggregateValues={
															disputeResolutionConciliationAggregateValues
														}
														disputeResolutionMediationAggregateLoader={
															disputeResolutionMediationAggregateLoader
														}
														disputeResolutionMediationAggregateValues={
															disputeResolutionMediationAggregateValues
														}
														disputeResolutionNegotiationAggregateLoader={
															disputeResolutionNegotiationAggregateLoader
														}
														disputeResolutionNegotiationAggregateValues={
															disputeResolutionNegotiationAggregateValues
														}
														disputeResolutionOthersAggregateLoader={
															disputeResolutionOthersAggregateLoader
														}
														disputeResolutionOthersAggregateValues={
															disputeResolutionOthersAggregateValues
														}
														disputeResolutionPanelAggregateLoader={
															disputeResolutionPanelAggregateLoader
														}
														disputeResolutionPanelAggregateValues={
															disputeResolutionPanelAggregateValues
														}
														disputeResolutionVenueAggregateLoader={
															disputeResolutionVenueAggregateLoader
														}
														disputeResolutionVenueAggregateValues={
															disputeResolutionVenueAggregateValues
														}
														consentAggregate={
															consentAggregate
														}
														consentAuthorityAggregateLoader={
															consentAuthorityAggregateLoader
														}
														consentAuthorityAggregateValues={
															consentAuthorityAggregateValues
														}
														consentTypeAggregateLoader={
															consentTypeAggregateLoader
														}
														consentTypeAggregateValues={
															consentTypeAggregateValues
														}
														governingLawAggregate={
															governingLawAggregate
														}
														governingLawJurisdictionAggregateLoader={
															governingLawJurisdictionAggregateLoader
														}
														governingLawJurisdictionAggregateValues={
															governingLawJurisdictionAggregateValues
														}
														termAggregate={
															termAggregate
														}
														startDateAggregateLoader={
															startDateAggregateLoader
														}
														startDateAggregateValues={
															startDateAggregateValues
														}
														startDateLeftThumb={
															startDateLeftThumb
														}
														startDateMaxValue={
															startDateMaxValue
														}
														startDateMinValue={
															startDateMinValue
														}
														startDateRightThumb={
															startDateRightThumb
														}
														endDateAggregateLoader={
															endDateAggregateLoader
														}
														endDateAggregateValues={
															endDateAggregateValues
														}
														endDateLeftThumb={
															endDateLeftThumb
														}
														endDateMaxValue={
															endDateMaxValue
														}
														endDateMinValue={
															endDateMinValue
														}
														endDateRightThumb={
															endDateRightThumb
														}
														paymentAggregate={
															paymentAggregate
														}
														paymentAmountAggregateLoader={
															paymentAmountAggregateLoader
														}
														paymentAmountAggregateValues={
															paymentAmountAggregateValues
														}
														paymentAmountCurrency={
															paymentAmountCurrency
														}
														paymentAmountLeftThumb={
															paymentAmountLeftThumb
														}
														paymentAmountMaxValue={
															paymentAmountMaxValue
														}
														paymentAmountMinValue={
															paymentAmountMinValue
														}
														paymentAmountRightThumb={
															paymentAmountRightThumb
														}
														paymentCurrencyAggregateLoader={
															paymentCurrencyAggregateLoader
														}
														paymentCurrencyAggregateValues={
															paymentCurrencyAggregateValues
														}
														limitationOfLiabilityAggregate={
															limitationOfLiabilityAggregate
														}
														limitationOfLiabilityAmountAggregateLoader={
															limitationOfLiabilityAmountAggregateLoader
														}
														limitationOfLiabilityAmountAggregateValues={
															limitationOfLiabilityAmountAggregateValues
														}
														limitationOfLiabilityAmountCurrency={
															limitationOfLiabilityAmountCurrency
														}
														limitationOfLiabilityAmountLeftThumb={
															limitationOfLiabilityAmountLeftThumb
														}
														limitationOfLiabilityAmountMaxValue={
															limitationOfLiabilityAmountMaxValue
														}
														limitationOfLiabilityAmountMinValue={
															limitationOfLiabilityAmountMinValue
														}
														limitationOfLiabilityAmountRightThumb={
															limitationOfLiabilityAmountRightThumb
														}
														limitationOfLiabilityCurrencyAggregateLoader={
															limitationOfLiabilityCurrencyAggregateLoader
														}
														limitationOfLiabilityCurrencyAggregateValues={
															limitationOfLiabilityCurrencyAggregateValues
														}
														indemnityAggregate={
															indemnityAggregate
														}
														indemnityAmountAggregateLoader={
															indemnityAmountAggregateLoader
														}
														indemnityAmountAggregateValues={
															indemnityAmountAggregateValues
														}
														indemnityAmountCurrency={
															indemnityAmountCurrency
														}
														indemnityAmountLeftThumb={
															indemnityAmountLeftThumb
														}
														indemnityAmountMaxValue={
															indemnityAmountMaxValue
														}
														indemnityAmountMinValue={
															indemnityAmountMinValue
														}
														indemnityAmountRightThumb={
															indemnityAmountRightThumb
														}
														indemnityCurrencyAggregateLoader={
															indemnityCurrencyAggregateLoader
														}
														indemnityCurrencyAggregateValues={
															indemnityCurrencyAggregateValues
														}
														indemnityExtentOfCostsAggregateLoader={
															indemnityExtentOfCostsAggregateLoader
														}
														indemnityExtentOfCostsAggregateValues={
															indemnityExtentOfCostsAggregateValues
														}
														indemnityPayeeAggregateLoader={
															indemnityPayeeAggregateLoader
														}
														indemnityPayeeAggregateValues={
															indemnityPayeeAggregateValues
														}
														indemnityPayerAggregateLoader={
															indemnityPayerAggregateLoader
														}
														indemnityPayerAggregateValues={
															indemnityPayerAggregateValues
														}
														indemnityTriggeringEventAggregateLoader={
															indemnityTriggeringEventAggregateLoader
														}
														indemnityTriggeringEventAggregateValues={
															indemnityTriggeringEventAggregateValues
														}
														nonCompeteAggregate={
															nonCompeteAggregate
														}
														nonCompeteTerritoryAggregateLoader={
															nonCompeteTerritoryAggregateLoader
														}
														nonCompeteTerritoryAggregateValues={
															nonCompeteTerritoryAggregateValues
														}
														sublettingAssignmentAggregate={
															sublettingAssignmentAggregate
														}
														sublettingAssignmentConsentAggregateLoader={
															sublettingAssignmentConsentAggregateLoader
														}
														sublettingAssignmentConsentAggregateValues={
															sublettingAssignmentConsentAggregateValues
														}
														sublettingAssignmentNoticeAggregateLoader={
															sublettingAssignmentNoticeAggregateLoader
														}
														sublettingAssignmentNoticeAggregateValues={
															sublettingAssignmentNoticeAggregateValues
														}
													/>
												</div>
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
									type={modalType}
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
									pageType="newAnalysis"
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
									pageType="newAnalysis"
								/>
								<button
									style={{ display: "none" }}
									type="button"
									data-toggle="modal"
									data-target="#newAnalysisViewFiltersModal"
									id="newAnalysisViewFiltersModalButton"
								></button>
								<NewAnalysisSaveConfigModal
									appliedFilters={appliedFilter}
									initialFilteredCount={
										newAnalysisFileIds !== null
											? newAnalysisFileIds.length
											: 0
									}
									saveNewAnalysisConfiguration={
										saveNewAnalysisConfiguration
									}
								/>
								<button
									style={{ display: "none" }}
									type="button"
									data-toggle="modal"
									data-target="#newAnalysisSaveConfigModal"
									id="newAnalysisSaveConfigModalButton"
								></button>
								<NewAnalysisExportToExcelModal
									appliedFilter={appliedFilter}
									newAnalysisTableConfig={
										newAnalysisTableConfig
									}
									newAnalysisFileIds={newAnalysisFileIds}
									setExportStatusLoader={(
										exportFileLoader: boolean
									) =>
										this.setState({
											exportFileLoader: exportFileLoader,
										})
									}
								/>
								<button
									style={{ display: "none" }}
									type="button"
									data-toggle="modal"
									data-target="#newAnalysisExportToExcelModal"
									id="newAnalysisExportToExcelModalButton"
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

	setExportToExcelModal() {
		let { exportFileLoader } = this.state;
		if (exportFileLoader === false) {
			let link = document.getElementById(
				"newAnalysisExportToExcelModalButton"
			);
			!isNullOrUndefined(link) && link.click();
		}
	}

	saveConfigurationModal() {
		let { appliedFilter } = this.props;
		if (appliedFilter.length > 0) {
			let link = document.getElementById(
				"newAnalysisSaveConfigModalButton"
			);
			!isNullOrUndefined(link) && link.click();
		}
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
		let { appliedFilter, newAnalysisSortOrder, newAnalysisSortedBy } =
			this.props;
		let { searchTerm } = this.state;
		if (searchTerm.length > 0) {
			let tempSearchFilter = generateNewAnalaysisSearchFilter(searchTerm);
			let tempAppliedFilters = addOrReplaceNewAnalysisSearchFilters(
				tempSearchFilter,
				appliedFilter
			);
			this.props.applyNewAnalysisFilter(
				"",
				tempAppliedFilters,
				newAnalysisSortedBy,
				newAnalysisSortOrder
			);
			this.setState({ searchTerm: "" });
		}
	}

	removeSearch(searchTerm: string) {
		let { appliedFilter, newAnalysisSortOrder, newAnalysisSortedBy } =
			this.props;
		let tempAppliedFilters = removeNewAnalysisSearchFilter(
			searchTerm,
			appliedFilter
		);
		this.props.applyNewAnalysisFilter(
			"",
			tempAppliedFilters,
			newAnalysisSortedBy,
			newAnalysisSortOrder
		);
	}

	resetSearchFilters() {
		let { appliedFilter, newAnalysisSortOrder, newAnalysisSortedBy } =
			this.props;
		let tempAppliedFilters: NewAnalysisFilterStructure[] =
			removeAllNewAnalysisSearchFilters(appliedFilter);
		this.props.applyNewAnalysisFilter(
			"",
			tempAppliedFilters,
			newAnalysisSortedBy,
			newAnalysisSortOrder
		);
	}

	applySort(sortBy: string) {
		let { newAnalysisSortOrder, newAnalysisSortedBy, newAnalysisFileIds } =
			this.props;
		let sortOrder: string = "";
		if (sortBy === "title" && newAnalysisSortedBy !== sortBy) {
			sortOrder = "ascending";
		} else if (sortBy === "date" && newAnalysisSortedBy !== sortBy) {
			sortOrder = "ascending";
		} else if (sortBy === newAnalysisSortedBy) {
			if (newAnalysisSortOrder === "ascending") {
				sortOrder = "descending";
			} else {
				sortOrder = "ascending";
			}
		} else {
			sortOrder = "ascending";
		}
		this.props.saveNewAnalysisSort(sortBy, sortOrder);
		this.props.getNewAnalysisData(newAnalysisFileIds, sortBy, sortOrder);
	}

	clearForwardedFilter() {
		this.setState({
			selectedConfigData: {
				id: "",
				title: "",
				description: "",
				type: "",
				last_result_count: "",
				last_result_count_timestamp: "",
				createdon: "",
				createdby: "",
				filter: [],
			},
		});
	}

	clearAppliedFilters() {
		let { newAnalysisSortedBy, newAnalysisSortOrder } = this.props;
		this.props.applyNewAnalysisFilter(
			"",
			[],
			newAnalysisSortedBy,
			newAnalysisSortOrder
		);
		this.setState({
			scrollTop: false,
			selectedParties: [],
			selectedFileName: "",
			modalType: "",
			searchTerm: "",
			multipleSearches: getNewAnalysisSearchStrings([]),
			multipleAppliedFilters: this.getAppliedFilters([]),
			selectedConfigData: {
				id: "",
				title: "",
				description: "",
				type: "",
				last_result_count: "",
				last_result_count_timestamp: "",
				createdon: "",
				createdby: "",
				filter: [],
			},
		});
	}

	getAppliedFilters(appliedFilters: NewAnalysisFilterStructure[]) {
		let appliedFiltersStringArray: string[] = [];
		for (let i = 0; i < appliedFilters.length; i++) {
			let filterString: string = iterateNewAnalysisFilter(
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
