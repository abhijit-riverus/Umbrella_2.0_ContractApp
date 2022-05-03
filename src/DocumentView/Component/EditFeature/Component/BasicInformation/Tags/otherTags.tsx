import { Tooltip } from '@material-ui/core';
import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { TagData } from '../../../../../State/documentState';
import { DarkTooltip } from '../../../../documentInsights';
import { others_tag_color, tag_others_tooltip } from '../../../../Utils/docUtils';
import TagAutoComplete from './tagAutoComplete';

interface Props {
    tags: any[];
    otherTags: TagData[];
    createOtherTags: (name: string) => void;
    listOtherTags: () => void;
    setTags: (tags: any) => void;
    storeOtherTags: (storedOtherTags: any) => void;
    newTagData: TagData;
    storedOtherTags: any;
    selectedLibraryAction: string;
    isBulkAction: boolean;
    otherTagsLoader: boolean;
}

interface State {
    term: string;
    matchedOtherTags: TagData[];
}

class OtherTags extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            term: '',
            matchedOtherTags: []
        }
    }

    componentDidMount() {
        let { tags } = this.props;
        this.props.listOtherTags();
        //To show already saved tags again in edit mode.
        let savedOthers = tags.filter((el) => { return el.dataPoints.categoryId === 3 });
        let othersArray: any[] = [];
        savedOthers.forEach((oth) => {
            othersArray.push(oth);
        });
        this.props.storeOtherTags(othersArray);
    }

    componentWillReceiveProps(nextProps: Props){
        let {tags} = nextProps;
        if(this.props.tags !== nextProps.tags){
            //To show already saved tags again in edit mode.
            let savedOthers = tags.filter((el) => { return el.dataPoints.categoryId === 3 });
            let othersArray: any[] = [];
            savedOthers.forEach((oth) => {
                othersArray.push(oth);
            });
            this.props.storeOtherTags(othersArray);
        }
        if(this.props.listOtherTags !== nextProps.listOtherTags){
            this.setState({matchedOtherTags: nextProps.otherTags });
        }
    }

    render() {
        let { term, matchedOtherTags } = this.state;
        let { otherTags, newTagData, createOtherTags, setTags, storedOtherTags,selectedLibraryAction, isBulkAction, otherTagsLoader } = this.props;
        return (
            <div className="row">
                <div className="col-md-12 tag-type-hoverable">
                    <DarkTooltip title={tag_others_tooltip} placement="right-end">
                        <span>{isBulkAction === true ? 'Groups': 'Others'}</span>
                    </DarkTooltip>
                </div>
                <div className={selectedLibraryAction === 'tags' ? "col-md-11 mb-1" : "col-md-9 mb-1"}>
                    {/* {storedOtherTags.length > 0 && <div className="row">
                        <div className="col-md-12 tag-label">
                            {storedOtherTags.map((oth: any, i: number) =>
                                <span key={i} style={{ background: others_tag_color, display: 'inline-block', margin: '1%' }}>
                                    {oth.name}&nbsp;&nbsp;
                                    <img src="/static_images/remove-tag-label.svg" alt="remove" className="cursor-pointer"
                                        onClick={() => this.removeOtherTag(oth)} />
                                </span>
                            )}
                        </div>
                    </div>} */}
                    
                    <div className="row">
                        <div className="col-md-12">
                            <span className="tag-input" style={{ background: 'white', border: term.length > 0 ? 'none' : '1px solid #DDDDDD', fontSize: '14px' }}>
                                <img src="/static_images/tag-search-icn.svg" alt="search" />&nbsp;
                            <input type="text" maxLength={50} placeholder="Create/ choose custom tags"
                                    onChange={(e) => this.getOthersTagSuggestion(e.currentTarget.value)} style={{ width: '100%', border: 'none', outline: 'none' }} />
                                    {otherTagsLoader && <img src="/static_images/small-loader.svg" />}
                            </span>
                            <div className="char-limit">50 characters</div>
                        </div>
                    </div>
                    {term !== '' && <TagAutoComplete storedOtherTags={storedOtherTags} newTagData={newTagData} otherTags={matchedOtherTags} term={term} getOtherTags={(tag: number[]) => setTags(tag)}
                        showAppliedTags={(appliedTagString) => this.showOtherTag(appliedTagString)} createOtherTags={createOtherTags} otherTagsLoader={otherTagsLoader} />}
                    {storedOtherTags.length > 0 && isBulkAction === false && <div className="row">
                        <div className="col-md-12 tag-label">
                            {storedOtherTags.map((oth: any, i: number) =>
                                <span key={i} style={{ background: others_tag_color, display: 'inline-block', margin: '1%', padding: selectedLibraryAction === 'tags' ? '1% 1%': '0% 1%', marginLeft: '0rem' }}>
                                    {oth.name}&nbsp;&nbsp;
                                    <img src="/static_images/new-remove-tag-label.svg" alt="remove" className="cursor-pointer"
                                        onClick={() => this.removeOtherTag(oth)} />
                                </span>
                            )}
                        </div>
                    </div>}
                </div>
            </div>
        );
    }

    removeOtherTag(tag: any) {
        let { storedOtherTags, setTags } = this.props;
        let filteredArray = storedOtherTags.filter((el: any) => { return el.name !== tag.name });
        this.props.storeOtherTags(filteredArray);
        let tagIdArray: any[] = [];
        filteredArray.forEach((el: any) => {
            if (!isNullOrUndefined(el.dataPoints)) {
                tagIdArray.push(el.dataPoints.tagId);
            } else {
                tagIdArray.push(el.id);
            }
        })
        setTags(tagIdArray);
    }

    getOthersTagSuggestion(term: string) {
        let {otherTags} = this.props;
        if (term.length < 51) {
            this.setState({ term: term });
            //matching tags logic
            if(term === ''){
                this.setState({matchedOtherTags: otherTags});
            }else{
                if(otherTags !== null){
                    //filter matched events
                    let otherTagsList = otherTags;
                    let filteredOtherTags = otherTagsList.filter((e)=> e.name.trim().toLowerCase().indexOf(term.trim().toLowerCase()) > -1 );
                    this.setState({matchedOtherTags: filteredOtherTags});
                }else {
                    this.setState({matchedOtherTags: otherTags});
                }
            }  
        }
    }

    showOtherTag(appliedTagString: TagData) {
        let appliedTagsStringArray = this.props.storedOtherTags;
        appliedTagsStringArray.push(appliedTagString);
        this.props.storeOtherTags(appliedTagsStringArray);
        let temp = this.generateOtherTagsIdArray();
        this.props.setTags(temp);
    }

    generateOtherTagsIdArray() {
        //This code generates a unified array for passing into editdata API for other tags.
        // New as well as previous tags need to be passed again.
        let { storedOtherTags } = this.props;
        let tempArray: number[] = [];
        storedOtherTags.forEach((arr: any) => {
            if (!isNullOrUndefined(arr.id)) {
                tempArray.push(arr.id);
            }
            if (!isNullOrUndefined(arr.dataPoints)) {
                tempArray.push(arr.dataPoints.tagId);
            }
        })
        return tempArray;
    }
}

export default OtherTags;