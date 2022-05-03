import React, { Component } from 'react';
import Title from '../Result/Title/title';
import { isNullOrUndefined } from 'is-what';
import Content from '../Result/Content/content';
import SubTitle from '../Result/SubTitle/subTitle';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { SearchResult } from '../../Search/State/SearchState';
import LinesLoaderCard from './linesLoaderCard';

interface Props {
    searchResult: SearchResult[];
    isMobile: boolean;
    searchMore: () => void;
    searchLoader: boolean;
    countLoader: boolean;
    filterLoader: boolean;
    scrollBottomLoader: boolean;
}

interface State {
    displayInsights: boolean;
    selectedCase: any;
}
var timer: any;

export default class SearchResultCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayInsights: false,
            selectedCase: {}
        }
    }
    render() {
        let { searchResult, searchLoader, filterLoader, scrollBottomLoader } = this.props;
        if (searchLoader || filterLoader) {
            return (
                <LinesLoaderCard />
            )
        } else {
            return (
                <>
                    <BottomScrollListener onBottom={this.scrollCalBack} triggerOnNoScroll={false}>
                        <div className="mt-2">
                            {searchResult.map((item, i) =>
                                <div className="row" key={i}>
                                    <div className="col-md-12 my-2 p-3 searchdetails-card">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <Title title={item.title} uniqueFileId={item.uniqueFileId} />
                                            </div>
                                        </div>
                                        {!isNullOrUndefined(item.contractType) ? <SubTitle contractType={item.contractType} uploadedBy={item.uploadedBy} uploadedOn={item.uploadedOn} /> : ''}
                                        {!isNullOrUndefined(item.content) ? <Content content={item.content} /> : ''}
                                    </div>
                                </div>
                            )}
                        </div>
                    </BottomScrollListener>
                    {scrollBottomLoader && <LinesLoaderCard />}
                </>
            );
        }
    }
    scrollCalBack = () => {
        let { searchMore } = this.props;
        timer = setTimeout(() => {
            clearTimeout(timer);
            searchMore();
        }, 100);
    }
}