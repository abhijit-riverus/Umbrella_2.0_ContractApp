import React, { Component } from 'react';
import LinesLoader from '../../../Loader/linesLoader';
import { Comments } from '../State/taskManagementState';
import PostedComments from './postedComments';

interface Props{
    comments: Comments[];
    requestID: number;
    postComment: (requestid: number, comment: string) => void;
    getComments: (requestId: number) => void;
    commentLoader: boolean;
}

interface State{
    comment: string;
}

class CommentSection extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            comment: ''
        }        
    }

    onClickSend = () => {
        let {postComment, getComments, requestID} = this.props;
        postComment(requestID, this.state.comment);
        // getComments(requestID);
        this.setState({comment: ''});
    }
    
    render() {
        let { comments, postComment, requestID, commentLoader } = this.props;
        let { comment } = this.state;
        return (
            <>
                <div className="col-md-12" id="commentsection-container">
                    <div className="col-md-12 pl-0">
                        <span className="label">Comments</span>
                    </div>
                    <div className="col-md-12 pl-0" style={{ padding: '5px' }}>
                        <textarea id="comment-input-textarea" placeholder="Type your message here" 
                        onChange={(e) => this.setState({comment: e.target.value})}
                        value={comment}>
                        </textarea>
                    </div>
                    <div className="col-md-12" style={{textAlign: 'end', marginBottom: comments.length === 0 ? '1.25rem' : ''}}> 
                    {
                        comment.length > 0 ?
                        <span className="upload-yellow-btn ml-4" id="save-btn" style={{}}
                        onClick={(e) => this.onClickSend()} 
                        >Send</span>
                        :<span className="upload-disable-btn ml-4" id="disabled-save-btn" style={{ display: 'initial'}}
                        >Send</span>
                    }
                    </div>
                    {/* { comments.length > 0 &&  <> 
                            <div className="col-md-12 pl-0">
                                <span className="label" style={{fontWeight: 'normal'}}>Previous comments</span>
                            </div>
                                <div className="row" id="postedcomments-container">
                                    <div className="col-md-12 p-2">
                                        <PostedComments comments={comments} />
                                    </div>
                                </div>
                        </>
                    } */}
                    { commentLoader === true ? 
                     <>
                     <CommentLoader />
                     </>
                     : comments.length > 0 &&  <> 
                     <div className="col-md-12 pl-0">
                         <span className="label" style={{fontWeight: 'normal'}}>Previous comments</span>
                     </div>
                     {/* <div className=" col-md-12 p-0"> */}
                         <div className="row" id="postedcomments-container">
                             <div className="col-md-12 p-2">
                                 <PostedComments comments={comments} />
                             </div>
                         </div>
                     {/* </div> */}
                 </>

                     }
                </div>
            </>
        );
    }
}

export function CommentLoader() {
    return (
        <>
        <div className="row" id="postedcomments-container">
            <div className="col-md-12 p-2">
                <div className="row mt-2">
                    <div className="col-md-1">
                        <div className="avatar-circle-sm" style={{ backgroundColor: '#999999' }} >
                            <span className="initials"></span>
                        </div>
                    </div> 
                    <div className="col-md-6 pr-0 mt-1 user-name">
                        <span><LinesLoader animatedLines={[{ width: 100, height: 8 }]} /></span>
                    </div>
                    <div className="col-md-5 mt-1 timestamp">
                        <span><LinesLoader animatedLines={[{ width: 100, height: 8 }]} /></span>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-1">
                        {/* do nothing */}
                    </div>
                    <div className="col-md-6 comment">
                        <span><LinesLoader animatedLines={[{ width: 100, height: 8 }]} /></span>
                    </div>
                    <div className="col-md-5">
                        {/* do nothing */}
                    </div>
                </div>
        </div>
        </div>
     </>  
    )
}

export default CommentSection;