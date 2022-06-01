import React, { Component } from "react";
import Scrollable from "../../UniversalComponents/Scrollable/scrollable";
import {
  InsightsInterface,
  Children,
  BiPointDataMode,
  QuickIntel,
  DurationType,
  Child,
  CurrencyType,
} from "../State/documentState";
import { isNullOrUndefined } from "is-what";
import EditFeature from "./EditFeature/Container/cont";
import LinesLoader from "../../UniversalComponents/Loader/linesLoader";
import InsightComponents from "./InsightComponents/insightComponents";

import {
  simulateScroll,
  getParentHighlights,
  getChildHighlights,
  AuxArrayInterface,
  detectMultipleInstances,
  highlight_yellow,
  createChildDataPointsAggregate,
  tag_tooltip,
  unClickableBI,
  separateComponent,
  editableComponent,
  resetAllBiPointDataModes,
  disputeResolutionModeBi,
  separateUnclickableBI,
  nature_tag_color,
  type_tag_color,
  others_tag_color,
  alternateNewBIs,
  omitBIBackground,
  hideBIValue,
} from "./Utils/docUtils";

import Tooltip from "@material-ui/core/Tooltip";
import { History } from "history";
import DataReset from "./dataReset";
import { CurrentTask } from "../../UniversalComponents/Modals/TaskManagementModal/State/taskManagementState";
import axios, { AxiosRequestConfig } from "axios";
import { SITE_API_BY_REALM_NAME } from "../../Configuration/global";
import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import ClausesInsights from "./InsightComponents/clausesInsights";
import SwitchClausesInsights from "./InsightComponents/switchClausesInsights";
import { getKeyCloakRealmFromLS } from "../../Authentication/Actions/authentication";

const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
export const DarkTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#393939",
    // color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 13,
    marginTop: 0,
  },
}))(Tooltip);

interface Props {
  insightsData: InsightsInterface[];
  saveDataPoints: (
    dataPoints: string[],
    state: boolean,
    tempParaIndex: number,
    type: string
  ) => void;
  scrolledChildIndex: number;
  superImposeChildIndex: (childIndex: number) => void;
  fileId: number;
  sentenceLoader: boolean;
  editLoader: boolean;
  location: any;
  history: History;
  editOptionSelected: (editOptionSelected: boolean) => void;
  storedBiPointDataModes: BiPointDataMode[];
  saveBiPointDataMode: (storedBiPointDataModes: BiPointDataMode[]) => void;
  saveSelectedInsightPoint: (selectedInsightPoint: string) => void;
  setCurrentScrollIndex: (currentScrollIndex: number) => void;
  currentScrollIndex: number;
  currentTask: CurrentTask;
  setCurrentTask: (name: string, value: string, contractName: string) => void;
  fileEncoded: string;
  setTaskPage: (hideTaskPage: boolean) => void;
  getAllTasksData: (
    fileID: number,
    requestID: number,
    sort: string,
    order: string,
    selfAssigned: boolean,
    clauseType: string
  ) => void;
  clauseModeStatus: boolean;
  setTaskOrigin: (origin: string) => void;
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
  currencyList: CurrencyType[];
}

interface State {
  clickedMenu: string;
  clickedSubMenu: string;
  clickedInstanceIndex: number;
  highlightedYellow: string[];
  highlightedLilac: string[];
  savedParentDataPoints: string[];
  toBeEdited: string;
  editOptionSelected: boolean;
  quickIntel: QuickIntel;
  hideTaskPage: boolean;
  clickedTaskMenu: string;
  childInEditId: number;
  currentEditIsGroupedData: boolean;
  currentEditParentClause: Child[];
  currentEditParentClauseId: number;
  currentEditParentLabel: string;
}

