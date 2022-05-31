import AxiosGateWay from "../../HeimdallChild/HeimdallUtil/axiosUtils";

export default class NotificationAPI {
  public static getUserProfileID(url: string) {
    console.log("logged Innnnnn +++++ getUserProfileID", url);
    return AxiosGateWay.get(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }

  public static getNotificationsData(url: string) {
    return AxiosGateWay.get(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }

  public static markNotification(url: string, notificationID: number) {
    return AxiosGateWay.post(url, { notificationID })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }

  public static deleteNotification(url: string, notificationID: number) {
    return AxiosGateWay.post(url, { notificationID })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
}
