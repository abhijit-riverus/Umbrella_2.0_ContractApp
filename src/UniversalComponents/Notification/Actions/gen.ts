import { NotificationData } from "../State/notificationState";
import { NOTIFICATIONALERT, NotificationAlert, NOTIFICATIONALERT_SUCCESS, NotificationAlertSuccess, GetUserProfileID, GETUSERPROFILEID, GetUserProfileIDSuccess, GETUSERPROFILEID_SUCCESS, GetUserProfileIDFailure, GETUSERPROFILEID_FAILURE, GetNotificationsData, GETNOTIFICATIONSDATA, GetNotificationsDataSuccess, GETNOTIFICATIONSDATA_SUCCESS, GetNotificationsDataFailure, GETNOTIFICATIONSDATA_FAILURE, MarkNotification, MARKNOTIFICATION, MarkNotificationSuccess, MARKNOTIFICATION_SUCCESS, MarkNotificationFailure, MARKNOTIFICATION_FAILURE, DeleteNotification, DELETENOTIFICATION, DeleteNotificationSuccess, DELETENOTIFICATION_SUCCESS, DeleteNotificationFailure, DELETENOTIFICATION_FAILURE } from "./def";

export default class NotificationGenerator {

    public static getUserProfileID(): GetUserProfileID {
        return {
            type: GETUSERPROFILEID
        }
    }

    public static getUserProfileIDSuccess(profileID: number): GetUserProfileIDSuccess {
        return {
            type: GETUSERPROFILEID_SUCCESS,
            payload: {
                profileID: profileID
            }
        }
    }

    public static getUserProfileIDFailure(): GetUserProfileIDFailure {
        return {
            type: GETUSERPROFILEID_FAILURE
        }
    }

    public static notificationAlert(): NotificationAlert {
        return {
            type: NOTIFICATIONALERT
        }
    }

    public static notificationAlertSuccess(notificationData: NotificationData): NotificationAlertSuccess {
        return {
            type: NOTIFICATIONALERT_SUCCESS,
            payload: {
                notificationData: notificationData
            }
        }
    }

    public static getNotificationsData(): GetNotificationsData {
        return {
            type: GETNOTIFICATIONSDATA
        }
    }

    public static getNotificationsDataSuccess(notificationDataArray: NotificationData[]): GetNotificationsDataSuccess {
        return{
            type: GETNOTIFICATIONSDATA_SUCCESS,
            payload: {
                notificationDataArray: notificationDataArray
            }
        }
    }

    public static getNotificationsDataFailure(): GetNotificationsDataFailure {
        return {
            type: GETNOTIFICATIONSDATA_FAILURE
        }
    }

    public static markNotification(notificationID: number): MarkNotification {
        return {
            type: MARKNOTIFICATION,
            payload: {
                notificationID: notificationID
            }
        }
    }

    public static markNotificationSuccess(): MarkNotificationSuccess {
        return {
            type: MARKNOTIFICATION_SUCCESS
        }
    }

    public static markNotificationFailure(): MarkNotificationFailure {
        return {
            type: MARKNOTIFICATION_FAILURE
        }
    }

    public static deleteNotification(notificationID: number): DeleteNotification{
        return {
            type: DELETENOTIFICATION,
            payload: {
                notificationID: notificationID
            }
        }
    }

    public static deleteNotificationSuccess(): DeleteNotificationSuccess {
        return {
            type: DELETENOTIFICATION_SUCCESS
        }
    }

    public static deleteNotificationFailure(): DeleteNotificationFailure {
        return {
            type: DELETENOTIFICATION_FAILURE
        }
    }
}