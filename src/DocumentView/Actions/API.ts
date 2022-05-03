import AxiosGateWay from '../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils';
import axios from 'axios';
import { getKeyCloakRealmFromLS, getLocalStorage } from '../../Authentication/Actions/authentication';
import { SITE_API_BY_REALM_NAME } from '../../Configuration/global';

const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
export default class DocumentAPI {
    public static getSentences(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static getInsights(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static requestTags(url: string, payload: any) {
        return AxiosGateWay.post(url, payload)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static listTagNature(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static listUserGroups(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static listTagType(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static listOtherTags(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static addOrEditData(url: string, payload: any) {
        return AxiosGateWay.post(url, payload)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static createOtherTag(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static listEvents(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static createNewEvent(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static getDocumentTree(url: string, fileID: number) {
        return AxiosGateWay.post(url, { fileID: fileID })
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static getDurationTypes(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static getCurrencyTypes(url: string) {
        return AxiosGateWay.get(url)
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return error.response;
            });
    }
    public static get_all_user_groups = async () => {
        const accessToken = await getLocalStorage('accessToken');
        return axios
            .get(SITEAPI + `/user/groups`, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then((response) => response.data)
            .catch((error) => error.response.data);
    };
}
