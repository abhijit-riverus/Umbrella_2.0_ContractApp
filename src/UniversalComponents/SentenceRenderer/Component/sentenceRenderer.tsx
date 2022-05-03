import React, { Component } from 'react';
import { dateInfo, eventInfo, phraseInfo, sentenceInfo, SentencesData, Table, tableInfo } from '../../../DocumentView/State/documentState';
import { isNullOrUndefined } from 'is-what';
import SentenceLoader from './sentenceLoader';
import Tooltip from '@material-ui/core/Tooltip';
import LinkParagraphModal from '../../Modals/LinkParagraphModal/linkParagraphModal';
import { deletePhraseFromEventArray, deletePhraseFromPhraseArray, deleteSentence, deleteTableCell, deleteTableCellFromPhraseArray, eventListComponents, hasSentence, hasTableCell, isEndWordInPhrase, isStartWordInPhrase, isWordInPhrase, multipleParaLinking, paraLevelComponents, phraseLevelComponents, replaceEventInEventArray, sentenceLevelComponents, singleParaLinking, singleSentenceLinking, termDateComponents } from '../../../DocumentView/Component/Utils/docUtils';
import DeleteInsightModal from '../../Modals/DeleteInsightModal/deleteInsightModal';
import { deleteInsight } from '../../../DocumentView/Component/Utils/deleteUtils';

interface Props {
    fileId: number;
    sentenceData: SentencesData;
    sentenceLoader: boolean;
    dataPointName: string;
    editOptionSelected: boolean;
    highlightedId: number[] | null;
    saveHighlightedId: (highlightedId: number[] | null) => void;
    savedHighlightedSentences: sentenceInfo[] | null;
    saveHighlightedSentences: (savedHighlightedSentences: sentenceInfo[] | null) => void;
    savedHighlightedPhrases: phraseInfo[] | null;
    saveHighlightedPhrases: (savedHighlightedPhrases: phraseInfo[] | null) => void;
    phraseEditOptionSelected: boolean;
    savePhraseEditOption: (phraseEditOptionSelected: boolean) => void;
    phraseInDeleteMode: phraseInfo | null;
    phraseDeleteStatus: boolean;
    saveDeletePhrase: (phraseInDeleteMode: phraseInfo | null, phraseDeleteStatus: boolean) => void;
    phraseInAddMode: phraseInfo | null;
    phraseAddStatus: boolean;
    saveAddPhrase: (phraseInAddMode: phraseInfo | null, phraseAddStatus: boolean) => void;
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
    selectedInsightPoint: string;
    savedHighlightedDates: dateInfo[] | null;
    saveHighlightedDates: (savedHighlightedDates: dateInfo[] | null) => void;
    dateInAddEditMode: dateInfo | null;
    saveDateInAddEditMode: (dateInAddEditMode: dateInfo | null) => void;
    dateEditingStatus: boolean;
    saveDateEditingStatus: (dateEditingStatus: boolean ) => void;
    savedHighlightedEvents: eventInfo[] | null;
    saveHighlightedEvents: (savedHighlightedEvents: eventInfo[] | null) => void;
    eventInAddEdit: eventInfo | null;
    saveEventInAddEdit: (eventInAddEdit: eventInfo | null) => void;
    eventEditingStatus: boolean;
    saveEventEditingStatus: (eventEditingStatus: boolean) => void;
    saveInsightToDelete: (insightToDelete: any, childLabelToDelete: string) => void;
    insightToDelete: any;
    childLabelToDelete: string
    editDataPoint: (fileId: number, dataType: string, dataPointName: any, highlightedId?: number| null) => void;
}

interface State {
    highlightedPara: string[] | null;
    highlightedIdLocal: number | null;
    indexSavedForConfirmation: number;
    multipleSelectionParaId: number[];
    highlightedSentenceIdLocal: number | null;
    linkPhraseOn: boolean;
    highlightedRowIdLocal: number | null;
    highlightedColumnIdLocal: number | null;
}

export default class SentenceRenderer extends Component<Props, State> {
    startWordId: number = -1;
    startWordParaId: number = -1;
    endWordId: number = -1;
    endWordParaId: number = -1;
    startSentenceId: number = -1;
    endSentenceId: number = -1;

    constructor(props: Props) {
        super(props);
        this.state = {
            highlightedPara: null,
            highlightedIdLocal: null,
            multipleSelectionParaId: [],
            indexSavedForConfirmation: -1,
            highlightedSentenceIdLocal: null,
            linkPhraseOn: false,
            highlightedRowIdLocal: null,
            highlightedColumnIdLocal: null
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.highlightedId !== nextProps.highlightedId) {
            let tempPara: string[] = [];
            if (!isNullOrUndefined(this.props.highlightedId)) {
                this.props.highlightedId.forEach((el: number) => {
                    tempPara.push('p' + el)
                })
            }
            this.setState({ highlightedPara: tempPara })

            if (nextProps.highlightedId === null) {
                this.setState({ multipleSelectionParaId: [] });
            }
        }
        if (this.props.selectedInsightPoint !== nextProps.selectedInsightPoint) {
            this.props.savePhraseEditOption(false);
            this.setState({ linkPhraseOn: false });
            this.startWordId = -1;
            this.startWordParaId = -1;
            this.endWordId = -1;
            this.endWordParaId = -1;
            this.startSentenceId = -1;
            this.endSentenceId = -1;
        }
        if (this.props.phraseEditOptionSelected !== nextProps.phraseEditOptionSelected) {
            if (nextProps.phraseEditOptionSelected === false) {
                this.setState({ linkPhraseOn: false });
            }
        }
    }

