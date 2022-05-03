import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import sentenceCon from '../../../../UniversalComponents/SentenceRenderer/Container/sentenceCon';
import { tableInfo } from '../../../State/documentState';
import { paraLevelComponents, sentenceLevelComponents } from '../../Utils/docUtils';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    editDataPoint: () => void;
    saveHighlightedDataPoint?: (highlight?: boolean) => void;
    dataPointName: string;
    enableHighlightOption: boolean;
    highlightedId: number[] | null;
    enableSaveBtn?: boolean;
    saveHighlightedId: (highlightedId: number[] | null) => void;
    previouslyLinkedPara?: number[];
    previouslyLinkedTableCells?: tableInfo[];
    savedHighlightedTableCells?: tableInfo[] | null;
    saveHighlightedTableCells?: (savedHighlightedTableCells: tableInfo[] | null) => void;
    handleSubmitSelectedUserGroups: () => void;
}

interface State {
    highlight: boolean;
}

export default class SaveOrCancel extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            highlight: !props.enableHighlightOption,
        };
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
                {paraLevelComponents.indexOf(this.props.dataPointName) > -1 &&
                    this.props.dataPointName !== 'Start Dates' &&
                    this.props.dataPointName !== 'End Dates' &&
                    this.props.dataPointName !== 'Duration' &&
                    this.props.dataPointName !== 'Lock-in Period' &&
                    this.showHighlightedCount()}
                <div className="row my-2 align-right">
                    {/* <div className="col-md-5" /> */}
                    <div className="col-md-12 align-right">
                        <span
                            className="add-datapoint"
                            style={{ textDecoration: 'none', marginLeft: '8rem' }}
                            onClick={() => this.cancel()}
                        >
                            Cancel
                        </span>
                        {enableSaveBtn ? (
                            <span
                                className="upload-yellow-btn ml-4"
                                id="save-btn"
                                onClick={() => {
                                    this.props.editDataPoint();
                                    this.props.editOptionSelected(false);
                                    this.props.saveHighlightedId(null);
                                    this.setState({ highlight: false });
                                    this.props.handleSubmitSelectedUserGroups();
                                }}
                            >
                                Save
                            </span>
                        ) : (
                            <span className="upload-disable-btn ml-4" id="save-btn">
                                Save
                            </span>
                        )}
                    </div>
                </div>
            </>
        );
    }

    showHighlightedCount() {
        let {
            highlightedId,
            enableHighlightOption,
            previouslyLinkedPara,
            previouslyLinkedTableCells,
            savedHighlightedTableCells,
        } = this.props;
        let { highlight } = this.state;

        let highlightedParasLength = highlightedId !== null ? highlightedId.length : 0;
        highlightedParasLength +=
            savedHighlightedTableCells !== undefined && savedHighlightedTableCells !== null
                ? savedHighlightedTableCells.length
                : 0;

        if (previouslyLinkedPara !== undefined || previouslyLinkedTableCells !== undefined) {
            if (
                (previouslyLinkedPara !== undefined && previouslyLinkedPara.length > 0) ||
                (previouslyLinkedTableCells !== undefined && previouslyLinkedTableCells.length > 0)
            ) {
                if (
                    ((highlightedId !== null && highlightedId !== undefined && highlightedId.length > 0) ||
                        (savedHighlightedTableCells !== undefined &&
                            savedHighlightedTableCells !== null &&
                            savedHighlightedTableCells.length > 0)) &&
                    highlight === true
                ) {
                    return (
                        <div className="row">
                            <div className="col-md-10">
                                <span className="link-to" style={{ color: '#C1C1C1' }}>
                                    Edit linked paragraph(s)
                                </span>
                            </div>
                            <div className="col-md-2 pr-0 display-flex">
                                <span className="linked-para-count">{highlightedParasLength}</span>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="row">
                            <div className="col-md-10">
                                <span
                                    className="link-to cursor-pointer"
                                    style={{ color: '#88305F' }}
                                    onClick={() => this.editLinkedPara()}
                                >
                                    Edit linked paragraph(s)
                                </span>
                            </div>
                        </div>
                    );
                }
            } else {
                if (
                    ((highlightedId !== null && highlightedId !== undefined && highlightedId.length > 0) ||
                        (savedHighlightedTableCells !== undefined &&
                            savedHighlightedTableCells !== null &&
                            savedHighlightedTableCells.length > 0)) &&
                    highlight === true
                ) {
                    return (
                        <div className="row">
                            <div className="col-md-10">
                                <span className="link-to" style={{ color: '#C1C1C1' }}>
                                    Edit linked paragraph(s)
                                </span>
                            </div>
                            <div className="col-md-2 pr-0 display-flex">
                                <span className="linked-para-count">{highlightedParasLength}</span>
                            </div>
                        </div>
                    );
                }
                if (enableHighlightOption) {
                    return (
                        <>
                            <div className="row">
                                <div className="col-md-12">
                                    <span
                                        className="link-to cursor-pointer"
                                        style={{ color: this.state.highlight ? '#C1C1C1' : '#88305F' }}
                                        onClick={() => this.saveHighlightedDataPoint()}
                                    >
                                        Link to paragraph(s)
                                    </span>
                                </div>
                            </div>
                            {this.state.highlight && (
                                <div className="row">
                                    <div className="col-md-12 link-to-info">
                                        Please highlight the paragraphs on the document, you wish to link to this data
                                        point and click on save.
                                    </div>
                                </div>
                            )}
                        </>
                    );
                }
            }
        }
    }

    editLinkedPara() {
        let { previouslyLinkedPara, saveHighlightedDataPoint, previouslyLinkedTableCells } = this.props;
        this.setState({ highlight: true });
        if (previouslyLinkedPara !== undefined) {
            this.props.saveHighlightedId(previouslyLinkedPara);
        }
        if (previouslyLinkedTableCells !== undefined && this.props.saveHighlightedTableCells !== undefined) {
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
        this.props.saveHighlightedId(null);
        if (this.props.saveHighlightedTableCells) {
            this.props.saveHighlightedTableCells(null);
        }
    }
}
