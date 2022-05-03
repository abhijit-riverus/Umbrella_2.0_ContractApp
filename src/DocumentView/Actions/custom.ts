import DocumentAPI from './API';
const GET_ALL_USER_GROUPS = 'GET_ALL_USER_GROUPS';
export const getAllUserGroups = () => {
    return {
        type: GET_ALL_USER_GROUPS,
        payload: DocumentAPI.get_all_user_groups(),
    };
};