    render() {
        let { sentenceData, sentenceLoader, highlightedId, savedHighlightedSentences, dataPointName, insightToDelete } = this.props;
        let { indexSavedForConfirmation } = this.state;
        return (
            // <Scrollable maxHeight={580}>
            <div className="row" style={{ marginRight: '0px' }}>
                <div className={this.showAnnotationMode() ? "col-md-12 mb-2 sentences-container highlight-sentences" : "col-md-12 mb-2 sentences-container"} id="scroll-to">
                    {sentenceLoader ?
                        <SentenceLoader />
                        :
                        sentenceData.hierarchy.map((para, i) =>
                            <React.Fragment key={i}>
                                <div id={'p' + para.index} key={para.index} style={{ marginBottom: '20px', position: 'relative', outline: (para.table === null || para.table === undefined) && this.showAnnotationMode() && this.getDateEditingStatus() && paraLevelComponents.indexOf(dataPointName) > -1 && this.displayOutline(para.index) ? '3px solid #FBCE2F' : 'none' }}
                                    onMouseOver={() => this.showAnnotationMode() && this.setState({ highlightedIdLocal: para.index })}
                                    onMouseOut={() => this.showAnnotationMode() && this.setState({ highlightedIdLocal: null })}
                                    onClick={() => (para.table === null || para.table === undefined) && this.showAnnotationMode() && this.getDateEditingStatus() && paraLevelComponents.indexOf(dataPointName) > -1 && this.getHighlightedDiv(para.index)}>
                                    {!isNullOrUndefined(para.table) ?
                                        this.renderTable(para.table, para.index)
                                        :
                                        <>
                                            {para.sentences.map((sentence, j) =>
                                                <React.Fragment key={j}>
                                                    <span id={'p' + para.index + ';s' + sentence.index} style={{
                                                        fontWeight: this.getSentencesFontWeight(sentence.level),
                                                        borderBottom: this.showAnnotationMode() && (sentenceLevelComponents.indexOf(dataPointName) > -1 || singleSentenceLinking.indexOf(dataPointName) > -1) && hasSentence(savedHighlightedSentences, para.index, sentence.index) ? '3px solid #FBCE2F' : 'none'
                                                    }}
                                                        onMouseOver={() => this.showAnnotationMode() && (sentenceLevelComponents.indexOf(dataPointName) > -1 || singleSentenceLinking.indexOf(dataPointName) > -1) && this.setState({ highlightedSentenceIdLocal: sentence.index })}
                                                        onMouseOut={() => this.showAnnotationMode() && (sentenceLevelComponents.indexOf(dataPointName) > -1 || singleSentenceLinking.indexOf(dataPointName) > -1) && this.setState({ highlightedSentenceIdLocal: null })}
                                                        onClick={() => this.showAnnotationMode() && (sentenceLevelComponents.indexOf(dataPointName) > -1 || singleSentenceLinking.indexOf(dataPointName) > -1) && this.getHighlightedSpan(savedHighlightedSentences !== null && hasSentence(savedHighlightedSentences, para.index, sentence.index) ? 'delete' : 'link', para.index, sentence.index)}
                                                        key={sentence.index}>
                                                        {/* {sentence.words.map((word, k) =>
                                                            <span id={'p' + para.index + ';s' + sentence.index + ';w' + word.index} style={{ fontWeight: this.getFontWeight(para.isHeading) }} key={word.index}>
                                                                {word.word + ' '}
                                                            </span>
                                                        )} */}
                                                        {sentence.words.map((word, k) =>
                                                            <React.Fragment key={k}>
                                                                {<span id={'p' + para.index + ';w' + word.index}
                                                                    className={this.props.phraseEditOptionSelected === true ? 'phrase-selector' : 'none'}
                                                                    style={{
                                                                        fontWeight: this.getFontWeight(para.isHeading),
                                                                        borderBottom: isWordInPhrase(para.index, word.index, this.props.phraseInDeleteMode) === true && (phraseLevelComponents.indexOf(dataPointName) > -1 || eventListComponents.indexOf(dataPointName) > -1) && this.props.phraseDeleteStatus === true ? "4px solid #FBCE2F" : "none"
                                                                    }}
                                                                    onMouseDown={() => this.getStartWord(para.index, word.index, sentence.index)}
                                                                    onMouseUp={() => this.getEndWord(para.index, word.index, sentence.index)}
                                                                    key={word.index}>
                                                                    {k !== para.sentences[j].words.length - 1 ? word.word + ' ' :
                                                                        <span className={this.props.phraseEditOptionSelected === true ? 'phrase-selector' : 'none'} >{word.word} &nbsp;</span>}
                                                                    {/* {word.word + ' '} */}
                                                                </span>}
                                                                {this.linkPhrase(para.index, word.index)}
                                                                {this.getPhraseDeleteEditingStatus() && isEndWordInPhrase(para.index, word.index, this.props.phraseInDeleteMode) && this.showDeletePhraseOption(this.props.phraseInDeleteMode)}
                                                            </React.Fragment>
                                                        )}
                                                    </span>
                                                    {this.showAnnotationMode() && (sentenceLevelComponents.indexOf(dataPointName) > -1 || singleSentenceLinking.indexOf(dataPointName) > -1) && this.linkOrDeleteSentence(savedHighlightedSentences !== null && hasSentence(savedHighlightedSentences, para.index, sentence.index) ? 'delete' : 'link', para.index, sentence.index)}
                                                </React.Fragment>
                                            )}
                                            {(para.table === null || para.table === undefined) && this.showAnnotationMode() && this.getDateEditingStatus() && paraLevelComponents.indexOf(dataPointName) > -1 && this.linkOrDelete(highlightedId !== null && highlightedId.indexOf(para.index) > -1 ? 'delete' : 'link', para.index)}
                                        </>
                                    }
                                </div>
                            </React.Fragment>
                        )}
                </div>
                <div className="" style={{ zIndex: 2 }} onClick={() => this.stopPhraseEditing()}>
                    <span></span>
                </div>
                <button style={{ display: 'none' }} type="button" data-toggle="modal" data-target="#linkParaModal" id="linkParaButton"></button>
                <LinkParagraphModal linkConfirmation={(confirm: boolean) => confirm && this.props.saveHighlightedId([indexSavedForConfirmation])} />
                <DeleteInsightModal deleteInsight={(confirmed: boolean)=> this.deleteClause(insightToDelete, confirmed)} />
            </div>
            // </Scrollable>
        );
    }

