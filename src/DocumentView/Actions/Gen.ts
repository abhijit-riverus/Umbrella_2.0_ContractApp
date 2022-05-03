import {
    GetSentences,
    GETSENTENCES,
    GetSentencesSuccess,
    GETSENTENCES_SUCCESS,
    GetSentencesFailure,
    GETSENTENCES_FAILURE,
    GetInsightsSuccess,
    GETINSIGHTS,
    GetInsights,
    GETINSIGHTS_SUCCESS,
    GetInsightsFailure,
    GETINSIGHTS_FAILURE,
    EditDataPoint,
    EDITDATAPOINT,
    REQUESTTAGS_SUCCESS,
    RequestTagsSuccess,
    REQUESTTAGS,
    RequestTags,
    ListTagNature,
    LISTTAGNATURE,
    LISTTAGNATURE_SUCCESS,
    ListTagNatureSuccess,
    ListTagType,
    LISTTAGTYPE,
    ListTagTypeSuccess,
    LISTTAGTYPE_SUCCESS,
    ListOtherTags,
    ListOtherTagsSuccess,
    LISTOTHERTAGS,
    LISTOTHERTAGS_SUCCESS,
    EDITDATAPOINT_SUCCESS,
    EditDataPointSuccess,
    CreateOtherTags,
    CREATEOTHERTAGS,
    CREATEOTHERTAGS_SUCCESS,
    CreateOtherTagsSuccess,
    StoreOtherTags,
    STOREOTHERTAGS,
    SaveHighlightedDataPoint,
    SAVEHIGHLIGHTEDDATAPOINT,
    SAVEHIGHLIGHTEDID,
    SaveHighlightedId,
    SAVEBIPOINTDATAMODE,
    SaveBiPointDataMode,
    SAVEHIGHLIGHTEDSENTENCES,
    SaveHighlightedSentences,
    SAVEHIGHLIGHTEDPHRASES,
    SaveHighlightedPhrases,
    SAVEEDITPHRASEOPTION,
    SaveEditPhraseOption,
    SAVEDELETEPHRASE,
    SaveDeletePhrase,
    SaveAddPhrase,
    SAVEADDPHRASE,
    SAVEHIGHLIGHTEDTABLECELLS,
    SaveHighlightedTableCells,
    SaveHighlightedDates,
    SAVEHIGHLIGHTEDDATES,
    SAVEDATEINADDEDITMODE,
    SaveDateInAddEditMode,
    SAVEDATEEDITINGSTATUS,
    SaveDateEditingStatus,
    LISTEVENTS,
    ListEvents,
    CREATENEWEVENT_SUCCESS,
    CreateNewEventSuccess,
    CREATENEWEVENT,
    CreateNewEvent,
    ListEventsSuccess,
    LISTEVENTS_SUCCESS,
    SAVEEVENTEDITINGSTATUS,
    SaveEventEditingStatus,
    SAVEEVENTINADDEDIT,
    SaveEventInAddEdit,
    SAVEHIGHLIGHTEDEVENTS,
    SaveHighlightedEvents,
    GetDocumentTree,
    GetDocumentTreeSuccess,
    GETDOCUMENTTREE,
    GETDOCUMENTTREE_SUCCESS,
    GETDOCUMENTTREE_FAILURE,
    GetDocumentTreeFailure,
    SAVEDOCUMENTTREE,
    SaveDocumentTree,
    SaveClauseModeStatus,
    SAVECLAUSEMODESTATUS,
    SAVEINSIGHTTODELETE,
    SaveInsightToDelete,
    GetDurationTypes,
    GETDURATIONTYPES,
    GETDURATIONTYPES_SUCCESS,
    GetDurationTypesSuccess,
    GETDURATIONTYPES_FAILURE,
    GetDurationTypesFailure,
    GETCURRENCYTYPES,
    GetCurrencyTypes,
    GetCurrencyTypesSuccess,
    GETCURRENCYTYPES_SUCCESS,
    GetCurrencyTypesFailure,
    GETCURRENCYTYPES_FAILURE,
} from './def';
import {
    SentencesData,
    InsightsInterface,
    TagRequestStructure,
    TagData,
    BiPointDataMode,
    sentenceInfo,
    phraseInfo,
    tableInfo,
    durationInfo,
    dateInfo,
    EventData,
    eventInfo,
    DurationType,
    CurrencyType,
} from '../State/documentState';
import { FileHierarchy } from '../../DocumentLibrary/State/documentLibraryState';

