import { call, put, takeLatest, all, takeEvery } from "redux-saga/effects";
import { store } from "../../..";
import axios from "axios";

import socketIOClient from "socket.io-client";
import { HOST, SITE_API_BY_REALM_NAME } from "../../../Configuration/global";

import {
  DELETENOTIFICATION,
  DeleteNotification,
  GETNOTIFICATIONSDATA,
  GetNotificationsData,
  GetUserProfileID,
  GETUSERPROFILEID,
  MARKNOTIFICATION,
  MarkNotification,
  NOTIFICATIONALERT,
  NotificationAlert,
} from "../Actions/def";
import { NotificationData } from "../State/notificationState";
import NotificationGenerator from "../Actions/gen";
import NotificationAPI from "../Actions/API";
import { getKeyCloakRealmFromLS } from "../../../Authentication/Actions/authentication";
import {
  getLocalStorage,
  getUserId,
} from "../../../Authentication/Actions/authentication";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());

export async function getData() {
  // console.log("logged Innnnnn +++++ getData11222222");
  // console.log("logged Innnnnn +++++", getUserId("user_id"));
  // const url ="http://localhost:8000/api/v1/users/cb030d68-4d45-4644-9cf5-2ea03db785c2"; //SITEAPI + "user/profile";
  const url =
    process.env.REACT_APP_SITE_API + "users/" + localStorage.getItem("user_id");
  // const url = "http://localhost:8000/api/v1/users/" + localStorage.getItem("user_id");
  // const url = "http://localhost:8000/api/v1/users/" + getUserId("user_id");
  // console.log("logged Innnnnn +++++ getData url", url);
  try {
    const response = call(NotificationAPI.getUserProfileID, url);
    // console.log(
    //   "sample logged Innnnnn ;;;;;+++++response ",
    //   response,
    //   ">>>",
    //   url
    // );
    console.log("User Details ", response.payload.fn);
    /*const options = {
      headers: {
        Authorization: `Bearer ${getLocalStorage(`accessToken`)}`,
        Origin: process.env.REACT_APP_HOST,
      },
    };
    console.log(
      "Logged Innnnnn IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII"
    );*/
    /*await axios
      .get(url, options)
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        console.log(
          "logged Innnnnn +++++",
          response,
          "-*******",
          response.status,
          response.data.user_id
        );
        if (response.status == 200) {
          // setUserId("user_id", response.data.user_id);
          console.log("logged Innnnnn +++++ goto user profile");
          // notificationWatcher();
          // notificationWatcher();
          getData();
          // sagaMiddleWare.run(notificationWatcher);
          // getUserProfileID();
          console.log("logged Innnnnn +++++77");
        }
        return response;
        // return response.json();
      })
      .then(function (data) {
        console.log("logged Innnnnn +++++====", data);
      })
      .catch(function (err) {
        console.log(err);
      });*/
  } catch (error) {
    console.log(error);
    // yield put(NotificationGenerator.getUserProfileIDFailure());
  }
  /* const url =
  "http://localhost:8000/api/v1/users/cb030d68-4d45-4644-9cf5-2ea03db785c2"; //SITEAPI + "user/profile";
try {
  const response = yield call(NotificationAPI.getUserProfileID, url);
  switch (response.status) {
    case 200: {
      const parsed = response.data.queryResult.id;
      yield put(NotificationGenerator.getUserProfileIDSuccess(parsed));
      break;
    }
    default: {
      yield put(NotificationGenerator.getUserProfileIDFailure());
    }
  }
} catch (error) {
  yield put(NotificationGenerator.getUserProfileIDFailure());
}*/
}