    linkOrDelete(action: string, paraIndex: number) {
        let { highlightedIdLocal } = this.state;
        if (action === 'link') {
            let hoveredPara = document.getElementById("p" + paraIndex);
            if (highlightedIdLocal === paraIndex) {
                if (hoveredPara !== null) {
                    hoveredPara.style.outline = "3px solid #FBCE2F";
                }
            } else {
                if (hoveredPara !== null) {
                    hoveredPara.style.outline = "none";
                }
            }
            return (
                <Tooltip title='Link to datapoint' placement="right-end">
                    <span style={{ top: '-20px', right: '-20px', position: 'absolute', cursor: 'pointer', display: highlightedIdLocal === paraIndex ? 'block' : 'none' }}
                        onClick={() => this.getHighlightedDiv(paraIndex)}>
                        <span className="annotate-icn-container">
                            <img src="/static_images/annotate-icn.svg" alt="link-icn" />
                        </span>
                    </span>
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title='Delete linked phrase from the datapoint' placement="right-end">
                    <span style={{ top: '-20px', right: '-20px', position: 'absolute', cursor: 'pointer', display: 'block' }}
                        onClick={() => this.getHighlightedDiv(null)}>
                        <span className="annotate-icn-container">
                            <img src="/static_images/delete-annotation-icn.svg" alt="delete-icn" />
                        </span>
                    </span>
                </Tooltip>
            )
        }
    }

    linkOrDeleteSentence(action: string, paraIndex: number, sentenceIndex: number) {
        let { highlightedSentenceIdLocal, highlightedIdLocal } = this.state;
        if (action === "link") {
            let hoveredSentence = document.getElementById("p" + paraIndex + ";s" + sentenceIndex);
            if (highlightedSentenceIdLocal === sentenceIndex && highlightedIdLocal === paraIndex) {
                if (hoveredSentence !== null) {
                    hoveredSentence.style.borderBottom = '3px solid #FBCE2F';
                }
            } else {
                if (hoveredSentence !== null) {
                    hoveredSentence.style.borderBottom = 'none';
                }
            }
            return (
                <Tooltip title='Link to datapoint' placement="right-end">
                    <span style={{ top: '-8px', right: '11px', position: 'relative', cursor: 'pointer', display: highlightedSentenceIdLocal === sentenceIndex && highlightedIdLocal === paraIndex ? 'inline-block' : 'none' }}
                        onClick={() => this.getHighlightedSpan('link', paraIndex, sentenceIndex)}>
                        <span className="annotate-small-icn-container">
                            <img src="/static_images/annotate-icn.svg" alt="link-icn" />
                        </span>
                    </span>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip title='Delete linked phrase from the datapoint' placement="right-end">
                    <span style={{ top: '-8px', right: '11px', position: 'relative', cursor: 'pointer', display: 'inline-block' }}
                        onClick={() => this.getHighlightedSpan('delete', paraIndex, sentenceIndex)}>
                        <span className="annotate-small-icn-container">
                            <img src="/static_images/delete-annotation-icn.svg" alt="delete-icn" />
                        </span>
                    </span>
                </Tooltip>
            )
        }
    }



    showDeletePhraseOption(phraseInfo: phraseInfo | null) {
        if (phraseInfo !== null) {
            return (
                <span style={{ position: 'relative', cursor: 'pointer', display: 'inline-block' }}
                    onClick={() => this.deletePhrase(phraseInfo)}>
                    <span className="annotate-small-icn-container">
                        <img src="/static_images/delete-annotation-icn.svg" alt="delete-icn" />
                    </span>
                </span>
            )
        }
    }

    deletePhrase(phraseInfo: phraseInfo){
        let {phraseInAddMode, dataPointName, eventInAddEdit, savedHighlightedEvents} = this.props;
        let paraId = phraseInfo.paraId;
        let startWordId = phraseInfo.startWordId;
        for (let i = startWordId; i <= phraseInfo.endWordId; i++) {
            let phraseElement = 'p' + paraId + ';w' + i;
            let phraseElementOnDoc = document.getElementById(phraseElement);
            if (phraseElementOnDoc !== undefined && phraseElementOnDoc !== null) {
                phraseElementOnDoc.style.background = 'none';
            }
        }
        
        if(eventListComponents.indexOf(dataPointName) > -1 && eventInAddEdit !== null){
            let tempEventInAddEdit: eventInfo = eventInAddEdit;
            tempEventInAddEdit.paraId = -1;
            tempEventInAddEdit.sentenceId = -1;
            tempEventInAddEdit.startWordId = -1;
            tempEventInAddEdit.endWordId = -1;
            tempEventInAddEdit.phrase = '';
            tempEventInAddEdit.rowId = -1;
            tempEventInAddEdit.columnId = -1;
            tempEventInAddEdit.phrase = '';

            //delete it from savedHighlightedEvents 
            if(savedHighlightedEvents !== null && savedHighlightedEvents.length > -1 && eventInAddEdit.eventHighlightId > -1){
                let filteredHighlightedEvents: eventInfo[] = deletePhraseFromEventArray(eventInAddEdit, savedHighlightedEvents);
                this.props.saveHighlightedEvents(filteredHighlightedEvents);
            }
            this.props.saveEventInAddEdit(tempEventInAddEdit);
            this.props.savePhraseEditOption(true);  //

        } else {

            if(phraseInAddMode !== null && phraseInfo.paraId === phraseInAddMode.paraId && phraseInfo.startWordId === phraseInAddMode.startWordId && phraseInfo.endWordId === phraseInAddMode.endWordId){
                this.props.saveAddPhrase(null, false);
            }
            let changedPhrases = deletePhraseFromPhraseArray(phraseInfo, this.props.savedHighlightedPhrases);
            this.props.saveHighlightedPhrases(changedPhrases);
        }
        
        this.props.saveDeletePhrase(null, false);
        this.props.saveHighlightedTableCells(null);
    }


