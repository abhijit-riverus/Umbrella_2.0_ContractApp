import React from "react";
import SentenceRenderer from "../../UniversalComponents/SentenceRenderer/Container/sentenceCon";
import {
	SentencesData,
	InsightsInterface,
	BiPointDataMode,
	DurationType,
	CurrencyType,
} from "../State/documentState";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import InfoBar from "./InfoBar/infoBar";
import DocumentInsights from "./documentInsights";
import { History } from "history";
import RequestTagModal from "../../UniversalComponents/Modals/RequestTagsModal/requestTagsCon";
import ScrollNavButton from "./scrollNavButton";
import TaskModal from "../../UniversalComponents/Modals/TaskManagementModal/Container/taskModalCon";
import {
	CurrentTask,
	TaskData,
	TaskState,
} from "../../UniversalComponents/Modals/TaskManagementModal/State/taskManagementState";
import TaskPagecomponent from "./TaskPage/taskPageComponent";
import {
	AllTasksData,
	ProgressNameList,
} from "../../TaskManagement/State/taskManagementPageState";
import TaskStatusModal from "../../UniversalComponents/Modals/TaskStatusModal/TaskStatusModalCon";
import ViewFileHierarchyModal from "../../UniversalComponents/Modals/ViewFileHierarchyModal/viewFileHierarchyModal";
import { FileHierarchy } from "../../DocumentLibrary/State/documentLibraryState";
import SentenceFrameRenderer from "../../UniversalComponents/SentenceRenderer/Component/sentenceFrameRenderer";
import CreateClauseModal from "../../UniversalComponents/Modals/ClauseLibraryModals/CreateClauseModal/createClauseModalCon";
import { isNullOrUndefined } from "is-what";

interface Props {
	match: any;
	location: any;
	history: History;
	sentenceData: SentencesData;
	getSentences: (fileId: number) => void;
	pageWatcher: (page: string) => void;
	getInsights: (fileId: number) => void;
	insightsData: InsightsInterface[];
	sentenceLoader: boolean;
	editLoader: boolean;
	storedBiPointDataModes: BiPointDataMode[];
	saveBiPointDataMode: (storedBiPointDataModes: BiPointDataMode[]) => void;
	currentTask: CurrentTask;
	setCurrentTask: (name: string, value: string, contractName: string) => void;
	allTasksData: AllTasksData[];
	getAllTasksData: (
		fileID: number,
		requestID: number,
		sort: string,
		order: string,
		selfAssigned: boolean,
		clauseType: string
	) => void;
	progressNameList: ProgressNameList[];
	updateProgress: (requestID: number, progressID: number) => void;
	getProgressNameList: () => void;
	isProgressUpdated: number;
	taskLoader: boolean;
	createTaskSuccess: number;
	getClauseType: () => void;
	getDocumentTree: (fileID: number) => void;
	documentTree: FileHierarchy;
	saveDocumentTree: (documentTree: FileHierarchy) => void;
	clauseModeStatus: boolean;
	saveClauseModeStatus: (clauseModeStatus: boolean) => void;
	getFolderHeading: () => void;
	taskProgress: TaskState[];
	editDataPoint: (
		fileId: number,
		dataType: string,
		dataPointName: any,
		highlightedId?: number | null
	) => void;
	saveInsightToDelete: (
		insightToDelete: any,
		childLabelToDelete: string
	) => void;
	durationList: DurationType[];
	getDurationTypes: () => void;
	currencyList: CurrencyType[];
	getCurrencyTypes: () => void;
}

interface State {
	dataPoints: string[];
	clickedState: boolean;
	tempParaIndex: number;
	scrolledChildIndex: number;
	superImposedChildIndex: number;
	type: string;
	scrollTop: boolean;
	fileId: number;
	editOptionSelected: boolean;
	selectedInsightPoint: string;
	currentScrollIndex: number;
	tabs: string[];
	activeTabName: string;
	hideTaskPage: boolean;
	showTaskStatusModal: boolean;
	editMode: boolean;
	currentEditTaskData: AllTasksData;
	selectedClauseText: string;
	requestID: number;
	taskOrigin: string; // to identify if task page is opened through insights or tasks-icon
}

