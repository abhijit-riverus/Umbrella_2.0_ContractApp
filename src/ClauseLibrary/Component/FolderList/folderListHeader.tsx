import React, { Component } from 'react';


interface Props {
}

interface State {
}

export default class FolderListHeader extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="row clause-library-header-test clause-folder-heading-row">
                <div className="col-md-4">
                    Title
                </div>
                <div className="col-md-2">
                    Actions
                </div>
                <div className="col-md-2">
                    Created by
                </div>
                <div className="col-md-2">
                    Created On
                </div>
                <div className="col-md-2">
                    Modified On
                </div>
            </div>
        )
    }

}