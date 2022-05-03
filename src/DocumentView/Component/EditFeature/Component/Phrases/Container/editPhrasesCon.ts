import { connect } from "react-redux";
import { StoreTree } from "../../../../../../Utils/MainReducer/mainReducer";
import DocumentActionGenerator from "../../../../../Actions/Gen";
import { phraseInfo } from "../../../../../State/documentState";
import EditPhrases from "../editPhrases";


export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        savedHighlightedPhrases: appState.document.savedHighlightedPhrases,
        phraseEditOptionSelected: appState.document.phraseEditOptionSelected,
        phraseInDeleteMode: appState.document.phraseInDeleteMode,
        phraseDeleteStatus: appState.document.phraseDeleteStatus,
        phraseInAddMode: appState.document.phraseInAddMode,
        phraseAddStatus: appState.document.phraseAddStatus,
    }
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        saveHighlightedPhrases: (savedHighlightedPhrases: phraseInfo[] | null) => dispatch(DocumentActionGenerator.saveHighlightedPhrases(savedHighlightedPhrases)),
        savePhraseEditOption: (phraseEditOptionSelected: boolean) => dispatch(DocumentActionGenerator.saveEditPhraseOption(phraseEditOptionSelected)),
        saveDeletePhrase: (phraseInDeleteMode: phraseInfo | null, phraseDeleteStatus: boolean) => dispatch(DocumentActionGenerator.saveDeletePhrase(phraseInDeleteMode, phraseDeleteStatus)),
        saveAddPhrase: (phraseInAddMode: phraseInfo | null, phraseAddStatus: boolean) => dispatch(DocumentActionGenerator.saveAddPhrase(phraseInAddMode,phraseAddStatus)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPhrases);