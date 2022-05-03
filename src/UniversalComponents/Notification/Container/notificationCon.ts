import { connect } from "react-redux";
import { StoreTree } from "../../../Utils/MainReducer/mainReducer";
import NotificationGenerator from "../Actions/gen";
import Notification from "../Component/notification";

export function mapStateToProps(appState: StoreTree, ownProps: any) {
    return {
        notificationData: appState.notification.notificationData,
        userProfileID: appState.notification.profileID,
        notificationDataArray: appState.notification.notificationDataArray,
    }
}

export function mapDispatchToProps(dispatch: any, props: any) {
    return {
        getNotification: () => dispatch(NotificationGenerator.notificationAlert()),
        getUserProfileID: () => dispatch(NotificationGenerator.getUserProfileID()),
        getNotificationsData: () => dispatch(NotificationGenerator.getNotificationsData()),
        markNotification: (notificationID: number) => dispatch(NotificationGenerator.markNotification(notificationID)),
        deleteNotification: (notificationID: number) => dispatch(NotificationGenerator.deleteNotification(notificationID)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)