export default class DocumentActionGenerator {
    public static saveHighlightedId(highlightedId: number[] | null): SaveHighlightedId {
        return {
            type: SAVEHIGHLIGHTEDID,
            payload: {
                highlightedId: highlightedId,
            },
        };
    }
    public static saveHighlightedDataPoint(
        dataPointName: string,
        editOptionSelection: boolean,
    ): SaveHighlightedDataPoint {
        return {
            type: SAVEHIGHLIGHTEDDATAPOINT,
            payload: {
                dataPointName: dataPointName,
                editOptionSelection: editOptionSelection,
            },
        };
    }
    public static getSentences(fileId: number): GetSentences {
        return {
            type: GETSENTENCES,
            payload: {
                fileId: fileId,
            },
        };
    }
    public static getSentencesSuccess(sentenceData: SentencesData): GetSentencesSuccess {
        return {
            type: GETSENTENCES_SUCCESS,
            payload: {
                sentenceData: sentenceData,
            },
        };
    }
    public static getSentencesFailure(): GetSentencesFailure {
        return {
            type: GETSENTENCES_FAILURE,
        };
    }
    public static getInsights(fileId: number): GetInsights {
        return {
            type: GETINSIGHTS,
            payload: {
                fileId: fileId,
            },
        };
    }
    public static getInsightsSuccess(insightsData: InsightsInterface[]): GetInsightsSuccess {
        return {
            type: GETINSIGHTS_SUCCESS,
            payload: {
                insightsData: insightsData,
            },
        };
    }
    public static getInsightsFailure(): GetInsightsFailure {
        return {
            type: GETINSIGHTS_FAILURE,
        };
    }
    public static editDataPoint(
        fileId: number,
        dataType: string,
        dataPointName: any,
        highlightedId?: number | null,
    ): EditDataPoint {
        return {
            type: EDITDATAPOINT,
            payload: {
                fileId: fileId,
                dataType: dataType,
                dataPointName: dataPointName,
                highlightedId: highlightedId,
            },
        };
    }
    public static editDataPointSuccess(): EditDataPointSuccess {
        return {
            type: EDITDATAPOINT_SUCCESS,
        };
    }
    public static requestTags(tagList: TagRequestStructure[], comment: string): RequestTags {
        return {
            type: REQUESTTAGS,
            payload: {
                tagList: tagList,
                comment: comment,
            },
        };
    }
    public static requestTagsSuccess(): RequestTagsSuccess {
        return {
            type: REQUESTTAGS_SUCCESS,
        };
    }
    public static listTagNature(): ListTagNature {
        return {
            type: LISTTAGNATURE,
        };
    }
    public static listTagNatureSuccess(tagNature: TagData[]): ListTagNatureSuccess {
        return {
            type: LISTTAGNATURE_SUCCESS,
            payload: {
                tagNature: tagNature,
            },
        };
    }
    public static listTagType(): ListTagType {
        return {
            type: LISTTAGTYPE,
        };
    }
    public static listTagTypeSuccess(tagType: TagData[]): ListTagTypeSuccess {
        return {
            type: LISTTAGTYPE_SUCCESS,
            payload: {
                tagType: tagType,
            },
        };
    }
    public static listOtherTags(): ListOtherTags {
        return {
            type: LISTOTHERTAGS,
        };
    }
    public static listOtherTagsSuccess(otherTags: TagData[]): ListOtherTagsSuccess {
        return {
            type: LISTOTHERTAGS_SUCCESS,
            payload: {
                otherTags: otherTags,
            },
        };
    }
    public static createOtherTags(name: string): CreateOtherTags {
        return {
            type: CREATEOTHERTAGS,
            payload: {
                name: name,
            },
        };
    }
    public static createOtherTagsSuccess(newTagData: TagData): CreateOtherTagsSuccess {
        return {
            type: CREATEOTHERTAGS_SUCCESS,
            payload: {
                newTagData: newTagData,
            },
        };
    }
    public static storeOtherTags(storedOtherTags: any): StoreOtherTags {
        return {
            type: STOREOTHERTAGS,
            payload: {
                storedOtherTags: storedOtherTags,
            },
        };
    }
    public static saveBiPointDataMode(storedBiPointDataModes: BiPointDataMode[]): SaveBiPointDataMode {
        return {
            type: SAVEBIPOINTDATAMODE,
            payload: {
                storedBiPointDataModes: storedBiPointDataModes,
            },
        };
    }
    public static saveHighlightedSentences(savedHighlightedSentences: sentenceInfo[] | null): SaveHighlightedSentences {
        return {
            type: SAVEHIGHLIGHTEDSENTENCES,
            payload: {
                savedHighlightedSentences: savedHighlightedSentences,
            },
        };
    }
    public static saveHighlightedPhrases(savedHighlightedPhrases: phraseInfo[] | null): SaveHighlightedPhrases {
        return {
            type: SAVEHIGHLIGHTEDPHRASES,
            payload: {
                savedHighlightedPhrases: savedHighlightedPhrases,
            },
        };
    }
    public static saveEditPhraseOption(phraseEditOptionSelected: boolean): SaveEditPhraseOption {
        return {
            type: SAVEEDITPHRASEOPTION,
            payload: {
                phraseEditOptionSelected: phraseEditOptionSelected,
            },
        };
    }
    public static saveDeletePhrase(
        phraseInDeleteMode: phraseInfo | null,
        phraseDeleteStatus: boolean,
    ): SaveDeletePhrase {
        return {
            type: SAVEDELETEPHRASE,
            payload: {
                phraseInDeleteMode: phraseInDeleteMode,
                phraseDeleteStatus: phraseDeleteStatus,
            },
        };
    }
    public static saveAddPhrase(phraseInAddMode: phraseInfo | null, phraseAddStatus: boolean): SaveAddPhrase {
        return {
            type: SAVEADDPHRASE,
            payload: {
                phraseInAddMode: phraseInAddMode,
                phraseAddStatus: phraseAddStatus,
            },
        };
    }
    public static saveHighlightedTableCells(savedHighlightedTableCells: tableInfo[] | null): SaveHighlightedTableCells {
        return {
            type: SAVEHIGHLIGHTEDTABLECELLS,
            payload: {
                savedHighlightedTableCells: savedHighlightedTableCells,
            },
        };
    }
    public static saveHighlightedDates(savedHighlightedDates: dateInfo[] | null): SaveHighlightedDates {
        return {
            type: SAVEHIGHLIGHTEDDATES,
            payload: {
                savedHighlightedDates: savedHighlightedDates,
            },
        };
    }
    public static saveDateInAddEditMode(dateInAddEditMode: dateInfo | null): SaveDateInAddEditMode {
        return {
            type: SAVEDATEINADDEDITMODE,
            payload: {
                dateInAddEditMode: dateInAddEditMode,
            },
        };
    }
    public static saveDateEditingStatus(dateEditingStatus: boolean): SaveDateEditingStatus {
        return {
            type: SAVEDATEEDITINGSTATUS,
            payload: {
                dateEditingStatus: dateEditingStatus,
            },
        };
    }
    public static listEvents(event: string): ListEvents {
        return {
            type: LISTEVENTS,
            payload: {
                event: event,
            },
        };
    }
    public static listEventsSuccess(savedEvents: EventData[]): ListEventsSuccess {
        return {
            type: LISTEVENTS_SUCCESS,
            payload: {
                savedEvents: savedEvents,
            },
        };
    }
    public static createNewEvent(name: string, eventPoint: string): CreateNewEvent {
        return {
            type: CREATENEWEVENT,
            payload: {
                name: name,
                eventPoint: eventPoint,
            },
        };
    }
    public static createNewEventSuccess(newEventData: EventData): CreateNewEventSuccess {
        return {
            type: CREATENEWEVENT_SUCCESS,
            payload: {
                newEventData: newEventData,
            },
        };
    }
    public static saveHighlightedEvents(savedHighlightedEvents: eventInfo[] | null): SaveHighlightedEvents {
        return {
            type: SAVEHIGHLIGHTEDEVENTS,
            payload: {
                savedHighlightedEvents: savedHighlightedEvents,
            },
        };
    }
    public static saveEventInAddEdit(eventInAddEdit: eventInfo | null): SaveEventInAddEdit {
        return {
            type: SAVEEVENTINADDEDIT,
            payload: {
                eventInAddEdit: eventInAddEdit,
            },
        };
    }
    public static saveEventEditingStatus(eventEditingStatus: boolean): SaveEventEditingStatus {
        return {
            type: SAVEEVENTEDITINGSTATUS,
            payload: {
                eventEditingStatus: eventEditingStatus,
            },
        };
    }
    public static getDocumentTree(fileID: number): GetDocumentTree {
        return {
            type: GETDOCUMENTTREE,
            payload: {
                fileID: fileID,
            },
        };
    }
    public static getDocumentTreeSuccess(documentTree: FileHierarchy): GetDocumentTreeSuccess {
        return {
            type: GETDOCUMENTTREE_SUCCESS,
            payload: {
                documentTree: documentTree,
            },
        };
    }
    public static getDocumentTreeFailure(): GetDocumentTreeFailure {
        return {
            type: GETDOCUMENTTREE_FAILURE,
        };
    }
    public static saveDocumentTree(documentTree: FileHierarchy): SaveDocumentTree {
        return {
            type: SAVEDOCUMENTTREE,
            payload: {
                documentTree: documentTree,
            },
        };
    }
    public static saveClauseModeStatus(clauseModeStatus: boolean): SaveClauseModeStatus {
        return {
            type: SAVECLAUSEMODESTATUS,
            payload: {
                clauseModeStatus: clauseModeStatus,
            },
        };
    }
    public static saveInsightToDelete(insightToDelete: any, childLabelToDelete: string): SaveInsightToDelete {
        return {
            type: SAVEINSIGHTTODELETE,
            payload: {
                insightToDelete: insightToDelete,
                childLabelToDelete: childLabelToDelete,
            },
        };
    }
    public static getDurationTypes(): GetDurationTypes {
        return {
            type: GETDURATIONTYPES,
        };
    }
    public static getDurationTypesSuccess(durationList: DurationType[]): GetDurationTypesSuccess {
        return {
            type: GETDURATIONTYPES_SUCCESS,
            payload: {
                durationList: durationList,
            },
        };
    }
    public static getDurationTypesFailure(): GetDurationTypesFailure {
        return {
            type: GETDURATIONTYPES_FAILURE,
        };
    }
    public static getCurrencyTypes(): GetCurrencyTypes {
        return {
            type: GETCURRENCYTYPES,
        };
    }
    public static getCurrencyTypesSuccess(currencyList: CurrencyType[]): GetCurrencyTypesSuccess {
        return {
            type: GETCURRENCYTYPES_SUCCESS,
            payload: {
                currencyList: currencyList,
            },
        };
    }
    public static getCurrencyTypesFailure(): GetCurrencyTypesFailure {
        return {
            type: GETCURRENCYTYPES_FAILURE,
        };
    }
}
