import { FileHierarchy } from '../../DocumentLibrary/State/documentLibraryState';
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

export const GETSENTENCES = 'GETSENTENCES';
export type GETSENTENCES = typeof GETSENTENCES;
export const GETSENTENCES_SUCCESS = 'GETSENTENCES_SUCCESS';
export type GETSENTENCES_SUCCESS = typeof GETSENTENCES_SUCCESS;
export const GETSENTENCES_FAILURE = 'GETSENTENCES_FAILURE';
export type GETSENTENCES_FAILURE = typeof GETSENTENCES_FAILURE;

export const GETINSIGHTS = 'GETINSIGHTS';
export type GETINSIGHTS = typeof GETINSIGHTS;
export const GETINSIGHTS_SUCCESS = 'GETINSIGHTS_SUCCESS';
export type GETINSIGHTS_SUCCESS = typeof GETINSIGHTS_SUCCESS;
export const GETINSIGHTS_FAILURE = 'GETINSIGHTS_FAILURE';
export type GETINSIGHTS_FAILURE = typeof GETINSIGHTS_FAILURE;

export const EDITDATAPOINT = 'EDITDATAPOINT';
export type EDITDATAPOINT = typeof EDITDATAPOINT;
export const EDITDATAPOINT_SUCCESS = 'EDITDATAPOINT_SUCCESS';
export type EDITDATAPOINT_SUCCESS = typeof EDITDATAPOINT_SUCCESS;

export const REQUESTTAGS = 'REQUESTTAGS';
export type REQUESTTAGS = typeof REQUESTTAGS;
export const REQUESTTAGS_SUCCESS = 'REQUESTTAGS_SUCCESS';
export type REQUESTTAGS_SUCCESS = typeof REQUESTTAGS_SUCCESS;

export const LISTTAGNATURE = 'LISTTAGNATURE';
export type LISTTAGNATURE = typeof LISTTAGNATURE;
export const LISTTAGNATURE_SUCCESS = 'LISTTAGNATURE_SUCCESS';
export type LISTTAGNATURE_SUCCESS = typeof LISTTAGNATURE_SUCCESS;

export const LISTTAGTYPE = 'LISTTAGTYPE';
export type LISTTAGTYPE = typeof LISTTAGTYPE;
export const LISTTAGTYPE_SUCCESS = 'LISTTAGTYPE_SUCCESS';
export type LISTTAGTYPE_SUCCESS = typeof LISTTAGTYPE_SUCCESS;

export const LISTOTHERTAGS = 'LISTOTHERTAGS';
export type LISTOTHERTAGS = typeof LISTOTHERTAGS;
export const LISTOTHERTAGS_SUCCESS = 'LISTOTHERTAGS_SUCCESS';
export type LISTOTHERTAGS_SUCCESS = typeof LISTOTHERTAGS_SUCCESS;

export const CREATEOTHERTAGS = 'CREATEOTHERTAGS';
export type CREATEOTHERTAGS = typeof CREATEOTHERTAGS;
export const CREATEOTHERTAGS_SUCCESS = 'CREATEOTHERTAGS_SUCCESS';
export type CREATEOTHERTAGS_SUCCESS = typeof CREATEOTHERTAGS_SUCCESS;

export const STOREOTHERTAGS = 'STOREOTHERTAGS';
export type STOREOTHERTAGS = typeof STOREOTHERTAGS;

export const SAVEHIGHLIGHTS = 'SAVEHIGHLIGHTS';
export type SAVEHIGHLIGHTS = typeof SAVEHIGHLIGHTS;

export const SAVEHIGHLIGHTEDDATAPOINT = 'SAVEHIGHLIGHTEDDATAPOINT';
export type SAVEHIGHLIGHTEDDATAPOINT = typeof SAVEHIGHLIGHTEDDATAPOINT;

export const SAVEHIGHLIGHTEDID = 'SAVEHIGHLIGHTEDID';
export type SAVEHIGHLIGHTEDID = typeof SAVEHIGHLIGHTEDID;

export const SAVEBIPOINTDATAMODE = 'SAVEBIPOINTDATAMODE';
export type SAVEBIPOINTDATAMODE = typeof SAVEBIPOINTDATAMODE;

export const SAVEHIGHLIGHTEDSENTENCES = 'SAVEHIGHLIGHTEDSENTENCES';
export type SAVEHIGHLIGHTEDSENTENCES = typeof SAVEHIGHLIGHTEDSENTENCES;

export const SAVEHIGHLIGHTEDPHRASES = 'SAVEHIGHLIGHTEDPHRASES';
export type SAVEHIGHLIGHTEDPHRASES = typeof SAVEHIGHLIGHTEDPHRASES;

