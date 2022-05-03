import { FileHierarchy } from "../../DocumentLibrary/State/documentLibraryState";
import NumberLoader from "../../UniversalComponents/Loader/number";


export default interface DocumentState {
    sentenceData: SentencesData;
    sentenceLoader: boolean;
    insightsData: InsightsInterface[];
    tagType: TagData[];
    tagNature: TagData[];
    otherTags: TagData[];
    editLoader: boolean;
    newTagData: TagData;
    storedOtherTags: any;
    insightsLoader: boolean;
    dataPointName: string;
    highlightedId: number[] | null;
    editOptionSelection: boolean;
    storedBiPointDataModes: BiPointDataMode[];
    savedHighlightedSentences: sentenceInfo[] | null;
    savedHighlightedPhrases: phraseInfo[] | null;
    phraseEditOptionSelected: boolean;
    phraseInDeleteMode: phraseInfo | null;
    phraseDeleteStatus: boolean;  
    phraseInAddMode: phraseInfo | null;
    phraseAddStatus: boolean;
    savedHighlightedTableCells: tableInfo[] | null;
    savedHighlightedDates: dateInfo[] | null;
    dateInAddEditMode: dateInfo | null;
    dateEditingStatus: boolean;
    savedEvents: EventData[]; 
    newEventData: EventData;
    savedHighlightedEvents: eventInfo[] | null;
    eventInAddEdit: eventInfo | null;
    eventEditingStatus: boolean;
    documentTree: FileHierarchy;
    clauseModeStatus: boolean;
    insightToDelete: any;
    childLabelToDelete: string;
    otherTagsLoader: boolean;
    durationList: DurationType[];
    currencyList: CurrencyType[];
}

export interface SentencesData {
    fileId: number;
    hierarchy: Hierarchy[];
}

export interface Hierarchy {
    index: number;
    bullet: string;
    heading: string;
    isLease: string;
    isHeading: string;
    sentences: Sentences[];
    analytics?: Analytics[];
    table: Table[];
}

export interface TableContainer {
    Table: Table[];
    index: number;
}

export interface Table {
    Row: Row[];
}

export interface Row {
    Content: string;
}
export interface Sentences {
    index: number;
    words: Words[];
    level: string;
}

export interface Words {
    word: string;
    index: number;
    analytics?: Analytics[];
}
export interface Analytics {
    key: string;
    paraid: number;
}

export interface QuickIntel {
    fileName: string;
    metaData: MetaData[];
}

export interface MetaData {
    label: string;
    value: any;
}

export interface InsightsInterface {
    label: string;
    children: Children[];
    dataPoints: DataPoints[];
}

export interface Children {
    childLabel: string;
    childAlias: string;
    childValue: Child[];
    parentDataPoints?: ParentClauseDataPoint;
}

export interface Child {
    name: string;
    dataPoints: DataPoints;
}

export interface DataPoints {
    paraId: number;
    startSentenceId: number;
    endSentenceId: number;
    startWordId: number;
    endWordId: number;
    rowId: number;
    columnId:number;
    highlightedText: string;
    definedWord: string;
    groupedBiData: Children[];
} 

export interface TagRequestStructure {
    tagType: string;
    tagName: string;
}

export interface TagData {
    name: string;
    id: number;
}

export interface PartyData {
    partyName: string;
    partyType: string;
    mode: string;
}

export interface LinkParagraphRequest {
    data: string;
    paraId?: number[] | null;
    mode: string;
}

export interface LinkParaRequest {
    data: string;
    editedParas?: editedParas,
    mode: string;
}

export interface editedParas {
    upsert: paraInfo[];
    deleted: paraInfo[];
    bi: string;
}

export interface paraInfo {
    paraId: number;
    rowId: number | null;
    columnId: number | null;
}

export interface BiPointDataMode {
    biDataPointName: string;
    isDataOriginal: boolean;
}

export interface LinkSentenceRequest {
    data?: string;
    editedSentences?: editedSentences;
    mode: string;
    bi?: string;
}

export interface editedSentences{
    upsert: sentenceInfo[];
    deleted: sentenceInfo[];
    bi?: string;
    dataFor?: string; //Consent Clause, Consent Regulatory, Consent Authority 
}

export interface sentenceInfo {
    paraId: number | null;
    sentenceId: number | null;
    rowId: number | null;
    columnId: number | null; 
    startWordId?: number;
    endWordId?: number;
    phrase?: string; //Consent Clause, General Definitions
    typestring?: string; //Consent Clause
    requirement?: boolean; //Subletting/Assignment Notice Info, Subletting/Assignment Consent Info
    bi?: string; //Subletting/Assignment Notice Info, Subletting/Assignment Consent Info
}


