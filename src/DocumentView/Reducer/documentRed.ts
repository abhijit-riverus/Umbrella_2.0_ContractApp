
import { DocumentAction, GETSENTENCES_SUCCESS, GETINSIGHTS_SUCCESS, GETSENTENCES, EDITDATAPOINT, 
    LISTTAGTYPE_SUCCESS, LISTTAGNATURE_SUCCESS, LISTOTHERTAGS_SUCCESS, EDITDATAPOINT_SUCCESS, 
    CREATEOTHERTAGS_SUCCESS, STOREOTHERTAGS, GETINSIGHTS, SAVEHIGHLIGHTEDID, SAVEHIGHLIGHTEDDATAPOINT,
     SAVEBIPOINTDATAMODE, SAVEHIGHLIGHTEDSENTENCES, SAVEHIGHLIGHTEDPHRASES, SAVEEDITPHRASEOPTION, 
     SAVEDELETEPHRASE, SAVEADDPHRASE, SAVEHIGHLIGHTEDTABLECELLS, SAVEHIGHLIGHTEDDATES, 
     SAVEDATEINADDEDITMODE, SAVEDATEEDITINGSTATUS, LISTEVENTS_SUCCESS, CREATENEWEVENT_SUCCESS, SAVEHIGHLIGHTEDEVENTS, SAVEEVENTINADDEDIT, SAVEEVENTEDITINGSTATUS, GETDOCUMENTTREE_SUCCESS, SAVEDOCUMENTTREE, SAVECLAUSEMODESTATUS, SAVEINSIGHTTODELETE, LISTOTHERTAGS, GETDURATIONTYPES_SUCCESS, GETCURRENCYTYPES_SUCCESS } from "../Actions/def";


import DocumentState, { defaultDocumentState } from "../State/documentState";

export default function documentReducer(state: DocumentState = defaultDocumentState(), action: DocumentAction): DocumentState {
    switch (action.type) {
        case GETSENTENCES: {
            return { ...state, sentenceLoader: true };
        }
        case GETSENTENCES_SUCCESS: {
            return { ...state, sentenceData: action.payload.sentenceData, sentenceLoader: false };
        }
        case GETINSIGHTS: {
            return { ...state, insightsLoader: true };
        }
        case GETINSIGHTS_SUCCESS: {
            return { ...state, insightsData: JSON.parse(JSON.stringify(action.payload.insightsData)), insightsLoader: false };
        }
        case EDITDATAPOINT: {
            return { ...state, editLoader: true };
        }
        case EDITDATAPOINT_SUCCESS: {
            return { ...state, editLoader: false };
        }
        case LISTTAGTYPE_SUCCESS: {
            return { ...state, tagType: action.payload.tagType };
        }
        case LISTTAGNATURE_SUCCESS: {
            return { ...state, tagNature: action.payload.tagNature };
        }
        case LISTOTHERTAGS: {
            return { ...state, otherTagsLoader: true };
        }
        case LISTOTHERTAGS_SUCCESS: {
            return { ...state, otherTags: action.payload.otherTags, otherTagsLoader: false };
        }
        case CREATEOTHERTAGS_SUCCESS: {
            return { ...state, newTagData: action.payload.newTagData };
        }
        case STOREOTHERTAGS: {
            return { ...state, storedOtherTags: action.payload.storedOtherTags };
        }
        case SAVEHIGHLIGHTEDID: {
            return { ...state, highlightedId: action.payload.highlightedId };
        }
        case SAVEHIGHLIGHTEDDATAPOINT: {
            return { ...state, dataPointName: action.payload.dataPointName, editOptionSelection: action.payload.editOptionSelection };
        }
        case SAVEBIPOINTDATAMODE: {
            return { ...state, storedBiPointDataModes: action.payload.storedBiPointDataModes };
        }
        case SAVEHIGHLIGHTEDSENTENCES: {
            return { ...state, savedHighlightedSentences: action.payload.savedHighlightedSentences };
        }
        case SAVEHIGHLIGHTEDPHRASES: {
            return { ...state, savedHighlightedPhrases: action.payload.savedHighlightedPhrases };
        }
        case SAVEEDITPHRASEOPTION: {
            return { ...state, phraseEditOptionSelected: action.payload.phraseEditOptionSelected};
        }
        case SAVEDELETEPHRASE: {
            return { ...state, phraseInDeleteMode: action.payload.phraseInDeleteMode, phraseDeleteStatus: action.payload.phraseDeleteStatus };
        }
        case SAVEADDPHRASE: {
            return { ... state, phraseInAddMode: action.payload.phraseInAddMode, phraseAddStatus: action.payload.phraseAddStatus };
        }
        case SAVEHIGHLIGHTEDTABLECELLS: {
            return { ...state, savedHighlightedTableCells: action.payload.savedHighlightedTableCells };
        }
        case SAVEHIGHLIGHTEDDATES: {
            return { ... state, savedHighlightedDates: action.payload.savedHighlightedDates };
        }
        case SAVEDATEINADDEDITMODE: {
            return { ...state, dateInAddEditMode: action.payload.dateInAddEditMode };
        }
        case SAVEDATEEDITINGSTATUS: {
            return { ...state, dateEditingStatus: action.payload.dateEditingStatus };
        }
        case LISTEVENTS_SUCCESS: {
            return { ...state, savedEvents: action.payload.savedEvents };
        }
        case CREATENEWEVENT_SUCCESS: {
            return { ...state, newEventData: action.payload.newEventData };
        }
        case SAVEHIGHLIGHTEDEVENTS: {
            return { ...state, savedHighlightedEvents: action.payload.savedHighlightedEvents };
        }
        case SAVEEVENTINADDEDIT: {
            return { ...state, eventInAddEdit: action.payload.eventInAddEdit };
        }
        case SAVEEVENTEDITINGSTATUS: {
            return { ...state, eventEditingStatus: action.payload.eventEditingStatus };
        }
        case GETDOCUMENTTREE_SUCCESS: {
            return { ...state, documentTree: action.payload.documentTree };
        }
        case SAVEDOCUMENTTREE: {
            return { ...state, documentTree: action.payload.documentTree };
        }
        case SAVECLAUSEMODESTATUS: {
            return { ...state, clauseModeStatus: action.payload.clauseModeStatus };
        }
        case SAVEINSIGHTTODELETE: {
            return { ...state, insightToDelete: action.payload.insightToDelete, childLabelToDelete: action.payload.childLabelToDelete };
        }
        case GETDURATIONTYPES_SUCCESS: {
            return { ...state, durationList: action.payload.durationList };
        }
        case GETCURRENCYTYPES_SUCCESS: {
            return { ...state, currencyList: action.payload.currencyList };
        }
        default: return state;
    }
}