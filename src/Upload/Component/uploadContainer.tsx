import React, { Component } from "react";
import { History } from "history";
import { FileInfo } from "../State/uploadState";
import FileListComponent from "./fileListComponent";
import UploadHeader from "./uploadHeader";
import UploadModule from "./uploadModule";
import QuickLook from "./quickLook";
import Scrollable from "../../UniversalComponents/Scrollable/scrollable";
import BarLoader from "../../UniversalComponents/Loader/barLoader";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import { isNullOrUndefined } from "is-what";
import FileStatusModal from "../../UniversalComponents/Modals/FileStatusModal/Container/fileStatusCon";
import { UploadValidityObject } from "../../Utils/UploadCheckUtil.ts/uploadCheckUtil";

interface Props {
  pageWatcher: (page: string) => void;
  uploadFiles: (fileChunk: any, fileInfo: FileInfo[]) => void;
  changeStatus: () => void;
  fileInfo: FileInfo[];
  toBeUploaded: File[];
  userName: string;
  userUploads: any[];
  uploadLoader: boolean;
  history: History;
  checkDuplicate: (fileNameArray: string[], file: File[]) => void;
  filesCount: number;
  duplicateFiles: string[];
  uploadValidityObject: UploadValidityObject;
  storeUploadValidity: (
    uploadValidityObject: UploadValidityObject,
    totalFiles: File[]
  ) => void;
  totalFiles: File[];
  saveDeleteDetails: (documentName: string, uniqueFileId: number) => void;
}

interface State {
  selectedFilter: string;
  invokeInput: boolean;
}

export default class UploadContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedFilter: "totalUploads",
      invokeInput: false,
    };
  }

  selectFilter = (filter: string) => {
    let { selectedFilter } = this.state;
    if (selectedFilter !== filter) {
      this.setState({ selectedFilter: filter });
    } else {
      this.setState({ selectedFilter: filter });
    }
  };

  componentDidMount() {
    this.props.pageWatcher("addfiles");
    this.props.changeStatus();
  }

  componentWillReceiveProps(nextProps: Props) {
    let { totalFiles } = nextProps;
    if (totalFiles !== this.props.totalFiles && totalFiles.length > 0) {
      let link = document.getElementById("fileStatusButton");
      !isNullOrUndefined(link) && link.click();
    }
  }

  switchRender() {
    let {
      fileInfo,
      uploadFiles,
      userName,
      uploadLoader,
      checkDuplicate,
      history,
      toBeUploaded,
      storeUploadValidity,
      saveDeleteDetails,
    } = this.props;
    if (fileInfo.length > 0) {
      if (uploadLoader) {
        return <BarLoader />;
      } else {
        return (
          <div className="row">
            <div className="col-md-12 mt-5 mb-4">
              <UploadHeader />
            </div>
            <div className="col-md-12 upload-list-container">
              <Scrollable maxHeight={370} minHeight={"50vh"}>
                {fileInfo.map((file, i) => (
                  <React.Fragment key={i}>
                    <FileListComponent
                      file={file}
                      history={history}
                      from={"addfiles"}
                      saveDeleteDetails={saveDeleteDetails}
                    />
                  </React.Fragment>
                ))}
              </Scrollable>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div onClick={() => this.setState({ invokeInput: false })}>
          <UploadModule
            toBeUploaded={toBeUploaded}
            checkDuplicate={checkDuplicate}
            fileList={fileInfo}
            invokeInput={false}
            userName={userName}
            uploadFiles={uploadFiles}
            storeUploadValidity={storeUploadValidity}
          />
        </div>
      );
    }
  }

  render() {
    let {
      fileInfo,
      uploadFiles,
      userName,
      checkDuplicate,
      history,
      toBeUploaded,
      storeUploadValidity,
    } = this.props;
    let { selectedFilter } = this.state;
    return (
      <div className="row">
        <div className="col-md-1" style={{ zIndex: 2 }}>
          <SideNavbar history={history} />
        </div>
        <div className="col-md-11 mt-5" style={{ zIndex: 1 }}>
          <div className="row">
            <div className="col-md-10 mt-3 ml-5">
              <div className="row">
                <div className="col-md-12 pl-0">
                  <h4>Add Files</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 mt-3 ml-5">
              <div className="row">
                <div className="col-md-10">
                  <QuickLook
                    fileInfo={fileInfo}
                    selectFilter={this.selectFilter}
                    selectedFilter={selectedFilter}
                  />
                </div>
                {fileInfo.length > 0 && (
                  <div
                    className="col-md-1 p-0"
                    onClick={() => this.setState({ invokeInput: true })}
                  >
                    <UploadModule
                      toBeUploaded={toBeUploaded}
                      checkDuplicate={checkDuplicate}
                      fileList={fileInfo}
                      invokeInput={true}
                      userName={userName}
                      uploadFiles={uploadFiles}
                      storeUploadValidity={storeUploadValidity}
                    />
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-md-9"></div>
                <div
                  className="col-md-3 message-link"
                  onClick={() => (window.location.href = "/uploads")}
                >
                  {fileInfo.length > 0 && "View all processed files"}
                </div>
                <button
                  style={{ display: "none" }}
                  type="button"
                  data-toggle="modal"
                  data-target="#fileStatusModal"
                  id="fileStatusButton"
                ></button>
              </div>
              {this.switchRender()}
            </div>
            <div className="col-md-1 p-0"></div>
          </div>
        </div>
        <FileStatusModal history={history} />
      </div>
    );
  }
}