    getStartWord(paraIndex: number, wordIndex: number, sentenceIndex: number) {
        if (this.getPhraseEditingStatus() === true) {
            this.startWordId = wordIndex;
            this.startWordParaId = paraIndex;
            this.startSentenceId = sentenceIndex;
        }
    }

    getEndWord(paraIndex: number, wordIndex: number, sentenceIndex: number) {

        if (this.getPhraseEditingStatus() === true) {
            this.endWordId = wordIndex;
            this.endWordParaId = paraIndex;
            this.endSentenceId = sentenceIndex;
            this.setState({ linkPhraseOn: true });
        }
    }

    linkPhrase(paraIndex: number, wordIndex: number) {

        let startWordIndex = this.startWordId;
        let startWordParaIndex = this.startWordParaId;
        let endWordIndex = this.endWordId;
        let endWordParaIndex = this.endWordParaId;
        let startSentenceIndex = this.startSentenceId;
        let endSentenceIndex = this.endSentenceId;
        if (this.getPhraseEditingStatus() === true && this.state.linkPhraseOn === true) {
            if (startWordIndex !== -1 && endWordIndex !== -1 && startWordParaIndex !== -1 && endWordParaIndex !== -1) {
                if (endWordIndex !== null && endWordParaIndex !== null) {
                    if (endWordIndex === wordIndex && endWordParaIndex === paraIndex) {
                        if (startWordParaIndex === endWordParaIndex) {
                            if (startWordIndex !== null && endWordIndex !== null && startWordIndex <= endWordIndex) {
                                return (
                                    <span style={{ position: 'relative', cursor: 'pointer', display: 'inline-block' }}
                                        onClick={() => this.addSelectedPhrase(startWordIndex, startWordParaIndex, endWordIndex, endWordParaIndex, startSentenceIndex, endSentenceIndex)} >
                                        <span className="annotate-small-icn-container">
                                            <img src="/static_images/copy-icn.svg" alt="link-icn" />
                                        </span>
                                    </span>
                                )
                            } else {
                                this.startWordParaId = -1;
                                this.startWordId = -1;
                                this.endWordId = -1;
                                this.endWordParaId = -1;
                                this.startSentenceId = -1;
                                this.endSentenceId = -1
                            }
                        } else {
                            this.startWordParaId = -1;
                            this.startWordId = -1;
                            this.endWordId = -1;
                            this.endWordParaId = -1;
                            this.startSentenceId = -1;
                            this.endSentenceId = -1;
                        }
                    }
                }
            }
        }
    }

    linkOrDeleteTableCell(action: string, paraIndex: number, rowIndex: number, columnIndex: number) {
        let { highlightedIdLocal, highlightedRowIdLocal, highlightedColumnIdLocal } = this.state;
        if (action === 'link') {
            let hoveredTableCell = document.getElementById("p" + paraIndex + ";r" + rowIndex + ";c" + columnIndex);
            if (highlightedIdLocal === paraIndex && highlightedRowIdLocal === rowIndex && highlightedColumnIdLocal === columnIndex) {
                if (hoveredTableCell !== null) {
                    hoveredTableCell.style.outline = "3px solid #FBCE2F";
                }
            } else {
                if (hoveredTableCell !== null) {
                    hoveredTableCell.style.outline = "none";
                }
            }
            return (
                <Tooltip title='Link to datapoint' placement="right-end">
                    <span style={{ top: '-20px', right: '-20px', position: 'absolute', cursor: 'pointer', display: highlightedIdLocal === paraIndex && highlightedRowIdLocal === rowIndex && highlightedColumnIdLocal === columnIndex ? 'block' : 'none' }}
                        onClick={() => this.getHighlightedTableCell('link', paraIndex, rowIndex, columnIndex)} >
                        <span className="annotate-icn-container">
                            <img src="/static_images/annotate-icn.svg" alt="link-icn" />
                        </span>
                    </span>
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title='Delete linked phrase from the datapoint' placement="right-end">
                    <span style={{ top: '-20px', right: '-20px', position: 'absolute', cursor: 'pointer', display: 'block' }}
                        onClick={() => this.getHighlightedTableCell('delete', paraIndex, rowIndex, columnIndex)}>
                        <span className="annotate-icn-container">
                            <img src="/static_images/delete-annotation-icn.svg" alt="delete-icn" />
                        </span>
                    </span>
                </Tooltip>
            )
        }
    }

