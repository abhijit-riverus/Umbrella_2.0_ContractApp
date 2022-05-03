import React, { Component } from 'react';
import Scrollable from '../../../../../../UniversalComponents/Scrollable/scrollable';
import { TagData } from '../../../../../State/documentState';

interface Props {
    otherTags: TagData[];
    term: string;
    getOtherTags: (otherTags: number[]) => void;
    showAppliedTags: (appliedTagString: TagData) => void;
    createOtherTags: (name: string) => void;
    newTagData: TagData;
    storedOtherTags: any;
    otherTagsLoader: boolean;
}

interface State {
    appliedTags: number[];
    createTagClicked: boolean;
}

var tagArray: string[] = [];

export default class TagAutoComplete extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            appliedTags: [],
            createTagClicked: false
        }
    }

    toggleTag(suggestion: TagData) {
        let { appliedTags } = this.state;
        let appliedTagsArray = appliedTags;
        appliedTagsArray.push(suggestion.id);
        this.props.getOtherTags(appliedTagsArray);
        this.props.showAppliedTags(suggestion);
    }

    componentDidMount() {
        let { otherTags } = this.props;
        otherTags.forEach((tag) => {
            tagArray.push(tag.name)
        })
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.newTagData !== nextProps.newTagData) {
            this.toggleTag(nextProps.newTagData);
        }
        if (this.props.otherTags !== nextProps.otherTags) {
            nextProps.otherTags.forEach((tag) => {
                tagArray.push(tag.name)
            })
        }
    }

    removeDuplicates() {
        let { otherTags, storedOtherTags } = this.props;
        let storedTagsName: string[] = [];
        storedOtherTags.forEach((el: any) => {
            storedTagsName.push(el.name)
        });
        let filteredOtherTags = otherTags.filter((el) => {
            return !storedTagsName.includes(el.name)
        })
        return filteredOtherTags;
    }

    render() {
        let { createTagClicked } = this.state
        if (!createTagClicked) {
            return (
                <div className="row">
                    <div className="col-md-12 tag-autocomplete-container" style={{ marginTop: '-20px' }}>
                        <Scrollable maxHeight={100}>
                            {this.renderTagAdder()}
                            {this.removeDuplicates().map((otherTag, i) =>
                                <div className="tag-input-suggestion cursor-pointer" onClick={() => this.toggleTag(otherTag)} key={i}>
                                    {otherTag.name}
                                </div>
                            )}
                        </Scrollable>
                    </div>
                </div>
            );
        }
        else {
            return (
                <span />
            )
        }
    }

    renderTagAdder() {
        let { term, otherTags } = this.props;
        let { appliedTags } = this.state;
        if (term !== '' && tagArray.indexOf(term) === -1 && !this.isOtherTagInList(otherTags, term)) {
            return (
                <div className="tag-input-suggestion">
                    <div style={{ color: '#808080', fontSize: '12px' }}>
                    This tag does not exist
                    </div>
                    <div className="cursor-pointer">
                        <div style={{ color: '#626262', fontSize: '14px' }} onClick={() => this.createAndAddNewTag(term)}>
                            Create Tag +
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <span />
            );
        }
    }

    isOtherTagInList( otherTags: TagData[], tagName: string) {
        let tagExists: boolean = false; 
        if(otherTags !== null && otherTags.length > 0){
            for(let i = 0; i < otherTags.length; i++){
                if(otherTags[i].name.trim().toLowerCase().indexOf(tagName.trim().toLowerCase()) > -1){
                    tagExists = true;
                    break;
                }
            }
        }
        return tagExists;
    }

    createAndAddNewTag(term: string) {
        let { createOtherTags } = this.props;
        let newOtherTag = term.trim();
        createOtherTags(btoa(newOtherTag));
        this.setState({ createTagClicked: true })
    }
}