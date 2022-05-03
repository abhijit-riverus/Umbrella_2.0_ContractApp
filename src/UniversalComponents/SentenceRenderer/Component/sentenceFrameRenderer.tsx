import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { SentencesData, Table } from '../../../DocumentView/State/documentState';
import SentenceLoader from './sentenceLoader';
import Tooltip from '@material-ui/core/Tooltip';
import { DarkTooltip } from '../../../DocumentView/Component/documentInsights';

interface Props {
    sentenceData: SentencesData;
    sentenceLoader: boolean;
    setClauseText: (selectedClauseText: string) => void;
}

interface State {
    popAddButton: boolean;
    selectedTextId: string;
    selectedText: string;  
}

export default class SentenceFrameRenderer extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this.state = {
            popAddButton: false,
            selectedTextId: "",
            selectedText: ""  
        }
    }

    render() {
        let { sentenceData, sentenceLoader } = this.props;
        return(
            <div className="row" style={{ marginRight: '0px' }}>
                <div className={/* this.showAnnotationMode() ? "col-md-12 mb-2 sentences-container highlight-sentences" : */ "col-md-12 mb-2 sentences-container"} id="scroll-to">
                    {sentenceLoader ?
                        <SentenceLoader />
                    :
                        sentenceData.hierarchy.map((para, i) =>
                            <React.Fragment key={i}>
                                <div id={'p' + para.index} key={para.index} style={{ marginBottom: '20px' }} >
                                    {!isNullOrUndefined(para.table) ?
                                        this.renderTable(para.table, para.index)
                                        :
                                        <>
                                            {para.sentences.map((sentence, j) =>
                                                <React.Fragment key={j}>
                                                    <span id={'p' + para.index + ';s' + sentence.index} style={{ fontWeight: this.getSentencesFontWeight(sentence.level) }} key={sentence.index} >
                                                        {sentence.words.map((word, k) =>
                                                            <React.Fragment key={k}>
                                                                <DarkTooltip title="Please highlight selection on the document to add to the clause library" placement="bottom-end">
                                                                    <span id={'p' + para.index + ';w' + word.index} 
                                                                    className="clause-selector"
                                                                    style={{ fontWeight: this.getFontWeight(para.isHeading) }} 
                                                                    onMouseUp={() => this.showAddClauseOption('p' + para.index + ';w' + word.index)}
                                                                    key={word.index}>
                                                                        {word.word + ' '}
                                                                    </span>
                                                                </DarkTooltip>
                                                                {this.addClause('p' + para.index + ';w' + word.index)}
                                                            </React.Fragment>
                                                        )} 
                                                    </span>
                                                </React.Fragment>
                                            )}
                                        </>
                                    }
                                </div>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
        )
    }

    renderTable(table: Table[], paraIndex: number) {
        return (
            <table className="table table-bordered" style={{ wordBreak: 'break-word' }}>
                <tbody>
                    {table.map((row, i) =>
                        <React.Fragment>
                             <tr key={i} id={"p" + paraIndex + ";r" + i} onMouseUp={() => this.showAddClauseOption("p" + paraIndex + ";r" + i)} >
                                {row.Row.map((col, j) =>
                                    <React.Fragment key={j}>
                                        <td key={j} id={"p" + paraIndex + ";r" + i + ";c" + j} >
                                            <DarkTooltip title="Please highlight selection on the document to add to the clause library" placement="bottom-end">
                                                <span className="clause-selector">
                                                    {col.Content}
                                                </span>
                                            </DarkTooltip>
                                        </td>
                                    </React.Fragment>
                                )}
                            </tr>
                            {this.addClause("p" + paraIndex + ";r" + i)}
                        </React.Fragment>
                    )}
                </tbody>
            </table>
        );
    }

    getSentencesFontWeight(level: string) {
        switch (level) {
            case 'para': {
                return 'normal';
            }
            case 'heading':
            case 'bullet': {
                return 'bold';
            }
            default: {
                return 'normal';
            }
        }
    }

    getFontWeight(isHeading: string) {
        if (isHeading === 'Yes') {
            return 'bold';
        }
    }

    showAddClauseOption(textId: string) {
        let selectedText = this.getSelectionText();
        this.setState({ popAddButton: true, selectedTextId: textId, selectedText: selectedText });
    }

    addClause(textId: string) {
        let { popAddButton, selectedText, selectedTextId } = this.state;
        if(selectedTextId === textId && popAddButton === true){
            return (
                <DarkTooltip title='Add to Clause Library' placement="bottom" >
                    <span style={{ position: 'absolute', left: "-23px", cursor: 'pointer', display: 'inline-block', zIndex: 20 }} data-toggle="modal" data-target="#createClauseModal" onClick={()=> this.openCreateClause()} >
                        <img src="/static_images/add-clause-icn.svg" alt="add-clause" />
                    </span>
                </DarkTooltip>
            );
        }
    }

    getSelectionText() {
        var text = "";
        let windowSelection = window.getSelection();
        if (windowSelection !== null && windowSelection !== undefined) {
            text = windowSelection.toString();
        } /* //For I.E
         else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        } */
        return text;
    }

    openCreateClause() {
        let { selectedText } = this.state;
        this.props.setClauseText(selectedText);
        this.setState({ popAddButton: false, selectedTextId: '' });
    }
}