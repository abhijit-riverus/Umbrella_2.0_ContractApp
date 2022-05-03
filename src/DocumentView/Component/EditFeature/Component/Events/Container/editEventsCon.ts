import { connect } from "react-redux";
import { StoreTree } from "../../../../../../Utils/MainReducer/mainReducer";
import DocumentActionGenerator from "../../../../../Actions/Gen";
import { eventInfo, phraseInfo } from "../../../../../State/documentState";
import EditEvents from "../editEvents";



export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        savedHighlightedPhrases: appState.document.savedHighlightedPhrases,
        phraseEditOptionSelected: appState.document.phraseEditOptionSelected,
        phraseInDeleteMode: appState.document.phraseInDeleteMode,
        phraseDeleteStatus: appState.document.phraseDeleteStatus,
        phraseInAddMode: appState.document.phraseInAddMode,
        phraseAddStatus: appState.document.phraseAddStatus,
        savedEvents: appState.document.savedEvents,
        newEventData: appState.document.newEventData,
        savedHighlightedEvents: appState.document.savedHighlightedEvents,
        eventInAddEdit: appState.document.eventInAddEdit,
        eventEditingStatus: appState.document.eventEditingStatus
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        saveHighlightedPhrases: (savedHighlightedPhrases: phraseInfo[] | null) => dispatch(DocumentActionGenerator.saveHighlightedPhrases(savedHighlightedPhrases)),
        savePhraseEditOption: (phraseEditOptionSelected: boolean) => dispatch(DocumentActionGenerator.saveEditPhraseOption(phraseEditOptionSelected)),
        saveDeletePhrase: (phraseInDeleteMode: phraseInfo | null, phraseDeleteStatus: boolean) => dispatch(DocumentActionGenerator.saveDeletePhrase(phraseInDeleteMode, phraseDeleteStatus)),
        saveAddPhrase: (phraseInAddMode: phraseInfo | null, phraseAddStatus: boolean) => dispatch(DocumentActionGenerator.saveAddPhrase(phraseInAddMode,phraseAddStatus)),
        saveDateEditingStatus: (dateEditingStatus: boolean ) => dispatch (DocumentActionGenerator.saveDateEditingStatus(dateEditingStatus)),
        listEvents: (event: string) => dispatch(DocumentActionGenerator.listEvents(event)),
        createNewEvent: (name: string, eventPoint: string) => dispatch(DocumentActionGenerator.createNewEvent(name, eventPoint)),
        saveHighlightedEvents: (savedHighlightedEvents: eventInfo[] | null) => dispatch(DocumentActionGenerator.saveHighlightedEvents(savedHighlightedEvents)),
        saveEventInAddEdit: (eventInAddEdit: eventInfo | null) => dispatch(DocumentActionGenerator.saveEventInAddEdit(eventInAddEdit)),
        saveEventEditingStatus: (eventEditingStatus: boolean) => dispatch(DocumentActionGenerator.saveEventEditingStatus(eventEditingStatus)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvents);