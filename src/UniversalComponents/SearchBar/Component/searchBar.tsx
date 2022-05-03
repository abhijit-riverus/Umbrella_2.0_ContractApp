import React from 'react';
import { History } from 'history';
import { isNullOrUndefined } from 'is-what';

interface Props {
    history: History;
    match: any;
    term: string;
    visibility: boolean;
    // textChange: (text: string) => void;
    toggleSearchBarVisibility: (visibility: boolean) => void;
}

interface State {
    searchTerm: string;
}

export default class SearchBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            searchTerm: props.term
        };
        // this.getTerm = this.getTerm.bind(this);
    }
    componentWillMount() {
        let { match } = this.props;
        if (match.params.query) {
            this.setState({ searchTerm: match.params.query });
        }
    }
    componentWillReceiveProps(nextProps: Props) {
        var elem = document.getElementById('searchbar-input-box');
        if (!isNullOrUndefined(elem)) {
            elem.focus();
        }
    }

    search = (term: string) => {
        let { searchTerm } = this.state;
        this.setState({ searchTerm: term }); //To delete previous search term when clicking on search again.
        let { toggleSearchBarVisibility } = this.props;
        let url = '/';
        if (searchTerm.length > 0) {
            url = '/search/' + btoa(searchTerm);
            toggleSearchBarVisibility(false);
        }
        this.props.history.push(url);
    }

    handleKeyBoard = (e: React.KeyboardEvent) => {
        let { searchTerm } = this.state;
        let { toggleSearchBarVisibility, term } = this.props;
        let url = '/';
        if (e.keyCode === 13) {
            if (searchTerm.length > 0) {
                url = '/search/' + btoa(searchTerm);
                toggleSearchBarVisibility(false);
                this.setState({ searchTerm: term }); //To delete previous search term when clicking on search again.
            }
            this.props.history.push(url);
        }
    }

    render() {
        let { searchTerm } = this.state;
        let { visibility, term } = this.props;
        return (
            <>
                {visibility &&
                    <div className="row">
                        <div className="col-md-8 offset-md-2 searchbar-container">
                            <div className="row">
                                <div className="col-md-12 input-bar-padding">
                                    <img src="/static_images/search-inline-icn.svg" alt='icon' />&nbsp;&nbsp;
                                    <input autoFocus={true} placeholder="Search for files, phrases, keywords etc."
                                        onKeyDown={(e: any) => this.handleKeyBoard(e)} className="input" type="search" id="searchbar-input-box"
                                        onChange={(e) => this.setState({ searchTerm: e.currentTarget.value })} value={searchTerm} />
                                    <button className="upload-yellow-btn" id="search-btn" style={{ padding: '1% 3%' }} onClick={() => this.search(term)}>SEARCH</button>
                                </div>
                            </div>
                        </div>
                    </div>}
            </>
        );
    }
}