export default class DocumentView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			dataPoints: [],
			clickedState: false,
			tempParaIndex: 0,
			scrolledChildIndex: 0,
			type: "",
			superImposedChildIndex: 0,
			scrollTop: false,
			fileId: 0,
			editOptionSelected: false,
			selectedInsightPoint: "",
			currentScrollIndex: 0,
			tabs: ["Insights", "Structure"],
			activeTabName: "Insights",
			hideTaskPage: true,
			showTaskStatusModal: false,
			editMode: false,
			currentEditTaskData: {
				requestID: 0,
				taskTitle: "",
				description: "",
				clauseName: "",
				clauseAlias: "",
				biType: "",
				biColumnName: "",
				progressID: 0,
				progressName: "",
				stateName: "",
				dueDate: "",
				contractID: 0,
				linkedText: "",
				contractName: "",
				associateGroup: [],
				reminder: {
					reminderStart: 0,
					reminderStartType: "",
					reminderType: "",
					reminderUntil: "",
					frequencyType: "",
				},
				checkList: [],
			},
			selectedClauseText: "",
			requestID: 0,
			taskOrigin: "",
		};
	}

	componentDidMount() {
		let {
			match,
			getSentences,
			pageWatcher,
			getInsights,
			getProgressNameList,
			getAllTasksData,
			allTasksData,
		} = this.props;
		let fileId = match.params.id;
		this.setState({ fileId: parseInt(atob(fileId), 10) });
		getSentences(fileId);
		getInsights(fileId);
		pageWatcher("document");
		document.addEventListener("scroll", (e) => this.toggleGoToTop());
		this.props.getDurationTypes();
		this.props.getCurrencyTypes();
		// getProgressNameList();
		if (!isNullOrUndefined(match.params.requestid)) {
			let requestID = match.params.requestid;
			this.setState({ requestID: parseInt(atob(requestID), 10) });
			getAllTasksData(
				parseInt(atob(fileId), 10),
				parseInt(atob(requestID), 10),
				"",
				"",
				false,
				""
			);
			this.setState({ hideTaskPage: false });
		}
	}

	componentWillReceiveProps(nextProps: Props) {
		if (
			this.props.editLoader !== nextProps.editLoader &&
			!nextProps.editLoader
		) {
			this.props.getInsights(this.props.match.params.id);
		}

		if (
			!isNullOrUndefined(this.props.match.params.requestid) &&
			this.props.allTasksData !== nextProps.allTasksData &&
			this.state.requestID !== 0
		) {
			if (nextProps.allTasksData.length === 1) {
				this.setState(
					{
						currentEditTaskData: nextProps.allTasksData[0],
						hideTaskPage: false,
						editMode: true,
					},
					() => {
						let link = document.getElementById("taskModalButton");
						!isNullOrUndefined(link) && link.click();
					}
				);
			}
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

	getTabStyle = (label: string, isActive: boolean) => {
		if (isActive) {
			switch (label) {
				case "Insights": {
					return "col-md-6 label active-tab1 tab-border";
				}
				// case 'Obligations': {
				//     return 'col-md-4 label active-tab2 tab-border';
				// }
				case "Structure": {
					return "col-md-6 label active-tab3";
				}
				default: {
					return "col-md-6 label active-tab";
				}
			}
		} else {
			switch (label) {
				case "Insights": {
					return "col-md-6 label inactive-tab tab-border";
				}
				// case 'Obligations': {
				//     return 'col-md-4 label inactive-tab tab-border';
				// }
				case "Structure": {
					return "col-md-6 label inactive-tab";
				}
				default: {
					return "col-md-6 label inactive-tab";
				}
			}
		}
	};

	render() {
		let {
			currentTask,
			sentenceData,
			insightsData,
			match,
			history,
			location,
			sentenceLoader,
			editLoader,
			storedBiPointDataModes,
			saveBiPointDataMode,
			setCurrentTask,
			allTasksData,
			getAllTasksData,
			progressNameList,
			updateProgress,
			isProgressUpdated,
			taskLoader,
			getClauseType,
			documentTree,
			saveDocumentTree,
			getDocumentTree,
			clauseModeStatus,
			saveClauseModeStatus,
			getFolderHeading,
			taskProgress,
			editDataPoint,
			saveInsightToDelete,
			durationList,
			currencyList,
		} = this.props;
		let {
			dataPoints,
			clickedState,
			tempParaIndex,
			scrolledChildIndex,
			type,
			superImposedChildIndex,
			scrollTop,
			fileId,
			editOptionSelected,
			selectedInsightPoint,
			currentScrollIndex,
			hideTaskPage,
			editMode,
			currentEditTaskData,
			selectedClauseText,
			taskOrigin,
		} = this.state;
		return (
			<>
				<div className="row">
					<div
						className="col-md-7 mt-4 mb-2 col-12"
						style={{ position: "fixed", zIndex: 2 }}
					>
						<InfoBar
							fileId={match.params.id}
							linkedPage={match.params.page}
							setTaskPage={(hideTaskPage: boolean) =>
								this.setState({ hideTaskPage: hideTaskPage })
							}
							setCurrentTask={setCurrentTask}
							getAllTasksData={getAllTasksData}
							fileID={fileId}
							getClauseType={getClauseType}
							getDocumentTree={getDocumentTree}
							clauseModeStatus={clauseModeStatus}
							saveClauseModeStatus={saveClauseModeStatus}
							getFolderHeading={getFolderHeading}
							setRequestID={(requestID: number) =>
								this.setState({ requestID: requestID })
							}
							setTaskOrigin={(origin: string) =>
								this.setState({ taskOrigin: origin })
							}
						/>
						<TaskPagecomponent
							hidden={hideTaskPage}
							currentTask={currentTask}
							allTasksData={allTasksData}
							getAllTasksData={getAllTasksData}
							fileId={fileId}
							updateProgress={updateProgress}
							isProgressUpdated={isProgressUpdated}
							taskLoader={taskLoader}
							setEditMode={(
								editMode: boolean,
								currentEditTaskData: AllTasksData
							) =>
								this.setState({
									editMode: editMode,
									currentEditTaskData: currentEditTaskData,
								})
							}
							setHideTaskPage={(hide: boolean) =>
								this.setState({ hideTaskPage: hide })
							}
							taskProgress={taskProgress}
						/>
						{/* <button style={{ display: 'none' }} type="button" id="taskPageButton"></button> */}
					</div>
				</div>
				<div className="row">
					<div className="col-md-1 px-0">
						<SideNavbar history={history} />
					</div>
					<div
						className="col-md-6"
						style={{ top: "19vh", right: "6vh" }}
					>
						{clauseModeStatus ? (
							<SentenceFrameRenderer
								sentenceData={sentenceData}
								sentenceLoader={sentenceLoader}
								setClauseText={(selectedClauseText: string) =>
									this.setState({
										selectedClauseText: selectedClauseText,
									})
								}
							/>
						) : (
							<>
								<SentenceRenderer
									sentenceData={sentenceData}
									sentenceLoader={sentenceLoader}
									editOptionSelected={editOptionSelected}
									selectedInsightPoint={selectedInsightPoint}
									fileId={fileId}
									editDataPoint={editDataPoint}
								/>
								{dataPoints.length > 1 && clickedState && (
									<ScrollNavButton
										dataPoints={dataPoints}
										currentScrollIndex={currentScrollIndex}
										type={type}
										setCurrentScrollIndex={(
											currentScrollIndex: number
										) =>
											this.setState({
												currentScrollIndex:
													currentScrollIndex,
											})
										}
										selectedInsightPoint={
											selectedInsightPoint
										}
									/>
								)}
							</>
						)}
						{/* dataPoints.length > 1 && clickedState && <StickyNavButtons dataPoints={dataPoints} tempParaIndex={tempParaIndex}
                            getScrolledIndex={(scrolledChildIndex: number) => this.setState({ scrolledChildIndex: scrolledChildIndex })}
                            type={type} superImposedChildIndex={superImposedChildIndex} />} */}
					</div>
					{scrollTop && (
						<div
							className="go-to-top"
							onClick={() =>
								window.scrollTo({ top: 0, behavior: "smooth" })
							}
						>
							<img
								src="/static_images/go-to-top.svg"
								alt="go-to-top"
							/>
							Top
						</div>
					)}
					<div
						className="col-md-5"
						style={{ position: "fixed", left: "55vw", top: "10vh" }}
					>
						<div className="row">
							<div
								id="tabs-container"
								style={{ width: "-webkit-fill-available" }}
							>
								<div>
									{this.state.tabs.map((label, i) => (
										<React.Fragment key={i}>
											<div
												className={
													this.state.activeTabName ===
													label
														? this.getTabStyle(
																label,
																true
														  )
														: this.getTabStyle(
																label,
																false
														  )
												}
												id={"l" + i}
												onClick={() => {
													this.setState({
														activeTabName: label,
													});
												}}
											>
												{label}
											</div>
										</React.Fragment>
									))}
								</div>
							</div>
							<DocumentInsights
								editLoader={editLoader}
								sentenceLoader={sentenceLoader}
								fileId={fileId}
								insightsData={insightsData}
								saveDataPoints={(
									dataPoints: string[],
									state: boolean,
									tempParaIndex: number,
									type: string
								) =>
									this.setState({
										dataPoints: dataPoints,
										clickedState: state,
										tempParaIndex: tempParaIndex,
										type: type,
									})
								}
								scrolledChildIndex={scrolledChildIndex}
								superImposeChildIndex={(
									scrolledChildIndex: number
								) =>
									this.setState({
										superImposedChildIndex:
											scrolledChildIndex,
									})
								}
								location={location}
								history={history}
								editOptionSelected={(
									editOptionSelected: boolean
								) =>
									this.setState({
										editOptionSelected: editOptionSelected,
									})
								}
								storedBiPointDataModes={storedBiPointDataModes}
								saveBiPointDataMode={(
									storedBiPointDataModes: BiPointDataMode[]
								) =>
									saveBiPointDataMode(storedBiPointDataModes)
								}
								saveSelectedInsightPoint={(
									selectedInsightPoint: string
								) =>
									this.setState({
										selectedInsightPoint:
											selectedInsightPoint,
									})
								}
								setCurrentScrollIndex={(
									currentScrollIndex: number
								) =>
									this.setState({
										currentScrollIndex: currentScrollIndex,
									})
								}
								currentScrollIndex={currentScrollIndex}
								currentTask={currentTask}
								setCurrentTask={setCurrentTask}
								fileEncoded={match.params.id}
								setTaskPage={(hideTaskPage: boolean) =>
									this.setState({
										hideTaskPage: hideTaskPage,
									})
								}
								getAllTasksData={getAllTasksData}
								clauseModeStatus={clauseModeStatus}
								setTaskOrigin={(origin: string) =>
									this.setState({ taskOrigin: origin })
								}
								editDataPoint={editDataPoint}
								saveInsightToDelete={saveInsightToDelete}
								durationList={durationList}
								currencyList={currencyList}
							/>
						</div>
					</div>
				</div>
				<RequestTagModal />

				<TaskModal
					fileID={fileId}
					editMode={editMode}
					currentEditTaskData={currentEditTaskData}
					origin={taskOrigin}
				/>
				<button
					style={{ display: "none" }}
					type="button"
					data-toggle="modal"
					data-target="#taskModal"
					id="taskModalButton"
				></button>
				<TaskStatusModal editMode={editMode} />

				<button
					style={{ display: "none" }}
					type="button"
					data-toggle="modal"
					data-target="#taskStatusModal"
					id="taskStatusModalButton"
				></button>
				<ViewFileHierarchyModal
					currentFileId={fileId}
					documentTree={documentTree}
					saveDocumentTree={saveDocumentTree}
				/>
				<CreateClauseModal
					selectedClauseText={selectedClauseText}
					currentFileId={fileId}
				/>
			</>
		);
	}
}
