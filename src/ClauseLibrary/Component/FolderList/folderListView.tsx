import Tooltip from "@material-ui/core/Tooltip";
import React, { Component } from "react";
import Scrollable from "../../../UniversalComponents/Scrollable/scrollable";
import {
	getDateFormat,
	textCopyToClipboard,
} from "../../../Utils/DataModifierUtil/dataModUtil";
import {
	ClauseFolderState,
	ClauseInfo,
	ClauseState,
	ClauseStructure,
} from "../../State/clauseLibraryState";
import {
	addOrRemoveFolderIds,
	getClauseInfoFromClauseArray,
} from "../Utils/clauseLibraryUtils";

interface Props {
	clauseLibraryData: ClauseFolderState[];
	collapsedFolderIds: number[];
	saveCollapsedFolderIds: (collapsedFolderIds: number[]) => void;
	setSelectedFolderInfo: (folderId: number, folderName: string) => void;
	setClauseModalMode: (clauseModalMode: string) => void;
	selectedClauseData: ClauseInfo;
	saveSelectedClauseData: (selectedClauseData: ClauseInfo) => void;
	getFolderHeading: () => void;
	getFolderSubHeading: (parentId: number) => void;
	deleteFolder: (folderId: number) => void;
	deleteClause: (clauseId: number) => void;
	getClauseLibraryData: () => void;
	clausesData: ClauseStructure[];
}

interface State {}

