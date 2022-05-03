import { connect } from 'react-redux';
import { StoreTree } from '../../../../Utils/MainReducer/mainReducer';
import DocumentActionGenerator from '../../../Actions/Gen';
import { dateInfo, phraseInfo, sentenceInfo, tableInfo } from '../../../State/documentState';
import EditFeature from '../Component/editFeature';

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        tagNature: appState.document.tagNature,
        tagType: appState.document.tagType,
        otherTags: appState.document.otherTags,
        editLoader: appState.document.editLoader,
        insightsLoader: appState.document.insightsLoader,
        newTagData: appState.document.newTagData,
        storedOtherTags: appState.document.storedOtherTags,
        highlightedId: appState.document.highlightedId,
        dataPointName: appState.document.dataPointName,
        savedHighlightedSentences: appState.document.savedHighlightedSentences,
        savedHighlightedTableCells: appState.document.savedHighlightedTableCells,
        savedHighlightedDates: appState.document.savedHighlightedDates,
        dateInAddEditMode: appState.document.dateInAddEditMode,
        dateEditingStatus: appState.document.dateEditingStatus,
        otherTagsLoader: appState.document.otherTagsLoader,
        savedHighlightedPhrases: appState.document.savedHighlightedPhrases,
        phraseEditOptionSelected: appState.document.phraseEditOptionSelected,
        phraseInDeleteMode: appState.document.phraseInDeleteMode,
        phraseDeleteStatus: appState.document.phraseDeleteStatus,
        phraseInAddMode: appState.document.phraseInAddMode,
        phraseAddStatus: appState.document.phraseAddStatus,
    };
}

export function mapDispatchToProps(dispatch: any, ownProps: any) {
    return {
        listTagNature: () => dispatch(DocumentActionGenerator.listTagNature()),
        listTagType: () => dispatch(DocumentActionGenerator.listTagType()),
        listOtherTags: () => dispatch(DocumentActionGenerator.listOtherTags()),
        createOtherTags: (name: string) => dispatch(DocumentActionGenerator.createOtherTags(name)),
        storeOtherTags: (storedOtherTags: any) => dispatch(DocumentActionGenerator.storeOtherTags(storedOtherTags)),
        saveHighlightedDataPoint: (dataPointName: string, editOptionSelection: boolean) =>
            dispatch(DocumentActionGenerator.saveHighlightedDataPoint(dataPointName, editOptionSelection)),
        editDataPoint: (fileId: number, dataType: string, dataPointName: any, highlightedId?: number | null) =>
            dispatch(DocumentActionGenerator.editDataPoint(fileId, dataType, dataPointName, highlightedId)),
        saveHighlightedId: (highlightedId: number[] | null) =>
            dispatch(DocumentActionGenerator.saveHighlightedId(highlightedId)),
        saveHighlightedSentences: (savedHighlightedSentences: sentenceInfo[] | null) =>
            dispatch(DocumentActionGenerator.saveHighlightedSentences(savedHighlightedSentences)),
        saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) =>
            dispatch(DocumentActionGenerator.saveHighlightedTableCells(savedHighlightedTableCells)),
        saveHighlightedDates: (savedHighlightedDates: dateInfo[] | null) =>
            dispatch(DocumentActionGenerator.saveHighlightedDates(savedHighlightedDates)),
        saveDateInAddEditMode: (dateInAddEditMode: dateInfo | null) =>
            dispatch(DocumentActionGenerator.saveDateInAddEditMode(dateInAddEditMode)),
        saveDateEditingStatus: (dateEditingStatus: boolean) =>
            dispatch(DocumentActionGenerator.saveDateEditingStatus(dateEditingStatus)),
        saveHighlightedPhrases: (savedHighlightedPhrases: phraseInfo[] | null) =>
            dispatch(DocumentActionGenerator.saveHighlightedPhrases(savedHighlightedPhrases)),
        savePhraseEditOption: (phraseEditOptionSelected: boolean) =>
            dispatch(DocumentActionGenerator.saveEditPhraseOption(phraseEditOptionSelected)),
        saveDeletePhrase: (phraseInDeleteMode: phraseInfo | null, phraseDeleteStatus: boolean) =>
            dispatch(DocumentActionGenerator.saveDeletePhrase(phraseInDeleteMode, phraseDeleteStatus)),
        saveAddPhrase: (phraseInAddMode: phraseInfo | null, phraseAddStatus: boolean) =>
            dispatch(DocumentActionGenerator.saveAddPhrase(phraseInAddMode, phraseAddStatus)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditFeature);
