import React, { Component } from 'react'
import { DarkTooltip } from '../../../../DocumentView/Component/documentInsights';
import { getUploadedTime, truncateFileName, truncateString } from '../../../../Utils/DataModifierUtil/dataModUtil';
import { NotificationData } from '../../State/notificationState'

interface Props {
    notification: NotificationData;
    removeNotification: (notificationID: number) => void;
}

interface State {
    isActive: boolean;
}

export default class ProgressNotification extends Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isActive: false
        }

    }

    componentDidMount() {

    }

    removeNotification = () => {

    }

    render() {
        let { notification, removeNotification } = this.props;
        let { isActive } = this.state;
        return (
            <>
                <div className="col-md-12" style={{ borderLeft: notification.isRead === false ? '6px solid #FBCE2F' : '' }} id='notification-type-container'>
                    <div className="col-md-12 p-0" style={{ display: 'inline-flex' }}>
                        <div className='col-md-1'>
                            <img alt="progress-icon" src="/static_images/progress-icn.svg" />
                        </div>
                        <div className="col-md-10 mt-1 pb-2 task-title" 
                        // onClick={() => window.open('/document/tasks/' + btoa(notification.fileID.toString()) + '/' + btoa(notification.requestID.toString()), "_blank")}
                        >
                            {/* <span style={{ cursor: 'pointer' }}>{notification.taskTitle}</span> */}
                            {   
                                (notification.taskTitle === null || notification.taskTitle === '') && <img src="/static_images/empty-dash.svg"></img>
                            }
                            {   notification.taskTitle !== null && notification.taskTitle.length > 25 ?
                                        <DarkTooltip title={notification.taskTitle} placement="right-end">
                                            <span style={{ display: 'initial', cursor: 'pointer' }}
                                            onClick={() => window.open('/document/tasks/' + btoa(notification.fileID.toString()) + '/' + btoa(notification.requestID.toString()), "_blank")}
                                            >
                                                {truncateString(notification.taskTitle, 25)}
                                            </span>
                                        </DarkTooltip>
                                    :
                                        <span style={{ display: 'initial', cursor: 'pointer' }} 
                                        onClick={() => window.open('/document/tasks/' + btoa(notification.fileID.toString()) + '/' + btoa(notification.requestID.toString()), "_blank")}
                                        >
                                        {notification.taskTitle}
                                        </span>
                                }
                        </div>
                        <div className="col-md-1">
                            <span style={{ float: 'right', cursor: 'pointer' }} id="close-btn" onClick={() => removeNotification(notification.notificationID)}>
                                <img src="/static_images/close-modal-icn.svg" alt="close" />
                            </span>
                        </div>
                    </div>
                    <div className="col-md-12 mt-1 file-name">
                        {notification.fileName !== null && notification.fileName.length > 15 ?
                            <DarkTooltip title={notification.fileName} placement="right-end">
                                <span style={{ display: 'initial', cursor: 'pointer' }}
                                    onClick={() => window.open('/document/analysis/' + btoa(notification.fileID.toString()), "_blank")}>
                                    {truncateFileName(notification.fileName)} <img src="/static_images/open-file-icn.svg" alt="close" />
                                </span>
                            </DarkTooltip>
                            :
                            <span style={{ display: 'initial', cursor: 'pointer' }} onClick={() => window.open('/document/analysis/' + btoa(notification.fileID.toString()), "_blank")}>
                                {notification.fileName} <img src="/static_images/open-file-icn.svg" alt="close" />
                            </span>
                        }
                    </div>
                    <div className="col-md-12 mt-2 clause-bi-name">
                        <span>{notification.clauseType} - {notification.biType}</span>
                    </div>
                    <div className='col-md-12 mt-3 mb-2' style={{ display: 'inline-flex' }}>
                        <div className={"col-md-4 mr-2 " + notification.progress.toLowerCase().replace(' ', '-')}>
                            <span>{notification.progress}</span>
                        </div>
                        <div className="col-md-4 status">
                            <span>{notification.state}</span>
                        </div>
                        <div className="col-md-4 mt-1 pr-0 alert-date">
                            <span>{getUploadedTime(notification.alertDate)}</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
