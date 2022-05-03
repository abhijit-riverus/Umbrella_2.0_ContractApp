import React, { Component } from 'react'

interface Props {
    description: string;
    insertDescription: (description: string) => void;
}

interface State {

}

export default class Notes extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {

        }

    }

    render() {
        let { description, insertDescription } = this.props;
        return (
            <>
                {/* <div className="row mb-3" id="notes-container"> */}
                <div className="col-md-12" id="notes-container">
                    <div className="col-md-12 pl-0">
                        <span className="label">Notes</span>
                    </div>
                    <div className="col-md-12 pl-0" style={{ padding: '5px' }}>
                        <textarea id="notes-input-textarea" placeholder="Add more details" onChange={(e) => insertDescription(e.target.value)} value={description}>
                        </textarea>
                    </div>
                </div>

                {/* </div> */}
            </>
        )
    }
}
