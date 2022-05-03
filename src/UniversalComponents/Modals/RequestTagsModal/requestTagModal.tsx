import * as React from 'react';
import { isNullOrUndefined } from 'is-what';
import { TagRequestStructure } from '../../../DocumentView/State/documentState';

interface Props {
    requestTags: (tagList: TagRequestStructure[], comment: string) => void;
}

interface State {
    requestType: string;
    tagList: TagRequestStructure[];
    tag: TagRequestStructure;
    comments: string;
    successBtn: boolean;
}

export default class RequestTagModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            requestType: 'Nature',
            tagList: [],
            tag: {
                tagType: 'Nature',
                tagName: ''
            },
            comments: '',
            successBtn: false
        }
    }

    render() {
        let { requestTags } = this.props;
        let { requestType, tagList, comments, successBtn } = this.state;
        return (
            <div className="col-md-12 col-12">
                <div className="row modal" id="requestModal" aria-labelledby="requestModal">
                    <div className="col-md-12 modal-dialog">
                        <div className="row">
                            <div className="col-md-12 modal-content">
                                <div className="row">
                                    <div className="col-md-12 my-3">
                                        <div className="modal-body modal-title" style={{ color: '#A06685', fontWeight: 600 }}>
                                            Request Tags
                                            <span data-dismiss="modal" style={{ float: 'right', cursor: 'pointer' }} id="request-close-btn">
                                                <img src="/static_images/close-modal-icn.svg" alt="close" />
                                            </span>
                                        </div>
                                        <form>
                                            <div className="modal-body modal-subtitle">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="my-3">
                                                            <div className="row">
                                                                <div className="col-md-12 tag-selection-header" style={{ color: '#626262' }}>
                                                                    Select tag type:
                                                            </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12 tag-selection-header" style={{ color: '#4D4D4D' }}>
                                                                    <img className="cursor-pointer" src={requestType === 'Nature' ? "/static_images/radio-active.svg" : "/static_images/radio-inactive.svg"} alt="nature-icn" onClick={() => this.setState({ requestType: 'Nature' })} />&nbsp;&nbsp;
                                                                <span>Nature</span>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12 tag-selection-header" style={{ color: '#4D4D4D' }}>
                                                                    <img className="cursor-pointer" src={requestType === 'Type' ? "/static_images/radio-active.svg" : "/static_images/radio-inactive.svg"} alt="type-icn" onClick={() => this.setState({ requestType: 'Type' })} />&nbsp;&nbsp;
                                                                <span>Type</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="my-3">
                                                            <div className="row">
                                                                <div className="col-md-12 tag-selection-header" style={{ color: '#626262' }}>
                                                                    Select tag type:
                                                            </div>
                                                            </div>
                                                            {this.getTags()}
                                                        </div>
                                                        <div className="my-3">
                                                            <div className="row">
                                                                <div className="col-md-12 tag-selection-header" style={{ color: '#626262' }}>
                                                                    Additional comments (Optional):
                                                            </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12 tag-selection-header" style={{ color: '#4D4D4D' }}>
                                                                    <textarea rows={5} cols={60} name="text" maxLength={1000} className="tag-input" placeholder="Enter text" style={{ minHeight: '80px', lineHeight: '15px' }} onChange={(e) => this.setState({ comments: e.currentTarget.value })}></textarea>
                                                                </div>
                                                            </div>
                                                            <div className="char-limit" style={{ float: 'left' }}>1000 characters</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center', lineHeight: '28px' }}>
                                                        {tagList.length > 0 ?
                                                            <button type="button" className={successBtn ? "slide-in-blurred-top" : "upload-yellow-btn"}
                                                                onClick={() => { this.setState({ successBtn: true }); requestTags(tagList, comments); this.dismissModal() }}>{successBtn ? "Submitted. Thank You!" : "Submit"}</button>
                                                            :
                                                            <button type="button" className="upload-disable-btn">Submit</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    getTags() {
        let { tagList, tag } = this.state;
        if (tagList.length > 0) {
            return (
                <>
                    {tagList.map((tag, i) =>
                        <div className="row" key={i}>
                            <div className="col-md-11 pr-0 my-1 tag-selection-header" style={{ color: '#4D4D4D' }}>
                                <input type="text" className="tag-input" value={tag.tagName} style={{ width: '100%' }} onChange={() => { }} />
                            </div>
                            <div className="col-md-1" style={{ display: 'flex' }}>
                                <img className='cursor-pointer' src="/static_images/less-parties.svg" alt="remove-icon" onClick={() => this.addOrRemoveTags('remove', tag.tagName)} />
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-md-11 my-1 pr-0 tag-selection-header" style={{ color: '#4D4D4D' }}>
                            <input type="text" className="tag-input" placeholder="Request another tag" value={tag.tagName !== '' ? tag.tagName : ''}
                                onChange={(e) => this.setState({ tag: { tagName: e.currentTarget.value, tagType: this.state.requestType } })} style={{ width: '100%' }} />
                        </div>
                        <div className="col-md-1" style={{ display: 'flex' }}>
                            {tag.tagName !== '' ?
                                <img className='cursor-pointer' src="/static_images/more-parties.svg" alt="add-more" onClick={() => this.addOrRemoveTags('add')} />
                                : <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                            }
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-md-11 pr-0 tag-selection-header" style={{ color: '#4D4D4D' }}>
                        <input type="text" className="tag-input" placeholder="Enter text" onChange={(e) => this.setState({ tag: { tagName: e.currentTarget.value, tagType: this.state.requestType } })} style={{ width: '100%' }} />
                    </div>
                    <div className="col-md-1" style={{ display: 'flex' }}>
                        {tag.tagName !== '' ?
                            <img className='cursor-pointer' src="/static_images/more-parties.svg" alt="add-more" onClick={() => this.addOrRemoveTags('add')} />
                            : <img src="/static_images/more-parties-disabled.svg" alt="add-more" />
                        }
                    </div>
                </div>
            )
        }
    }

    addOrRemoveTags(action: string, name?: string) {
        let { tagList, tag, requestType } = this.state;
        let tempTagList: TagRequestStructure[] = tagList;
        if (action === 'add') {
            tempTagList.push({
                tagName: tag.tagName,
                tagType: requestType
            });
        } else if (action === 'remove' && !isNullOrUndefined(name)) {
            tempTagList = tempTagList.filter((el) => { return el.tagName !== name });
        }
        this.setState({ tagList: tempTagList });
        this.setState({ tag: { tagName: '', tagType: requestType } }); //Set back to default
    }

    dismissModal = () => {
        let dismissBtn = document.getElementById('request-close-btn');
        setTimeout(() => { dismissBtn?.click() }, 1500);
    }
}