import NotificationState, { NotificationData } from '../State/notificationState';

export const NOTIFICATIONALERT = 'NOTIFICATIONALERT';
export type NOTIFICATIONALERT = typeof NOTIFICATIONALERT;

export const NOTIFICATIONALERT_SUCCESS = 'NOTIFICATIONALERT_SUCCESS';
export type NOTIFICATIONALERT_SUCCESS = typeof NOTIFICATIONALERT_SUCCESS;

export const GETUSERPROFILEID = 'GETUSERPROFILEID';
export type GETUSERPROFILEID = typeof GETUSERPROFILEID;

export const GETUSERPROFILEID_SUCCESS = 'GETUSERPROFILEID_SUCCESS';
export type GETUSERPROFILEID_SUCCESS = typeof GETUSERPROFILEID_SUCCESS;

export const GETUSERPROFILEID_FAILURE = 'GETUSERPROFILEID_FAILURE';
export type GETUSERPROFILEID_FAILURE = typeof GETUSERPROFILEID_FAILURE;

export const GETNOTIFICATIONSDATA = 'GETNOTIFICATIONSDATA';
export type GETNOTIFICATIONSDATA = typeof GETNOTIFICATIONSDATA;

export const GETNOTIFICATIONSDATA_SUCCESS = 'GETNOTIFICATIONSDATA_SUCCESS';
export type GETNOTIFICATIONSDATA_SUCCESS = typeof GETNOTIFICATIONSDATA_SUCCESS;

export const GETNOTIFICATIONSDATA_FAILURE = 'GETNOTIFICATIONSDATA_FAILURE';
export type GETNOTIFICATIONSDATA_FAILURE = typeof GETNOTIFICATIONSDATA_FAILURE;

export const MARKNOTIFICATION = 'MARKNOTIFICATION';
export type MARKNOTIFICATION = typeof MARKNOTIFICATION;

export const MARKNOTIFICATION_SUCCESS = 'MARKNOTIFICATION_SUCCESS';
export type MARKNOTIFICATION_SUCCESS = typeof MARKNOTIFICATION_SUCCESS;

export const MARKNOTIFICATION_FAILURE = 'MARKNOTIFICATION_FAILURE';
export type MARKNOTIFICATION_FAILURE = typeof MARKNOTIFICATION_FAILURE;

export const DELETENOTIFICATION = 'DELETENOTIFICATION';
export type DELETENOTIFICATION = typeof DELETENOTIFICATION;

export const DELETENOTIFICATION_SUCCESS = 'DELETENOTIFICATION_SUCCESS';
export type DELETENOTIFICATION_SUCCESS = typeof DELETENOTIFICATION_SUCCESS;

export const DELETENOTIFICATION_FAILURE = 'DELETENOTIFICATION_FAILURE';
export type DELETENOTIFICATION_FAILURE = typeof DELETENOTIFICATION_FAILURE;

export interface GetUserProfileID {
    type: GETUSERPROFILEID
}

export interface GetUserProfileIDSuccess {
    type: GETUSERPROFILEID_SUCCESS,
    payload: {
        profileID: number
    }
}

export interface GetUserProfileIDFailure {
    type: GETUSERPROFILEID_FAILURE
}

export interface NotificationAlert {
    type: NOTIFICATIONALERT
}

export interface NotificationAlertSuccess {
    type: NOTIFICATIONALERT_SUCCESS,
    payload: {
        notificationData: NotificationData
    }
}

export interface GetNotificationsData {
    type: GETNOTIFICATIONSDATA
}

export interface GetNotificationsDataSuccess {
    type: GETNOTIFICATIONSDATA_SUCCESS,
    payload: {
        notificationDataArray: NotificationData[]
    }
}

export interface GetNotificationsDataFailure {
    type: GETNOTIFICATIONSDATA_FAILURE
}

export interface MarkNotification {
    type: MARKNOTIFICATION,
    payload: {
        notificationID: number
    }
}

export interface MarkNotificationSuccess {
    type: MARKNOTIFICATION_SUCCESS
}

export interface MarkNotificationFailure {
    type: MARKNOTIFICATION_FAILURE
}

export interface DeleteNotification {
    type: DELETENOTIFICATION,
    payload: {
        notificationID: number
    }
}

export interface DeleteNotificationSuccess {
    type: DELETENOTIFICATION_SUCCESS
}

export interface DeleteNotificationFailure {
    type: DELETENOTIFICATION_FAILURE
}

export type NotificationActions =   NotificationAlert |
                                    NotificationAlertSuccess |
                                    GetUserProfileID |
                                    GetUserProfileIDSuccess |
                                    GetUserProfileIDFailure |
                                    GetNotificationsData |
                                    GetNotificationsDataSuccess |
                                    GetNotificationsDataFailure |
                                    MarkNotification |
                                    MarkNotificationSuccess |
                                    MarkNotificationFailure |
                                    DeleteNotification |
                                    DeleteNotificationSuccess |
                                    DeleteNotificationFailure;