    addSelectedPhrase(startWordIndex: number, startWordParaIndex: number, endWordIndex: number, endWordParaIndex: number, startSentenceIndex: number, endSentenceIndex: number) {
        let {savedHighlightedEvents,eventInAddEdit} = this.props;
        if (startWordIndex !== -1 && endWordIndex !== -1 && startWordParaIndex !== -1 && endWordParaIndex !== -1) {
            let startWordElementId: string = 'p' + startWordParaIndex + ';w' + startWordIndex;
            let endWordElementId = 'p' + endWordParaIndex + ';w' + endWordIndex;

            //get selected phrase text
            let startWord = document.getElementById(startWordElementId);
            let phraseText = null;
            let endWord = null;
            let traverseWordElement = '';
            let traverseEndWordIndex = startWordIndex;
            if (startWordElementId === endWordElementId) { //same word
                phraseText = document.getElementById(startWordElementId)?.textContent;
            } else {
                if (startWord !== null) {
                    phraseText = startWord.textContent;
                    if(phraseText !== null && endWordIndex !== null && startWordIndex !== null){
                        for(let i = startWordIndex ; i < endWordIndex; i++ ){
                            if(traverseEndWordIndex !== null){
                                traverseEndWordIndex += 1;
                                traverseWordElement = 'p' + startWordParaIndex + ';w' + traverseEndWordIndex
                                endWord = document.getElementById(traverseWordElement);
                                if(endWord !== null){
                                    phraseText += endWord.textContent;
                                }
                            }
                        }
                    }
                }
            }

            //set PhraseInfo Json in savedHighlightedPhrases prop
            let newPhraseInfo: phraseInfo = {
                paraId: startWordParaIndex,
                startWordId: startWordIndex,
                endWordId: endWordIndex,
                startSentenceId: startSentenceIndex,
                endSentenceId: endSentenceIndex,
                rowId: -1,
                columnId: -1,
                phrase: phraseText !== undefined && phraseText !== null ? phraseText : ''
            }
            
            if(this.props.eventEditingStatus === true && eventInAddEdit !== null){
                let tempEventInAddEdit: eventInfo = eventInAddEdit;
                tempEventInAddEdit.paraId = startWordParaIndex;
                tempEventInAddEdit.sentenceId = startSentenceIndex;
                tempEventInAddEdit.startWordId = startWordIndex;
                tempEventInAddEdit.endWordId = endWordIndex;
                tempEventInAddEdit.rowId = -1;
                tempEventInAddEdit.columnId = -1;
                tempEventInAddEdit.phrase = phraseText !== undefined && phraseText !== null ? phraseText : '';
                this.props.saveEventInAddEdit(tempEventInAddEdit);

                if(savedHighlightedEvents !==null && savedHighlightedEvents.length > 0 && eventInAddEdit.eventHighlightId > -1){
                    let tempHighlightedEvents: eventInfo[] = replaceEventInEventArray(tempEventInAddEdit, savedHighlightedEvents);
                    this.props.saveHighlightedEvents(tempHighlightedEvents);
                }
                this.props.saveDeletePhrase(newPhraseInfo, true);
                this.props.saveHighlightedTableCells(null);
            }else{
                this.props.saveAddPhrase(newPhraseInfo, true);
                this.props.saveHighlightedTableCells(null);
            }
        }
        this.props.savePhraseEditOption(false);
        this.startWordParaId = -1;
        this.startWordId = -1;
        this.endWordId = -1;
        this.endWordParaId = -1;
        this.startSentenceId = -1;
        this.endSentenceId = -1;
        this.setState({ linkPhraseOn: false });

    }

    getHighlightedDiv = (index: number | null) => {
        let { highlightedId, dataPointName, dateInAddEditMode, savedHighlightedDates } = this.props;
        if (termDateComponents.indexOf(dataPointName) > -1) {
            /* if (highlightedId !== null && index !== null && highlightedId.indexOf(index) === -1) { // Check if user is linking another para.
                let link = document.getElementById('linkParaButton');
                !isNullOrUndefined(link) && link.click();
                this.setState({ indexSavedForConfirmation: index });
                //
                
            }
            else {
                if (highlightedId !== null && index !== null && highlightedId.indexOf(index) > -1) {
                    this.props.saveHighlightedId(null);
                }
                else {
                    index !== null && this.props.saveHighlightedId([index])
                }
            } */
            if (highlightedId !== null && index !== null && highlightedId.indexOf(index) === -1) {
                //newly linked para, replace old para
                if (dateInAddEditMode !== null) {
                    let dateInEditing = dateInAddEditMode;
                    dateInEditing.paraId = index;
                    dateInEditing.rowId = -1;
                    dateInEditing.columnId = -1;
                    if (savedHighlightedDates !== null && savedHighlightedDates.length > 0 && dateInAddEditMode.dateId > -1) {
                        for (let i = 0; i < savedHighlightedDates.length; i++) {
                            if (savedHighlightedDates[i].dateId === dateInAddEditMode.dateId) {
                                savedHighlightedDates[i].paraId = index;
                                savedHighlightedDates[i].rowId = -1;
                                savedHighlightedDates[i].columnId = -1;
                            }
                        }
                    }
                    this.props.saveDateInAddEditMode(dateInEditing);
                    this.props.saveHighlightedId([index]);
                    this.props.saveHighlightedTableCells(null);
                }
            } else {
                if (highlightedId !== null && index !== null && highlightedId.indexOf(index) > -1) {
                    //para already exists, clicked again to delete the para
                    if (dateInAddEditMode !== null) {
                        let dateInEditing = dateInAddEditMode;
                        dateInEditing.paraId = -1;
                        dateInEditing.rowId = -1;
                        dateInEditing.columnId = -1;
                        if (savedHighlightedDates !== null && savedHighlightedDates.length > 0 && dateInAddEditMode.dateId > -1) {
                            for (let i = 0; i < savedHighlightedDates.length; i++) {
                                if (savedHighlightedDates[i].dateId === dateInAddEditMode.dateId) {
                                    savedHighlightedDates[i].paraId = -1;
                                    savedHighlightedDates[i].rowId = -1;
                                    savedHighlightedDates[i].columnId = -1;
                                }
                            }
                        }
                        this.props.saveDateInAddEditMode(dateInEditing);
                        this.props.saveHighlightedId(null);
                        this.props.saveHighlightedTableCells(null);
                    }

                } else {
                    if (index !== null) {
                        if (dateInAddEditMode !== null) {
                            let dateInEditing = dateInAddEditMode;
                            dateInEditing.paraId = index;
                            dateInEditing.rowId = -1;
                            dateInEditing.columnId = -1;
                            if (savedHighlightedDates !== null && savedHighlightedDates.length > 0 && dateInAddEditMode.dateId > -1) {
                                for (let i = 0; i < savedHighlightedDates.length; i++) {
                                    if (savedHighlightedDates[i].dateId === dateInAddEditMode.dateId) {
                                        savedHighlightedDates[i].paraId = index;
                                        savedHighlightedDates[i].rowId = -1;
                                        savedHighlightedDates[i].columnId = -1;
                                    }
                                }
                            }
                            this.props.saveDateInAddEditMode(dateInEditing);
                            this.props.saveHighlightedId([index]);
                            this.props.saveHighlightedTableCells(null);
                        }
                    }
                }
            }
        }
        else if (dataPointName === 'Lock-in Period') {

            if (highlightedId !== null && index !== null && highlightedId.indexOf(index) === -1) {
                //newly linked para
                this.props.saveHighlightedId([index]);
                this.props.saveHighlightedTableCells(null);
            } else {
                if (highlightedId !== null && index !== null && highlightedId.indexOf(index) > -1) {
                    //para already exists, clicked again to delete the para
                    this.props.saveHighlightedId(null);
                } else {
                    if (index !== null) {
                        this.props.saveHighlightedId([index]);
                        this.props.saveHighlightedTableCells(null);
                    }
                }
            }
            this.props.savedHighlightedTableCells !== null && this.props.saveHighlightedTableCells(null);

        } else {
            /* let tempId = this.state.multipleSelectionParaId;
            if (index !== null && (highlightedId?.indexOf(index) === -1 || highlightedId === null)) { //highlightedId === null checks for first time highlight
                tempId.push(index);
            } else {
                let filtered = tempId.filter((el) => { return el !== index });
                tempId = filtered;
            }
            this.setState({ multipleSelectionParaId: tempId });
            this.props.saveHighlightedId(tempId); */

            if (highlightedId !== null) {
                let tempId = highlightedId;
                if (index !== null && highlightedId.indexOf(index) === -1) {
                    tempId.push(index);
                    this.props.saveHighlightedId(tempId);
                } else if (index !== null && highlightedId.indexOf(index) !== -1) { //if already present in highlights then remove, edit functionality 
                    let filtered = tempId.filter((el) => { return el !== index });
                    tempId = filtered;
                    this.props.saveHighlightedId(tempId);
                }
            } else {
                if (index !== null && highlightedId === null) {
                    if (dataPointName === 'Lock-in Period') {
                        this.setState({ highlightedIdLocal: null });
                    }
                    this.props.saveHighlightedId([index]);
                }
            }
        }
    }

