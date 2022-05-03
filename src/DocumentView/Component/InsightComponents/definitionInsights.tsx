import React from 'react';
import { isNullOrUndefined } from 'is-what';
import Scrollable from '../../../UniversalComponents/Scrollable/scrollable';
import { truncateString } from '../../../Utils/DataModifierUtil/dataModUtil';
import { Child, Children, DataPoints } from '../../State/documentState';
import { deleteInsight } from '../Utils/deleteUtils';
import { getDatapointScrollString } from '../Utils/docUtils';

interface Props {
    fileId: number;
    label: string;
    clauses: Child[];
    editDataPoint: (fileId: number, dataType: string, dataPointName: any, highlightedId?: number| null) => void;
    saveInsightToDelete: (insightToDelete: any, childLabelToDelete: string) => void;
}

interface State {
    selectedHighlightKey: number;
}

export default class DefinitionInsights extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedHighlightKey: -1
        }
    }

    render() {
        let { clauses } = this.props;
        let { selectedHighlightKey } = this.state;
        return (
            <>
                <Scrollable maxHeight={250} padding={false}>
                    {clauses.length > 0 && clauses[0].name !== 'No' && clauses.map((clause, key) =>
                        <>
                            <div className="row mr-1 toc-content toc-content-default animate__animated animate__fadeInDown" style={{ marginLeft: 'auto', marginBottom: '1px' }}>
                                <div className="col-md-12">
                                    <div className="row" style={{ paddingBottom: '' }}>
                                        <div className="col-md-12 pl-0 bi-label">
                                            <div className="row">
                                                <div className="col-md-11">
                                                    <div style={{ marginLeft: '10px' }}>
                                                        {!isNullOrUndefined(clause.dataPoints.definedWord) && clause.dataPoints.definedWord}
                                                    </div>
                                                </div>
                                                <div className="col-md-1">
                                                    <img className="cursor-pointer" style={{zIndex: 2}} src="/static_images/delete-insight-icn.svg" alt="delete-insight" data-toggle="modal" data-target="#deleteInsightModal" onClick={()=> this.setClauseToDelete(clause)} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div key={key} className={selectedHighlightKey === key + 1 ? 'row mr-1 toc-content toc-content-active animate__animated animate__fadeInDown' : "row mr-1 toc-content toc-content-default animate__animated animate__fadeInDown"} style={{ marginLeft: 'auto', border: selectedHighlightKey === key + 1 ? '2px solid #882f5e' : '' }}>
                                <div className="col-md-12">
                                    <div className="row" style={{ paddingBottom: '' }}>
                                        <div className="col-md-12 pl-0 bi-clause-clickable" onClick={() => this.scrollToDatapoint(clause.dataPoints, key)}>
                                            <div className="col-md-11">
                                                {/* <span style={{ color: '#4D4D4D' }}>{key + 1}.&nbsp;</span> */}
                                                {
                                                    // !isNullOrUndefined(clause.dataPoints.highlightedText) && 
                                                    clause.dataPoints.highlightedText.length > 150 ? truncateString(clause.dataPoints.highlightedText, 150) : clause.dataPoints.highlightedText}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    )}
                </Scrollable>
            </>
        );
    }

    scrollToDatapoint(dataPoint: DataPoints, key: number) {
        this.setState({ selectedHighlightKey: key + 1 });
        let dataPointElementId = getDatapointScrollString(dataPoint);

        let paraHeader = document.getElementById(dataPointElementId);
        if (paraHeader !== null && paraHeader !== undefined) {
            paraHeader.scrollIntoView({ block: 'center' });
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    setClauseToDelete(clause: any){
        let {label} = this.props;
        this.props.saveInsightToDelete(clause, label);
    }
}