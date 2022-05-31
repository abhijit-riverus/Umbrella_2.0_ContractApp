import React, { Component } from "react";
import SideNavbar from "../../UniversalComponents/SideNavbar/Container/sideNavBarCon";
import { History } from "history";
import Scrollable from "../../UniversalComponents/Scrollable/scrollable";
import {
  DocumentHierarchyData,
  LibraryTagFilterStructure,
  LibraryTagData,
  TagInfo,
  BasicFileInfo,
  partyInfo,
} from "../State/documentLibraryState";
import DocumentLibraryHeader from "./documentLibraryHeader";
import HierarchyList from "./hierarchyList";
import {
  documentHierarchyTestJSON,
  editLibraryTagFilters,
  getAllFilesAtRoot,
  getAppliedTagFilterCountText,
  getFileIdsFromFiles,
  getTagIconPath,
  isFileArrayAtRootLevel,
  isTagAlreadySelected,
  sortTagsByFilters,
} from "./Utils/libraryUtils";
import HierarchyTagsList from "./hierarchyTagsList";
import BarLoader from "../../UniversalComponents/Loader/barLoader";
import AddTagModal from "../../UniversalComponents/Modals/AddTagModal/addTagModalCon";
import { isNullOrUndefined } from "is-what";
import AddHierarchyModal from "../../UniversalComponents/Modals/AddHierarchyModal/addHierarchyModalCon";
import { NoFiltersMatched } from "./TaggingComponents/noFiltersMatched";
import DocumentLibraryQuickLook from "./documentLibraryQuickLook";
import DocumentLibraryTablemodal from "../../UniversalComponents/Modals/DocumentLibraryModals/documentLibraryTableModal";

interface Props {
  pageWatcher: (page: string) => void;
  history: History;
  initialFileIds: number[];
  getLibraryFileId: (sort: string, order: string) => void;
  getDocumentHierarchy: (
    sort: string,
    order: string,
    fileIds: number[]
  ) => void;
  libraryTags: LibraryTagData[];
  getLibraryTags: () => void;
  documentLibraryLoader: boolean;
  documentHierarchy: DocumentHierarchyData[];
  savedMultipleSelectedFiles: BasicFileInfo[];
  saveMultipleSelectedFiles: (
    savedMultipleSelectionFiles: BasicFileInfo[]
  ) => void;
  savedCollapsedFileIds: number[];
  saveCollapsedFileIds: (savedCollapsedFileIds: number[]) => void;
  appliedLibraryTagFilters: LibraryTagFilterStructure[];
  applyLibraryTagFilters: (
    appliedLibraryTagFilters: LibraryTagFilterStructure[],
    initialFileIds: number[]
  ) => void;
  filteredFileIds: number[];
  selectedFile: BasicFileInfo | null;
  saveSelectedFile: (selectedFile: BasicFileInfo | null) => void;
  selectedLibraryAction: string;
  isBulkAction: boolean;
  saveSelectedLibraryAction: (
    selectedLibraryAction: string,
    isBulkAction: boolean
  ) => void;
  savedFileTagData: any[];
  saveFileTagData: (savedFileTagData: any[]) => void;
  getParentFileList: (
    selectedFileId: number,
    fileIds: number[],
    bulkFileIds: number[]
  ) => void;
  getChildrenFileList: (selectedFileId: number, fileIds: number[]) => void;
  getGeneralFilter: (fileIds: number[]) => void;
  generalFilters: any;
  generalFilterLoader: boolean;
  applyGeneralFilter: (
    fileIds: number[],
    filterType: string,
    sort: string,
    order: string
  ) => void;
  generalFilterFileIds: number[];
}

interface State {
  expandTags: boolean;
  documentHierarchyObj: DocumentHierarchyData[];
  tagSearchTerm: string;
  matchedTags: LibraryTagData[];
  seletedTagData: any[];
  filesAtRoot: BasicFileInfo[];
  selectedFilter: string;
  modalTitle: string;
  modalParties: partyInfo[];
  modalTags: TagInfo[];
  modalType: string;
  sort: string;
  order: string;
  titleOrder: boolean;
  dateOrder: boolean;
}