export interface editedPhrases {
    upsert: phraseInfo[];
    deleted: phraseInfo[];
    bi: string;
}

export interface phraseInfo {
    paraId: number;
    startWordId: number;
    endWordId: number;
    startSentenceId: number | null;
    endSentenceId: number | null;
    rowId: number | null;
    columnId: number | null;
    phrase: string;
    definedword?: string; //General Definitions
    durationValue?: number;
    durationTypeId?: number;
    total?: number;
    currency_typeid?: number;
}

export interface LinkPhraseRequest {
    editedPhrases: editedPhrases;
    mode: string;
}

export interface tableInfo {
    paraId: number;
    rowId: number;
    columnId: number; 
    definedword?: string; //General Definitions
    startWordId?: number;
    endWordId?: number;
    phrase?: string; //Consent Clause, General Definitions
    typestring?: string; //Consent Clause
    requirement?: boolean; //Subletting/Assignment Notice Info, Subletting/Assignment Consent Info
    bi?: string; //Subletting/Assignment Notice Info, Subletting/Assignment Consent Info
}

export interface durationInfo {
    phrase: string;
    paraId: number;
    rowId: number;
    columnId: number;
}

export interface editedDuration {
    upsert: durationInfo[];
    deleted: durationInfo[];
}

export interface LinkDurationRequest {
    data: string;
    editedParas?: editedDuration;
    mode: string;
}

export interface dateInfo {
    dateId: number;
    phrase: string;
    paraId: number | null;
    rowId: number | null;
    columnId: number | null;
    duration_value?: number;
    duration_typeid?: number;
}

export interface editedDates {
    upsert: dateInfo[];
    deleted: dateInfo[];
    bi: string;
}

export interface LinkDateRequest {
    data: string;
    editedDates: editedDates;
    mode: string;
}

export interface EventData {
    eventId: number;
    eventName: string;
}

export interface eventInfo {
    eventHighlightId: number;
    eventId: number;
    eventName: string;
    paraId: number;
    sentenceId: number;
    startWordId: number;
    endWordId: number;
    rowId: number;
    columnId: number;
    phrase: string;
}

export interface editedEvent{
    upsert: eventInfo[];
    deleted: eventInfo[];
    bi: string;
}

export interface LinkEventRequest {
    editedEvents: editedEvent;
    mode: string;
}

export interface ParentClauseDataPoint {
    paraId: number;
    sentenceId: number;
    rowId: number;
    columnId: number;
    typeString?: string;
}

export interface currencyInfoData {
    data: currencyInfo
}

export interface currencyInfo {
    currencyTypeId: number;
    currencyName: string;
    currencyType: string;
}

export interface DurationType {
    durationTypeId: number;
    durationName: string;
    durationType: string;
}

export interface CurrencyType {
    currencyTypeId: number;
    currencyName: string;
    currencyType: string;
}

export function defaultDocumentState(): DocumentState {
    return {
        sentenceData: {
            fileId: -1,
            hierarchy: []
        },
        insightsData: [],
        sentenceLoader: false,
        tagNature: [],
        tagType: [],
        otherTags: [],
        editLoader: false,
        newTagData: {
            name: '',
            id: -1
        },
        storedOtherTags: {},
        insightsLoader: false,
        dataPointName: '',
        highlightedId: null,
        editOptionSelection: false,
        storedBiPointDataModes: [],
        savedHighlightedSentences: null,
        savedHighlightedPhrases: null,
        phraseEditOptionSelected: false,
        phraseInDeleteMode: null,
        phraseDeleteStatus: false,  
        phraseInAddMode: null,
        phraseAddStatus: false,
        savedHighlightedTableCells: null,
        savedHighlightedDates: null,
        dateInAddEditMode: null,
        dateEditingStatus: false,
        savedEvents: [],
        newEventData: {
            eventName: '',
            eventId: -1
        },
        savedHighlightedEvents: [],
        eventInAddEdit: null,
        eventEditingStatus: false,
        documentTree: { fileID: -1, fileName: '', levelID: -1, children: [] },
        clauseModeStatus: false,
        insightToDelete: null,
        childLabelToDelete: '',
        otherTagsLoader: false,
        durationList: [],
        currencyList: []
    };
}