export const SAVEEDITPHRASEOPTION = 'SAVEEDITPHRASEOPTION'; //used for adding phrase
export type SAVEEDITPHRASEOPTION = typeof SAVEEDITPHRASEOPTION;

export const SAVEDELETEPHRASE = 'SAVEDELETEPHRASE';
export type SAVEDELETEPHRASE = typeof SAVEDELETEPHRASE;

export const SAVEADDPHRASE = 'SAVEADDPHRASE';
export type SAVEADDPHRASE = 'SAVEADDPHRASE';

export const SAVEHIGHLIGHTEDTABLECELLS = 'SAVEHIGHLIGHTEDTABLECELLS';
export type SAVEHIGHLIGHTEDTABLECELLS = typeof SAVEHIGHLIGHTEDTABLECELLS;

export const SAVEHIGHLIGHTEDDATES = 'SAVEHIGHLIGHTEDDATES';
export type SAVEHIGHLIGHTEDDATES = typeof SAVEHIGHLIGHTEDDATES;

export const SAVEDATEINADDEDITMODE = 'SAVEDATEINADDEDITMODE';
export type SAVEDATEINADDEDITMODE = typeof SAVEDATEINADDEDITMODE;

export const SAVEDATEEDITINGSTATUS = 'SAVEDATEINEDITINGSTATUS';
export type SAVEDATEEDITINGSTATUS = typeof SAVEDATEEDITINGSTATUS;

export const LISTEVENTS = 'LISTEVENTS';
export type LISTEVENTS = typeof LISTEVENTS;
export const LISTEVENTS_SUCCESS = 'LISTEVENTS_SUCCESS';
export type LISTEVENTS_SUCCESS = typeof LISTEVENTS_SUCCESS;

export const CREATENEWEVENT = 'CREATENEWEVENT';
export type CREATENEWEVENT = typeof CREATENEWEVENT;
export const CREATENEWEVENT_SUCCESS = 'CREATENEWEVENT_SUCCESS';
export type CREATENEWEVENT_SUCCESS = typeof CREATENEWEVENT_SUCCESS;

export const SAVEHIGHLIGHTEDEVENTS = 'SAVEHIGHLIGHTEDEVENTS';
export type SAVEHIGHLIGHTEDEVENTS = typeof SAVEHIGHLIGHTEDEVENTS;

export const SAVEEVENTINADDEDIT = 'SAVEEVENTINADDEDIT';
export type SAVEEVENTINADDEDIT = typeof SAVEEVENTINADDEDIT;

export const SAVEEVENTEDITINGSTATUS = 'SAVEEVENTEDITINGSTATUS';
export type SAVEEVENTEDITINGSTATUS = typeof SAVEEVENTEDITINGSTATUS;

export const GETDOCUMENTTREE = 'GETDOCUMENTTREE';
export type GETDOCUMENTTREE = typeof GETDOCUMENTTREE;
export const GETDOCUMENTTREE_SUCCESS = 'GETDOCUMENTTREE_SUCCESS';
export type GETDOCUMENTTREE_SUCCESS = typeof GETDOCUMENTTREE_SUCCESS;
export const GETDOCUMENTTREE_FAILURE = 'GETDOCUMENTTREE_FAILURE';
export type GETDOCUMENTTREE_FAILURE = typeof GETDOCUMENTTREE_FAILURE;

export const SAVEDOCUMENTTREE = 'SAVEDOCUMENTTREE';
export type SAVEDOCUMENTTREE = typeof SAVEDOCUMENTTREE;

export const SAVECLAUSEMODESTATUS = 'SAVECLAUSEMODESTATUS';
export type SAVECLAUSEMODESTATUS = typeof SAVECLAUSEMODESTATUS;

export const SAVEINSIGHTTODELETE = 'SAVEINSIGHTTODELETE';
export type SAVEINSIGHTTODELETE = typeof SAVEINSIGHTTODELETE;

export const GETDURATIONTYPES = 'GETDURATIONTYPES';
export type GETDURATIONTYPES = typeof GETDURATIONTYPES;
export const GETDURATIONTYPES_SUCCESS = 'GETDURATIONTYPES_SUCCESS';
export type GETDURATIONTYPES_SUCCESS = typeof GETDURATIONTYPES_SUCCESS;
export const GETDURATIONTYPES_FAILURE = 'GETDURATIONTYPES_FAILURE';
export type GETDURATIONTYPES_FAILURE = typeof GETDURATIONTYPES_FAILURE;

