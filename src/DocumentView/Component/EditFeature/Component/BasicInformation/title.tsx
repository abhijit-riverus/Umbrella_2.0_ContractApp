import React, { Component } from 'react';
import SaveOrCancel from '../saveOrCancel';

interface Props {
    editOptionSelected: (editOptionSelected: boolean) => void;
    editTitle: (dataPointName: string) => void;
    savedTitle: string;
    saveHighlightedId: (highlightedId: number[] | null) => void;
}

interface State {
    title: string;
}

export default class Title extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            title: props.savedTitle,
        };
    }

    render() {
        let { editOptionSelected, saveHighlightedId } = this.props;
        return (
            <div className="row toc-content toc-content-default">
                <div className="col-md-12">
                    {/* <div className="row">
                        <div className="col-md-12 my-3 edit-title-header">
                            Add/Edit the title of your contract here
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-md-2 bi-label-clickable" style={{ fontWeight: 600 }}>
                            Title
                        </div>
                        <div className="col-md-10 mb-1 bi-name">
                            <input
                                type="text"
                                className="title-input"
                                value={this.state.title}
                                onChange={(e) => this.setState({ title: e.currentTarget.value })}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                    <SaveOrCancel
                        enableHighlightOption={true}
                        dataPointName={'Title'}
                        editOptionSelected={editOptionSelected}
                        editDataPoint={() => this.editTitle()}
                        highlightedId={null}
                        enableSaveBtn={true}
                        saveHighlightedId={(highlightedId: number[] | null) => saveHighlightedId(highlightedId)}
                        handleSubmitSelectedUserGroups={() => {}}
                    />
                </div>
            </div>
        );
    }

    editTitle() {
        let { title } = this.state;
        title.length > 0 && this.props.editTitle(title);
    }
}
