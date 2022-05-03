import * as React from 'react';

interface Props {
    toggleSearchBarVisibility: (visibility: boolean) => void;
    searchTerm: string;
}

export default class ErrorMessage extends React.Component<Props, {}> {

    runNewSearch() {
        let { toggleSearchBarVisibility } = this.props;
        toggleSearchBarVisibility(true);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12 err-msg-header" style={{ textAlign: "center" }}>
                            No files found containing the term "<span className="err-msg-search-term">{this.props.searchTerm}</span>"
                        </div>
                    </div>
                    <div className="err-msg-container">
                        <div className="row">
                            <div className="col-md-12 my-5" style={{ textAlign: "center" }}>
                                <img src="/static_images/no-results.svg" alt="no-results" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 err-msg-text">
                                <ul>
                                    <li>Remember to check the spelling </li>
                                    <li>Try using less terms</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: '20px', textAlign: "center" }}>
                            <div className="col-md-12">
                                <span className="mailto-riverus" style={{ fontSize: '15px', lineHeight: '5px' }} onClick={() => { this.runNewSearch() }}>
                                    Run a new search
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}