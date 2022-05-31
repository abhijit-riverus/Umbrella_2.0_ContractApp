import React, { Component } from "react";
import { History } from "history";
import Scrollable from "../../UniversalComponents/Scrollable/scrollable";
import BarLoader from "../../UniversalComponents/Loader/barLoader";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import UploadHeader from "../../Upload/Component/uploadHeader";
import { FileInfo } from "../../Upload/State/uploadState";
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
  userUploads: FileInfo[];
  historyLoader: boolean;
  history: History;
  saveDeleteDetails: (documentName: string, uniqueFileId: number) => void;
}

interface State {
  selectedFilter: string;
  uploadsArray: FileInfo[];
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
    if (selectedFilter !== filter) {
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
    }
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

      typeof uploadsArray
    );

    const uploadedData = JSON.parse(JSON.stringify(uploadsArray));
    let uploaded_data = uploadedData.results;
    if (typeof uploaded_data !== "undefined" && uploaded_data != null) {
    } else {
      uploaded_data = [];
    }
    if (historyLoader) {
      return <BarLoader />;
    } else {
      return (
        <>
          {uploaded_data.length > 0 && (
            <div className="row">
              <div className="col-md-12 mt-2 mb-4">
                <UploadHeader />
              </div>
            </div>
          )}
          {uploaded_data.length > 0 && (
            <>
              {Object.keys(uploaded_data).map(function (key, values) {
                return (
                  <div className="mb-2" key={`contracts${key}`}>
                    <div className="row upload-file-item">
                      <div
                        className="col-md-10 cursor-pointer"
                        style={{ display: "contents" }}
                      >
                        <div className="col-md-2 file-name-style">
                          {uploaded_data[key].file_name}
                        </div>
                        <div className="col-md-2 file-name-style">
                          {uploaded_data[key].created_by}
                        </div>
                        <div className="col-md-2 file-name-style">
                          {uploaded_data[key].created_on}
                        </div>
                        <div className="col-md-2 file-name-style">
                          {uploaded_data[key].file_size}
                        </div>
                        <div className="col-md-2 file-name-style">
                          {uploaded_data[key].status}
                        </div>
                        <div className="col-md-2 tooltip">
                          <Tooltip title={"Delete file"} placement="right-end">
                            <img
                              style={{ cursor: "pointer" }}
                              src="/static_images/delete-icon.svg"
                              alt="delete-icn"
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {uploadsArray.length > 0 && (
            <>
              888888999999
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
              889999+++++
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

    const uploadedData = JSON.parse(JSON.stringify(userUploads));
    let uploaded_data = uploadedData.results;
    var total_size = 0;
    if (typeof uploaded_data !== "undefined" && uploaded_data != null) {
      for (var i = 0; i < uploaded_data.length; i++) {
        total_size += uploaded_data[i].file_size;
      }
    } else {
      uploaded_data = [];
    }

    console.log(
      "🚀 ~ file: historyContainer.tsx ~ line 24 ~ Number of Contract List",
      uploaded_data.length,
      "Total Size ",
      total_size
    );
    return (
      <div>
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
                    <div className="row">
                      <div className="col-md-3">
                        <div className="row">
                          {/* style={source === 'documentLibrary' ? { maxWidth: '58%', padding: '2% 3%' } : {}} */}
                          <div className="col-md-12 quick-look-card-container">
                            <div className="row">
                              <div className="col-md-12 quick-look-title">
                                {uploaded_data.length}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12 quick-look-sub-title mt-2">
                                TOTAL UPLOADS
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="row">
                          {/* style={source === 'documentLibrary' ? { maxWidth: '58%', padding: '2% 3%' } : {}} */}
                          <div className="col-md-12 quick-look-card-container">
                            <div className="row">
                              <div className="col-md-12 quick-look-title">
                                {87471} MB
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12 quick-look-sub-title mt-2">
                                UPLOAD SIZE
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-9"></div>

                      <div
                        className="col-md-3 message-link"
                        onClick={() => (window.location.href = "/addfiles")}
                      >
                        Go back to uploading files
                      </div>
                    </div>
                    {this.switchRender()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
