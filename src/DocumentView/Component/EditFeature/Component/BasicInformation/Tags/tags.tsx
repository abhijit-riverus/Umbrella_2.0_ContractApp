import React, { Component } from "react";
import { TagData } from "../../../../../State/documentState";
import SaveOrCancel from "../../saveOrCancel";
import RequestTags from "./requestTags";
import TagComponents from "./tagsComponents";
import axios from "axios";
import { SITE_API_BY_REALM_NAME } from "../../../../../../Configuration/global";
import {
  getKeyCloakRealmFromLS,
  getLocalStorage,
} from "../../../../../../Authentication/Actions/authentication";
import Select, { ActionMeta, OnChangeValue, StylesConfig } from "react-select";
const SITEAPI = SITE_API_BY_REALM_NAME(getKeyCloakRealmFromLS());

interface groupOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
}
interface Props {
  editOptionSelected: (editOptionSelected: boolean) => void;
  listTagNature: () => void;
  listTagType: () => void;
  tagNature: TagData[];
  tagType: TagData[];
  otherTags: TagData[];
  listOtherTags: () => void;
  editTags: (
    natureTagId: number,
    typeTagId: number,
    othersTagId: number[],
    isBulkAction: boolean
  ) => void;
  createOtherTags: (name: string) => void;
  storeOtherTags: (storedOtherTags: any) => void;
  tags: any[];
  newTagData: TagData;
  storedOtherTags: any;
  saveHighlightedId: (highlightedId: number[] | null) => void;
  otherTagsLoader: boolean;
  fileId: any;
}

interface State {
  natureTagId: number;
  typeTagId: number;
  othersTagId: number[];
  readonly allUserGroups: readonly groupOption[];
  readonly selectedUserGroups: readonly groupOption[];
}
const orderOptions = (values: readonly groupOption[]) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};
export default class Tags extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      natureTagId: this.setInitialTagId(1),
      typeTagId: this.setInitialTagId(2),
      othersTagId: this.setInitialOtherTagId(),
      selectedUserGroups: [],
      allUserGroups: [],
    };
  }
  onUserGroupChange = (
    value: OnChangeValue<groupOption, true>,
    actionMeta: ActionMeta<groupOption>
  ) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        value = this.state.allUserGroups.filter((v) => v.isFixed);
        break;
    }

    value = orderOptions(value);
    this.setState({ selectedUserGroups: value });
  };
  handleGetAllUserGroups = async () => {
    const accessToken = await getLocalStorage("accessToken");
    console.log(
      "🚀 ~ file: tags.tsx ~ line 51 ~ Tags ~ handleGetAllUserGroups= ~ accessToken",
      SITEAPI + "/user/groups"
    );
    axios
      .get(SITEAPI + "user/groups", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response?.data?.code === "success") {
          const userGroups = response.data.queryResult?.groups;
          this.setState({
            allUserGroups: userGroups
              ? userGroups.map((group: any) => {
                  return {
                    value: group.name,
                    label: group.name,
                    isFixed: group.name === "file-manager" ? true : false,
                  };
                })
              : [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleSubmitSelectedUserGroups = async () => {
    const accessToken = await getLocalStorage("accessToken");
    const fileId = this.props.fileId;
    console.log(this.state.selectedUserGroups);
    axios
      .post(
        SITEAPI + "user/groups/file/" + fileId,
        { groups: this.state.selectedUserGroups },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((response) => {
        if (response?.data?.code === "success") {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleGetUserGroupsByFile = async () => {
    const fileId = this.props.fileId;
    console.log(
      "🚀 ~ file: tags.tsx ~ line 126 ~ Tags ~ handleGetUserGroupsByFile= ~ fileId",
      SITEAPI + "user/groups/file/:" + fileId
    );
    const accessToken = await getLocalStorage("accessToken");
    axios
      .get(SITEAPI + "user/groups/file/" + fileId, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response?.data?.code === "success") {
          const userGroups = response.data.queryResult;
          console.log(
            "🚀 ~ file: tags.tsx ~ line 132 ~ Tags ~ .then ~ userGroups",
            userGroups
          );
          this.setState({
            selectedUserGroups: userGroups
              ? userGroups.map((group: any) => {
                  return {
                    value: group.name,
                    label: group.name,
                    isFixed: group.name === "file-manager" ? true : false,
                  };
                })
              : [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    let { listTagType, listTagNature } = this.props;
    listTagNature();
    listTagType();
    console.log("HOW MANY TIMES CALLING");
    this.handleGetAllUserGroups();
    this.setInitialGroups();
    this.handleGetUserGroupsByFile();
  }
  setInitialGroups = () => {
    let { tags } = this.props;
    console.log("🚀 ~ file: tags.tsx ~ line 134 ~ Tags ~ tags", tags);
    let returnTagId: number = -1;

    return returnTagId;
  };
  setInitialTagId(categoryId: number) {
    let { tags } = this.props;
    let returnTagId: number = -1;
    tags.forEach((el) => {
      if (el.dataPoints.categoryId === categoryId) {
        returnTagId = el.dataPoints.tagId;
      }
    });
    return returnTagId;
  }

  setInitialOtherTagId() {
    let { tags } = this.props;
    let returnTagId: number[] = [];
    tags.forEach((el) => {
      if (el.dataPoints.categoryId === 3) {
        returnTagId.push(el.dataPoints.tagId);
      }
    });
    return returnTagId;
  }

  render() {
    let {
      editOptionSelected,
      storedOtherTags,
      storeOtherTags,
      newTagData,
      tagNature,
      tagType,
      listOtherTags,
      otherTags,
      createOtherTags,
      tags,
      saveHighlightedId,
      otherTagsLoader,
    } = this.props;
    return (
      <div className="row toc-content toc-content-default">
        <div className="col-md-12">
          <div className="row mt-1">
            <div
              className="col-md-12 m-0 bi-label-clickable mt-2"
              style={{ fontWeight: 600 }}
            >
              Add Tags
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 edit-title-header">
              Add tags to your contract here...
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 my-3">
              <TagComponents
                storedOtherTags={storedOtherTags}
                storeOtherTags={storeOtherTags}
                newTagData={newTagData}
                createOtherTags={createOtherTags}
                tagNature={tagNature}
                tagType={tagType}
                listOtherTags={listOtherTags}
                otherTags={otherTags}
                getNature={(natureTagId) =>
                  this.setState({ natureTagId: natureTagId })
                }
                getType={(typeTagId) => this.setState({ typeTagId: typeTagId })}
                getOthers={(othersTagId) =>
                  this.setState({ othersTagId: othersTagId })
                }
                tags={tags}
                otherTagsLoader={otherTagsLoader}
                allUserGroups={this.state.allUserGroups}
                selectedUserGroups={this.state.selectedUserGroups}
                onUserGroupChange={this.onUserGroupChange}
              />
            </div>
          </div>
          <SaveOrCancel
            enableHighlightOption={true}
            dataPointName={"Tags"}
            editOptionSelected={editOptionSelected}
            editDataPoint={() => this.editTags()}
            highlightedId={null}
            enableSaveBtn={true}
            saveHighlightedId={(highlightedId: number[] | null) =>
              saveHighlightedId(highlightedId)
            }
            handleSubmitSelectedUserGroups={this.handleSubmitSelectedUserGroups}
          />
          <RequestTags />
        </div>
      </div>
    );
  }
  editTags() {
    let { natureTagId, typeTagId, othersTagId } = this.state;
    this.props.editTags(natureTagId, typeTagId, othersTagId, false);
  }
}