    getHighlightedSpan = (action: string, paraIndex: number | null, sentenceIndex: number | null) => {
        let { dataPointName, savedHighlightedSentences } = this.props;
        if (sentenceLevelComponents.indexOf(dataPointName) > -1) {
            if (paraIndex !== null && sentenceIndex !== null) {
                let tempSentenceInfo: sentenceInfo = {
                    paraId: paraIndex,
                    sentenceId: sentenceIndex,
                    rowId: -1,
                    columnId: -1
                }
                if (savedHighlightedSentences !== null) {
                    let tempSentences: sentenceInfo[] | null = savedHighlightedSentences;
                    if (action === 'link') {
                        tempSentences.push(tempSentenceInfo);
                        this.props.saveHighlightedSentences(tempSentences);
                    } else {
                        let filteredSentences = deleteSentence(tempSentences, paraIndex, sentenceIndex);
                        tempSentences = filteredSentences;
                        this.props.saveHighlightedSentences(tempSentences);
                    }
                } else {
                    if (savedHighlightedSentences === null) {
                        this.props.saveHighlightedSentences([tempSentenceInfo]);
                    }
                }

            }
        } else if (singleSentenceLinking.indexOf(dataPointName) > -1) {
            if (paraIndex !== null && sentenceIndex !== null) {
                let tempSentenceInfo: sentenceInfo = {
                    paraId: paraIndex,
                    sentenceId: sentenceIndex,
                    rowId: -1,
                    columnId: -1
                }
                if (savedHighlightedSentences !== null) {
                    let tempSentences: sentenceInfo[] | null = savedHighlightedSentences;
                    if(savedHighlightedSentences.length > 0){
                        if(savedHighlightedSentences[0].paraId === paraIndex && savedHighlightedSentences[0].sentenceId === sentenceIndex){
                            this.props.saveHighlightedSentences(null);
                        } else {
                            this.props.saveHighlightedSentences([tempSentenceInfo]);
                            this.props.saveHighlightedTableCells(null);
                        }
                    }
                } else {
                    if (savedHighlightedSentences === null) {
                        this.props.saveHighlightedSentences([tempSentenceInfo]);
                        this.props.saveHighlightedTableCells(null);
                    }
                }
            }
        }
    }