export const GETCURRENCYTYPES = 'GETCURRENCYTYPES';
export type GETCURRENCYTYPES = typeof GETCURRENCYTYPES;
export const GETCURRENCYTYPES_SUCCESS = 'GETCURRENCYTYPES_SUCCESS';
export type GETCURRENCYTYPES_SUCCESS = typeof GETCURRENCYTYPES_SUCCESS;
export const GETCURRENCYTYPES_FAILURE = 'GETCURRENCYTYPES_FAILURE';
export type GETCURRENCYTYPES_FAILURE = typeof GETCURRENCYTYPES_FAILURE;

export interface SaveHighlightedDataPoint {
    type: SAVEHIGHLIGHTEDDATAPOINT;
    payload: {
        dataPointName: string;
        editOptionSelection: boolean;
    };
}

export interface SaveHighlightedId {
    type: SAVEHIGHLIGHTEDID;
    payload: {
        highlightedId: number[] | null;
    };
}

export interface GetSentences {
    type: GETSENTENCES;
    payload: {
        fileId: number;
    };
}

export interface GetSentencesSuccess {
    type: GETSENTENCES_SUCCESS;
    payload: {
        sentenceData: SentencesData;
    };
}

export interface GetSentencesFailure {
    type: GETSENTENCES_FAILURE;
}

export interface GetInsights {
    type: GETINSIGHTS;
    payload: {
        fileId: number;
    };
}

export interface GetInsightsSuccess {
    type: GETINSIGHTS_SUCCESS;
    payload: {
        insightsData: InsightsInterface[];
    };
}

export interface GetInsightsFailure {
    type: GETINSIGHTS_FAILURE;
}

export interface EditDataPoint {
    type: EDITDATAPOINT;
    payload: {
        fileId: number;
        dataType: string;
        dataPointName: any;
        highlightedId?: number | null;
    };
}

export interface EditDataPointSuccess {
    type: EDITDATAPOINT_SUCCESS;
}

export interface RequestTags {
    type: REQUESTTAGS;
    payload: {
        tagList: TagRequestStructure[];
        comment: string;
    };
}

export interface RequestTagsSuccess {
    type: REQUESTTAGS_SUCCESS;
}

export interface ListTagNature {
    type: LISTTAGNATURE;
}

export interface ListTagNatureSuccess {
    type: LISTTAGNATURE_SUCCESS;
    payload: {
        tagNature: TagData[];
    };
}

export interface ListTagType {
    type: LISTTAGTYPE;
}

export interface ListTagTypeSuccess {
    type: LISTTAGTYPE_SUCCESS;
    payload: {
        tagType: TagData[];
    };
}
export interface ListOtherTags {
    type: LISTOTHERTAGS;
}
export interface ListOtherTagsSuccess {
    type: LISTOTHERTAGS_SUCCESS;
    payload: {
        otherTags: TagData[];
    };
}
export interface CreateOtherTags {
    type: CREATEOTHERTAGS;
    payload: {
        name: string;
    };
}
export interface CreateOtherTagsSuccess {
    type: CREATEOTHERTAGS_SUCCESS;
    payload: {
        newTagData: TagData;
    };
}
export interface StoreOtherTags {
    type: STOREOTHERTAGS;
    payload: {
        storedOtherTags: any;
    };
}
export interface SaveBiPointDataMode {
    type: SAVEBIPOINTDATAMODE;
    payload: {
        storedBiPointDataModes: BiPointDataMode[];
    };
}
export interface SaveHighlightedSentences {
    type: SAVEHIGHLIGHTEDSENTENCES;
    payload: {
        savedHighlightedSentences: sentenceInfo[] | null;
    };
}
export interface SaveHighlightedPhrases {
    type: SAVEHIGHLIGHTEDPHRASES;
    payload: {
        savedHighlightedPhrases: phraseInfo[] | null;
    };
}
export interface SaveEditPhraseOption {
    type: SAVEEDITPHRASEOPTION;
    payload: {
        phraseEditOptionSelected: boolean;
    };
}

export interface SaveDeletePhrase {
    type: SAVEDELETEPHRASE;
    payload: {
        phraseInDeleteMode: phraseInfo | null;
        phraseDeleteStatus: boolean;
    };
}

export interface SaveAddPhrase {
    type: SAVEADDPHRASE;
    payload: {
        phraseInAddMode: phraseInfo | null;
        phraseAddStatus: boolean;
    };
}

export interface SaveHighlightedTableCells {
    type: SAVEHIGHLIGHTEDTABLECELLS;
    payload: {
        savedHighlightedTableCells: tableInfo[] | null;
    };
}

export interface SaveHighlightedDates {
    type: SAVEHIGHLIGHTEDDATES;
    payload: {
        savedHighlightedDates: dateInfo[] | null;
    };
}