function* getUserProfileID(action: GetUserProfileID) {
  // console.log("logged Innnnnn +++++ getuserprofileId");
  //"http://localhost:8000/api/v1/users/67950aee-ccc0-46e0-b95a-515565bea5e0/";
  /*const user_id = getLocalStorage("user_id");
  console.log("userId", user_id, "getLocalStorage", getLocalStorage());
  const options = {
    headers: {
      Authorization: `Bearer ${getLocalStorage(`accessToken`)}`,
      Origin: process.env.REACT_APP_HOST,
    },
  };
  axios
    .get("http://localhost:8000/api/v1/contracts/getUserIdByToken/", options)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      console.log(
        "logged Innnnnn +++++user",
        response,
        "-*******",
        response.status,
        response.data.user_id
      );
      if (response.status == 200) {
        // setUserId("user_id", response.data.user_id);
      }
      // return response.json();
    })
    .then(function (data) {
      console.log("logged Innnnnn +++++====", data);
      // if (data === "success") {
      //   console.log("logged Innnnnn +++++", data);
      //   //this.setState({ msg: "User has been deleted." });
      // }
    })
    .catch(function (err) {
      console.log(err);
    });*/
  // ------------------------------------
  const url =
    "http://localhost:8000/api/v1/users/cb030d68-4d45-4644-9cf5-2ea03db785c2"; //SITEAPI + "user/profile";
  try {
    const response = yield call(NotificationAPI.getUserProfileID, url);
    switch (response.status) {
      case 200: {
        const parsed = response.data.queryResult.id;
        yield put(NotificationGenerator.getUserProfileIDSuccess(parsed));
        break;
      }
      default: {
        yield put(NotificationGenerator.getUserProfileIDFailure());
      }
    }
  } catch (error) {
    yield put(NotificationGenerator.getUserProfileIDFailure());
  }
  // -----------------------------
}

function* getNotification(action: NotificationAlert) {
  const notificationSocketClient = socketIOClient(
    HOST + "/notification-alert-namespace"
  );
  notificationSocketClient.on(
    "notification-alert",
    (notificationInterface: any) => {
      let notificationData: NotificationData = {
        notificationID: notificationInterface.notificationID,
        requestID: notificationInterface.requestID,
        method: notificationInterface.method,
        type: notificationInterface.type,
        profileID: notificationInterface.profileID,
        taskTitle: notificationInterface.taskTitle,
        fileID: notificationInterface.fileID,
        fileName: notificationInterface.fileName,
        clauseType: notificationInterface.clauseType,
        biType: notificationInterface.biType,
        progress: notificationInterface.progress,
        state: notificationInterface.state,
        alertDate: notificationInterface.alertDate,
        isRead: notificationInterface.isRead,
      };

      // console.log(notificationData.taskTitle);

      store.dispatch(
        NotificationGenerator.notificationAlertSuccess(notificationData)
      );
    }
  );
}

function* getNotificationsData(action: GetNotificationsData) {
  let url = SITEAPI + "notification/data";

  try {
    let response = yield call(NotificationAPI.getNotificationsData, url);

    switch (response.status) {
      case 200: {
        let notificationsDataArray = response.data
          .queryResult as NotificationData[];
        yield put(
          NotificationGenerator.getNotificationsDataSuccess(
            notificationsDataArray
          )
        );
        break;
      }
      default: {
        yield put(NotificationGenerator.getNotificationsDataFailure());
      }
    }
  } catch (error) {
    yield put(NotificationGenerator.getNotificationsDataFailure());
  }
}

function* markNotification(action: MarkNotification) {
  let url = SITEAPI + "notification/mark";
  let notificationID = action.payload.notificationID;

  try {
    let response = yield call(
      NotificationAPI.markNotification,
      url,
      notificationID
    );

    switch (response.status) {
      case 200: {
        yield put(NotificationGenerator.markNotificationSuccess());
        yield put(NotificationGenerator.getNotificationsData());
        break;
      }
      default: {
        yield put(NotificationGenerator.markNotificationFailure());
      }
    }
  } catch (error) {
    yield put(NotificationGenerator.markNotificationFailure());
  }
}

function* deleteNotification(action: DeleteNotification) {
  let url = SITEAPI + "notification/delete";
  let notificationID = action.payload.notificationID;

  try {
    let response = yield call(
      NotificationAPI.deleteNotification,
      url,
      notificationID
    );

    switch (response.status) {
      case 200: {
        yield put(NotificationGenerator.deleteNotificationSuccess());
        yield put(NotificationGenerator.getNotificationsData());
        break;
      }
      default: {
        yield put(NotificationGenerator.deleteNotificationFailure());
      }
    }
  } catch (error) {
    yield put(NotificationGenerator.deleteNotificationFailure());
  }
}
export default function* notificationWatcher() {
  // console.log("logged Innnnnn +++++ notificationWatcher");
  yield all([
    takeLatest(GETUSERPROFILEID, getUserProfileID),
    takeEvery(NOTIFICATIONALERT, getNotification),
    takeLatest(GETNOTIFICATIONSDATA, getNotificationsData),
    takeLatest(MARKNOTIFICATION, markNotification),
    takeLatest(DELETENOTIFICATION, deleteNotification),
  ]);
}
