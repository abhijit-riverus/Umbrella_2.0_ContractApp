export default interface NotificationState {
    profileID: number,
    notificationData: NotificationData,
    notificationDataArray: NotificationData[],
} 

export interface NotificationData{
    notificationID: number,
    requestID: number, 
    method: string, 
    type: string, 
    profileID: number,
    taskTitle: string,
    fileID: number, 
    fileName: string,
    clauseType: string, 
    biType: string, 
    progress: string, 
    state: string, 
    alertDate: string,
    isRead: boolean;
}

// export interface NotificationsData {
//         notificationID: number;
//         requestID: number;
//         type: string;
//         taskTitle: string;
//         fileName: string;
//         clauseType: string;
//         biType: string;
//         progress: string;
//         state: string;
//         alertDate: string;
//         isRead: boolean;
//     }

export function defaultNotificationState(): NotificationState {
    return {
        profileID: -1,
        notificationData: {
            notificationID: 0,
            requestID: 0,
            method: '',
            type: '',
            profileID: -1,
            taskTitle: '',
            fileID: 0,
            fileName: '',
            clauseType: '',
            biType: '',
            progress: '',
            state: '',
            alertDate: '',
            isRead: false,
            
        },
        notificationDataArray: []
    }
}