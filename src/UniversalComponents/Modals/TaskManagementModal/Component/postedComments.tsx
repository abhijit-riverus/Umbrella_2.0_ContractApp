import React, { Component } from 'react';
import { getCommentTimeFormat, getDateFormat, getUploadedTime } from '../../../../Utils/DataModifierUtil/dataModUtil';
import { Comments } from '../State/taskManagementState';

interface Props{
    comments: Comments[];
}
interface State{}
class PostedComments extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {

        }
    }
    
    render() {
        let { comments } = this.props;
        return (
            <>
              {comments.map((comment: Comments, index: number) =>
              <>
              <div className="row mt-2">
              <div className="col-md-1">
                    <div className="avatar-circle-sm" style={{ backgroundColor: comment.hexID }} >
                        <span className="initials">{comment.aliasName}</span>
                    </div>
                </div> 
                <div className="col-md-6 pr-0 mt-1 user-name">
                    <span>{comment.name}</span>
                </div>
                <div className="col-md-5 mt-1 timestamp">
                    <span>{ getCommentTimeFormat(comment.commentTime.toString())}</span>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-1">
                    {/* do nothing */}
                </div>
                <div className="col-md-6 comment">
                    <span>{comment.comment}</span>
                </div>
                <div className="col-md-5">
                    {/* do nothing */}
                </div>
            </div>

              </>
              )}  
            </>
        );
    }
}

export default PostedComments;