export default class FolderListView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	componentWillReceiveProps(nextProps: Props) {}

	render() {
		let { clauseLibraryData, collapsedFolderIds } = this.props;
		return (
			<div className="row">
				<div className="col-md-12 clause-folder-text">
					<Scrollable maxHeight={"60"}>
						{clauseLibraryData &&
							clauseLibraryData.length > 0 &&
							clauseLibraryData.map((folder, i) => (
								<div className="clause-folder-row" key={i}>
									<div className="clause-library-row">
										<div
											className="row clause-folder-list-row"
											style={{ height: "40px" }}
										>
											<div
												className="col-md-4 clause-column-padding"
												onClick={() =>
													this.expandCollapseFolder(
														folder.folderID
													)
												}
											>
												<img
													className="clause-expand-icn"
													src="/static_images/clause-folder-expand-collapse-icn.svg"
													alt="expand-collapse-folder"
													style={{
														transform:
															this.props.collapsedFolderIds.indexOf(
																folder.folderID
															) > -1
																? "rotate(270deg)"
																: "none",
													}}
												/>{" "}
												&nbsp;
												<img
													className="clause-folder-icn"
													src="/static_images/clause-folder-icn.svg"
													alt="clause-folder"
												/>
												&nbsp;
												{folder.folderName}
											</div>
											<div className="col-md-2 clause-column-padding">
												<div className="row">
													<div className="col-md-6">
														<Tooltip
															title={
																"Add sub-folder"
															}
															placement="right-end"
														>
															<img
																className="clause-add-folder-icn"
																src="/static_images/clause-add-folder-icn.svg"
																alt="add-folder"
																data-toggle="modal"
																data-target="#createSubFolderModal"
																onClick={() =>
																	this.setSelectedFolderInfo(
																		folder.folderID,
																		folder.folderName
																	)
																}
															/>
														</Tooltip>
													</div>
													<div className="col-md-6 ">
														{folder.createdBy ===
														"System" ? (
															<img
																className="clause-copy-icn"
																src="/static_images/clause-libary-delete-inactive-icn.svg"
																alt="folder-delete-disabled"
															/>
														) : (
															<Tooltip
																title={
																	"Delete Clause"
																}
																placement="right-end"
															>
																<img
																	className="clause-copy-icn"
																	src="/static_images/clause-libary-delete-icn.svg"
																	alt="folder-delete"
																	onClick={() =>
																		this.deleteFolder(
																			folder.folderID
																		)
																	}
																/>
															</Tooltip>
														)}
													</div>
												</div>
											</div>
											<div className="col-md-2 clause-column-padding">
												{folder.createdBy}
											</div>
											<div className="col-md-2 clause-column-padding">
												{folder.createdOn !== ""
													? getDateFormat(
															folder.createdOn
													  )
													: ""}
											</div>
											<div className="col-md-2 clause-column-padding">
												{folder.modifiedOn !== "" &&
												folder.modifiedOn !== null
													? getDateFormat(
															folder.modifiedOn
													  )
													: ""}
											</div>
										</div>
									</div>
									{folder.children.length > 0 &&
										this.props.collapsedFolderIds.indexOf(
											folder.folderID
										) < 0 &&
										folder.children.map((subFolder, j) => (
											<div
												className="clause-library-row"
												key={j}
											>
												<div className="row clause-folder-list-row">
													<div
														className="col-md-4 clause-column-padding"
														onClick={() =>
															this.expandCollapseFolder(
																subFolder.folderID
															)
														}
													>
														<IndentRow level={1} />
														<img
															className="clause-expand-icn"
															src="/static_images/clause-folder-expand-collapse-icn.svg"
															alt="expand-collapse-folder"
															style={{
																transform:
																	this.props.collapsedFolderIds.indexOf(
																		subFolder.folderID
																	) > -1
																		? "rotate(270deg)"
																		: "none",
															}}
														/>{" "}
														&nbsp;
														<img
															className="clause-folder-icn"
															src="/static_images/clause-folder-icn.svg"
															alt="clause-folder"
														/>
														&nbsp;
														{subFolder.folderName}
													</div>
													<div className="col-md-2 clause-column-padding">
														<div className="row">
															<div className="col-md-6 "></div>
															<div className="col-md-6 ">
																{subFolder.createdBy ===
																"System" ? (
																	<img
																		className="clause-copy-icn"
																		src="/static_images/clause-libary-delete-inactive-icn.svg"
																		alt="folder-delete-disabled"
																	/>
																) : (
																	<Tooltip
																		title={
																			"Delete Clause"
																		}
																		placement="right-end"
																	>
																		<img
																			className="clause-copy-icn"
																			src="/static_images/clause-libary-delete-icn.svg"
																			alt="folder-delete"
																			onClick={() =>
																				this.deleteFolder(
																					subFolder.folderID
																				)
																			}
																		/>
																	</Tooltip>
																)}
															</div>
														</div>
													</div>
													<div className="col-md-2 clause-column-padding">
														{subFolder.createdBy}
													</div>
													<div className="col-md-2 clause-column-padding">
														{subFolder.createdOn !==
														""
															? getDateFormat(
																	subFolder.createdOn
															  )
															: ""}
													</div>
													<div className="col-md-2 clause-column-padding">
														{subFolder.modifiedOn !==
															"" &&
														subFolder.modifiedOn !==
															null
															? getDateFormat(
																	subFolder.modifiedOn
															  )
															: ""}
													</div>
												</div>
												{subFolder.clauses.length > 0 &&
													subFolder.clauses[0].id !==
														null &&
													this.props.collapsedFolderIds.indexOf(
														folder.folderID
													) < 0 &&
													this.props.collapsedFolderIds.indexOf(
														subFolder.folderID
													) < 0 &&
													subFolder.clauses.map(
														(clause, k) => (
															<div
																className="clause-library-row"
																key={k}
															>
																<div className="row clause-folder-list-row">
																	<div
																		className="col-md-4 clause-column-padding"
																		onClick={() =>
																			this.showViewClausePopup(
																				clause
																			)
																		}
																		data-toggle="modal"
																		data-target="#createClausePageModal"
																	>
																		<IndentRow
																			level={
																				2
																			}
																		/>
																		<img
																			className="clause-icn"
																			src="static_images/clause-icn.svg"
																			alt="clause-icon"
																		/>
																		&nbsp;
																		{
																			clause.name
																		}
																		&nbsp;
																		{clause.clauseType !==
																			null && (
																			<span className="clause-type-grey">
																				{"(" +
																					clause.clauseType +
																					")"}
																			</span>
																		)}
																	</div>
																	<div className="col-md-2 clause-column-padding">
																		<div className="row">
																			<div className="col-md-6">
																				<Tooltip
																					title={
																						"Copy clause text"
																					}
																					placement="right-end"
																				>
																					<img
																						className="clause-copy-icn"
																						src="/static_images/clause-copy-icn.svg"
																						alt="clause-copy"
																						onClick={() =>
																							this.copyClauseText(
																								clause
																							)
																						}
																					/>
																				</Tooltip>
																			</div>
																			<div className="col-md-6">
																				<Tooltip
																					title={
																						"Delete Clause"
																					}
																					placement="right-end"
																				>
																					<img
																						className="clause-copy-icn"
																						src="/static_images/clause-libary-delete-icn.svg"
																						alt="clause-delete"
																						onClick={() =>
																							this.deleteClause(
																								clause.id
																							)
																						}
																					/>
																				</Tooltip>
																			</div>
																		</div>
																	</div>
																	<div className="col-md-2 clause-column-padding">
																		{
																			clause.createdBy
																		}
																	</div>
																	<div className="col-md-2 clause-column-padding">
																		{clause.createdOn !==
																		""
																			? getDateFormat(
																					clause.createdOn
																			  )
																			: ""}
																	</div>
																	<div className="col-md-2 clause-column-padding">
																		{clause.modifiedOn !==
																			"" &&
																		clause.modifiedOn !==
																			null
																			? getDateFormat(
																					clause.modifiedOn
																			  )
																			: ""}
																	</div>
																</div>
															</div>
														)
													)}
											</div>
										))}
									{folder.clauses.length > 0 &&
										folder.clauses[0].id !== null &&
										this.props.collapsedFolderIds.indexOf(
											folder.folderID
										) < 0 &&
										folder.clauses.map((clause, l) => (
											<div
												className="clause-library-row"
												key={l}
											>
												<div className="row clause-folder-list-row">
													<div
														className="col-md-4 clause-column-padding"
														onClick={() =>
															this.showViewClausePopup(
																clause
															)
														}
														data-toggle="modal"
														data-target="#createClausePageModal"
													>
														<IndentRow level={1} />
														<img
															className="clause-icn"
															src="static_images/clause-icn.svg"
															alt="clause-icon"
														/>
														&nbsp;
														{clause.name}&nbsp;
														{clause.clauseType !==
															null && (
															<span className="clause-type-grey">
																{"(" +
																	clause.clauseType +
																	")"}
															</span>
														)}
													</div>
													<div className="col-md-2 clause-column-padding">
														<div className="row">
															<div className="col-md-6 ">
																<Tooltip
																	title={
																		"Copy clause text"
																	}
																	placement="right-end"
																>
																	<img
																		className="clause-copy-icn"
																		src="/static_images/clause-copy-icn.svg"
																		alt="clause-copy"
																		onClick={() =>
																			this.copyClauseText(
																				clause
																			)
																		}
																	/>
																</Tooltip>
															</div>
															<div className="col-md-6 ">
																<Tooltip
																	title={
																		"Delete Clause"
																	}
																	placement="right-end"
																>
																	<img
																		className="clause-copy-icn"
																		src="/static_images/clause-libary-delete-icn.svg"
																		alt="clause-delete"
																		onClick={() =>
																			this.deleteClause(
																				clause.id
																			)
																		}
																	/>
																</Tooltip>
															</div>
														</div>
													</div>
													<div className="col-md-2 clause-column-padding">
														{clause.createdBy}
													</div>
													<div className="col-md-2 clause-column-padding">
														{clause.createdOn !== ""
															? getDateFormat(
																	clause.createdOn
															  )
															: ""}
													</div>
													<div className="col-md-2 clause-column-padding">
														{clause.modifiedOn !==
															"" &&
														clause.modifiedOn !==
															null
															? getDateFormat(
																	clause.modifiedOn
															  )
															: ""}
													</div>
												</div>
											</div>
										))}
								</div>
							))}
					</Scrollable>
				</div>
			</div>
		);
	}

	expandCollapseFolder(folderId: number) {
		let { collapsedFolderIds } = this.props;
		let editedCollapsedFolderIds = addOrRemoveFolderIds(
			folderId,
			collapsedFolderIds
		);
		this.props.saveCollapsedFolderIds(editedCollapsedFolderIds);
	}

	setSelectedFolderInfo(folderId: number, folderName: string) {
		this.props.setSelectedFolderInfo(folderId, folderName);
	}

	showViewClausePopup(clause: ClauseState) {
		let { clausesData } = this.props;
		let selectedClauseInfo: ClauseInfo = getClauseInfoFromClauseArray(
			clause,
			clausesData
		);
		this.props.getFolderHeading();
		this.props.getFolderSubHeading(selectedClauseInfo.clauseFolderId);
		this.props.setClauseModalMode("view");
		this.props.saveSelectedClauseData(selectedClauseInfo);
	}

	deleteClause(clauseId: number) {
		this.props.deleteClause(clauseId);
	}

	deleteFolder(folderId: number) {
		this.props.deleteFolder(folderId);
	}

	copyClauseText(clause: ClauseState) {
		let { clausesData } = this.props;
		let selectedClause: ClauseInfo = getClauseInfoFromClauseArray(
			clause,
			clausesData
		);
		let userClauseText: string = selectedClause.userEditedClause;
		textCopyToClipboard(userClauseText);
	}
}

interface IndentProp {
	level: number;
}

export function IndentRow({ level }: IndentProp) {
	let indents = [];
	for (let i = 0; i < level; i++) {
		indents.push(<IndentSpace key={i} />);
	}

	return <span>{indents}</span>;
}

export function IndentSpace() {
	return <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;
}