    getHighlightedTableCell(action: string, paraIndex: number, rowIndex: number, columnIndex: number){
        let {savedHighlightedTableCells, dataPointName, savedHighlightedPhrases, phraseInAddMode, savedHighlightedDates, dateInAddEditMode, eventInAddEdit, savedHighlightedEvents} = this.props;
        let tempTableInfo: tableInfo = {
            paraId: paraIndex,
            rowId: rowIndex,
            columnId: columnIndex
        }
        if (action === 'link') {
            if (paraIndex !== null && rowIndex !== null && columnIndex !== null) {
                if ((sentenceLevelComponents.indexOf(dataPointName) > -1) || (multipleParaLinking.indexOf(dataPointName) > -1)) {
                    if (savedHighlightedTableCells !== null) {
                        let tempTableCells: tableInfo[] = savedHighlightedTableCells;
                        tempTableCells.push(tempTableInfo);
                        this.props.saveHighlightedTableCells(tempTableCells);
                    } else {
                        this.props.saveHighlightedTableCells([tempTableInfo]);
                    }
                } else if (dataPointName === 'Lock-in Period' || singleSentenceLinking.indexOf(dataPointName) > -1) {
                    let linkedTableCell: tableInfo = {
                        paraId: paraIndex,
                        rowId: rowIndex,
                        columnId: columnIndex
                    }
                    this.props.saveHighlightedTableCells([linkedTableCell]);
                    this.props.saveHighlightedId(null);
                    this.props.saveHighlightedSentences(null);
                    this.setState({ indexSavedForConfirmation: -1 });
                } else if (phraseLevelComponents.indexOf(dataPointName) > -1 && this.props.phraseEditOptionSelected === true) {

                    let tempTableCellId = 'p' + paraIndex + ';r' + rowIndex + ';c' + columnIndex;
                    let phraseId = document.getElementById(tempTableCellId);
                    let phraseText = phraseId !== undefined && phraseId !== null ? phraseId.textContent : '';
                    if (phraseId !== undefined && phraseId !== null) {
                        phraseId.style.outline = 'none';
                    }

                    let linkedTableCell: tableInfo = {
                        paraId: paraIndex,
                        rowId: rowIndex,
                        columnId: columnIndex
                    }
                    this.props.saveHighlightedTableCells([linkedTableCell]);

                    let tableCellPhrase: phraseInfo = {
                        paraId: paraIndex,
                        startSentenceId: -1,
                        endSentenceId: -1,
                        startWordId: -1,
                        endWordId: -1,
                        rowId: rowIndex,
                        columnId: columnIndex,
                        phrase: phraseText !== undefined && phraseText !== null ? phraseText : ''
                    }

                    this.props.saveAddPhrase(tableCellPhrase, true);
                } else if (termDateComponents.indexOf(dataPointName) > -1) {
                    let tempTableCells = { paraId: paraIndex, rowId: rowIndex, columnId: columnIndex };
                    if (dateInAddEditMode !== null) {
                        let dateInEditing = dateInAddEditMode;
                        dateInEditing.paraId = paraIndex;
                        dateInEditing.rowId = rowIndex;
                        dateInEditing.columnId = columnIndex;

                        if (savedHighlightedDates !== null && savedHighlightedDates.length !== 0 && dateInAddEditMode.dateId > -1) {
                            for (let i = 0; i < savedHighlightedDates.length; i++) {
                                if (dateInAddEditMode.dateId === savedHighlightedDates[i].dateId) {
                                    savedHighlightedDates[i].paraId = paraIndex;
                                    savedHighlightedDates[i].rowId = rowIndex;
                                    savedHighlightedDates[i].columnId = columnIndex;
                                }
                            }
                        }
                        this.props.saveDateInAddEditMode(dateInEditing);
                        this.props.saveHighlightedTableCells([tempTableCells]);
                        this.props.saveHighlightedId(null);
                    }
                } else if(eventListComponents.indexOf(dataPointName) > -1){
                    if(eventInAddEdit !== null){

                        let tempTableCellId = 'p' + paraIndex + ';r' + rowIndex+ ';c'+ columnIndex;
                        let phraseId = document.getElementById(tempTableCellId);
                        let phraseText = phraseId !== undefined && phraseId !== null  && phraseId.textContent !== null ? phraseId.textContent : '';

                        let tempEventInAddEdit: eventInfo = eventInAddEdit;
                        tempEventInAddEdit.paraId = paraIndex;
                        tempEventInAddEdit.rowId = rowIndex;
                        tempEventInAddEdit.columnId = columnIndex;
                        tempEventInAddEdit.sentenceId = -1;
                        tempEventInAddEdit.startWordId = -1;
                        tempEventInAddEdit.endWordId = -1;
                        tempEventInAddEdit.phrase = phraseText;

                        this.props.saveEventInAddEdit(tempEventInAddEdit);
                        this.props.saveHighlightedTableCells([tempTableInfo]);
                        this.props.saveDeletePhrase(null, false);

                        if(savedHighlightedEvents !==null && savedHighlightedEvents.length > 0 && eventInAddEdit.eventHighlightId > -1){
                            let tempHighlightedEvents: eventInfo[] = replaceEventInEventArray(tempEventInAddEdit, savedHighlightedEvents);
                            this.props.saveHighlightedEvents(tempHighlightedEvents);
                        }
                    }
                }
            }
        } else if (action === 'delete') {
            if ((sentenceLevelComponents.indexOf(dataPointName) > -1) || (multipleParaLinking.indexOf(dataPointName) > -1)) {
                if (savedHighlightedTableCells !== null) {
                    let filteredTableCells = deleteTableCell(savedHighlightedTableCells, paraIndex, rowIndex, columnIndex);
                    this.props.saveHighlightedTableCells(filteredTableCells);
                }
            } else if (dataPointName === 'Lock-in Period' || singleSentenceLinking.indexOf(dataPointName) > -1) {
                this.props.saveHighlightedTableCells(null);

            } else if (phraseLevelComponents.indexOf(dataPointName) > -1) {

                let filteredPhrases: phraseInfo[] | null = null;
                if (savedHighlightedPhrases !== null && savedHighlightedPhrases.length > 0) {
                    filteredPhrases = deleteTableCellFromPhraseArray(paraIndex, rowIndex, columnIndex, savedHighlightedPhrases);
                    filteredPhrases = filteredPhrases !== null && filteredPhrases.length > 0 ? filteredPhrases : null;
                }
                this.props.saveHighlightedPhrases(filteredPhrases); //deleted phrase
                if (phraseInAddMode !== null && phraseInAddMode.paraId === paraIndex && phraseInAddMode.rowId === rowIndex && phraseInAddMode.columnId === columnIndex) {
                    this.props.saveAddPhrase(null, false);
                }
                this.props.saveDeletePhrase(null, false);
                this.props.saveHighlightedTableCells(null);
                //this.setState({highlightedRowIdLocal: null, highlightedColumnIdLocal: null});
                this.stopPhraseEditing();
            } else if (termDateComponents.indexOf(dataPointName) > -1) {
                if (dateInAddEditMode !== null) {
                    let dateInEditing = dateInAddEditMode;
                    dateInEditing.paraId = null;
                    dateInEditing.rowId = null;
                    dateInEditing.columnId = null;

                    if (savedHighlightedDates !== null && savedHighlightedDates.length !== 0 && dateInAddEditMode.dateId > -1) {
                        for (let i = 0; i < savedHighlightedDates.length; i++) {
                            if (dateInAddEditMode.dateId === savedHighlightedDates[i].dateId) {
                                savedHighlightedDates[i].paraId = null;
                                savedHighlightedDates[i].rowId = null;
                                savedHighlightedDates[i].columnId = null;
                            }
                        }
                    }
                    this.props.saveDateInAddEditMode(dateInEditing);
                    this.props.saveHighlightedTableCells(null);
                    this.props.saveHighlightedId(null);
                }
            } else if(eventListComponents.indexOf(dataPointName) > -1){
                if(eventInAddEdit !== null){
                    let tempEventInAddEdit: eventInfo = eventInAddEdit;
                    tempEventInAddEdit.paraId = -1;
                    tempEventInAddEdit.rowId = -1;
                    tempEventInAddEdit.columnId = -1;
                    tempEventInAddEdit.sentenceId = -1;
                    tempEventInAddEdit.phrase = '';
                    tempEventInAddEdit.startWordId = -1;
                    tempEventInAddEdit.endWordId = -1;
                    tempEventInAddEdit.phrase = '';
                    this.props.saveEventInAddEdit(tempEventInAddEdit);
                    this.props.saveDeletePhrase(null, false);

                    if(savedHighlightedEvents !== null && savedHighlightedEvents.length > 0 && eventInAddEdit.eventHighlightId > -1){
                        let filteredHighlightedEvents: eventInfo[] = replaceEventInEventArray(tempEventInAddEdit, savedHighlightedEvents);
                        this.props.saveHighlightedEvents(filteredHighlightedEvents);
                    }
                }
            }
        }
    }

