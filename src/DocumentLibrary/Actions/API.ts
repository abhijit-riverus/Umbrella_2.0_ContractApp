import AxiosGateWay from "../../UniversalComponents/HeimdallChild/HeimdallUtil/axiosUtils";
import { LibraryTagData } from "../State/documentLibraryState";
import {
  GetLibraryTagsFailure,
  GetLibraryTagsSuccess,
  GETLIBRARYTAGS_FAILURE,
  GETLIBRARYTAGS_SUCCESS,
} from "./def";

export default class DocumentLibraryAPI {
  public static getFileIdArray(url: string) {
    return AxiosGateWay.get(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
  public static getLibraryTags(url: string) {
    return AxiosGateWay.get(url)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
  public static getLibraryTagsSuccess(
    libraryTags: LibraryTagData[]
  ): GetLibraryTagsSuccess {
    return {
      type: GETLIBRARYTAGS_SUCCESS,
      payload: {
        libraryTags: libraryTags,
      },
    };
  }
  public static getLibraryTagsFailure(): GetLibraryTagsFailure {
    return {
      type: GETLIBRARYTAGS_FAILURE,
    };
  }
  public static getDocumentHierarchy(
    url: string,
    sort: string,
    order: string,
    fileIds: number[]
  ) {
    console.log("getDocumentHierarchy");
    return AxiosGateWay.post(url, {
      sort: sort,
      order: order,
      fileIds: fileIds,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
  public static applyLibraryTagFilters(url: string, payload: any) {
    return AxiosGateWay.post(url, payload)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
  public static addOrEditTags(url: string, payload: any) {
    return AxiosGateWay.post(url, payload)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
  public static getParentFileList(
    url: string,
    selectedFileId: number,
    fileIds: number[],
    bulkFileIds: number[]
  ) {
    return AxiosGateWay.post(url, {
      selectedFileId: selectedFileId,
      fileIds: fileIds,
      bulkFileIds: bulkFileIds,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
  public static addParent(
    url: string,
    childFileIds: number[],
    editedParentFileId: number
  ) {
    return AxiosGateWay.post(url, {
      childFileIds: childFileIds,
      editedParentFileId: editedParentFileId,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
  public static getChildrentFileList(
    url: string,
    selectedFileId: number,
    fileIds: number[]
  ) {
    return AxiosGateWay.post(url, {
      selectedFileId: selectedFileId,
      fileIds: fileIds,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
  public static removeParent(
    url: string,
    childFileIds: number[],
    editedParentFileId: number
  ) {
    return AxiosGateWay.post(url, {
      childFileIds: childFileIds,
      editedParentFileId: editedParentFileId,
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }

  public static getGeneralFilterDL(url: string, fileIds: number[]) {
    return AxiosGateWay.post(url, { fileIds })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }

  public static applyGeneralFilterDL(
    url: string,
    fileIds: number[],
    filterType: string
  ) {
    return AxiosGateWay.post(url, { fileIds: fileIds, filterType: filterType })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error.response;
      });
  }
}
