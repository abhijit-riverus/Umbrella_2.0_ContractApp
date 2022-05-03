import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { ColumnHeaderStructure } from '../../../Utils/GeneralUtil/genUtils';
import { AnalysisPoints } from '../../State/analysisState';
import AddressAnalysis from './addressAnalysis';
import JurisdictionAnalysis from './jurisdictionAnalysis';
import LockInAnalysis from './lockInAnalysis';
import PartiesAnalysis from './partiesAnalysis';
import PresentAnalysis from './presentAnalysis';
import TagsAnalysis from './tagsAnalysis';
import TermBIAnalysis from './termBIAnalysis';
import { History } from 'history';

interface Props {
    history: History;
    analysisData: AnalysisPoints[];
    columnHeaders: ColumnHeaderStructure[];
    setModal: (data: any, dataPoint: string, documentName: string, dataType?: string) => void;
}

export default class AnalysisComp extends Component<Props> {
    setModal(check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) {
        if (check) {
            this.props.setModal(data, dataPoint, documentName, dataType);
            let link = document.getElementById('analysisTableButton');
            !isNullOrUndefined(link) && link.click();
        }
    }

    switchIndividualComponents = (data: AnalysisPoints) => {
        let { columnHeaders, history } = this.props;
        let elementArray: any[] = [];
        if (columnHeaders.length > 0) {
            columnHeaders.forEach(indItem => {
                switch (indItem.header) {
                    case 'Tags': {
                        elementArray.push(
                            <TagsAnalysis history={history} analysisData={data} setModal={(check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => this.setModal(check, data, dataPoint, documentName, dataType)} />
                        )
                        break;
                    }
                    case 'Contracting Parties': {
                        elementArray.push(
                            <PartiesAnalysis history={history} analysisData={data} setModal={(check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => this.setModal(check, data, dataPoint, documentName, dataType)} />
                        )
                        break;
                    }
                    case 'Address':
                    case 'Events Covered':
                        {
                            elementArray.push(
                                <AddressAnalysis analysisData={data} indHeader={indItem} setModal={(check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => this.setModal(check, data, dataPoint, documentName, dataType)} />
                            )
                            break;
                        }
                    case 'Start Date':
                    case 'End Date':
                    case 'Duration':
                    case 'Nature':
                    case 'Amount':
                    case 'Cap':
                        {
                            elementArray.push(
                                <TermBIAnalysis history={history} analysisData={data} indHeader={indItem} setModal={(check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => this.setModal(check, data, dataPoint, documentName, dataType)} />
                            )
                            break;
                        }
                    case 'Present':
                    case 'Termination at Convenience': {
                        elementArray.push(
                            <PresentAnalysis history={history} analysisData={data} indHeader={indItem} setModal={(check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => this.setModal(check, data, dataPoint, documentName, dataType)} />
                        )
                        break;
                    }
                    case 'Lock - in Period': {
                        elementArray.push(
                            <LockInAnalysis analysisData={data} />
                        )
                        break;
                    }
                    case 'Mode':
                    case 'Venue':
                    case 'Act/Statute':
                    case 'Jurisdiction':
                    case 'Territory': {
                        elementArray.push(
                            <JurisdictionAnalysis analysisData={data} indHeader={indItem} setModal={(check: boolean, data: any, dataPoint: string, documentName: string, dataType?: string) => this.setModal(check, data, dataPoint, documentName, dataType)} />
                        )
                        break;
                    }
                    default: {
                        //do nothing
                    }
                }
            });
        }
        return elementArray;
    }

    render() {
        let { analysisData } = this.props;
        return (
            <>
                {analysisData.length > 0 && analysisData.map((data, i) =>
                    <tr id="analysis-table-row" key={i}>
                        {this.switchIndividualComponents(data).map((element, i) =>
                            <React.Fragment key={i}>{element}</React.Fragment>
                        )}
                    </tr>)}
            </>
        );
    }
}