    displayOutline(index: number) {
        if (this.props.highlightedId === null) {
            return false
        }
        else if (this.props.highlightedId.indexOf(index) > -1) {
            return true
        }
        else {
            return false
        }
    }

    showAnnotationMode() {
        if (this.props.dataPointName !== '' && this.props.editOptionSelected) {
            return true
        } else {
            return false
        }
    }

    getPhraseEditingStatus(){
        let {dataPointName, phraseEditOptionSelected, eventEditingStatus} = this.props;
        if (dataPointName !== '' && phraseEditOptionSelected === true && phraseLevelComponents.indexOf(dataPointName) > -1) {
            return true;
        } else if(dataPointName !== '' && phraseEditOptionSelected === true && eventListComponents.indexOf(dataPointName) > -1 && eventEditingStatus === true){
            return true;
        } else {
            return false;
        }
    }

    getPhraseDeleteEditingStatus() {
        let { dataPointName } = this.props;
        if (this.props.phraseDeleteStatus === true && dataPointName !== '' && phraseLevelComponents.indexOf(dataPointName) > -1) {
            return true;
        } else if (this.props.phraseDeleteStatus === true && dataPointName !== '' && eventListComponents.indexOf(dataPointName) > -1) {
            return true;
        }else {
            return false;
        }
    }

    getTableEditingStatus() {
        let { dataPointName, phraseEditOptionSelected, savedHighlightedTableCells } = this.props;
        if ((sentenceLevelComponents.indexOf(dataPointName) > -1) || (multipleParaLinking.indexOf(dataPointName) > -1)) {
            return true;
        } else if (dataPointName === 'Lock-in Period' || singleSentenceLinking.indexOf(dataPointName) > -1) {
            return true;
        } else if (phraseLevelComponents.indexOf(dataPointName) > -1 && phraseEditOptionSelected === true) {
            return true;
        } else if (phraseLevelComponents.indexOf(dataPointName) > -1 && this.props.saveHighlightedTableCells !== null && this.props.phraseDeleteStatus === true) {
            return true;
        } else if (termDateComponents.indexOf(dataPointName) > -1 && this.props.dateEditingStatus === true) {
            return true;
        }else if (eventListComponents.indexOf(dataPointName) > -1 && this.props.eventEditingStatus === true){
            return true;
        }
        return false;
    }

    getDateEditingStatus() {
        if (termDateComponents.indexOf(this.props.dataPointName) > -1 && this.props.dateEditingStatus === true) {
            return true;
        } else if (termDateComponents.indexOf(this.props.dataPointName) > -1 && this.props.dateEditingStatus === false) {
            return false;
        }
        return true;
    }

    stopPhraseEditing() {
        this.props.savePhraseEditOption(false);
        this.setState({ linkPhraseOn: false });
        this.startWordId = -1;
        this.startWordParaId = -1;
        this.endWordId = -1;
        this.endWordParaId = -1;
        this.startSentenceId = -1;
        this.endSentenceId = -1;
    }


    renderTable(table: Table[], paraIndex: number) {
        let { dataPointName } = this.props;
        return (
            <table className="table table-bordered" style={{ wordBreak: 'break-word' }}>
                <tbody>
                    {table.map((row, i) =>
                        <tr key={i} id={"p" + paraIndex + ";r" + i}>
                            {row.Row.map((col, j) =>
                                <React.Fragment key={j}>
                                    <td key={j} id={"p" + paraIndex + ";r" + i + ";c" + j}
                                        style={{ outline: this.showAnnotationMode() && this.getTableEditingStatus() && hasTableCell(paraIndex, i, j, this.props.savedHighlightedTableCells) === true ? '3px solid #FBCE2F' : 'none', position: 'relative' }}
                                        onMouseOver={() => this.showAnnotationMode() && this.getTableEditingStatus() && this.props.phraseDeleteStatus !== true && this.setState({ highlightedRowIdLocal: i, highlightedColumnIdLocal: j })}
                                        onMouseOut={() => this.showAnnotationMode() && this.getTableEditingStatus() && this.props.phraseDeleteStatus !== true && this.setState({ highlightedRowIdLocal: null, highlightedColumnIdLocal: null })}
                                        onClick={() => this.showAnnotationMode() && this.getTableEditingStatus() && this.getHighlightedTableCell(this.props.savedHighlightedTableCells !== null && hasTableCell(paraIndex, i, j, this.props.savedHighlightedTableCells) === true ? 'delete' : 'link', paraIndex, i, j)}
                                    >
                                        {col.Content}
                                        {this.showAnnotationMode() && this.getTableEditingStatus() && this.linkOrDeleteTableCell(this.props.savedHighlightedTableCells !== null && hasTableCell(paraIndex, i, j, this.props.savedHighlightedTableCells) === true ? 'delete' : 'link', paraIndex, i, j)}
                                    </td>
                                </React.Fragment>
                            )}
                        </tr>
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

    deleteClause(clause: any, confirmed: boolean){
        let {childLabelToDelete, fileId} = this.props;
        if(confirmed && clause !== null){
            let linkRequest: any = deleteInsight(clause, childLabelToDelete);
            if(linkRequest !== null){
                this.props.editDataPoint(fileId, childLabelToDelete, linkRequest);
            }
        }
        this.props.saveInsightToDelete(null, '');
    }
}