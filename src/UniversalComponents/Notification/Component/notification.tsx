import React from "react";
import notificationWatcher from "../Saga/notificationSaga";
import { NotificationData } from "../State/notificationState";
import AssignNotification from "./Assign/assignNotification";
import CommentNotification from "./Comment/commentNotification";
import DueNotification from "./Due/dueNotification";
import ProgressNotification from "./Progress/progressNotification";
import ReminderNotification from "./Reminder/reminderNotification";

interface Props {
    userEmail: string,
    notificationData: NotificationData;
    userProfileID: number;
    getNotification: () => void;
    getUserProfileID: () => void;
    getNotificationsData: () => void;
    notificationDataArray: NotificationData[];
    markNotification: (notificationID: number) => void;
    deleteNotification: (notificationID: number) => void;
}

interface State {
    notificationQueue: NotificationData[];
    isActive: boolean;
    isSeen: boolean;
    allNotifications: NotificationData[];
}

export default class Notification extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            notificationQueue: [],
            isActive: false,
            isSeen: false,
            allNotifications: []
        }
    }

    componentDidMount() {
        let { getNotification, getUserProfileID, getNotificationsData, notificationDataArray } = this.props;
        getNotification();
        getUserProfileID();
        getNotificationsData();
    }

    componentWillReceiveProps(nextProps: Props) {
        const nextProfileID: number = nextProps.notificationData.profileID;
        const currProfileID: number = this.props.userProfileID;

        if (nextProfileID == currProfileID && currProfileID != -1) {
            //let nq = this.state.notificationQueue;
            let nq = this.state.allNotifications;
            //nq.push(nextProps.notificationData);
            nq.unshift(nextProps.notificationData);
            //this.state.allNotifications.unshift(nextProps.notificationData)
            this.setState({
                allNotifications: nq
            });

            if (this.checkForNewNotifications() === true) {
                this.setState({ isSeen: false });
            }
            // this.setState({
            //     notificationQueue: nq
            // });
        }

        // if (this.props.notificationDataArray === null) {
        //     this.setState({ allNotifications: [] });
        // }

        if (this.props.notificationDataArray !== nextProps.notificationDataArray) {
            if (nextProps.notificationDataArray === null) {
                this.setState({ allNotifications: [] });
            } else {
                this.setState({ allNotifications: [...nextProps.notificationDataArray] });
            }
        }

        // if (nextProps.notificationData.profileID === +this.props.userProfileID && nextProps.notificationData !== this.props.notificationData && this.state.isActive === false ) {
        //     this.setState({ isSeen: false })
        // }
    }

    switchNotificationType = (notification: NotificationData) => {

        switch (notification.type) {
            case 'reminder': {
                return <ReminderNotification notification={notification} removeNotification={(notificationID: number) => this.removeNotification(notificationID)} />
            }
            case 'due': {
                return <DueNotification notification={notification} removeNotification={(notificationID: number) => this.removeNotification(notificationID)} />
            }
            case 'task progress': {
                return <ProgressNotification notification={notification} removeNotification={(notificationID: number) => this.removeNotification(notificationID)} />
            }
            case 'task assign': {
                return <AssignNotification notification={notification} removeNotification={(notificationID: number) => this.removeNotification(notificationID)} />
            }
            case 'task comment': {
                return <CommentNotification notification={notification} removeNotification={(notificationID: number) => this.removeNotification(notificationID)} />
            }
        }
    }

    removeNotification = (notificationID: number) => {
        let { deleteNotification } = this.props;
        // let copyNotificationQueue = this.state.notificationQueue.map((notification: NotificationData) => notification);
        // let filteredNotificationQueue = copyNotificationQueue.filter((notification: NotificationData) => notification.notificationID !== notificationID);
        // this.setState({ notificationQueue: filteredNotificationQueue });
        deleteNotification(notificationID);
    }

    onClickNewNotifications = () => {
        let { markNotification } = this.props;
        let { isActive, allNotifications } = this.state;
        //this.setState({ isActive: !isActive });
        for (let i = 0; i < allNotifications.length; i++) {
            if (allNotifications[i].isRead === false) {
                markNotification(allNotifications[i].notificationID);
            }
        }
    }

    checkForNewNotifications = () => {
        let { allNotifications } = this.state;
        for (let i = 0; i < allNotifications.length; i++) {
            if (allNotifications[i].isRead === false) {
                //this.setState({ isSeen: false });
                return true;
            }
        }
    }

    render() {
        let { notificationData, notificationDataArray } = this.props;
        let { isActive, isSeen, allNotifications } = this.state;

        return (
            <>
                {/* style={{ borderBottom: '4px solid #88305F' }} */}
                <div className={'generic-web-menu-item'} style={{ borderBottom: isActive === true ? '4px solid #88305F' : '' }}
                    onClick={() => this.setState({ isActive: !isActive }, () => isActive === true && this.onClickNewNotifications())}>
                    {isActive === true
                        ? <img alt='Notification' src='/static_images/notification-icn.svg' />
                        : allNotifications.length > 0 && this.checkForNewNotifications() === true && isSeen === false
                            ? <img onClick={() => this.setState({ isActive: !isActive, isSeen: true })} style={{ marginTop: '-10px' }} alt='Notification' src='/static_images/notification-alert-icn.svg' />
                            : <img alt='Notification' src='/static_images/notification-disabled-icn.svg' />
                    }
                </div>
                {
                    isActive &&
                    <div id='notification-container' className="col-md-4">
                        <div className="col-md-12 p-0 mb-4" style={{ borderBottom: '1px solid #D1D1D1', top: '3vh' }}>
                            <span className="header-title ml-2">Notifications</span>&nbsp;<span className="count">{allNotifications.length}</span>
                        </div>
                        {
                            allNotifications.length > 0 && allNotifications.map((notification, key) =>
                                <>
                                    {this.switchNotificationType(notification)}
                                </>
                            )
                        }

                    </div>
                }
            </>
        )
    }
}