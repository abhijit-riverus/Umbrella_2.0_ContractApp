import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { LinkParagraphRequest } from '../../../../State/documentState';
import { paraLevelComponents } from '../../../Utils/docUtils';

interface Props{
    editOptionSelected: (editOptionSelected: boolean) => void;
    saveHighlightedDataPoint?: (highlight?: boolean) => void;
    dataPointName: string;
    enableHighlightOption: boolean;
    highlightedId: number[] | null;
    saveHighlightedId: (highlightedId: number[] | null) => void;
    linkedDate: string;
    linkedMode: string;
    linkedParaId: number[] | null;
    editDateInfo: (editedDateInfo: LinkParagraphRequest) => void;
    dateInEditingMode: string;
    changeDateBeingEdited: (dateString: string) => void;
}

interface State{
    isParaAlreadyLinked: boolean;
    isParaLinkingOn: boolean;
}

export default class LinkParaToDate extends Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            isParaAlreadyLinked: this.props.linkedParaId === null || this.props.linkedParaId === undefined ? false : true,
            isParaLinkingOn: false
        }
    }

    componentWillReceiveProps(nextProps: Props){
        if(this.props.linkedParaId !== nextProps.linkedParaId){
            this.setState({isParaAlreadyLinked: nextProps.linkedParaId === null || nextProps.linkedParaId === undefined ? false : true, isParaLinkingOn: false });
        }
        if(this.props.highlightedId !== nextProps.highlightedId){
            if(nextProps.linkedDate === nextProps.dateInEditingMode){
                let editedDateInfo={data: nextProps.linkedDate, mode: nextProps.linkedMode, paraId: nextProps.highlightedId };
                nextProps.editDateInfo(editedDateInfo);
            }
        }
    }

    render() {
        return (
            <>
                {paraLevelComponents.indexOf(this.props.dataPointName) > -1 && this.showHighlightedCount()}
            </>
        )
    }

    showHighlightedCount() {
        let { highlightedId, dateInEditingMode, linkedDate } = this.props;
        let { isParaAlreadyLinked, isParaLinkingOn} = this.state;
        if(dateInEditingMode === linkedDate){
            if(isParaLinkingOn){
                if(highlightedId && highlightedId.length > 0){
                    return (
                        <div className="row">
                            <div className="col-md-12">
                                <span className="link-to" style={{ color: '#C1C1C1' }}>
                                    Edit linked paragraph(s)
                                </span>
                            </div>
                            <div className="col-md-2 pr-0 display-flex" onClick={()=> this.props.editOptionSelected(false) } >
                                <span className="linked-para-count">
                                    {highlightedId.length}
                                </span>
                            </div>
                        </div>
                    )
                } else{
                    return(
                        <div className="row">
                            <div className="col-md-12">
                                <span className="link-to cursor-pointer" style={{ color: '#C1C1C1' }} >
                                    Link to paragraph(s)
                                </span>
                            </div>
                            <div className="col-md-12 link-to-info">
                                    Please highlight the paragraphs on the document, you wish to link to this data point and click on save.
                            </div>
                        </div>
                    )
                }
            }
        }

        if (isParaAlreadyLinked) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <span className="link-to cursor-pointer" style={{ color: '#88305F' }} onClick={()=> this.editLinkedPara()}>
                            Edit linked paragraph(s)
                        </span>
                    </div>
                </div>
            )
        } else{
            return (
                <>
                    <div className="row">
                        <div className="col-md-12">
                            <span className="link-to cursor-pointer" style={{ color: '#88305F' }}
                                onClick={() => this.saveHighlightedDataPoint()}>
                                Link to paragraph(s)
                            </span>
                        </div>
                    </div>
                </>
            )
        }
    }

    editLinkedPara(){
        let { saveHighlightedDataPoint,saveHighlightedId, changeDateBeingEdited, linkedDate } = this.props;
        this.setState({isParaLinkingOn: true});
        changeDateBeingEdited(linkedDate);
        saveHighlightedId(this.props.linkedParaId);
        if(this.props.linkedParaId !== null && this.props.linkedParaId !== undefined){
            let paraHeader = document.getElementById("p"+this.props.linkedParaId[0]);
            !isNullOrUndefined(paraHeader) && paraHeader.scrollIntoView({ block: 'center' });
        }
        this.props.editOptionSelected(true);
        !isNullOrUndefined(saveHighlightedDataPoint) && saveHighlightedDataPoint(true);
    }

    saveHighlightedDataPoint() {
        let { saveHighlightedDataPoint, saveHighlightedId, changeDateBeingEdited, linkedDate } = this.props;
        saveHighlightedId(null); //to locally reset previoulsy set highlightedId
        changeDateBeingEdited(linkedDate); 
        this.setState({isParaLinkingOn: true});
        this.props.editOptionSelected(true);
        !isNullOrUndefined(saveHighlightedDataPoint) && saveHighlightedDataPoint(true); 
    }
}