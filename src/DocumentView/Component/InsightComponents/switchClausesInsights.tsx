import React, { Component } from 'react';
import { currencyList } from '../../../Utils/GeneralUtil/genUtils';
import { Child, Children, CurrencyType, DurationType } from '../../State/documentState';
import { AuxArrayInterface } from '../Utils/docUtils';
import ClausesInsights from './clausesInsights';
import DefinitionInsights from './definitionInsights';

interface Props {
    fileId: number;
    label: string;
    insight: Child[];
    childrenRender: (child: Children, key: number, isGroupedData: boolean, parentClause: Child[], parentClauseId: number, parentLabel: string) => void;
    scrollToChildDataPoint: (insight: string, type: string, children: AuxArrayInterface[], index: number, unselectChild: boolean) => void;
    clickedSubMenu: string;
    childAlias: string;
    setClickedItem: (clickedItem: string, type: string, unselectChild: boolean) => void;
    editDataPoint: (fileId: number, dataType: string, dataPointName: any, highlightedId?: number| null) => void;
    saveInsightToDelete: (insightToDelete: any, childLabelToDelete: string) => void;
    durationList: DurationType[];
    currencyList: CurrencyType[];
}

interface State {

}

export default class SwitchClausesInsights extends Component<Props, State> {

    constructor(props:Props) {
        super(props);
        this.state={

        }
    }

    render() {
        let { label, insight, childrenRender, scrollToChildDataPoint, clickedSubMenu, childAlias, setClickedItem, editDataPoint, fileId, saveInsightToDelete, durationList, currencyList } = this.props;
        switch (label) {
            case 'General Definitions': {
                return (
                    <DefinitionInsights clauses={insight} fileId={fileId} label={label} editDataPoint={editDataPoint} saveInsightToDelete={saveInsightToDelete} />
                );
            }
            default: {
                return (
                    <ClausesInsights clauses={insight} childrenRender={childrenRender} scrollToChildDataPoint={scrollToChildDataPoint} label={label} clickedSubMenu={clickedSubMenu} childAlias={childAlias} setClickedItem={setClickedItem} editDataPoint={editDataPoint} fileId={fileId} saveInsightToDelete={saveInsightToDelete} durationList={durationList} currencyList={currencyList} />
                )
            }
        }
    }
}