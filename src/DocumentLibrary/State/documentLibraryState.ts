export default interface DocumentLibraryState {
  initialFileIds: number[];
  libraryTags: LibraryTagData[];
  documentHierarchy: DocumentHierarchyData[];
  savedMultipleSelectedFiles: BasicFileInfo[];
  savedCollapsedFileIds: number[];
  documentLibraryLoader: boolean;
  appliedLibraryTagFilters: LibraryTagFilterStructure[];
  filteredFileIds: number[];
  selectedFile: BasicFileInfo | null;
  selectedLibraryAction: string;
  isBulkAction: boolean;
  editFileIds: number[];
  dataType: string;
  tagEditData: any;
  editTagsLoader: boolean;
  savedFileTagData: any[];
  savedParentFileList: ParentFileInfo[];
  savedChildrenFileList: ChildrenFileInfo[];
  generalFilters: any;
  generalFilterLoader: boolean;
  generalFilterFileIds: number[];
}

export interface LibraryTagData {
  id: number;
  name: string;
  categoryid: number;
}

export interface DocumentHierarchyData {
  fileId: number;
  fileName: string;
  levelId: number;
  tags: TagInfo[];
  title: string;
  startDate: string;
  parties: partyInfo[];
  children: DocumentHierarchyData[];
}

export interface partyInfo {
  partyId: number;
  partyName: string;
}

export interface TagInfo {
  tagId: number;
  tagName: string;
  tagCategory: string;
}

export interface LibraryTagFilterStructure {
  tagId: number;
  tagName: string;
}

export interface ParentFileInfo {
  fileId: number;
  fileName: string;
  levelId: number;
  isParent: number;
}

export interface ChildrenFileInfo {
  fileId: number;
  fileName: string;
  levelId: number;
  isChild: boolean;
  parentExists: boolean;
}

export interface BasicFileInfo {
  fileId: number;
  fileName: string;
  levelId: number;
}

export interface FileHierarchy {
  fileID: number;
  levelID: number;
  fileName: string;
  children: FileHierarchy[];
}

export function defaultDocumentLibraryState(): DocumentLibraryState {
  return {
    initialFileIds: [],
    libraryTags: [],
    documentHierarchy: [],
    savedMultipleSelectedFiles: [],
    savedCollapsedFileIds: [],
    documentLibraryLoader: false,
    appliedLibraryTagFilters: [],
    filteredFileIds: [],
    selectedFile: null,
    selectedLibraryAction: "",
    isBulkAction: false,
    editFileIds: [],
    dataType: "",
    tagEditData: "",
    editTagsLoader: false,
    savedFileTagData: [],
    savedParentFileList: [],
    savedChildrenFileList: [],
    generalFilters: [],
    generalFilterLoader: false,
    generalFilterFileIds: [],
  };
}
