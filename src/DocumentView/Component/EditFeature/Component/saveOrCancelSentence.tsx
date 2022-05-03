import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { sentenceInfo, tableInfo } from '../../../State/documentState';
import { sentenceLevelComponents } from '../../Utils/docUtils';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    editDataPoint: () => void;
    saveHighlightedDataPoint?: (highlight?: boolean) => void;
    dataPointName: string;
    enableHighlightOption: boolean;
    enableSaveBtn?: boolean;
    savedHighlightedSentences: sentenceInfo[] | null;
    saveHighlightedSentences: (savedHighlightedSentences: sentenceInfo[] | null) => void;
    previouslyLinkedSentences?: sentenceInfo[];
    previouslyLinkedTableCells?: tableInfo[];
    savedHighlightedTableCells: tableInfo[] | null;
    saveHighlightedTableCells: (savedHighlightedTableCells: tableInfo[] | null) => void;
}

interface State {
    highlight: boolean;
}

export default class SaveOrCancelSentence extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            highlight: !props.enableHighlightOption
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.enableHighlightOption !== nextProps.enableHighlightOption) {
            this.setState({ highlight: !nextProps.enableHighlightOption });
        }
    }

    render() {
        let { enableSaveBtn } = this.props;
        return (
            <>
                {sentenceLevelComponents.indexOf(this.props.dataPointName) > -1 && this.showHighlightedCount()}
                <div className="row my-2">
                    {/* <div className="col-md-5" /> */}
                    <div className="col-md-12 align-right">
                        <span className="add-datapoint" style={{ textDecoration: 'none' }} onClick={() => this.cancel()}>Cancel</span>
                        {enableSaveBtn ?
                            <span className="upload-yellow-btn ml-4" id="save-btn"
                                onClick={() => { this.props.editDataPoint(); this.props.editOptionSelected(false); this.setState({ highlight: false }); }}>
                                Save
                            </span>
                            :
                            <span className="upload-disable-btn ml-4" id="save-btn" >
                                Save
                            </span>
                        }
                    </div>
                </div>
            </>
        );
    }

    showHighlightedCount() {
        let { savedHighlightedSentences, enableHighlightOption, previouslyLinkedSentences, savedHighlightedTableCells, previouslyLinkedTableCells } = this.props;
        let { highlight } = this.state;

        let sentencesLength = savedHighlightedSentences !== null ? savedHighlightedSentences.length : 0;
        sentencesLength += savedHighlightedTableCells !== null ? savedHighlightedTableCells.length : 0;

        if (previouslyLinkedSentences !== undefined || previouslyLinkedTableCells !== undefined) {

            if ((previouslyLinkedSentences !== undefined && previouslyLinkedSentences.length > 0) || (previouslyLinkedTableCells !== undefined && previouslyLinkedTableCells.length > 0)) {

                if (((savedHighlightedSentences !== null && savedHighlightedSentences !== undefined && savedHighlightedSentences.length > 0) || (savedHighlightedTableCells !== null && savedHighlightedTableCells !== undefined && savedHighlightedTableCells.length > 0)) && highlight === true) {
                    return (
                        <div className="row">
                            <div className="col-md-10">
                                <span className="link-to" style={{ color: '#C1C1C1' }}>
                                    Edit linked sentences(s)
                                </span>
                            </div>
                            <div className="col-md-2 pr-0 display-flex">
                                <span className="linked-para-count">
                                    {sentencesLength}
                                </span>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="row">
                            <div className="col-md-10">
                                <span className="link-to cursor-pointer" style={{ color: '#88305F' }} onClick={() => this.editLinkedSentence()} >
                                    Edit linked sentences(s)
                                </span>
                            </div>
                        </div>
                    );
                }

            } else {
                if (((savedHighlightedSentences !== null && savedHighlightedSentences !== undefined && savedHighlightedSentences.length > 0) || (savedHighlightedTableCells !== null && savedHighlightedTableCells !== undefined && savedHighlightedTableCells.length > 0)) && highlight === true) {
                    return (
                        <div className="row">
                            <div className="col-md-10">
                                <span className="link-to" style={{ color: '#C1C1C1' }}>
                                    Edit linked sentences(s)
                                </span>
                            </div>
                            <div className="col-md-2 pr-0 display-flex">
                                <span className="linked-para-count">
                                    {sentencesLength}
                                </span>
                            </div>
                        </div>
                    )
                }
                if (enableHighlightOption) {
                    return (
                        <>
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="link-to cursor-pointer" style={{ color: this.state.highlight ? '#C1C1C1' : '#88305F' }}
                                        onClick={() => this.saveHighlightedDataPoint()}>
                                        Link to sentences(s)
                                    </span>
                                </div>
                            </div>
                            {this.state.highlight && <div className="row">
                                <div className="col-md-12 link-to-info">
                                    Please highlight the sentences on the document, you wish to link to this data point and click on save.
                                </div>
                            </div>}
                        </>
                    )
                }

            }

        }
    }

    editLinkedSentence() {
        let { previouslyLinkedSentences, saveHighlightedDataPoint, previouslyLinkedTableCells } = this.props
        this.setState({ highlight: true });
        if (previouslyLinkedSentences) {
            this.props.saveHighlightedSentences(previouslyLinkedSentences);
        }
        if (previouslyLinkedTableCells) {
            this.props.saveHighlightedTableCells(previouslyLinkedTableCells);
        }
        this.props.editOptionSelected(true);
        !isNullOrUndefined(saveHighlightedDataPoint) && saveHighlightedDataPoint(true);
    }

    saveHighlightedDataPoint() {
        let { saveHighlightedDataPoint } = this.props;
        this.setState({ highlight: true });
        this.props.editOptionSelected(true);
        !isNullOrUndefined(saveHighlightedDataPoint) && saveHighlightedDataPoint(true);
    }

    cancel() {
        this.setState({ highlight: false });
        this.props.editOptionSelected(false);
        this.props.saveHighlightedSentences(null);
        this.props.saveHighlightedTableCells(null);
    }
}