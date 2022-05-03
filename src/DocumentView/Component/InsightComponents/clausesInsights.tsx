import React from 'react';
import { isNullOrUndefined } from 'is-what';
import DeleteInsightModal from '../../../UniversalComponents/Modals/DeleteInsightModal/deleteInsightModal';
import Scrollable from '../../../UniversalComponents/Scrollable/scrollable';
import { truncateString } from '../../../Utils/DataModifierUtil/dataModUtil';
import { Child, Children, CurrencyType, DataPoints, DurationType } from '../../State/documentState';
import { DarkTooltip } from '../documentInsights';
import NormalizedEditFeature from '../EditFeature/Component/normalizedEditFeature';
import { deleteInsight } from '../Utils/deleteUtils';
import { AuxArrayInterface, editableComponent, editableNormalizedComponents, getChildHighlights, getDatapointScrollString, highlight_lilac, normalizedAmountBIs, normalizedBIs, normalizedDateBIs, normalizedDurationBIs, singleParaLinking } from '../Utils/docUtils';

interface Props {
    fileId: number;
    clauses: Child[];
    childrenRender: (child: Children, key: number, isGroupedData: boolean, parentClause: Child[], parentClauseId: number, parentLabel: string)
     => void;
    scrollToChildDataPoint: (insight: string, type: string, children: AuxArrayInterface[], index: number, unselectChild: boolean) => void;
    label: string;
    clickedSubMenu: string;
    childAlias: string;
    setClickedItem: (clickedItem: string, type: string, unselectChild: boolean) => void;
    editDataPoint: (fileId: number, dataType: string, dataPointName: any, highlightedId?: number| null) => void;
    saveInsightToDelete: (insightToDelete: any, childLabelToDelete: string) => void;
    durationList: DurationType[];
    currencyList: CurrencyType[];
}

interface State {
    selectedHighlightKey: number;
    toggleSelect: boolean;
    shouldToggleSelectUpdate: boolean;
    clauseChildInEditing: Child;
    clauseBeingEdited: any;
    clauseBeingEditedId: number;
    normalizedEditOptionSelected: boolean;
}