export interface SaveDateInAddEditMode {
    type: SAVEDATEINADDEDITMODE;
    payload: {
        dateInAddEditMode: dateInfo | null;
    };
}

export interface SaveDateEditingStatus {
    type: SAVEDATEEDITINGSTATUS;
    payload: {
        dateEditingStatus: boolean;
    };
}

export interface ListEvents {
    type: LISTEVENTS;
    payload: {
        event: string;
    };
}

export interface ListEventsSuccess {
    type: LISTEVENTS_SUCCESS;
    payload: {
        savedEvents: EventData[];
    };
}

export interface CreateNewEvent {
    type: CREATENEWEVENT;
    payload: {
        name: string;
        eventPoint: string;
    };
}

export interface CreateNewEventSuccess {
    type: CREATENEWEVENT_SUCCESS;
    payload: {
        newEventData: EventData;
    };
}

export interface SaveHighlightedEvents {
    type: SAVEHIGHLIGHTEDEVENTS;
    payload: {
        savedHighlightedEvents: eventInfo[] | null;
    };
}

export interface SaveEventInAddEdit {
    type: SAVEEVENTINADDEDIT;
    payload: {
        eventInAddEdit: eventInfo | null;
    };
}

export interface SaveEventEditingStatus {
    type: SAVEEVENTEDITINGSTATUS;
    payload: {
        eventEditingStatus: boolean;
    };
}

export interface GetDocumentTree {
    type: GETDOCUMENTTREE;
    payload: {
        fileID: number;
    };
}

export interface GetDocumentTreeSuccess {
    type: GETDOCUMENTTREE_SUCCESS;
    payload: {
        documentTree: FileHierarchy;
    };
}

export interface GetDocumentTreeFailure {
    type: GETDOCUMENTTREE_FAILURE;
}

export interface SaveDocumentTree {
    type: SAVEDOCUMENTTREE;
    payload: {
        documentTree: FileHierarchy;
    };
}

export interface SaveClauseModeStatus {
    type: SAVECLAUSEMODESTATUS;
    payload: {
        clauseModeStatus: boolean;
    };
}

export interface SaveInsightToDelete {
    type: SAVEINSIGHTTODELETE;
    payload: {
        insightToDelete: any;
        childLabelToDelete: string;
    };
}

export interface GetDurationTypes {
    type: GETDURATIONTYPES;
}

export interface GetDurationTypesSuccess {
    type: GETDURATIONTYPES_SUCCESS;
    payload: {
        durationList: DurationType[];
    };
}

export interface GetDurationTypesFailure {
    type: GETDURATIONTYPES_FAILURE;
}

export interface GetCurrencyTypes {
    type: GETCURRENCYTYPES;
}

export interface GetCurrencyTypesSuccess {
    type: GETCURRENCYTYPES_SUCCESS;
    payload: {
        currencyList: CurrencyType[];
    };
}

export interface GetCurrencyTypesFailure {
    type: GETCURRENCYTYPES_FAILURE;
}

export type DocumentAction =
    | GetSentences
    | GetSentencesSuccess
    | GetSentencesFailure
    | GetInsights
    | GetInsightsSuccess
    | GetInsightsFailure
    | EditDataPoint
    | EditDataPointSuccess
    | RequestTags
    | RequestTagsSuccess
    | ListTagNature
    | ListTagNatureSuccess
    | ListTagType
    | ListTagTypeSuccess
    | ListOtherTags
    | ListOtherTagsSuccess
    | CreateOtherTags
    | CreateOtherTagsSuccess
    | StoreOtherTags
    | SaveHighlightedId
    | SaveHighlightedDataPoint
    | SaveBiPointDataMode
    | SaveHighlightedSentences
    | SaveHighlightedPhrases
    | SaveEditPhraseOption
    | SaveDeletePhrase
    | SaveAddPhrase
    | SaveHighlightedTableCells
    | SaveHighlightedDates
    | SaveDateInAddEditMode
    | SaveDateEditingStatus
    | ListEvents
    | ListEventsSuccess
    | CreateNewEvent
    | CreateNewEventSuccess
    | SaveHighlightedEvents
    | SaveEventInAddEdit
    | SaveEventEditingStatus
    | GetDocumentTree
    | GetDocumentTreeSuccess
    | GetDocumentTreeFailure
    | SaveDocumentTree
    | SaveClauseModeStatus
    | SaveInsightToDelete
    | GetDurationTypes
    | GetDurationTypesSuccess
    | GetDurationTypesFailure
    | GetCurrencyTypes
    | GetCurrencyTypesSuccess
    | GetCurrencyTypesFailure;
