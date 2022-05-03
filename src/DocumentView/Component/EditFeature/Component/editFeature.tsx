import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import BlurryLoader from '../../../../UniversalComponents/Loader/blurryLoader';
import {
    currencyInfoData,
    CurrencyType,
    dateInfo,
    durationInfo,
    DurationType,
    EventData,
    LinkDateRequest,
    LinkDurationRequest,
    LinkEventRequest,
    LinkParaRequest,
    LinkPhraseRequest,
    LinkSentenceRequest,
    ParentClauseDataPoint,
    phraseInfo,
    sentenceInfo,
    tableInfo,
    TagData,
} from '../../../State/documentState';
import Amount from './amount';
import Parties from './BasicInformation/parties';
import Tags from './BasicInformation/Tags/tags';
import Title from './BasicInformation/title';
import AssignmentInfoAddEdit from './CustomAddEdit/assignmentInfoAddEdit';
import ConsentAuthorityAddEdit from './CustomAddEdit/Consent/consentAuthorityAddEdit';
import ConsentRegulatoryAddEdit from './CustomAddEdit/Consent/consentRegulatoryAddEdit';
import ConsentAddEdit from './CustomAddEdit/consentAddEdit';
import DefinitionAddEdit from './CustomAddEdit/definitionAddEdit';
import EditEvents from './Events/Container/editEventsCon';
import LinkAmountPhrases from './Link/linkAmountPhrases';
import LinkDurationPhrases from './Link/linkDurationPhrases';
import LinkPhrases from './Link/linkPhrasesCon';
import LinkPresent from './Link/linkPresent';
import LinkPresentSentence from './Link/linkPresentSentence';
import EditSinglePara from './LockInPeriod/editSinglePara';
import EditPhrases from './Phrases/Container/editPhrasesCon';
import EditPresent from './Present/editPresent';
import EditPresentSentence from './Present/editPresentSentence';
import Duration from './TermDates/duration';
import EndDate from './TermDates/endDate';
import StartDate from './TermDates/startDate';

interface Props {
    toBeEdited: string;
    editOptionSelected: (editOptionSelected: boolean) => void;
    editDataPoint: (fileId: number, dataType: string, dataPointName: any, highlightedId?: number | null) => void;
    listTagNature: () => void;
    listTagType: () => void;
    storeOtherTags: (storedOtherTags: any) => void;
    tagNature: TagData[];
    tagType: TagData[];
    otherTags: TagData[];
    listOtherTags: () => void;
    fileId: number;
    createOtherTags: (name: string) => void;
    savedInsight: any;
    editLoader: boolean;
    newTagData: TagData;
    storedOtherTags: any;
    insightsLoader: boolean;
    dataPointName: string;
    highlightedId: number[] | null;
    saveHighlightedDataPoint: (dataPointName: string, editOptionSelection: boolean) => void;
    saveHighlightedId: (highlightedId: number[] | null) => void;
    savedHighlightedSentences: sentenceInfo[] | null;
    saveHighlightedSentences: (savedHighlightedSentences: sentenceInfo[] | null) => void;
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
    savedHighlightedDates: dateInfo[] | null;
    saveHighlightedDates: (savedHighlightedDates: dateInfo[] | null) => void;
    dateInAddEditMode: dateInfo | null;
    saveDateInAddEditMode: (dateInAddEditMode: dateInfo | null) => void;
    dateEditingStatus: boolean;
    saveDateEditingStatus: (dateEditingStatus: boolean) => void;
    otherTagsLoader: boolean;
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
    savedParentClauseDataPoint: ParentClauseDataPoint;
    childInEditId: number;
    durationList: DurationType[];
    currencyList: CurrencyType[];
}

interface State {
    editOptionSelection: boolean;
}