export default class DocumentLibrary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expandTags: false,
      documentHierarchyObj: documentHierarchyTestJSON,
      tagSearchTerm: "",
      matchedTags: this.props.libraryTags,
      seletedTagData: [],
      filesAtRoot: [],
      selectedFilter: "allDocuments",
      modalTitle: "",
      modalParties: [],
      modalTags: [],
      modalType: "",
      sort: "date",
      order: "descending", // date or title
      titleOrder: true, // false == descending or true == ascending
      dateOrder: false,
    };
  }

  componentDidMount() {
    // console.log("Did component changed");
    let { pageWatcher, initialFileIds, getGeneralFilter } = this.props;
    let { sort, order } = this.state;
    pageWatcher("documentlibrary");
    this.props.getLibraryFileId(sort, order);
    this.props.getLibraryTags();
    //getGeneralFilter(initialFileIds);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (
      nextProps.filteredFileIds !== null &&
      nextProps.filteredFileIds.length > 0 &&
      this.props.filteredFileIds !== nextProps.filteredFileIds
    ) {
      this.props.getDocumentHierarchy(
        this.state.sort,
        this.state.order,
        nextProps.filteredFileIds
      );
      if (nextProps.appliedLibraryTagFilters.length > 0) {
        this.props.getGeneralFilter(nextProps.filteredFileIds);
        this.setState({ selectedFilter: "allDocuments" });
      }

      if (
        nextProps.filteredFileIds !== null &&
        nextProps.filteredFileIds.length > 0 &&
        this.props.filteredFileIds !== nextProps.filteredFileIds &&
        this.props.generalFilterFileIds.length > 0
      ) {
        this.props.applyGeneralFilter(
          nextProps.filteredFileIds,
          "allDocuments",
          this.state.sort,
          this.state.order
        );
      }
    }
    if (
      this.props.initialFileIds !== nextProps.initialFileIds &&
      nextProps.initialFileIds !== null
    ) {
      this.props.getGeneralFilter(nextProps.initialFileIds);
      this.setState({ selectedFilter: "allDocuments" });
    }
    if (
      this.props.appliedLibraryTagFilters !== nextProps.appliedLibraryTagFilters
    ) {
      let sortedTags = sortTagsByFilters(
        nextProps.appliedLibraryTagFilters,
        nextProps.libraryTags
      );
      this.setState({ matchedTags: sortedTags });
    }

    if (
      nextProps.documentHierarchy !== null &&
      this.props.documentHierarchy !== nextProps.documentHierarchy &&
      nextProps.documentHierarchy !== undefined
    ) {
      if (nextProps.documentHierarchy.length > 0) {
        this.setState({
          filesAtRoot: getAllFilesAtRoot(nextProps.documentHierarchy),
        });
      } else {
        this.setState({ filesAtRoot: [] });
      }
    }
    if (
      this.props.libraryTags !== nextProps.libraryTags &&
      nextProps.libraryTags !== undefined
    ) {
      this.setState({ matchedTags: nextProps.libraryTags });
    }
  }

  editTagFilter(tag: LibraryTagData) {
    let { appliedLibraryTagFilters, initialFileIds } = this.props;
    let editedLibraryTagFilters = editLibraryTagFilters(
      appliedLibraryTagFilters,
      { tagId: tag.id, tagName: tag.name, tagCategory: "" }
    );
    this.props.applyLibraryTagFilters(editedLibraryTagFilters, initialFileIds);
  }

  getSuggestedTags(event: any) {
    let { expandTags, matchedTags } = this.state;
    let { libraryTags } = this.props;
    if (expandTags === true) {
      let searchTagName = event.target.value;
      this.setState({ tagSearchTerm: searchTagName });
      if (searchTagName === "") {
        this.setState({ matchedTags: libraryTags });
      } else {
        if (libraryTags !== null) {
          //filter mactched tags
          let tagsList = libraryTags;
          let filteredTags = tagsList.filter(
            (tag) =>
              tag.name.toLowerCase().indexOf(searchTagName.toLowerCase()) > -1
          );
          this.setState({ matchedTags: filteredTags });
        } else {
          this.setState({ matchedTags: libraryTags });
        }
      }
    }
  }

  addTagInBulk() {
    let { savedMultipleSelectedFiles } = this.props;
    if (savedMultipleSelectedFiles.length > 0) {
      let link = document.getElementById("addTagBulkButton");
      !isNullOrUndefined(link) && link.click();
      this.props.saveSelectedLibraryAction("tags", true);
    } else {
      //show error message, no files selected
    }
  }

  addParentInBulk() {
    let { savedMultipleSelectedFiles, initialFileIds } = this.props;
    if (
      savedMultipleSelectedFiles.length > 0 &&
      isFileArrayAtRootLevel(savedMultipleSelectedFiles) === true
    ) {
      let savedMultipleSelectedFilesIds = getFileIdsFromFiles(
        savedMultipleSelectedFiles
      );
      this.props.getParentFileList(
        -1,
        initialFileIds,
        savedMultipleSelectedFilesIds
      );
      let link = document.getElementById("addParentBulkButton");
      !isNullOrUndefined(link) && link.click();
      this.props.saveSelectedLibraryAction("hierarchy", true);
    } else {
      //show error message, no files selected
    }
  }

  selectFilter = (filter: string) => {
    let { selectedFilter } = this.state;
    let {
      applyGeneralFilter,
      initialFileIds,
      filteredFileIds,
      generalFilterFileIds,
    } = this.props;
    if (selectedFilter !== filter) {
      this.setState({ selectedFilter: filter });
      applyGeneralFilter(
        filteredFileIds.length > 0 ? filteredFileIds : initialFileIds,
        filter,
        this.state.sort,
        this.state.order
      );
    } else {
      this.setState({ selectedFilter: "allDocuments" });
      applyGeneralFilter(
        filteredFileIds.length > 0 ? filteredFileIds : initialFileIds,
        "allDocuments",
        this.state.sort,
        this.state.order
      );
    }
  };

  render() {
    let {
      history,
      initialFileIds,
      libraryTags,
      getLibraryTags,
      documentHierarchy,
      documentLibraryLoader,
      savedMultipleSelectedFiles,
      saveMultipleSelectedFiles,
      savedCollapsedFileIds,
      saveCollapsedFileIds,
      appliedLibraryTagFilters,
      applyLibraryTagFilters,
      selectedFile,
      saveSelectedFile,
      saveSelectedLibraryAction,
      savedFileTagData,
      saveFileTagData,
      getParentFileList,
      getChildrenFileList,
      filteredFileIds,
      getDocumentHierarchy,
      generalFilters,
      generalFilterFileIds,
    } = this.props;
    let {
      expandTags,
      tagSearchTerm,
      matchedTags,
      filesAtRoot,
      selectedFilter,
      modalTitle,
      modalParties,
      modalTags,
      modalType,
    } = this.state;

    // let generalFilter = {
    //     totalDocuments: 1244,
    //     unreviewed: 10,
    //     reviewed: 20,
    //     withTasks: 10,
    //     withoutTasks: 0,
    // }
    // documentLibraryLoader = false;
    // console.log("documentLibraryLoader", documentLibraryLoader);
    return (
      <div className="row">
        <div className="col-md-1" style={{ zIndex: 2 }}>
          <SideNavbar history={history} />
        </div>
        <div className="col-md-11 mt-5" style={{ zIndex: 1 }}>
          {documentLibraryLoader ? (
            <>
              <BarLoader />
            </>
          ) : (
            <>
              {!(initialFileIds !== null && initialFileIds.length > 0) &&
              !(documentHierarchy !== null && documentHierarchy.length > 0) ? (
                <div className="row">
                  <div className="col-md-10 text-center mt-5 ml-5">
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
              ) : (
                <>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-10 mt-3">
                          <div className="row">
                            <div className="col-md-12 pl-0">
                              <h4>Document Library</h4>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-2 mt-3"
                          style={{ paddingRight: "2.1rem" }}
                        >
                          <button
                            type="button"
                            className="upload-yellow-btn float-right"
                            style={{ padding: "10px 40px" }}
                            onClick={() => (window.location.href = "/addfiles")}
                          >
                            <img
                              src="/static_images/upload-btn-img.svg"
                              alt="btn-img"
                            />
                            &nbsp;Upload
                          </button>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mt-3">
                          <DocumentLibraryQuickLook
                            selectFilter={this.selectFilter}
                            selectedFilter={selectedFilter}
                            generalFilter={generalFilters}
                            initialFileidsCount={initialFileIds.length}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mt-5">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="row">
                            <span className="mr-3">
                              <button
                                type="button"
                                className="library-yellow-btn"
                                style={{ padding: "6px 15px" }}
                                onClick={() => this.addTagInBulk()}
                              >
                                <img
                                  src="/static_images/tag-btn-img.svg"
                                  alt="add-tag-bulk"
                                />
                                &nbsp;Add Tag
                              </button>
                            </span>
                            <span className="mr-2">
                              <button
                                type="button"
                                className={
                                  isFileArrayAtRootLevel(
                                    savedMultipleSelectedFiles
                                  ) === true
                                    ? "library-yellow-btn"
                                    : "library-disable-btn"
                                }
                                style={{ padding: "7px 15px" }}
                                onClick={() => this.addParentInBulk()}
                              >
                                <img
                                  src="/static_images/hierarchy-btn-img.svg"
                                  alt="btn-img"
                                />
                                &nbsp;Add Parent
                              </button>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-4"></div>
                        <div
                          className="col-md-2 px-0 ml-5 filter-shadow-boxing cursor-pointer"
                          style={{ right: "-2.5vw" }}
                        >
                          <div className="row">
                            <div className="col-md-12">
                              <span
                                className="filter-tags-input"
                                style={{
                                  background: "white",
                                  border: "1px solid #DDDDDD",
                                }}
                                onClick={() =>
                                  this.setState({
                                    expandTags: !this.state.expandTags,
                                    tagSearchTerm:
                                      this.state.expandTags === true
                                        ? ""
                                        : tagSearchTerm,
                                  })
                                }
                              >
                                {expandTags === false ? (
                                  <img
                                    src="/static_images/filter-by-tag-img.svg"
                                    alt="dropdown"
                                  />
                                ) : (
                                  <img
                                    src="/static_images/search-inline-icn.svg"
                                    alt="dropdown"
                                  />
                                )}
                                <input
                                  type="text"
                                  className="tag-input"
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    outline: "none",
                                  }}
                                  placeholder={
                                    expandTags === false ? "Filter By Tags" : ""
                                  }
                                  value={
                                    expandTags === false
                                      ? getAppliedTagFilterCountText(
                                          appliedLibraryTagFilters
                                        )
                                      : tagSearchTerm
                                  }
                                  onChange={(e) => this.getSuggestedTags(e)}
                                />
                                <img
                                  src="/static_images/tag-dropdown-active.svg"
                                  alt="dropdown"
                                  style={{
                                    transform: this.state.expandTags
                                      ? "rotate(180deg)"
                                      : "none",
                                    zIndex: 3,
                                    width: "15px",
                                  }}
                                  onClick={() =>
                                    this.setState({
                                      expandTags:
                                        !this.state
                                          .expandTags /* matchedTags: this.state.expandTags === false ? libraryTags : matchedTags */,
                                    })
                                  }
                                />
                              </span>
                            </div>
                          </div>
                          {expandTags && (
                            <div
                              className="filter-tags-container"
                              style={{ margin: 0 }}
                            >
                              <div className="row">
                                <div className="col-md-12 filter-tags-autocomplete-container">
                                  <Scrollable maxHeight={150}>
                                    {matchedTags.map((tag, i) => (
                                      <div
                                        className="filter-tags-input-suggestion cursor-pointer"
                                        key={i}
                                      >
                                        <input
                                          type="checkbox"
                                          id={"" + tag.id}
                                          value={tag.id}
                                          onChange={() => {
                                            this.editTagFilter(tag);
                                            this.setState({
                                              expandTags: false,
                                            });
                                          }}
                                          checked={
                                            isTagAlreadySelected(
                                              tag,
                                              appliedLibraryTagFilters
                                            )
                                              ? true
                                              : false
                                          }
                                        />
                                        <label
                                          className={"cursor-pointer"}
                                          htmlFor={"" + tag.id}
                                          style={{ display: "inline" }}
                                        >
                                          &nbsp;&nbsp;
                                          <img
                                            className={"library-tag-list-icn"}
                                            src={getTagIconPath(tag.categoryid)}
                                          />
                                          &nbsp;&nbsp;{tag.name}
                                        </label>
                                      </div>
                                    ))}
                                  </Scrollable>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {filteredFileIds.length === 0 &&
                  appliedLibraryTagFilters.length > 0 ? (
                    <div className="col-md-11 px-0">
                      <div className="row">
                        <div className="col-md-12">
                          <NoFiltersMatched
                            getDocumentHierarchy={getDocumentHierarchy}
                            initialFileIds={initialFileIds}
                            applyLibraryTagFilters={applyLibraryTagFilters}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="row mr-5"
                      onClick={() => this.setState({ expandTags: false })}
                    >
                      <div className="col-md-12 px-0">
                        <div className="row">
                          {appliedLibraryTagFilters.length > 0 && (
                            <div
                              className="col-md-12 mt-2 ml-3 pl-0 filter-info-container"
                              style={{
                                display: "inline-flex",
                                boxShadow: "1px 2px 8px rgba(0, 0, 0, 0.15)",
                              }}
                            >
                              <span className="ml-4">
                                Showing {generalFilters["allDocuments"]}/
                                {initialFileIds.length} Documents
                              </span>
                              &nbsp;
                              <span
                                className="clear-filter-link mt-1"
                                onClick={() => window.location.reload()}
                              >
                                Clear filters
                              </span>
                            </div>
                          )}
                          <div
                            className="col-md-12 ml-3 pl-0 library-header-container"
                            style={{
                              display: "inline-flex",
                              marginTop:
                                appliedLibraryTagFilters.length > 0
                                  ? ""
                                  : "0.5rem",
                              boxShadow:
                                appliedLibraryTagFilters.length > 0
                                  ? ""
                                  : "1px 2px 8px rgba(0, 0, 0, 0.15)",
                            }}
                          >
                            <DocumentLibraryHeader
                              saveMultipleSelectedFiles={
                                saveMultipleSelectedFiles
                              }
                              filesAtRootLevel={filesAtRoot}
                              sortBy={this.state.sort}
                              titleOrder={this.state.titleOrder}
                              dateOrder={this.state.dateOrder}
                              applySorting={(
                                sort: string,
                                order: string,
                                titleOrder: boolean,
                                dateOrder: boolean
                              ) =>
                                this.setState(
                                  {
                                    sort: sort,
                                    order: order,
                                    titleOrder: titleOrder,
                                    dateOrder: dateOrder,
                                  },
                                  () =>
                                    getDocumentHierarchy(
                                      sort,
                                      order,
                                      generalFilterFileIds.length > 0
                                        ? generalFilterFileIds
                                        : filteredFileIds.length > 0
                                        ? filteredFileIds
                                        : initialFileIds
                                    )
                                )
                              }
                            />
                          </div>
                          <div className="col-md-12 ml-3">
                            <Scrollable maxHeight={420} minHeight={"50vh"}>
                              {
                                <div
                                  className="row"
                                  style={{ background: "white" }}
                                >
                                  <div className="col-md-12">
                                    <div className="row">
                                      <div className="col-md-7 px-0">
                                        <HierarchyList
                                          documentChildren={documentHierarchy}
                                          initialFileIds={initialFileIds}
                                          savedMultipleSelectedFiles={
                                            savedMultipleSelectedFiles
                                          }
                                          saveMultipleSelectedFiles={
                                            saveMultipleSelectedFiles
                                          }
                                          savedCollapsedFileIds={
                                            savedCollapsedFileIds
                                          }
                                          saveCollapsedFileIds={
                                            saveCollapsedFileIds
                                          }
                                          appliedLibraryTagFilters={
                                            appliedLibraryTagFilters
                                          }
                                          applyLibraryTagFilters={
                                            applyLibraryTagFilters
                                          }
                                          setModal={(
                                            type: string,
                                            title: string,
                                            parties: partyInfo[]
                                          ) =>
                                            this.setState({
                                              modalType: type,
                                              modalTitle: title,
                                              modalParties: parties,
                                            })
                                          }
                                        />
                                      </div>
                                      {/* <div className="col-md-3 px-0">
                                                                         {/* column for parties 
                                                                        </div>
                                                                        <div className='col-md-1 px-0'>
                                                                         {/* column for start-date
                                                                         </div> */}
                                      <div className="col-md-5 px-0">
                                        <HierarchyTagsList
                                          documentChildren={documentHierarchy}
                                          initialFileIds={initialFileIds}
                                          savedMultipleSelectedFiles={
                                            savedMultipleSelectedFiles
                                          }
                                          saveMultipleSelectedFiles={
                                            saveMultipleSelectedFiles
                                          }
                                          savedCollapsedFileIds={
                                            savedCollapsedFileIds
                                          }
                                          saveCollapsedFileIds={
                                            saveCollapsedFileIds
                                          }
                                          appliedLibraryTagFilters={
                                            appliedLibraryTagFilters
                                          }
                                          applyLibraryTagFilters={
                                            applyLibraryTagFilters
                                          }
                                          saveSelectedFile={saveSelectedFile}
                                          saveSelectedLibraryAction={
                                            saveSelectedLibraryAction
                                          }
                                          savedFileTagData={savedFileTagData}
                                          saveFileTagData={saveFileTagData}
                                          selectedFile={selectedFile}
                                          getParentFileList={getParentFileList}
                                          getChildrenFileList={
                                            getChildrenFileList
                                          }
                                          setModal={(
                                            type: string,
                                            title: string,
                                            tags: TagInfo[]
                                          ) =>
                                            this.setState({
                                              modalType: type,
                                              modalTitle: title,
                                              modalTags: tags,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              }
                            </Scrollable>
                            <DocumentLibraryTablemodal
                              type={modalType}
                              title={modalTitle}
                              parties={modalParties}
                              tags={modalTags}
                              applyLibraryTagFilters={applyLibraryTagFilters}
                              initialFileIds={initialFileIds}
                            />
                            <button
                              style={{ display: "none" }}
                              type="button"
                              data-toggle="modal"
                              data-target="#documentLibraryTableModal"
                              id="documentLibraryTableButton"
                            ></button>
                            {/* <TaskManagementTablemodal title={title} 
                                                        numberOfMembers={numberOfMembers} associateGroup={associateGroup} />
                                                        <button style={{ display: 'none' }} 
                                                        type="button" data-toggle="modal" 
                                                        data-target="#taskManagementTableModal" 
                                                        id="taskManagementTableButton"></button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
        {this.renderAddTagModal()}
        {this.renderHierarchyModal()}
        <button
          style={{ display: "none" }}
          type="button"
          id="addTagBulkButton"
          data-toggle="modal"
          data-target="#addTagModal"
        />
        <button
          style={{ display: "none" }}
          type="button"
          id="addParentBulkButton"
          data-toggle="modal"
          data-target="#addHierarchyModal"
        />
      </div>
    );
  }

  renderAddTagModal() {
    let {
      selectedFile,
      saveSelectedFile,
      selectedLibraryAction,
      isBulkAction,
      saveSelectedLibraryAction,
      getDocumentHierarchy,
    } = this.props;
    return (
      <AddTagModal
        selectedFile={selectedFile}
        saveSelectedFile={saveSelectedFile}
        selectedLibraryAction={selectedLibraryAction}
        isBulkAction={isBulkAction}
        saveSelectedLibraryAction={saveSelectedLibraryAction}
        getDocumentHierarchy={getDocumentHierarchy}
      />
    );
  }

  renderHierarchyModal() {
    let {
      selectedFile,
      saveSelectedFile,
      selectedLibraryAction,
      isBulkAction,
      saveSelectedLibraryAction,
      saveMultipleSelectedFiles,
      getDocumentHierarchy,
      savedMultipleSelectedFiles,
    } = this.props;
    let { sort, order } = this.state;
    return (
      <AddHierarchyModal
        selectedFile={selectedFile}
        saveSelectedFile={saveSelectedFile}
        selectedLibraryAction={selectedLibraryAction}
        isBulkAction={isBulkAction}
        saveSelectedLibraryAction={saveSelectedLibraryAction}
        saveMultipleSelectedFiles={saveMultipleSelectedFiles}
        getDocumentHierarchy={getDocumentHierarchy}
        sort={sort}
        order={order}
      />
    );
  }
}
