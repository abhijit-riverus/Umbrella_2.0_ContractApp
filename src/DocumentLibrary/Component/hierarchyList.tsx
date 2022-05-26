import { Tooltip } from "@material-ui/core";
import React, { Component } from "react";
import { isNullOrUndefined } from "is-what";
import { DarkTooltip } from "../../DocumentView/Component/documentInsights";
import {
  truncateFileName,
  truncateString,
} from "../../Utils/DataModifierUtil/dataModUtil";
import {
  BasicFileInfo,
  DocumentHierarchyData,
  LibraryTagFilterStructure,
  partyInfo,
} from "../State/documentLibraryState";
import {
  addOrRemoveFileIds,
  addOrRemoveFiles,
  getFileIdsFromFiles,
} from "./Utils/libraryUtils";

type HierarchyListProps = {
  documentChildren: DocumentHierarchyData[];
};

type FileTitleProps = {
  currentFile: BasicFileInfo;
  fileName: string;
  level: number;
  savedMultipleSelectedFiles: BasicFileInfo[];
  saveMultipleSelectedFiles: (
    savedMultipleSelectedFiles: BasicFileInfo[]
  ) => void;
};

interface Props {
  documentChildren: DocumentHierarchyData[];
  initialFileIds: number[];
  savedMultipleSelectedFiles: BasicFileInfo[];
  saveMultipleSelectedFiles: (
    savedMultipleSelectedFiles: BasicFileInfo[]
  ) => void;
  savedCollapsedFileIds: number[];
  saveCollapsedFileIds: (savedCollapsedFileIds: number[]) => void;
  appliedLibraryTagFilters: LibraryTagFilterStructure[];
  applyLibraryTagFilters: (
    appliedLibraryTagFilters: LibraryTagFilterStructure[],
    initialFileIds: number[]
  ) => void;
  setModal: (type: string, title: string, parties: partyInfo[]) => void;
}

interface State {}

