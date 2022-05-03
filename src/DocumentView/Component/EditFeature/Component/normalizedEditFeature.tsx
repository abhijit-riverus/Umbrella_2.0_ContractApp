import React, { Component } from "react";
import { CurrencyType, DurationType, LinkDateRequest, LinkPhraseRequest } from "../../../State/documentState";
import AmountAddEdit from "./NormalizedAddEdit/amountAddEdit";
import DurationAddEdit from "./NormalizedAddEdit/durationAddEdit";
import TermDurationNormalizedAddEdit from "./NormalizedAddEdit/termDurationNormalizedAddEdit";

interface Props {
    fileId: number;
    toBeEdited: string;
    savedInsight: any;
    savedInsightId: number;
    durationList: DurationType[];
    editDataPoint: (fileId: number, dataType: string, dataPointName: any, highlightedId?: number | null) => void;
    clearNormalizedEdit: () => void;
    currencyList: CurrencyType[];
}

interface State {
}

export default class NormalizedEditFeature extends Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className="row">
                 <div className="col-md-12 pl-0 normalized-edit-div">
                    {this.renderNormalizedEditComponent()}
                 </div>
            </div>
        );
    }

    renderNormalizedEditComponent(){
        let { toBeEdited, durationList, savedInsight, clearNormalizedEdit, currencyList } = this.props;

        switch(toBeEdited){
            case 'Duration':{
                return(
                    <TermDurationNormalizedAddEdit dataPointName={toBeEdited} durationList={durationList} savedInsight={savedInsight} editDuration={(duration: LinkDateRequest) => this.addOrEditData(toBeEdited, duration)} clearNormalizedEdit={clearNormalizedEdit} />
                );
            }
            case 'Payment Duration':
            case 'Non Compete Duration':
            case 'Non Solicitation Duration': 
            case 'Confidentiality Duration': {
                return(
                    <DurationAddEdit dataPointName={toBeEdited} durationList={durationList} savedInsight={savedInsight} editPhrasesRequest={(newPhraseRequest: LinkPhraseRequest) => this.addOrEditData(toBeEdited, newPhraseRequest)} clearNormalizedEdit={clearNormalizedEdit} />
                );
            }
            case 'Amount': 
            case 'Indemnity/Reimbursements/Costs Amount':
            case 'Limitation Of Liability Amount': {
                return(
                    <AmountAddEdit dataPointName={toBeEdited} currencyList={currencyList} savedInsight={savedInsight} editPhrasesRequest={(newPhraseRequest: LinkPhraseRequest) => this.addOrEditData(toBeEdited, newPhraseRequest)} clearNormalizedEdit={clearNormalizedEdit} />
                );
            }
            default: {
                return (
                    <div />
                );
            }
        }
    }

    addOrEditData(dataType: string, dataPointName: any, highlightedId?: number | null) {
        let { editDataPoint, fileId } = this.props;
        editDataPoint(fileId, dataType, dataPointName, highlightedId);
    }
}