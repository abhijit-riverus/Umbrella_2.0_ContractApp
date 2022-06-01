import React from "react";
import { humanFileSize } from "../../Utils/DataModifierUtil/dataModUtil";
import { FAILED, DONE } from "../../Constants/const";
import QuickLookCard from "../../Upload/Component/quickLookCards";
import { FileInfo, FileList } from "../State/uploadState";

interface Props {
  fileInfo: FileList[];
  selectedFilter: string;
  selectFilter: (selectedFilter: string) => void;
}

export default function QuickLook(props: Props) {
  let { fileInfo, selectFilter, selectedFilter } = props;
  return (
    <div className="row">
      <div className="col-md-3">
        <QuickLookCard
          title={fileInfo.length.toString()}
          subTitle={"totalUploads"}
          selectedFilter={selectedFilter}
          selectFilter={selectFilter}
          isClickable={fileInfo.length > 0 ? true : false}
        />
      </div>
      {/* <div className="col-md-3">
        <QuickLookCard title={getErrorCount(fileInfo).toString()} subTitle={'Errors'} />
    </div> */}
      {/* <div className="col-md-3">
        <QuickLookCard title={getProcessedCount(fileInfo).toString()} subTitle={'processed'} selectedFilter={selectedFilter}  selectFilter={selectFilter} isClickable={getProcessedCount(fileInfo) > 0 ? true : false} />
    </div> */}
      <div className="col-md-3">
        <QuickLookCard
          title={getUploadSize(fileInfo).toString()}
          subTitle={"uploadSize"}
          selectedFilter={selectedFilter}
          selectFilter={selectFilter}
          isClickable={false}
        />
      </div>
    </div>
  );
}

function getErrorCount(fileInfo: FileList[]) {
  let count = 0;
  for (let i = 0; i < fileInfo.length; i++) {
    // if (fileInfo[i].fileState.progressState.process === FAILED) {
    count++;
    // }
  }
  return count;
}

function getUploadSize(fileInfo: FileList[]) {
  let size = 0;
  for (let i = 0; i < fileInfo.length; i++) {
    size = size + fileInfo[i].file_size;
    // size = size + fileInfo[i].fileState.size;
  }
  return humanFileSize(size, true);
}