export default class HierarchyList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  getExtraCount = (numberOfParties: number) => {
    let extraCount = numberOfParties - 2;
    return "+" + extraCount;
  };

  setModal(check: boolean, type: string, title: string, parties: partyInfo[]) {
    if (check) {
      this.props.setModal(type, title, parties);
      let link = document.getElementById("documentLibraryTableButton");
      !isNullOrUndefined(link) && link.click();
    }
  }

  render() {
    let {
      documentChildren,
      savedMultipleSelectedFiles,
      saveMultipleSelectedFiles,
      savedCollapsedFileIds,
      saveCollapsedFileIds,
      appliedLibraryTagFilters,
      applyLibraryTagFilters,
      initialFileIds,
      setModal,
    } = this.props;
    return (
      <>
        {documentChildren.length > 0 &&
          documentChildren.map((document, i) => (
            <>
              <div
                className="col-md-12 px-0"
                key={i}
                style={{ display: "inline-flex" }}
              >
                <div
                  className={"col-md-5 library-file-item"}
                  style={{
                    marginTop: document.levelId === 0 ? "none" : "none",
                    fontWeight: document.levelId === 0 ? 500 : 300,
                    borderBottom:
                      document.levelId !== 0 ? "none" : "1px solid #f1f1f1",
                  }}
                >
                  <FileTitle
                    fileName={document.title}
                    level={document.levelId}
                    currentFile={{
                      fileId: document.fileId,
                      fileName: document.fileName,
                      levelId: document.levelId,
                    }}
                    savedMultipleSelectedFiles={savedMultipleSelectedFiles}
                    saveMultipleSelectedFiles={saveMultipleSelectedFiles}
                  />
                  &nbsp;&nbsp;
                  {document.children.length > 0 && (
                    <img
                      src="/static_images/tag-dropdown-active.svg"
                      alt="dropdown"
                      style={{
                        transform:
                          savedCollapsedFileIds.indexOf(document.fileId) === -1
                            ? "rotate(180deg)"
                            : "none",
                        zIndex: 3,
                        width: "10px",
                        position: "relative",
                        bottom: "-1px",
                      }}
                      onClick={() =>
                        this.props.saveCollapsedFileIds(
                          addOrRemoveFileIds(
                            document.fileId,
                            savedCollapsedFileIds
                          )
                        )
                      }
                    />
                  )}
                  &nbsp;
                  <DarkTooltip title={document.fileName} placement="right-end">
                    <img src="/static_images/info-icn.svg" alt="empty" />
                  </DarkTooltip>
                </div>
                <div
                  className="col-md-5 file-parties"
                  style={{
                    height: "44px",
                    overflow: "hidden",
                    paddingLeft: "2.2rem",
                  }}
                >
                  {document.parties.length === 0 && (
                    <img src="/static_images/empty-dash.svg"></img>
                  )}
                  {document.parties.length < 2 &&
                    document.parties.map(
                      (party, i) =>
                        i < 2 && (
                          <span>
                            {party.partyName.length > 15 ? (
                              <>
                                {i > 0 && <>&nbsp;</>}
                                {truncateString(party.partyName, 15)}
                                {i < 1 && <>,</>}
                              </>
                            ) : (
                              <>
                                {i > 0 && <>&nbsp;</>}
                                {party.partyName}
                                {i < 1 && <>,</>}
                              </>
                            )}
                          </span>
                        )
                    )}
                  {document.parties.length >= 2 &&
                    document.parties.map((party, i) => (
                      <span>
                        {i < 2 ? (
                          party.partyName.length > 15 ? (
                            <>
                              {i > 0 && <>&nbsp;</>}
                              {truncateString(party.partyName, 15)}
                              {i < 1 && <>,</>}
                            </>
                          ) : (
                            <>
                              {i > 0 && <>&nbsp;</>}
                              {party.partyName}
                              {i < 1 && <>,</>}
                            </>
                          )
                        ) : i === 2 ? (
                          <span
                            className="extra-count cursor-pointer"
                            onClick={() =>
                              this.setModal(
                                true,
                                "Parties",
                                document.title,
                                document.parties
                              )
                            }
                          >
                            {this.getExtraCount(document.parties.length)}
                          </span>
                        ) : (
                          <> </>
                        )}
                      </span>
                    ))}
                </div>
                <div
                  className="col-md-2 file-start-date"
                  style={{ paddingLeft: "1.8rem" }}
                >
                  {document.startDate === "" && (
                    <span style={{ margin: "auto" }}>
                      <img
                        src="/static_images/empty-dash-grey-icn.svg"
                        alt="empty"
                      />
                    </span>
                  )}
                  <span>{document.startDate}</span>
                </div>
              </div>
              {document.children.length > 0 &&
                this.props.savedCollapsedFileIds.indexOf(document.fileId) ===
                  -1 && (
                  <HierarchyList
                    documentChildren={document.children}
                    initialFileIds={initialFileIds}
                    savedMultipleSelectedFiles={savedMultipleSelectedFiles}
                    saveMultipleSelectedFiles={saveMultipleSelectedFiles}
                    savedCollapsedFileIds={savedCollapsedFileIds}
                    saveCollapsedFileIds={saveCollapsedFileIds}
                    appliedLibraryTagFilters={appliedLibraryTagFilters}
                    applyLibraryTagFilters={applyLibraryTagFilters}
                    setModal={setModal}
                  />
                )}
            </>
          ))}
      </>
    );
  }
}

export function FileTitle({
  fileName,
  level,
  currentFile,
  savedMultipleSelectedFiles,
  saveMultipleSelectedFiles,
}: FileTitleProps) {
  let indents = [];
  for (let i = 0; i < level; i++) {
    indents.push(<IndentSpace key={i} />);
  }
  return (
    <span>
      <DarkTooltip title={fileName} placement="right-end">
        <span className="file-name">
          {level !== 0 && indents}
          {/* {level !== 0 && <img className="hierarchy-icon-style" src = "/static_images/hierarchy-tree-icon.svg" alt="tree-icon" />} */}
          &nbsp;&nbsp;
          <input
            type="checkbox"
            value={currentFile.fileId}
            checked={
              getFileIdsFromFiles(savedMultipleSelectedFiles).indexOf(
                currentFile.fileId
              ) > -1
                ? true
                : false
            }
            onChange={() =>
              saveMultipleSelectedFiles(
                addOrRemoveFiles(currentFile, savedMultipleSelectedFiles)
              )
            }
          />
          &nbsp;&nbsp;
          {fileName.length > 25 ? (
            <span
              className="file-dotted-line"
              onClick={() =>
                window.open(
                  "/document/documentlibrary/" +
                    btoa(currentFile.fileId.toString()),
                  "_blank"
                )
              }
            >
              {truncateString(fileName, 25)}
            </span>
          ) : (
            <span
              onClick={() =>
                window.open(
                  "/document/documentlibrary/" +
                    btoa(currentFile.fileId.toString()),
                  "_blank"
                )
              }
            >
              {fileName === "" ? (
                <img src="/static_images/empty-dash-grey-icn.svg" alt="empty" />
              ) : (
                fileName
              )}
            </span>
          )}
        </span>
      </DarkTooltip>
    </span>
  );
}

export function IndentSpace() {
  return <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
}