export default class DocumentInsights extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      clickedMenu: "Basic Information",
      clickedSubMenu: "",
      highlightedYellow: [],
      highlightedLilac: [],
      clickedInstanceIndex: 0,
      savedParentDataPoints: [],
      toBeEdited: "",
      editOptionSelected: false,
      quickIntel: {
        fileName: "",
        metaData: [],
      },
      hideTaskPage: true,
      clickedTaskMenu: "",
      childInEditId: -1,
      currentEditIsGroupedData: false,
      currentEditParentClause: [],
      currentEditParentClauseId: -1,
      currentEditParentLabel: "",
    };
  }

  setCurrentTask() {}

  componentDidMount() {
    var decodedStringAtoB = atob(this.props.fileEncoded);
    console.log(decodedStringAtoB, "decodedStringAtoB");
    AxiosGateWay.get(SITEAPI + "document/meta/" + this.props.fileEncoded)
      .then((result) => {
        let parsed = result.data.queryResult as QuickIntel;
        this.setState({ quickIntel: parsed });
      })
      .catch((error) => {});

    let { saveBiPointDataMode, insightsData } = this.props;

    if (!isNullOrUndefined(this.props.location.state)) {
      this.setState({
        editOptionSelected: true,
        toBeEdited: this.props.location.state.bi,
        clickedMenu: this.props.location.state.clause,
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    /* if (nextProps.scrolledChildIndex !== this.props.scrolledChildIndex) {
            this.setState({ clickedInstanceIndex: nextProps.scrolledChildIndex });
        } */
    if (this.props.editLoader !== nextProps.editLoader) {
      this.props.editLoader && this.setState({ editOptionSelected: false });
    }
    if (
      !isNullOrUndefined(this.props.location.state) &&
      this.props.location.state === nextProps.location.state
    ) {
      this.props.history.replace(this.props.location.pathname);
    } /* 
        if(this.props.insightsData !== nextProps.insightsData){
            nextProps.saveBiPointDataMode(resetAllBiPointDataModes(nextProps.insightsData));
        } */
    if (this.props.currentScrollIndex !== nextProps.currentScrollIndex) {
      if (this.state.clickedInstanceIndex !== nextProps.currentScrollIndex) {
        this.setState({
          clickedInstanceIndex: nextProps.currentScrollIndex,
        });
      }
    }
  }

  onClickCreateTask = (name: string, value: string, contractName: string) => {
    let {
      setCurrentTask,
      setTaskPage,
      getAllTasksData,
      fileId,
      setTaskOrigin,
    } = this.props;
    let { hideTaskPage, clickedTaskMenu } = this.state;
    getAllTasksData(fileId, 0, "", "", false, name);
    setCurrentTask(name, value, contractName);
    setTaskPage(hideTaskPage);
    setTaskOrigin("insight");
  };

  onClickDataPoint = (data: InsightsInterface) => {
    let { saveSelectedInsightPoint } = this.props;
    let { clickedMenu } = this.state;
    saveSelectedInsightPoint(data.label);
    this.scrollToDataPoint(
      "clause",
      data.label,
      clickedMenu === data.label ? [] : getParentHighlights(data.dataPoints)
    );
  };

  render() {
    let { insightsData, sentenceLoader, setCurrentTask, clauseModeStatus } =
      this.props;
    let { clickedMenu, hideTaskPage, clickedTaskMenu } = this.state;
    return (
      <div className="col-md-12 table-container" style={{ marginTop: "3rem" }}>
        <div>
          {/* <div className="row">
                        <div className="col-md-9 offset-md-1 my-3 document-insights-heading">
                            <img alt='insights' src='/static_images/document-insights-icn.svg' />&nbsp;
                            <span>Insights</span>
                        </div>
                    </div> */}

          {sentenceLoader ? (
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <LinesLoader
                    animatedLines={[
                      {
                        width: 100,
                        height: 42,
                        marginTop: "5px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                      {
                        width: 100,
                        height: 42,
                        marginTop: "15px",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          ) : (
            <Scrollable
              maxHeight={
                window.screen.width < 1300
                  ? 650
                  : window.screen.width > 1300 && window.screen.width < 1500
                  ? 750
                  : 580
              }
            >
              <div style={{ marginBottom: "350px" }}>
                {insightsData.map((data: InsightsInterface, i: number) => (
                  <div className="row" key={i}>
                    <div
                      className={
                        clickedMenu === "Basic Information" &&
                        data.label === "Basic Information"
                          ? "col-md-11 toc-row toc-row-active1"
                          : clickedMenu === data.label
                          ? "col-md-11 toc-row toc-row-active"
                          : "col-md-11 toc-row toc-row-default"
                      }
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div
                              className="col-md-9"
                              onClick={() => this.onClickDataPoint(data)}
                            >
                              {data.label}{" "}
                            </div>
                            {/* <div className="col-md-1" onClick={(e) => this.setState({ ...this.state, hideTaskPage: !hideTaskPage }, () => this.onClickCreateTask(data.label, data.label, this.state.quickIntel.fileName))}> */}

                            <div
                              className="col-md-1"
                              onClick={(e) => {
                                this.setState(
                                  {
                                    hideTaskPage: !hideTaskPage,
                                  },
                                  () =>
                                    this.onClickCreateTask(
                                      data.label,
                                      data.label,
                                      this.state.quickIntel.fileName
                                    )
                                );
                              }}
                            >
                              <img
                                alt="Create Task"
                                src="/static_images/task-icn.svg"
                              />
                            </div>

                            <div
                              className="col-md-1"
                              onClick={() => this.onClickDataPoint(data)}
                              style={
                                window.screen.width < 1300
                                  ? {
                                      marginLeft: "1.7rem",
                                    }
                                  : window.screen.width > 1300 &&
                                    window.screen.width < 1500
                                  ? {
                                      marginLeft: "2rem",
                                    }
                                  : {
                                      marginLeft: "2.2rem",
                                    }
                              }
                            >
                              <img
                                alt="toggle"
                                src="/static_images/toggle-icn.svg"
                                style={{
                                  transform:
                                    clickedMenu === data.label
                                      ? "none"
                                      : "rotate(180deg)",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {clickedMenu === data.label && (
                      <div
                        className="col-md-11"
                        style={{
                          padding: "0px",
                          marginLeft: "12px",
                        }}
                      >
                        <div
                          className="row"
                          id="childDiv"
                          style={{
                            marginLeft: "8px",
                            width: "inherit",
                          }}
                        >
                          <div className="col-md-12">
                            {data.children.map((child, j) => (
                              <div key={j}>
                                {this.childrenRender(
                                  child,
                                  j,
                                  false,
                                  [],
                                  -1,
                                  ""
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Scrollable>
          )}
        </div>
        {clauseModeStatus && (
          <div
            className="col-md-12"
            style={{
              zIndex: 10,
              background: "rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(2px)",
              position: "absolute",
              top: "-10vh",
              left: "0vw",
              height: "100vh",
              width: "50vw",
            }}
          />
        )}
      </div>
    );
  }

  childrenRender(
    child: Children,
    key: number,
    isGroupedData: boolean,
    parentClause: Child[],
    parentClauseId: number,
    parentLabel: string
  ) {
    let {
      clickedSubMenu,
      clickedInstanceIndex,
      toBeEdited,
      editOptionSelected,
      clickedMenu,
      childInEditId,
      currentEditIsGroupedData,
      currentEditParentClause,
      currentEditParentClauseId,
      currentEditParentLabel,
    } = this.state;
    let {
      fileId,
      editDataPoint,
      saveInsightToDelete,
      durationList,
      currencyList,
    } = this.props;
    let unClickableIndex = unClickableBI.findIndex((el) => {
      return el === child.childLabel;
    });
    if (
      editOptionSelected &&
      toBeEdited === child.childLabel &&
      key === childInEditId &&
      isGroupedData === currentEditIsGroupedData &&
      parentLabel === currentEditParentLabel &&
      parentClauseId === currentEditParentClauseId
    ) {
      return (
        <>
          <EditFeature
            fileId={fileId}
            toBeEdited={toBeEdited}
            savedInsight={
              !isNullOrUndefined(child.childValue) ? child.childValue : []
            }
            savedParentClauseDataPoint={child.parentDataPoints}
            editOptionSelected={(selected: boolean) => {
              this.props.editOptionSelected(selected);
              this.setState({ editOptionSelected: selected });
            }}
            childInEditId={childInEditId}
            durationList={durationList}
            currencyList={currencyList}
          />
          {child.childValue.length > 0 &&
            alternateNewBIs.indexOf(child.childLabel) > -1 && (
              <SwitchClausesInsights
                fileId={fileId}
                label={child.childLabel}
                insight={child.childValue}
                childrenRender={(
                  child: Children,
                  key: number,
                  isGroupedData: boolean,
                  parentClause: Child[],
                  parentClauseId: number,
                  parentLabel: string
                ) =>
                  this.childrenRender(
                    child,
                    key,
                    isGroupedData,
                    parentClause,
                    parentClauseId,
                    parentLabel
                  )
                }
                editDataPoint={editDataPoint}
                scrollToChildDataPoint={this.scrollToChildDataPoint}
                clickedSubMenu={clickedSubMenu}
                childAlias={child.childAlias}
                setClickedItem={this.setClickedItem}
                saveInsightToDelete={saveInsightToDelete}
                durationList={durationList}
                currencyList={currencyList}
              />
            )}
        </>
      );
    } else {
      if (child.childValue.length > 1 && unClickableIndex === -1) {
        return (
          <>
            <div
              className={
                clickedSubMenu === child.childLabel
                  ? "row toc-content toc-content-active animate__animated animate__fadeInDown"
                  : "row toc-content toc-content-default animate__animated animate__fadeInDown"
              }
              style={{
                background:
                  child.childAlias === "Present" ||
                  child.childAlias === "Clauses"
                    ? "linear-gradient(90deg, rgba(255, 248, 223, 0.95) 0%, #FFFFFF 98.92%)"
                    : omitBIBackground.indexOf(child.childAlias) === -1
                    ? "linear-gradient(89.98deg, #FFF1FD 0.66%, #FFFFFF 99.99%)"
                    : "",
                marginBottom:
                  child.childLabel === "Consent Regulatory"
                    ? "1px"
                    : child.childLabel ===
                      ("Consent Authority" || "Payment Obligations Nature")
                    ? "10px"
                    : "",
              }}
            >
              {/*  {<DataReset selectedDataPoint={child.childLabel} activeState={true} />} */}
              <div className="col-md-12">
                <div className="row">
                  <div
                    className={
                      child.childAlias === "Present"
                        ? "col-md-3 bi-label"
                        : "col-md-3 bi-label-clickable"
                    }
                    onClick={() => {
                      this.props.setCurrentScrollIndex(0);
                      this.props.saveSelectedInsightPoint(child.childAlias);
                      //this.setState({ clickedInstanceIndex: 0 }); //To set initial index on selecting different child
                      this.scrollToChildDataPoint(
                        "bi",
                        child.childLabel,
                        clickedSubMenu === child.childLabel
                          ? []
                          : getChildHighlights(child.childValue),
                        0,
                        true
                      );
                    }}
                  >
                    {child.childAlias}&nbsp;
                  </div>
                  <div
                    className="col-md-6 bi-name"
                    style={{
                      fontWeight:
                        !isNullOrUndefined(child.childValue[0]) &&
                        (child.childAlias === "Present" ||
                          child.childAlias === "Termination at Convenience" ||
                          disputeResolutionModeBi.indexOf(child.childAlias) >
                            -1)
                          ? 600
                          : 400,
                    }}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row">
                          {/* <div className="col-md-2">
                                                    {clickedSubMenu === child.childLabel && child.childLabel !== 'Termination at Convenience' && disputeResolutionModeBi.indexOf(child.childAlias) === -1 &&
                                                        <img className={clickedInstanceIndex !== 0 ? "cursor-pointer" : ""} src={clickedInstanceIndex !== 0  ? "/static_images/bi-arrow-left.svg" : "/static_images/bi-arrow-left-disabled.svg"} alt="arrow-left"
                                                            onClick={() => this.getPrevChild(child)} />}
                                                </div> */}
                          <div
                            className="col-md-8"
                            style={{
                              width: "30vw",
                              textAlign: "left",
                            }}
                          >
                            {hideBIValue.indexOf(child.childLabel) > -1 ? (
                              child.childValue.length === 0 ? (
                                <img
                                  style={{
                                    marginLeft: "1.2rem",
                                  }}
                                  src="/static_images/empty-dash.svg"
                                  alt="empty"
                                />
                              ) : (
                                ""
                              )
                            ) : !isNullOrUndefined(
                                child.childValue[clickedInstanceIndex]
                              ) ? (
                              // child.childValue[clickedInstanceIndex].name
                              clickedSubMenu === child.childLabel ? (
                                child.childValue[clickedInstanceIndex].name
                              ) : (
                                child.childValue[0].name
                              )
                            ) : clickedSubMenu === child.childLabel ? (
                              <img
                                src="/static_images/empty-dash.svg"
                                alt="empty"
                              />
                            ) : !isNullOrUndefined(child.childValue[0].name) ? (
                              child.childValue[0].name
                            ) : (
                              <img
                                src="/static_images/empty-dash.svg"
                                alt="empty"
                              />
                            )}
                          </div>
                          {/* <div className="col-md-2">
                                                    {clickedSubMenu === child.childLabel && child.childLabel !== 'Termination at Convenience' && disputeResolutionModeBi.indexOf(child.childAlias) < 0 &&
                                                        <img className={clickedInstanceIndex !== child.childValue.length - 1 ? "cursor-pointer" : ""} src={clickedInstanceIndex !== child.childValue.length - 1 ? "/static_images/bi-arrow-right.svg" : "/static_images/bi-arrow-right-disabled.svg"} alt="arrow-right"
                                                            onClick={() => this.getNextChild(child)} />}
                                                </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1 p-0 mt-2"></div>
                  <div
                    className="col-md-1"
                    style={{
                      margin: "auto",
                      paddingTop: "0.7%",
                    }}
                  >
                    {hideBIValue.indexOf(child.childLabel) < 0 &&
                      clickedSubMenu === child.childLabel && (
                        <span className="bi-count">
                          {child.childValue.length}
                        </span>
                      )}
                  </div>
                  <div className="col-md-1" style={{ margin: "auto" }}>
                    {child.childValue.length > 0 &&
                      (!isNullOrUndefined(child.childValue[0]) ||
                        child.childValue[0].name !== "") &&
                      editableComponent.indexOf(child.childLabel) > -1 && (
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            this.props.saveSelectedInsightPoint(
                              child.childAlias
                            );
                            this.goToEditFeature(
                              child.childLabel,
                              key,
                              isGroupedData,
                              parentClause,
                              parentClauseId,
                              parentLabel
                            );
                          }}
                        >
                          {alternateNewBIs.indexOf(child.childLabel) > -1 ? (
                            <DarkTooltip title={"Add"} placement="right-end">
                              <img src="/static_images/add-icn.svg" alt="add" />
                            </DarkTooltip>
                          ) : (
                            <DarkTooltip title={"Edit"} placement="right-end">
                              <img
                                src="/static_images/new-edit-icon.svg"
                                alt="edit"
                              />
                            </DarkTooltip>
                          )}
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </div>
            {alternateNewBIs.indexOf(child.childLabel) > -1 && (
              <SwitchClausesInsights
                fileId={fileId}
                label={child.childLabel}
                insight={child.childValue}
                childrenRender={(
                  child: Children,
                  key: number,
                  isGroupedData: boolean,
                  parentClause: Child[],
                  parentClauseId: number,
                  parentLabel: string
                ) =>
                  this.childrenRender(
                    child,
                    key,
                    isGroupedData,
                    parentClause,
                    parentClauseId,
                    parentLabel
                  )
                }
                scrollToChildDataPoint={this.scrollToChildDataPoint}
                clickedSubMenu={clickedSubMenu}
                childAlias={child.childAlias}
                setClickedItem={this.setClickedItem}
                editDataPoint={editDataPoint}
                saveInsightToDelete={saveInsightToDelete}
                durationList={durationList}
                currencyList={currencyList}
              />
            )}
          </>
        );
      } else {
        return (
          <>
            <div
              className={
                clickedSubMenu === child.childLabel && unClickableIndex === -1
                  ? "row toc-content toc-content-active animate__animated animate__fadeInDown"
                  : "row toc-content toc-content-default animate__animated animate__fadeInDown"
              }
              style={{
                background:
                  child.childAlias === "Present" ||
                  child.childAlias === "Clauses"
                    ? "linear-gradient(90deg, rgba(255, 248, 223, 0.95) 0%, #FFFFFF 98.92%)"
                    : omitBIBackground.indexOf(child.childAlias) === -1
                    ? "linear-gradient(89.98deg, #FFF1FD 0.66%, #FFFFFF 99.99%)"
                    : "",
                marginBottom:
                  child.childLabel === "Consent Regulatory"
                    ? "1px"
                    : child.childLabel ===
                      ("Consent Authority" || "Payment Obligations Nature")
                    ? "10px"
                    : "",
              }}
            >
              {/* {<DataReset selectedDataPoint={child.childLabel} activeState={true} />} */}
              {separateUnclickableBI.indexOf(child.childLabel) > -1 ? (
                <div className="col-md-12">
                  <div className="row" style={{ paddingBottom: "0.5rem" }}>
                    <div
                      className={
                        child.childAlias === "Present" ||
                        child.childAlias === "Clauses"
                          ? "col-md-12 bi-label"
                          : unClickableIndex === -1
                          ? "col-md-12 bi-label-clickable"
                          : "col-md-12 bi-label"
                      }
                      onClick={() => {
                        this.props.setCurrentScrollIndex(0);
                        this.props.saveSelectedInsightPoint(child.childAlias);
                        unClickableIndex === -1 &&
                          this.scrollToChildDataPoint(
                            "bi",
                            child.childLabel,
                            clickedSubMenu === child.childLabel
                              ? []
                              : getChildHighlights(child.childValue),
                            0,
                            true
                          );
                      }}
                    >
                      {child.childAlias}&nbsp;
                      {child.childAlias === "Tags" ? (
                        <div
                          className="tag-category1"
                          style={{
                            display: "inline-block",
                            float: "right",
                          }}
                        >
                          <span
                            className="mr-1"
                            style={{
                              background: nature_tag_color,
                              margin: "auto",
                            }}
                            id="nature"
                          ></span>
                          <span className="mr-3">Nature</span>
                          <span
                            className="mr-1"
                            style={{
                              background: type_tag_color,
                              margin: "auto",
                            }}
                            id="type"
                          ></span>
                          <span className="mr-3">Type</span>
                          <span
                            className="mr-1"
                            style={{
                              background: others_tag_color,
                              margin: "auto",
                            }}
                            id="groups"
                          ></span>
                          <span>Groups</span>
                        </div>
                      ) : (
                        <>
                          {/* <DarkTooltip title={"Review pending"} placement="right-end">
                                                        <span className="ml-1"><img src="/static_images/grey-alert-icn.svg" alt="alert" />
                                                        </span>
                                                    </DarkTooltip> */}
                        </>
                      )}
                    </div>
                    <div
                      className="col-md-9 pl-0 bi-name mb-2"
                      style={{
                        fontWeight:
                          !isNullOrUndefined(child.childValue[0]) &&
                          (child.childAlias === "Present" ||
                            child.childAlias === "Termination at Convenience")
                            ? 600
                            : 400,
                      }}
                    >
                      {hideBIValue.indexOf(child.childLabel) > -1 ? (
                        child.childValue.length === 0 ? (
                          <img
                            style={{
                              marginLeft: "1.2rem",
                            }}
                            src="/static_images/empty-dash.svg"
                            alt="empty"
                          />
                        ) : (
                          ""
                        )
                      ) : !isNullOrUndefined(child.childValue[0]) &&
                        child.childValue[0].name !== "" ? (
                        separateComponent.indexOf(child.childLabel) > -1 ? (
                          <InsightComponents
                            insight={child.childValue}
                            label={child.childLabel}
                            fileId={this.props.fileId}
                          />
                        ) : (
                          child.childValue[0].name
                        )
                      ) : (
                        // <img src="/static_images/empty-dash.svg" alt="empty" />
                        <>
                          <img
                            style={{
                              marginLeft: "1.2rem",
                            }}
                            src="/static_images/empty-dash.svg"
                            alt="empty"
                          />
                          {/* {editableComponent.indexOf(child.childLabel) > -1
                                                    ?
                                                    <span className="add-datapoint mx-3 my-2" onClick={() => {
                                                        this.props.saveSelectedInsightPoint(child.childAlias);
                                                        this.goToEditFeature(child.childLabel);
                                                    }}>Add</span>
                                                    :
                                                    <img src="/static_images/empty-dash.svg" alt="empty" />}&nbsp; */}

                          {/* {child.childLabel === 'Tags' &&
                                                    <Tooltip title={tag_tooltip} placement="right-end">
                                                        <img src="/static_images/tag-info.svg" alt="tag-info" />
                                                    </Tooltip>} */}
                        </>
                      )}
                    </div>
                    <div className="col-md-1 p-0 mt-2 mb-2">
                      {/* do nothing */}
                    </div>
                    <div className="col-md-1 p-0 mt-2 mb-2">
                      {/* do nothing */}
                    </div>
                    <div className="col-md-1" style={{ margin: "auto" }}>
                      {child.childValue.length > 0 &&
                      (!isNullOrUndefined(child.childValue[0]) ||
                        child.childValue[0].name !== "") &&
                      editableComponent.indexOf(child.childLabel) > -1 ? (
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            this.props.saveSelectedInsightPoint(
                              child.childAlias
                            );
                            this.goToEditFeature(
                              child.childLabel,
                              key,
                              isGroupedData,
                              parentClause,
                              parentClauseId,
                              parentLabel
                            );
                          }}
                        >
                          {alternateNewBIs.indexOf(child.childLabel) > -1 ? (
                            <DarkTooltip title={"Add"} placement="right-end">
                              <img src="/static_images/add-icn.svg" alt="add" />
                            </DarkTooltip>
                          ) : (
                            <DarkTooltip title={"Edit"} placement="right-end">
                              <img
                                src="/static_images/new-edit-icon.svg"
                                alt="edit"
                              />
                            </DarkTooltip>
                          )}
                        </span>
                      ) : (
                        editableComponent.indexOf(child.childLabel) > -1 && (
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              this.props.saveSelectedInsightPoint(
                                child.childAlias
                              );
                              this.goToEditFeature(
                                child.childLabel,
                                key,
                                isGroupedData,
                                parentClause,
                                parentClauseId,
                                parentLabel
                              );
                            }}
                          >
                            <DarkTooltip title={"Add"} placement="right-end">
                              <img src="/static_images/add-icn.svg" alt="add" />
                            </DarkTooltip>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="row">
                    <div
                      className={
                        child.childAlias === "Present" ||
                        child.childAlias === "Clauses"
                          ? "col-md-3 bi-label"
                          : unClickableIndex === -1
                          ? "col-md-3 bi-label-clickable"
                          : "col-md-3 bi-label"
                      }
                      onClick={() => {
                        this.props.setCurrentScrollIndex(0);
                        this.props.saveSelectedInsightPoint(child.childAlias);
                        //this.setState({ clickedInstanceIndex: 0 });
                        // unClickableIndex === -1 && this.scrollToChildDataPoint('bi', child.childLabel, clickedSubMenu === child.childLabel ? [] : getChildHighlights(child.childValue), clickedInstanceIndex, true) }}>{child.childAlias} </div>
                        unClickableIndex === -1 &&
                          this.scrollToChildDataPoint(
                            "bi",
                            child.childLabel,
                            clickedSubMenu === child.childLabel
                              ? []
                              : getChildHighlights(child.childValue),
                            0,
                            true
                          );
                      }}
                    >
                      {child.childAlias}&nbsp;
                    </div>
                    <div
                      className="col-md-6 bi-name"
                      style={{
                        fontWeight:
                          !isNullOrUndefined(child.childValue[0]) &&
                          (child.childAlias === "Present" ||
                            child.childAlias === "Termination at Convenience" ||
                            disputeResolutionModeBi.indexOf(child.childAlias) >
                              -1)
                            ? 600
                            : 400,
                      }}
                    >
                      {hideBIValue.indexOf(child.childLabel) > -1 ? (
                        child.childValue.length === 0 ? (
                          <img
                            style={{
                              marginLeft: "1.2rem",
                            }}
                            src="/static_images/empty-dash.svg"
                            alt="empty"
                          />
                        ) : (
                          ""
                        )
                      ) : !isNullOrUndefined(child.childValue[0]) &&
                        child.childValue[0].name !== "" ? (
                        separateComponent.indexOf(child.childLabel) > -1 ? (
                          <InsightComponents
                            insight={child.childValue}
                            label={child.childLabel}
                            fileId={this.props.fileId}
                          />
                        ) : (
                          child.childValue[0].name
                        )
                      ) : (
                        // <img src="/static_images/empty-dash.svg" alt="empty" />
                        <>
                          <span
                            className="add-datapoint"
                            onClick={() => {
                              this.props.saveSelectedInsightPoint(
                                child.childAlias
                              );
                              this.goToEditFeature(
                                child.childLabel,
                                key,
                                isGroupedData,
                                parentClause,
                                parentClauseId,
                                parentLabel
                              );
                            }}
                          ></span>
                          <img
                            src="/static_images/empty-dash.svg"
                            alt="empty"
                          />

                          {/* {child.childLabel === 'Tags' &&
                                                    <Tooltip title={tag_tooltip} placement="right-end">
                                                        <img src="/static_images/tag-info.svg" alt="tag-info" />
                                                    </Tooltip>
                                                } */}
                        </>
                      )}
                    </div>
                    <div className="col-md-1 p-0 mt-2">{/* do nothing */}</div>
                    <div className="col-md-1 p-0 mt-2">{/* do nothing */}</div>
                    <div className="col-md-1" style={{ margin: "auto" }}>
                      {child.childValue.length > 0 &&
                      (!isNullOrUndefined(child.childValue[0]) ||
                        child.childValue[0].name !== "") &&
                      editableComponent.indexOf(child.childLabel) > -1 ? (
                        <span
                          className="cursor-pointer"
                          onClick={() => {
                            this.props.saveSelectedInsightPoint(
                              child.childAlias
                            );
                            this.goToEditFeature(
                              child.childLabel,
                              key,
                              isGroupedData,
                              parentClause,
                              parentClauseId,
                              parentLabel
                            );
                          }}
                        >
                          {alternateNewBIs.indexOf(child.childLabel) > -1 ? (
                            <DarkTooltip title={"Add"} placement="right-end">
                              <img src="/static_images/add-icn.svg" alt="add" />
                            </DarkTooltip>
                          ) : (
                            <DarkTooltip title={"Edit"} placement="right-end">
                              <img
                                src="/static_images/new-edit-icon.svg"
                                alt="edit"
                              />
                            </DarkTooltip>
                          )}
                        </span>
                      ) : (
                        editableComponent.indexOf(child.childLabel) > -1 && (
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              this.props.saveSelectedInsightPoint(
                                child.childAlias
                              );
                              this.goToEditFeature(
                                child.childLabel,
                                key,
                                isGroupedData,
                                parentClause,
                                parentClauseId,
                                parentLabel
                              );
                            }}
                          >
                            <DarkTooltip title={"Add"} placement="right-end">
                              <img src="/static_images/add-icn.svg" alt="add" />
                            </DarkTooltip>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {alternateNewBIs.indexOf(child.childLabel) > -1 && (
              <SwitchClausesInsights
                fileId={fileId}
                label={child.childLabel}
                insight={child.childValue}
                childrenRender={(
                  child: Children,
                  key: number,
                  isGroupedData: boolean,
                  parentClause: Child[],
                  parentClauseId: number,
                  parentLabel: string
                ) =>
                  this.childrenRender(
                    child,
                    key,
                    isGroupedData,
                    parentClause,
                    parentClauseId,
                    parentLabel
                  )
                }
                scrollToChildDataPoint={this.scrollToChildDataPoint}
                clickedSubMenu={clickedSubMenu}
                childAlias={child.childAlias}
                setClickedItem={this.setClickedItem}
                editDataPoint={editDataPoint}
                saveInsightToDelete={saveInsightToDelete}
                durationList={durationList}
                currencyList={currencyList}
              />
            )}
          </>
        );
      }
    }
  }

  goToEditFeature(
    toBeEdited: string,
    key: number,
    isGroupedData: boolean,
    parentClause: Child[],
    parentClauseId: number,
    parentLabel: string
  ) {
    this.props.setCurrentScrollIndex(0);
    this.scrollToChildDataPoint("bi", toBeEdited, [], 0, true);
    this.setState({
      toBeEdited: toBeEdited,
      editOptionSelected: true,
      childInEditId: key,
      currentEditIsGroupedData: isGroupedData,
      currentEditParentClause: parentClause,
      currentEditParentClauseId: parentClauseId,
      currentEditParentLabel: parentLabel,
    });
  }

  /*  getNextChild(child: Children) {
         let { clickedInstanceIndex } = this.state;
         if (clickedInstanceIndex !== child.childValue.length - 1) {
             let index = clickedInstanceIndex + 1;
             this.props.superImposeChildIndex(index);
             this.setState({ clickedInstanceIndex: index });
             this.scrollToChildDataPoint('bi', child.childLabel, getChildHighlights(child.childValue), index, false)
         }
     }
 
     getPrevChild(child: Children) {
         let { clickedInstanceIndex } = this.state;
         if (clickedInstanceIndex !== 0) {
             let index = clickedInstanceIndex - 1;
             this.props.superImposeChildIndex(index);
             this.setState({ clickedInstanceIndex: index });
             this.scrollToChildDataPoint('bi', child.childLabel, getChildHighlights(child.childValue), index, false)
         }
     } */

  setClickedItem(clickedItem: string, type: string, unselectChild: boolean) {
    let {
      highlightedYellow,
      highlightedLilac,
      clickedMenu,
      clickedSubMenu,
      clickedInstanceIndex,
    } = this.state;
    if (clickedItem === "clause") {
      this.setState({ clickedSubMenu: "", clickedInstanceIndex: 0 });
      clickedMenu === type
        ? this.setState({ clickedMenu: "" })
        : this.setState({ clickedMenu: type });
      for (let i = 0; i < highlightedYellow.length; i++) {
        //For clearing highlighted background color
        let clauseHeader = document.getElementById(highlightedYellow[i]);
        if (!isNullOrUndefined(clauseHeader)) {
          clauseHeader.style.background = "none";
        }
      }
      for (let i = 0; i < highlightedLilac.length; i++) {
        for (let j = 0; j < highlightedLilac[i].length; j++) {
          let biHeader = document.getElementById(highlightedLilac[i][j]);
          if (!isNullOrUndefined(biHeader)) {
            biHeader.style.background = "none";
          }
        }
      }
    } else if (clickedItem === "bi") {
      // this.setState({ clickedInstanceIndex: 0 });
      if (unselectChild) {
        clickedSubMenu === type
          ? this.setState({ clickedSubMenu: "" })
          : this.setState({ clickedSubMenu: type });
      } else {
        clickedInstanceIndex >= 0 && this.setState({ clickedSubMenu: type });
      }
      let index = highlightedYellow.findIndex((el) => {
        return el == highlightedLilac[0];
      });
      if (index !== -1) {
        //When parent and child both highlight same set of datapoints, highlight parent again when child is unclicked.
        for (let i = 0; i < highlightedYellow.length; i++) {
          let paraHeader = document.getElementById(highlightedYellow[i]);
          if (!isNullOrUndefined(paraHeader)) {
            paraHeader.style.background = highlight_yellow;
          }
        }
      } else {
        for (let i = 0; i < highlightedLilac.length; i++) {
          for (let j = 0; j < highlightedLilac[i].length; j++) {
            let biHeader = document.getElementById(highlightedLilac[i][j]);
            if (!isNullOrUndefined(biHeader)) {
              biHeader.style.background = "none";
            }
          }
        }
      }
    }
    return clickedItem;
  }

  scrollToDataPoint(insight: string, type: string, dataPoints: string[]) {
    this.props.superImposeChildIndex(0);
    let typeClicked = this.setClickedItem(insight, type, false); //Set clicked menu or submenu tempArray.push('p' + paraId[i]);
    let paraHeader = document.getElementById(dataPoints[0]);
    !isNullOrUndefined(paraHeader) &&
      paraHeader.scrollIntoView({ block: "center" });
    if (dataPoints.length > 0) {
      this.setState({ highlightedYellow: dataPoints });
      simulateScroll(dataPoints, typeClicked);
      this.props.saveDataPoints(dataPoints, true, 0, "clause");
      this.props.setCurrentScrollIndex(0);
    } else {
      this.setState({ highlightedYellow: [] });
      this.props.saveDataPoints(dataPoints, false, 0, "clause");
      this.props.setCurrentScrollIndex(0);
    }
    this.setState({ savedParentDataPoints: dataPoints });
  }

  scrollToChildDataPoint = (
    insight: string,
    type: string,
    children: AuxArrayInterface[],
    index: number,
    unselectChild: boolean
  ) => {
    let { savedParentDataPoints } = this.state;
    let aggregateDataPoints = createChildDataPointsAggregate(children);
    let typeClicked = this.setClickedItem(insight, type, unselectChild);
    let tempParaIndex = -1;
    let tempParaId = "";
    let paraHeader = document.getElementById(savedParentDataPoints[0]);
    !isNullOrUndefined(paraHeader) &&
      paraHeader.scrollIntoView({ block: "center" });
    let aggregateDataArray: string[] = [];
    if (children.length > 0) {
      let multipleInstances: AuxArrayInterface[] = [];
      multipleInstances =
        type === "Termination at Convenience" ||
        disputeResolutionModeBi.indexOf(type) > -1
          ? detectMultipleInstances(children)
          : children;
      let paraHeader = document.getElementById(
        multipleInstances[index].dataPoints[index]
      );
      !isNullOrUndefined(paraHeader) &&
        paraHeader.scrollIntoView({ block: "center" });
      this.setState({ highlightedLilac: aggregateDataPoints });
      simulateScroll(aggregateDataPoints, typeClicked);

      //For making scroll button act according to the child data point index in parent array. //Experimental
      tempParaId = children[index].dataPoints[0];
      for (let i = 0; i < aggregateDataPoints.length; i++) {
        aggregateDataArray.push(aggregateDataPoints[i][0]);
      }
      tempParaIndex = aggregateDataArray.findIndex((el) => {
        return el === tempParaId;
      });
    }
    this.props.saveDataPoints(
      aggregateDataArray.length === 0
        ? savedParentDataPoints
        : aggregateDataArray,
      true,
      tempParaIndex !== -1 ? tempParaIndex : 0,
      aggregateDataArray.length === 0 ? "clause" : "bi"
    );
    if (!isNullOrUndefined(tempParaId) && !(tempParaId === "")) {
      let paraHeader = document.getElementById(tempParaId);
      !isNullOrUndefined(paraHeader) &&
        paraHeader.scrollIntoView({ block: "center" });
    }
  };
}