export default class EditFeature extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editOptionSelection: false,
        };
    }

    render() {
        let {
            highlightedId,
            newTagData,
            toBeEdited,
            insightsLoader,
            storedOtherTags,
            savedInsight,
            storeOtherTags,
            editOptionSelected,
            createOtherTags,
            listTagNature,
            listTagType,
            tagNature,
            tagType,
            listOtherTags,
            otherTags,
            editLoader,
            saveHighlightedId,
            saveHighlightedSentences,
            savedHighlightedSentences,
            savedHighlightedTableCells,
            saveHighlightedTableCells,
            savedHighlightedDates,
            saveHighlightedDates,
            dateInAddEditMode,
            saveDateInAddEditMode,
            dateEditingStatus,
            saveDateEditingStatus,
            otherTagsLoader,
            savedHighlightedPhrases,
            saveHighlightedPhrases,
            phraseEditOptionSelected,
            savePhraseEditOption,
            phraseInDeleteMode,
            phraseDeleteStatus,
            saveDeletePhrase,
            phraseInAddMode,
            phraseAddStatus,
            saveAddPhrase,
            savedParentClauseDataPoint,
            durationList,
            currencyList,
        } = this.props;
        if (editLoader || insightsLoader) {
            return (
                <div className="row toc-content toc-content-default">
                    <BlurryLoader />
                </div>
            );
        } else {
            switch (toBeEdited) {
                case 'Title': {
                    return (
                        <Title
                            savedTitle={!isNullOrUndefined(savedInsight[0]) ? savedInsight[0].name : ''}
                            editOptionSelected={editOptionSelected}
                            editTitle={(title) => this.addOrEditData(toBeEdited, title)}
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                        />
                    );
                }
                case 'Tags': {
                    return (
                        <Tags
                            storedOtherTags={storedOtherTags}
                            storeOtherTags={storeOtherTags}
                            newTagData={newTagData}
                            otherTags={otherTags}
                            listOtherTags={listOtherTags}
                            editOptionSelected={editOptionSelected}
                            listTagNature={listTagNature}
                            createOtherTags={createOtherTags}
                            tags={savedInsight}
                            listTagType={listTagType}
                            tagNature={tagNature}
                            tagType={tagType}
                            editTags={(natureTagId, typeTagId, othersTagId) =>
                                this.addOrEditTags(natureTagId, typeTagId, othersTagId, toBeEdited)
                            }
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                            otherTagsLoader={otherTagsLoader}
                            fileId={this.props.fileId}
                        />
                    );
                }
                case 'Contracting Parties': {
                    return (
                        <Parties
                            savedParties={savedInsight}
                            editOptionSelected={editOptionSelected}
                            editParties={(parties) => this.addOrEditData(toBeEdited, parties)}
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                        />
                    );
                }
                case 'Start Dates': {
                    return (
                        <StartDate
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            highlightedId={highlightedId}
                            savedDates={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editStartDates={(startDates: LinkDateRequest) => this.addOrEditData(toBeEdited, startDates)}
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                            savedHighlightedDates={savedHighlightedDates}
                            saveHighlightedDates={(savedHighlightedDates: dateInfo[] | null) =>
                                saveHighlightedDates(savedHighlightedDates)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                            dateInAddEditMode={dateInAddEditMode}
                            saveDateInAddEditMode={(dateInAddEditMode: dateInfo | null) =>
                                saveDateInAddEditMode(dateInAddEditMode)
                            }
                            dateEditingStatus={dateEditingStatus}
                            saveDateEditingStatus={(dateEditingStatus: boolean) =>
                                saveDateEditingStatus(dateEditingStatus)
                            }
                        />
                    );
                }
                case 'End Dates': {
                    return (
                        <EndDate
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            highlightedId={highlightedId}
                            savedDates={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editEndDates={(endDates: LinkDateRequest) => this.addOrEditData(toBeEdited, endDates)}
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                            savedHighlightedDates={savedHighlightedDates}
                            saveHighlightedDates={(savedHighlightedDates: dateInfo[] | null) =>
                                saveHighlightedDates(savedHighlightedDates)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                            dateInAddEditMode={dateInAddEditMode}
                            saveDateInAddEditMode={(dateInAddEditMode: dateInfo | null) =>
                                saveDateInAddEditMode(dateInAddEditMode)
                            }
                            dateEditingStatus={dateEditingStatus}
                            saveDateEditingStatus={(dateEditingStatus: boolean) =>
                                saveDateEditingStatus(dateEditingStatus)
                            }
                        />
                    );
                }
                case 'Duration': {
                    return (
                        <Duration
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            highlightedId={highlightedId}
                            savedDuration={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editDuration={(duration: LinkDateRequest) => this.addOrEditData(toBeEdited, duration)}
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                            savedHighlightedDates={savedHighlightedDates}
                            saveHighlightedDates={(savedHighlightedDates: dateInfo[] | null) =>
                                saveHighlightedDates(savedHighlightedDates)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                            dateInAddEditMode={dateInAddEditMode}
                            saveDateInAddEditMode={(dateInAddEditMode: dateInfo | null) =>
                                saveDateInAddEditMode(dateInAddEditMode)
                            }
                            dateEditingStatus={dateEditingStatus}
                            saveDateEditingStatus={(dateEditingStatus: boolean) =>
                                saveDateEditingStatus(dateEditingStatus)
                            }
                            durationList={durationList}
                        />
                    );
                }
                case 'Termination clause':
                case 'Confidentiality':
                case 'Payment Obligations':
                case 'Non-compete clause':
                case 'Non-solicitation clause':
                case 'Limitation Of Liability':
                case 'Notice Obligations': {
                    return (
                        <EditPresentSentence
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedPresent={savedInsight[0].name}
                            savedPresentData={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresentSentences={(present: LinkSentenceRequest) =>
                                this.addOrEditData(toBeEdited, present)
                            }
                            savedHighlightedSentences={savedHighlightedSentences}
                            saveHighlightedSentences={(savedHighlightedSentences: sentenceInfo[] | null) =>
                                saveHighlightedSentences(savedHighlightedSentences)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }
                case 'Non Compete Territory':
                case 'Events Covered':
                case 'Jurisdiction':
                case 'Confidentiality Nature':
                case 'Dispute Resolution Panel':
                case 'Dispute Resolution Venue':
                case 'Dispute Resolution Act/Statute': {
                    return (
                        <EditPhrases
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedInsight={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPhrasesRequest={(newPhraseRequest: LinkPhraseRequest) =>
                                this.addOrEditData(toBeEdited, newPhraseRequest)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }
                case 'Force Majeure':
                case 'Renewal':
                case 'Insurance clause':
                case 'eventsOfDefault':
                case 'Term clause':
                case 'Governing Law clause':
                case 'Termination at Convenience':
                case 'Dispute Resolution':
                case 'Dispute Resolution Conciliation':
                case 'Dispute Resolution Mediation':
                case 'Dispute Resolution Negotiation':
                case 'Dispute Resolution Others':
                case 'Dispute Resolution Arbitration': {
                    return (
                        <EditPresent
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            highlightedId={highlightedId}
                            savedPresent={savedInsight[0].name}
                            savedPresentData={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresent={(newParasRequest: LinkParaRequest) =>
                                this.addOrEditData(toBeEdited, newParasRequest)
                            }
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }
                case 'Lock-in Period': {
                    return (
                        <EditSinglePara
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            highlightedId={highlightedId}
                            savedPresentData={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresent={(newParasRequest: LinkDurationRequest) =>
                                this.addOrEditData(toBeEdited, newParasRequest)
                            }
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }
                case 'Termination Event':
                case 'Events Of Default Event': {
                    return (
                        <EditEvents
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            highlightedId={highlightedId}
                            savedInsight={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresent={(newLinkedEventsRequest: LinkEventRequest) =>
                                this.addOrEditData(toBeEdited, newLinkedEventsRequest)
                            }
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }
                case 'Change of Control Termination':
                case 'Change of Control Consent':
                case 'Change of Control Notice':
                case 'Change of Control Payment':
                case 'Other Obligations':
                case 'Change of Control': {
                    return (
                        <LinkPresentSentence
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedPresent={savedInsight[0].name}
                            savedPresentData={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresentSentences={(present: LinkSentenceRequest) =>
                                this.addOrEditData(toBeEdited, present)
                            }
                            savedHighlightedSentences={savedHighlightedSentences}
                            saveHighlightedSentences={(savedHighlightedSentences: sentenceInfo[] | null) =>
                                saveHighlightedSentences(savedHighlightedSentences)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }
                case 'Change of Control Definition':
                case 'Subletting/Assignment':
                case 'Indemnity/Reimbursements/Costs': {
                    return (
                        <LinkPresent
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            highlightedId={highlightedId}
                            savedPresent={savedInsight[0].name}
                            savedPresentData={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresent={(newParasRequest: LinkParaRequest) =>
                                this.addOrEditData(toBeEdited, newParasRequest)
                            }
                            saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }
                case 'Indemnity/Reimbursements/Costs Payer':
                case 'Indemnity/Reimbursements/Costs Payee':
                case 'Indemnity/Reimbursements/Costs Triggering Event':
                case 'Indemnity/Reimbursements/Costs Extent of Cost': {
                    return (
                        <LinkPhrases
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedInsight={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPhrasesRequest={(newPhraseRequest: LinkPhraseRequest) =>
                                this.addOrEditData(toBeEdited, newPhraseRequest)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }
                case 'General Definitions': {
                    return (
                        <DefinitionAddEdit
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedInsight={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPhrasesRequest={(newPhraseRequest: LinkPhraseRequest) =>
                                this.addOrEditData(toBeEdited, newPhraseRequest)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                            savedHighlightedPhrases={savedHighlightedPhrases}
                            saveHighlightedPhrases={saveHighlightedPhrases}
                            phraseEditOptionSelected={phraseEditOptionSelected}
                            savePhraseEditOption={savePhraseEditOption}
                            saveDeletePhrase={saveDeletePhrase}
                            phraseInDeleteMode={phraseInDeleteMode}
                            phraseInAddMode={phraseInAddMode}
                            phraseDeleteStatus={phraseDeleteStatus}
                            phraseAddStatus={phraseAddStatus}
                            saveAddPhrase={saveAddPhrase}
                        />
                    );
                }
                case 'Consent Clause': {
                    return (
                        <ConsentAddEdit
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedPresentData={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresentSentences={(present: LinkSentenceRequest) =>
                                this.addOrEditData(toBeEdited, present)
                            }
                            savedHighlightedSentences={savedHighlightedSentences}
                            saveHighlightedSentences={(savedHighlightedSentences: sentenceInfo[] | null) =>
                                saveHighlightedSentences(savedHighlightedSentences)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }

                case 'Subletting/Assignment Notice Info':
                case 'Subletting/Assignment Consent Info': {
                    return (
                        <AssignmentInfoAddEdit
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedPresentData={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresentSentences={(present: LinkSentenceRequest) =>
                                this.addOrEditData(toBeEdited, present)
                            }
                            savedHighlightedSentences={savedHighlightedSentences}
                            saveHighlightedSentences={(savedHighlightedSentences: sentenceInfo[] | null) =>
                                saveHighlightedSentences(savedHighlightedSentences)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                        />
                    );
                }
                case 'Consent Regulatory': {
                    return (
                        <ConsentRegulatoryAddEdit
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedInsightChild={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresentSentences={(present: LinkSentenceRequest) =>
                                this.addOrEditData(toBeEdited, present)
                            }
                        />
                    );
                }
                case 'Consent Authority': {
                    return (
                        <ConsentAuthorityAddEdit
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedInsightChild={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPresentSentences={(present: LinkSentenceRequest) =>
                                this.addOrEditData(toBeEdited, present)
                            }
                            savedParentClauseDataPoint={savedParentClauseDataPoint}
                        />
                    );
                }
                case 'Non Compete Duration':
                case 'Non Solicitation Duration':
                case 'Confidentiality Duration':
                case 'Payment Duration': {
                    return (
                        <LinkDurationPhrases
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedInsight={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPhrasesRequest={(newPhraseRequest: LinkPhraseRequest) =>
                                this.addOrEditData(toBeEdited, newPhraseRequest)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                            durationList={durationList}
                            phraseInAddMode={phraseInAddMode}
                            phraseAddStatus={phraseAddStatus}
                            phraseDeleteStatus={phraseDeleteStatus}
                            phraseInDeleteMode={phraseInDeleteMode}
                            saveAddPhrase={saveAddPhrase}
                            saveHighlightedPhrases={saveHighlightedPhrases}
                            savedHighlightedPhrases={savedHighlightedPhrases}
                            phraseEditOptionSelected={phraseEditOptionSelected}
                            savePhraseEditOption={savePhraseEditOption}
                            saveDeletePhrase={saveDeletePhrase}
                        />
                    );
                }
                case 'Indemnity/Reimbursements/Costs Amount':
                case 'Amount':
                case 'Limitation Of Liability Amount': {
                    return (
                        <LinkAmountPhrases
                            saveHighlightedDataPoint={(dataPointName: string) =>
                                this.saveHighlightedDataPoint(dataPointName)
                            }
                            dataPointName={toBeEdited}
                            savedInsight={savedInsight}
                            editOptionSelected={(editOptionSelected: boolean) =>
                                this.editOptionSelected(editOptionSelected)
                            }
                            editPhrasesRequest={(newPhraseRequest: LinkPhraseRequest) =>
                                this.addOrEditData(toBeEdited, newPhraseRequest)
                            }
                            savedHighlightedTableCells={savedHighlightedTableCells}
                            saveHighlightedTableCells={(savedHighlightedTableCells: tableInfo[] | null) =>
                                saveHighlightedTableCells(savedHighlightedTableCells)
                            }
                            currencyList={currencyList}
                            phraseInAddMode={phraseInAddMode}
                            phraseAddStatus={phraseAddStatus}
                            phraseDeleteStatus={phraseDeleteStatus}
                            phraseInDeleteMode={phraseInDeleteMode}
                            saveAddPhrase={saveAddPhrase}
                            saveHighlightedPhrases={saveHighlightedPhrases}
                            savedHighlightedPhrases={savedHighlightedPhrases}
                            phraseEditOptionSelected={phraseEditOptionSelected}
                            savePhraseEditOption={savePhraseEditOption}
                            saveDeletePhrase={saveDeletePhrase}
                        />
                    );
                }
                default: {
                    return <div />;
                }
            }
        }
    }

    editOptionSelected(selection: boolean) {
        this.setState({ editOptionSelection: selection });
        this.props.editOptionSelected(selection);
    }

    saveHighlightedDataPoint(dataPointName: string) {
        this.props.saveHighlightedDataPoint(dataPointName, this.state.editOptionSelection);
    }

    addOrEditData(dataType: string, dataPointName: any, highlightedId?: number | null) {
        let { editDataPoint, fileId } = this.props;
        editDataPoint(fileId, dataType, dataPointName, highlightedId);
    }

    addOrEditTags(natureTagId: number, typeTagId: number, othersTagId: number[], toBeEdited: string) {
        this.addOrEditData(toBeEdited + ':Nature', natureTagId);
        this.addOrEditData(toBeEdited + ':Type', typeTagId);
        this.addOrEditData(toBeEdited + ':Others', othersTagId);
    }
}
