import React, { Component } from "react";
import { History } from "history";
import Scrollable from "../../UniversalComponents/Scrollable/scrollable";
import BarLoader from "../../UniversalComponents/Loader/barLoader";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import UploadHeader from "../../Upload/Component/uploadHeader";
import { FileInfo, FileList } from "../../Upload/State/uploadState";
import FileListComponent from "../../Upload/Component/fileListComponent";
import QuickLook from "../../Upload/Component/quickLook";
import { DONE } from "../../Constants/const";

//------------------
import { SITE_API_BY_REALM_NAME, HOST } from "../../Configuration/global";
import Tooltip from "@material-ui/core/Tooltip";
import {
  getKeyCloakRealmFromLS,
  getLocalStorage,
} from "../../Authentication/Actions/authentication";
import axios from "axios";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());
//-----

let url = SITEAPI;
const options = {
  headers: {
    Authorization: `Bearer ${getLocalStorage(`accessToken`)}`,
    Origin: process.env.REACT_APP_HOST,
  },
};

interface Props {
  pageWatcher: (page: string) => void;
  getUserUploads: () => void;
  changeStatus: () => void;
  userName: string;
  userUploads: FileList[];
  historyLoader: boolean;
  history: History;
  saveDeleteDetails: (documentName: string, uniqueFileId: string) => void;
}

interface State {
  selectedFilter: string;
  uploadsArray: FileList[];
}

export default class HistoryContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedFilter: "totalUploads",
      uploadsArray: props.userUploads,
    };
  }

  selectFilter = (filter: string) => {
    let { selectedFilter } = this.state;
    let { userUploads } = this.props;
    /* if (selectedFilter !== filter) {
      this.setState({ selectedFilter: filter });
      switch (filter) {
        case "totalUploads": {
          this.setState({ uploadsArray: userUploads });
          break;
        }
        case "processed": {
          let uploadsArray: FileInfo[] = [];
          userUploads.map((uploads) => {
            if (uploads.fileState.progressState.process === DONE) {
              uploadsArray.push(uploads);
            }
          });
          this.setState({ uploadsArray: uploadsArray });
          break;
        }
        case "uploadSize": {
          break;
        }
        default: {
          this.setState({ uploadsArray: [] });
          break;
        }
      }
    } else {
      this.setState({ selectedFilter: filter });
    }*/
  };

  componentDidMount() {
    let { getUserUploads, pageWatcher, changeStatus } = this.props;
    console.log("🚀 ~ file: historyContainer.tsx");
    getUserUploads();
    pageWatcher("uploads");
    changeStatus();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.userUploads !== nextProps.userUploads) {
      this.setState({ uploadsArray: nextProps.userUploads });
    }
  }

  switchRender() {
    let { historyLoader, history, saveDeleteDetails } = this.props;
    let { uploadsArray } = this.state;

    console.log(
      "🚀 ~ file: historySaga.tsx ~ line 24 ~ Contract List",

      uploadsArray.length
    );

    if (historyLoader) {
      return <BarLoader />;
    } else {
      return (
        <>
          {uploadsArray.length > 0 && (
            <div className="row">
              <div className="col-md-12 mt-2 mb-4">
                <UploadHeader />
              </div>
            </div>
          )}

          {uploadsArray.length > 0 && (
            <>
              <div className="row">
                <div className="col-md-12 upload-list-container">
                  <Scrollable maxHeight={370} minHeight={"50vh"}>
                    {uploadsArray.map((file, i) => (
                      <React.Fragment key={i}>
                        <FileListComponent
                          file={file}
                          history={history}
                          from={"uploads"}
                          saveDeleteDetails={saveDeleteDetails}
                        />
                      </React.Fragment>
                    ))}
                  </Scrollable>
                </div>
              </div>
            </>
          )}
          {uploadsArray.length === 0 && (
            <div className="row">
              <div className="col-md-12 text-center mt-5">
                <div className="tagline">
                  Digitize your contracts and get instant insights!
                </div>
                <img
                  className="cursor-pointer"
                  src="/static_images/go-back-upload-img.svg"
                  onClick={() => (window.location.href = "/addfiles")}
                />
              </div>
            </div>
          )}
        </>
      );
    }
  }
  render() {
    let { userUploads, history } = this.props;
    let { selectedFilter } = this.state;
    return (
      <div className="row">
        <div className="col-md-1" style={{ zIndex: 2 }}>
          <SideNavbar history={history} />
        </div>
        <div className="col-md-11 mt-5">
          <div className="row">
            <div className="col-md-10 mt-3 ml-5">
              <div className="row">
                <div className="col-md-12 pl-0">
                  <h4>Uploads</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 mt-3 ml-5">
              <div className="row">
                <div className="col-md-12">
                  <QuickLook
                    fileInfo={userUploads}
                    selectFilter={this.selectFilter}
                    selectedFilter={selectedFilter}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-9"></div>
                {userUploads.length > 0 && (
                  <div
                    className="col-md-3 message-link"
                    onClick={() => (window.location.href = "/addfiles")}
                  >
                    Go back to uploading files
                  </div>
                )}
              </div>
              {this.switchRender()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
