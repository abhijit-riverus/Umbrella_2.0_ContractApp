import { connect } from "react-redux";
import SentenceRenderer from "../Component/sentenceRenderer";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import { dateInfo, eventInfo, phraseInfo, sentenceInfo, SentencesData, tableInfo } from "../../../DocumentView/State/documentState";
import DocumentActionGenerator from "../../../DocumentView/Actions/Gen";

interface OwnProps {
    sentenceData: SentencesData;
}
export function mapStateToProps(appState: StoreTree, ownProps: OwnProps) {
    return {
        sentenceData: ownProps.sentenceData,
        dataPointName: appState.document.dataPointName,
        // editOptionSelection: appState.document.editOptionSelection,
        highlightedId: appState.document.highlightedId,
        savedHighlightedSentences: appState.document.savedHighlightedSentences,
        savedHighlightedPhrases: appState.document.savedHighlightedPhrases,
        phraseEditOptionSelected: appState.document.phraseEditOptionSelected,
        phraseInDeleteMode: appState.document.phraseInDeleteMode,
        phraseDeleteStatus: appState.document.phraseDeleteStatus,
        phraseInAddMode: appState.document.phraseInAddMode,
        phraseAddStatus: appState.document.phraseAddStatus,
        savedHighlightedTableCells: appState.document.savedHighlightedTableCells,
        savedHighlightedDates: appState.document.savedHighlightedDates,
        dateInAddEditMode: appState.document.dateInAddEditMode,
        dateEditingStatus: appState.document.dateEditingStatus,
        savedHighlightedEvents: appState.document.savedHighlightedEvents,
        eventInAddEdit: appState.document.eventInAddEdit,
        eventEditingStatus: appState.document.eventEditingStatus,
        insightToDelete: appState.document.insightToDelete,
        childLabelToDelete: appState.document.childLabelToDelete
    }
}
export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        saveHighlightedId: (highlightedId: number[] | null) => dispatch(DocumentActionGenerator.saveHighlightedId(highlightedId)),
        saveHighlightedSentences: (savedHighlightedSentences: sentenceInfo[] | null) => dispatch(DocumentActionGenerator.saveHighlightedSentences(savedHighlightedSentences)),
        saveHighlightedPhrases: (savedHighlightedPhrases: phraseInfo[] | null) => dispatch(DocumentActionGenerator.saveHighlightedPhrases(savedHighlightedPhrases)),
        savePhraseEditOption: (phraseEditOptionSelected: boolean) => dispatch(DocumentActionGenerator.saveEditPhraseOption(phraseEditOptionSelected)),
        saveDeletePhrase: (phraseInDeleteMode: phraseInfo | null, phraseDeleteStatus: boolean) => dispatch(DocumentActionGenerator.saveDeletePhrase(phraseInDeleteMode, phraseDeleteStatus)),
        saveAddPhrase: (phraseInAddMode: phraseInfo | null, phraseAddStatus: boolean) => dispatch(DocumentActionGenerator.saveAddPhrase(phraseInAddMode,phraseAddStatus)),
        saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => dispatch(DocumentActionGenerator.saveHighlightedTableCells(savedHighlightedTableCells)),
        saveHighlightedDates: (savedHighlightedDates: dateInfo[] | null ) => dispatch(DocumentActionGenerator.saveHighlightedDates(savedHighlightedDates)),
        saveDateInAddEditMode: (dateInAddEditMode: dateInfo | null ) => dispatch(DocumentActionGenerator.saveDateInAddEditMode(dateInAddEditMode)),
        saveDateEditingStatus: (dateEditingStatus: boolean ) => dispatch (DocumentActionGenerator.saveDateEditingStatus(dateEditingStatus)),
        saveHighlightedEvents: (savedHighlightedEvents: eventInfo[] | null) => dispatch(DocumentActionGenerator.saveHighlightedEvents(savedHighlightedEvents)),
        saveEventInAddEdit: (eventInAddEdit: eventInfo | null) => dispatch(DocumentActionGenerator.saveEventInAddEdit(eventInAddEdit)),
        saveEventEditingStatus: (eventEditingStatus: boolean) => dispatch(DocumentActionGenerator.saveEventEditingStatus(eventEditingStatus)),
        saveInsightToDelete: (insightToDelete: any, childLabelToDelete: string) => dispatch(DocumentActionGenerator.saveInsightToDelete(insightToDelete, childLabelToDelete))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SentenceRenderer);