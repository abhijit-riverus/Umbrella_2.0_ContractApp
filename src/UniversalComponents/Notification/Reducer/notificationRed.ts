import NotificationState, { defaultNotificationState } from "../State/notificationState";
import { NOTIFICATIONALERT_SUCCESS, NotificationActions, GETUSERPROFILEID_SUCCESS, GETNOTIFICATIONSDATA, GETNOTIFICATIONSDATA_SUCCESS, GETNOTIFICATIONSDATA_FAILURE, MARKNOTIFICATION, MARKNOTIFICATION_SUCCESS, MARKNOTIFICATION_FAILURE, DELETENOTIFICATION, DELETENOTIFICATION_SUCCESS, DELETENOTIFICATION_FAILURE } from "../Actions/def";

export default function notificationReducer(state: NotificationState = defaultNotificationState(), action: NotificationActions): NotificationState {
    switch(action.type) {
        case NOTIFICATIONALERT_SUCCESS: {
            if(action.payload.notificationData.method === 'in_app' || action.payload.notificationData.method === 'in_app and email'){
                return {...state, notificationData: action.payload.notificationData}
            }
            return {...state}
        }
        case GETUSERPROFILEID_SUCCESS: {
            return {...state, profileID: action.payload.profileID}
        }
        case GETNOTIFICATIONSDATA: {
            return state;
        }
        case GETNOTIFICATIONSDATA_SUCCESS: {
            return {...state, notificationDataArray: action.payload.notificationDataArray}
        }
        case GETNOTIFICATIONSDATA_FAILURE: {
            return state;
        }
        case MARKNOTIFICATION: {
            return state;
        }
        case MARKNOTIFICATION_SUCCESS: {
            return state;
        }
        case MARKNOTIFICATION_FAILURE: {
            return state;
        }
        case DELETENOTIFICATION: {
            return state;
        }
        case DELETENOTIFICATION_SUCCESS: {
            return state;
        }
        case DELETENOTIFICATION_FAILURE: {
            return state;
        }
        default: return state;
    }
}