export default class ClausesInsights extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedHighlightKey: -1,   
            toggleSelect: false,
            shouldToggleSelectUpdate: false,
            clauseChildInEditing: {
                name: '',
                dataPoints: {
                    paraId: -1,
                    startSentenceId: -1,
                    endSentenceId: -1,
                    startWordId: -1,
                    endWordId: -1,
                    rowId: -1,
                    columnId:-1,
                    highlightedText: '',
                    definedWord: '',
                    groupedBiData: []
                }
            },
            clauseBeingEdited: null,
            clauseBeingEditedId: -1,
            normalizedEditOptionSelected: false
        }
    }

    componentDidMount() {
    }

    scrollToChildDataPoint = (insight: string, clause: Child, key: number) => {
        let { scrollToChildDataPoint, label, clickedSubMenu } = this.props;
        let { selectedHighlightKey, toggleSelect, shouldToggleSelectUpdate } = this.state;
        let clauseArray: Child[] = [];
        clauseArray.push(clause)
        scrollToChildDataPoint(insight, label, toggleSelect === false ? [] :
            getChildHighlights(clauseArray), 0, false)
        // scrollToChildDataPoint(insight, label, getChildHighlights(clauseArray), 0, true)
    }

    onClickHighlight = (key: number, clause: Child) => {
        let { scrollToChildDataPoint, label, clickedSubMenu, childAlias } = this.props;
        let { selectedHighlightKey, toggleSelect, shouldToggleSelectUpdate } = this.state;
        if (childAlias === 'Clauses') {
            this.scrollToDatapoint('bi', clause.dataPoints, key);
        } else {
            if (selectedHighlightKey === key + 1) {
                this.setState({ toggleSelect: !toggleSelect }, () => this.scrollToChildDataPoint('bi', clause, key));
            } else {
                this.setState({ selectedHighlightKey: key + 1, toggleSelect: true }, () => this.scrollToChildDataPoint('bi', clause, key));
            }
        }
    }

    render() {
        let { clauses, label, durationList, fileId, editDataPoint, currencyList } = this.props;
        let { selectedHighlightKey, toggleSelect, shouldToggleSelectUpdate, clauseBeingEditedId, clauseBeingEdited, normalizedEditOptionSelected } = this.state;
        return (
            <>
                <Scrollable maxHeight={250} padding={false}>
                    {clauses.length > 0 && clauses[0].name !== 'No' && clauses.map((clause: any, key: number) =>
                        <React.Fragment key={key}>
                            { normalizedBIs.indexOf(label) > -1 &&
                                 <div className={selectedHighlightKey === key + 1 && toggleSelect === true ? 'row mr-1 toc-content toc-content-active animate__animated animate__fadeInDown' : "row mr-1 toc-content toc-content-default animate__animated animate__fadeInDown"} style={{ marginLeft: 'auto', border: selectedHighlightKey === key + 1 && toggleSelect === true ? '2px solid #882f5e' : '', marginBottom: '1px' }}>
                                     <div className="col-md-12">
                                        { (normalizedEditOptionSelected && editableNormalizedComponents.indexOf(label) > -1 && clauseBeingEditedId === key) ?   
                                            <NormalizedEditFeature fileId={fileId} toBeEdited={label} savedInsight={clause} savedInsightId={key}
                                            durationList={durationList} editDataPoint={editDataPoint} clearNormalizedEdit={()=>this.clearNormalizedEditInfo()} currencyList={currencyList} />
                                            :
                                            <div className="row" style={{ paddingBottom: '' }}>
                                                <div className="col-md-12 pl-0 bi-clause-clickable"
                                                    // onClick={() => this.scrollToDatapoint(clause.dataPoints, key)}
                                                    onClick={() => this.onClickHighlight(key, clause)}
                                                >
                                                    <div className="row">
                                                        <div className="col-md-11">
                                                            <div style={{marginLeft: '10px'}}>
                                                                <span style={{ color: '#4D4D4D' }}>{key + 1}.&nbsp;&nbsp;</span>
                                                                {normalizedDateBIs.indexOf(label) > -1 && 
                                                                    <span>
                                                                        {clause.dataPoints.headerData.date.length === 0 ?
                                                                            <img src="/static_images/empty-dash-grey-icn.svg" alt="empty" />
                                                                        :
                                                                            clause.dataPoints.headerData.date.length > 40 
                                                                            ? truncateString(clause.dataPoints.headerData.date, 40) 
                                                                            : clause.dataPoints.headerData.date
                                                                        } 
                                                                    </span>
                                                                }
                                                                {normalizedDurationBIs.indexOf(label) > -1 &&
                                                                    <span>
                                                                        { clause.dataPoints.headerData.durationValue < 0  ?
                                                                            <img src="/static_images/empty-dash-grey-icn.svg" alt="empty" />
                                                                        :
                                                                        clause.dataPoints.headerData.durationValue > -1 &&
                                                                        (clause.dataPoints.headerData.durationValue + " " + clause.dataPoints.headerData.durationType).length > 30 
                                                                        ? 
                                                                            <DarkTooltip title= {clause.dataPoints.headerData.durationValue + " " + clause.dataPoints.headerData.durationType} placement={"right-end"} >
                                                                                <>
                                                                                    {truncateString(clause.dataPoints.headerData.durationValue + " " + clause.dataPoints.headerData.durationType , 30)} 
                                                                                </>
                                                                            </DarkTooltip>
                                                                        : clause.dataPoints.headerData.durationValue + " " + clause.dataPoints.headerData.durationType} 
                                                                        &nbsp;
                                                                        {editableNormalizedComponents.indexOf(label) > -1 &&
                                                                            <DarkTooltip title={"Edit"} placement="right-end">
                                                                                <img src="/static_images/new-edit-icon.svg" alt="edit" onClick={()=> this.editNormalizedInfo(clause, key) } />
                                                                            </DarkTooltip>
                                                                        }
                                                                    </span>
                                                                }
                                                                {normalizedAmountBIs.indexOf(label) > -1 &&
                                                                <span>
                                                                        { clause.dataPoints.headerData.amountValue < 0  ?
                                                                        <img src="/static_images/empty-dash-grey-icn.svg" alt="empty" />
                                                                        :
                                                                        clause.dataPoints.headerData.amountValue > -1 &&
                                                                        (clause.dataPoints.headerData.amountValue + " " + clause.dataPoints.headerData.amountType).length > 30 
                                                                        ? 
                                                                        <DarkTooltip title= {clause.dataPoints.headerData.amountValue + " " + clause.dataPoints.headerData.amountType} placement={"right-end"} >
                                                                            <>
                                                                                {truncateString(clause.dataPoints.headerData.amountValue + " " + clause.dataPoints.headerData.amountType , 30)}
                                                                            </>
                                                                        </DarkTooltip> 
                                                                        : clause.dataPoints.headerData.amountValue + " " + clause.dataPoints.headerData.amountType} 
                                                                       
                                                                        &nbsp;
                                                                        {editableNormalizedComponents.indexOf(label) > -1 &&
                                                                            <DarkTooltip title={"Edit"} placement="right-end">
                                                                                <img src="/static_images/new-edit-icon.svg" alt="edit" onClick={()=> this.editNormalizedInfo(clause, key) } />
                                                                            </DarkTooltip>
                                                                        }
                                                                </span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-1">
                                                            {editableComponent.indexOf(label) > -1 && normalizedBIs.indexOf(label) > -1 && <img className="cursor-pointer" style={{zIndex: 2}} src="/static_images/delete-insight-icn.svg" alt="delete-insight" data-toggle="modal" data-target="#deleteInsightModal" onClick={()=> this.setClauseToDelete(clause)} />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                     </div>
                                 </div>
                                }
                           
                            
                            <div className={selectedHighlightKey === key + 1 && toggleSelect === true ? 'row mr-1 toc-content toc-content-active animate__animated animate__fadeInDown' : "row mr-1 toc-content toc-content-default animate__animated animate__fadeInDown"} style={{ marginLeft: 'auto', border: selectedHighlightKey === key + 1 && toggleSelect === true ? '2px solid #882f5e' : '', marginBottom: label === 'Consent Clause' ? '1px' : '' }}>
                                <div className="col-md-12">
                                    <div className="row" style={{ paddingBottom: '' }}>
                                        <div className="col-md-12 pl-0 bi-clause-clickable"
                                            // onClick={() => this.scrollToDatapoint(clause.dataPoints, key)}
                                            onClick={() => this.onClickHighlight(key, clause)}
                                        >
                                             <div className="row">
                                                <div className="col-md-11">
                                                    <div style={{marginLeft: '10px'}}>
                                                        {normalizedBIs.indexOf(label) < 0 &&
                                                            <span style={{ color: '#4D4D4D' }}>{key + 1}.&nbsp;</span>}
                                                        {
                                                            // !isNullOrUndefined(clause.dataPoints.highlightedText) && 
                                                            clause.dataPoints.highlightedText.length > 150 ? truncateString(clause.dataPoints.highlightedText, 150) : clause.dataPoints.highlightedText}
                                                    </div>
                                                </div>
                                                <div className="col-md-1">
                                                    {editableComponent.indexOf(label) > -1 && normalizedBIs.indexOf(label) < 0 && <img className="cursor-pointer" style={{zIndex: 2}} src="/static_images/delete-insight-icn.svg" alt="delete-insight" data-toggle="modal" data-target="#deleteInsightModal" onClick={()=> this.setClauseToDelete(clause)} />}
                                                </div>
                                             </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {!isNullOrUndefined(clause.dataPoints.groupedBiData) && clause.dataPoints.groupedBiData.length > 0
                                ? clause.dataPoints.groupedBiData.map((child: Children, keyValue: number) =>
                                    <div className="col-md-12" key={keyValue}>
                                        <>{this.props.childrenRender(child, keyValue, true, clauses, key, label)}</>
                                    </div>)
                                : <></>
                            }
                        </React.Fragment>
                    )}
                </Scrollable>
            </>
        );
    }

    scrollToDatapoint(insight: string, dataPoint: DataPoints, key: number) {
        let { setClickedItem, label } = this.props;
        let { selectedHighlightKey, toggleSelect } = this.state;
        // setClickedItem(insight, label, false);
        if (selectedHighlightKey === key + 1) {
            this.setState({ toggleSelect: !toggleSelect });
        } else {
            this.setState({ selectedHighlightKey: key + 1, toggleSelect: true })
        }
        let dataPointElementId = getDatapointScrollString(dataPoint);

        let paraHeader = document.getElementById(dataPointElementId);
        if (paraHeader !== null && paraHeader !== undefined) {
            paraHeader.scrollIntoView({ block: 'center' });
            document.documentElement.style.scrollBehavior = 'smooth';
            //paraHeader.style.background = highlight_lilac;
        }
    }

    setClauseToDelete(clause: any){
        let {label} = this.props;
        this.props.saveInsightToDelete(clause, label);
    }

    editNormalizedInfo(clause: any, key: number){
        this.setState({ clauseBeingEdited: clause, clauseBeingEditedId: key, normalizedEditOptionSelected: true });
    }

    clearNormalizedEditInfo(){
        this.setState({ clauseBeingEdited: null, clauseBeingEditedId: -1, normalizedEditOptionSelected: false });
    }
}