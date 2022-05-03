import React, { Component } from 'react';
import { isNullOrUndefined } from 'is-what';
import { DarkTooltip } from '../../../DocumentView/Component/documentInsights';
import OtherTags from '../../../DocumentView/Component/EditFeature/Component/BasicInformation/Tags/otherTags';
import {
    nature_tag_color,
    tag_nature_tooltip,
    tag_type_tooltip,
    type_tag_color,
} from '../../../DocumentView/Component/Utils/docUtils';
import { TagData } from '../../../DocumentView/State/documentState';
import Scrollable from '../../../UniversalComponents/Scrollable/scrollable';
import { BasicFileInfo } from '../../State/documentLibraryState';
import { getFileIdsFromFiles } from '../Utils/libraryUtils';

interface Props {
    listTagNature: () => void;
    listTagType: () => void;
    tagNature: TagData[];
    tagType: TagData[];
    otherTags: TagData[];
    listOtherTags: () => void;
    createOtherTags: (name: string) => void;
    storeOtherTags: (storedOtherTags: any) => void;
    tags: any[];
    newTagData: TagData;
    storedOtherTags: any;
    savedMultipleSelectedFiles: BasicFileInfo[];
    selectedFile: BasicFileInfo | null;
    saveSelectedFile: (selectedFile: BasicFileInfo | null) => void;
    selectedLibraryAction: string;
    isBulkAction: boolean;
    saveSelectedLibraryAction: (selectedLibraryAction: string, isBulkAction: boolean) => void;
    editTags: (editFileIds: number[], dataType: string, tagEditData: any, isBulkAction: boolean) => void;
    saveFileTagData: (savedFileTagData: any[]) => void;
    initialFileIds: number[];
    getDocumentHierarchy: (sort: string, order: string, fileIds: number[]) => void;
    otherTagsLoader: boolean;
}

interface State {
    natureTagId: number;
    typeTagId: number;
    othersTagId: number[];
    nature: string;
    type: string;
    otherTagsId: number[];
    expandNature: boolean;
    expandType: boolean;
}

export default class LibraryAddTag extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            natureTagId: -1,
            typeTagId: -1,
            othersTagId: [],
            nature: '',
            type: '',
            otherTagsId: [],
            expandNature: false,
            expandType: false,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        let { tags } = nextProps;
        if (this.props.tags !== nextProps.tags && nextProps.tags !== undefined) {
            if (nextProps.tags.length > 0) {
                let savedNature = tags.filter((el) => {
                    return el.dataPoints.categoryId === 1;
                })[0];
                !isNullOrUndefined(savedNature) && this.setState({ nature: savedNature.name });
                let savedType = tags.filter((el) => {
                    return el.dataPoints.categoryId === 2;
                })[0];
                !isNullOrUndefined(savedType) && this.setState({ type: savedType.name });
                this.setState({
                    natureTagId: this.setInitialTagId(1, tags),
                    typeTagId: this.setInitialTagId(2, tags),
                    othersTagId: this.setInitialOtherTagId(tags),
                });
            } else {
                this.setState({
                    natureTagId: -1,
                    typeTagId: -1,
                    othersTagId: [],
                    nature: '',
                    type: '',
                    otherTagsId: [],
                    expandNature: false,
                    expandType: false,
                });
            }
        }
    }

    setInitialTagId(categoryId: number, tags: any[]) {
        let returnTagId: number = -1;
        tags.forEach((el) => {
            if (el.dataPoints.categoryId === categoryId) {
                returnTagId = el.dataPoints.tagId;
            }
        });
        return returnTagId;
    }

    setInitialOtherTagId(tags: any[]) {
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
            storedOtherTags,
            storeOtherTags,
            newTagData,
            tagNature,
            tagType,
            listOtherTags,
            otherTags,
            createOtherTags,
            tags,
            isBulkAction,
            selectedLibraryAction,
            otherTagsLoader,
        } = this.props;
        let { nature, type, expandNature, expandType } = this.state;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12 my-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-4">
                                        <div className="row">
                                            <div className="col-md-12 tag-type-hoverable align-left">
                                                <DarkTooltip title={tag_nature_tooltip} placement="right-end">
                                                    <span>Nature</span>
                                                </DarkTooltip>
                                            </div>
                                            <div className="col-md-11 mb-1">
                                                {nature.length > 0 ? (
                                                    <div className="row">
                                                        <div className="col-md-12 align-left">
                                                            <span className="tag-input-disabled">
                                                                <input
                                                                    type="text"
                                                                    readOnly
                                                                    className="tag-input"
                                                                    placeholder="Remove existing tag to add another"
                                                                    style={{
                                                                        width: '93%',
                                                                        border: 'none',
                                                                        outline: 'none',
                                                                        background: '#E2E2E2',
                                                                    }}
                                                                />
                                                                <img
                                                                    src="/static_images/tag-dropdown-inactive.svg"
                                                                    alt="dropdown"
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="row">
                                                            <div className="col-md-12 align-left">
                                                                <span
                                                                    className="tag-input"
                                                                    style={{
                                                                        background:
                                                                            isBulkAction === true ? '#E9E9E9' : 'white',
                                                                        border: '1px solid #DDDDDD',
                                                                    }}
                                                                    onClick={() =>
                                                                        isBulkAction === false &&
                                                                        this.setState({
                                                                            expandNature: !this.state.expandNature,
                                                                        })
                                                                    }
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        readOnly
                                                                        className="tag-input"
                                                                        placeholder="Select one tag"
                                                                        style={{
                                                                            width: '100%',
                                                                            border: 'none',
                                                                            outline: 'none',
                                                                            background:
                                                                                isBulkAction === true
                                                                                    ? '#E9E9E9'
                                                                                    : 'white',
                                                                        }}
                                                                    />
                                                                    <img
                                                                        src="/static_images/new-tag-dropdown-active.svg"
                                                                        alt="dropdown"
                                                                        style={{
                                                                            transform: expandNature
                                                                                ? 'rotate(180deg)'
                                                                                : 'none',
                                                                        }}
                                                                    />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {expandNature && (
                                                            <div className="row ">
                                                                <div
                                                                    className="col-md-12 tag-autocomplete-container align-left"
                                                                    style={{ margin: 0 }}
                                                                >
                                                                    <Scrollable maxHeight={100}>
                                                                        {tagNature.map((tag, i) => (
                                                                            <div
                                                                                className="tag-input-suggestion cursor-pointer align-left"
                                                                                style={{ fontSize: '14px' }}
                                                                                key={i}
                                                                                onClick={() =>
                                                                                    this.setTags(tag.name, 'Nature')
                                                                                }
                                                                            >
                                                                                {tag.name}
                                                                            </div>
                                                                        ))}
                                                                    </Scrollable>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        {nature.length > 0 && isBulkAction === false && (
                                            <div className="row">
                                                <div className="col-md-12 tag-label align-left">
                                                    <span
                                                        style={{
                                                            background: nature_tag_color,
                                                            marginLeft: '0rem',
                                                            padding: '1% 1%',
                                                        }}
                                                    >
                                                        {nature}&nbsp;&nbsp;
                                                        <img
                                                            src="/static_images/new-remove-tag-label.svg"
                                                            alt="remove"
                                                            className="cursor-pointer"
                                                            onClick={() => this.setTags('', 'Nature')}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <div className="row">
                                            <div className="col-md-12 tag-type-hoverable align-left">
                                                <DarkTooltip title={tag_type_tooltip} placement="right-end">
                                                    <span>Type</span>
                                                </DarkTooltip>
                                            </div>
                                            <div className="col-md-11 mb-1">
                                                {type.length > 0 ? (
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <span className="tag-input-disabled">
                                                                <input
                                                                    type="text"
                                                                    readOnly
                                                                    className="tag-input"
                                                                    placeholder="Remove existing tag to add another"
                                                                    style={{
                                                                        width: '93%',
                                                                        border: 'none',
                                                                        outline: 'none',
                                                                        background: '#E2E2E2',
                                                                    }}
                                                                />
                                                                <img
                                                                    src="/static_images/tag-dropdown-inactive.svg"
                                                                    alt="dropdown"
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <span
                                                                    className="tag-input"
                                                                    style={{
                                                                        background:
                                                                            isBulkAction === true ? '#E9E9E9' : 'white',
                                                                        border: '1px solid #DDDDDD',
                                                                    }}
                                                                    onClick={() =>
                                                                        isBulkAction === false &&
                                                                        this.setState({
                                                                            expandType: !this.state.expandType,
                                                                        })
                                                                    }
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        readOnly
                                                                        className="tag-input"
                                                                        placeholder="Select one tag"
                                                                        style={{
                                                                            width: '100%',
                                                                            border: 'none',
                                                                            outline: 'none',
                                                                            background:
                                                                                isBulkAction === true
                                                                                    ? '#E9E9E9'
                                                                                    : 'white',
                                                                        }}
                                                                    />
                                                                    <img
                                                                        src="/static_images/new-tag-dropdown-active.svg"
                                                                        alt="dropdown"
                                                                        style={{
                                                                            transform: expandType
                                                                                ? 'rotate(180deg)'
                                                                                : 'none',
                                                                        }}
                                                                    />
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {expandType && (
                                                            <div className="row">
                                                                <div
                                                                    className="col-md-12 tag-autocomplete-container"
                                                                    style={{ margin: 0 }}
                                                                >
                                                                    <Scrollable maxHeight={100}>
                                                                        {tagType.map((tag, i) => (
                                                                            <div
                                                                                className="tag-input-suggestion cursor-pointer align-left"
                                                                                style={{ fontSize: '14px' }}
                                                                                key={i}
                                                                                onClick={() =>
                                                                                    this.setTags(tag.name, 'Type')
                                                                                }
                                                                            >
                                                                                {tag.name}
                                                                            </div>
                                                                        ))}
                                                                    </Scrollable>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        {type.length > 0 && isBulkAction === false && (
                                            <div className="row">
                                                <div className="col-md-12 tag-label align-left">
                                                    <span
                                                        style={{
                                                            background: type_tag_color,
                                                            marginLeft: '0rem',
                                                            padding: '1% 1%',
                                                        }}
                                                    >
                                                        {type}&nbsp;&nbsp;
                                                        <img
                                                            src="/static_images/new-remove-tag-label.svg"
                                                            alt="remove"
                                                            className="cursor-pointer"
                                                            onClick={() => this.setTags('', 'Type')}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-2 align-left">
                                        <OtherTags
                                            storedOtherTags={storedOtherTags}
                                            storeOtherTags={storeOtherTags}
                                            newTagData={newTagData}
                                            setTags={(e) => this.setTags(e, 'Others')}
                                            tags={tags}
                                            otherTags={otherTags}
                                            createOtherTags={createOtherTags}
                                            listOtherTags={listOtherTags}
                                            selectedLibraryAction={selectedLibraryAction}
                                            isBulkAction={isBulkAction}
                                            otherTagsLoader={otherTagsLoader}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.saveOrCancel()}
                </div>
            </div>
        );
    }

    saveOrCancel = () => {
        return (
            <div className="row">
                <div className="col-md-3" />
                <div className="col-md-7">
                    <span
                        className="upload-yellow-btn py-1 mb-4"
                        id="save-btn"
                        data-dismiss="modal"
                        onClick={() => this.onSave()}
                    >
                        Save
                    </span>
                </div>
            </div>
        );
    };

    setTags(e: any, category: string) {
        let { tagNature, tagType } = this.props;
        if (category === 'Nature') {
            this.setState({ nature: e });
            let index = tagNature.findIndex((el: TagData) => {
                return el.name === e;
            });
            if (index > -1) {
                this.setState({ natureTagId: tagNature[index].id });
            } else {
                this.setState({ natureTagId: -1 });
            }
        } else if (category === 'Type') {
            this.setState({ type: e });
            let index = tagType.findIndex((el: TagData) => {
                return el.name === e;
            });
            if (index > -1) {
                this.setState({ typeTagId: tagType[index].id });
            } else {
                this.setState({ typeTagId: -1 });
            }
        } else {
            let othersArray = this.state.otherTagsId;
            othersArray.push(e);
            this.setState({ otherTagsId: othersArray });
            this.setState({ othersTagId: e });
        }
    }

    onSave() {
        let { natureTagId, typeTagId, othersTagId } = this.state;
        let { isBulkAction, selectedFile, savedMultipleSelectedFiles, initialFileIds } = this.props;
        let editedFileIds: number[] = [];
        if (isBulkAction === true) {
            editedFileIds = getFileIdsFromFiles(savedMultipleSelectedFiles);
            this.props.editTags(editedFileIds, 'Tags:Others', othersTagId, isBulkAction);
        } else {
            if (selectedFile !== null) {
                editedFileIds = [selectedFile.fileId];
                this.props.editTags(editedFileIds, 'Tags:Nature', natureTagId, isBulkAction);
                this.props.editTags(editedFileIds, 'Tags:Type', typeTagId, isBulkAction);
                this.props.editTags(editedFileIds, 'Tags:Others', othersTagId, isBulkAction);
            }
        }
        this.props.saveSelectedFile(null);
        this.props.saveSelectedLibraryAction('', false);
        this.setState({
            nature: '',
            type: '',
            otherTagsId: [],
            expandNature: false,
            expandType: false,
            natureTagId: -1,
            typeTagId: -1,
            othersTagId: [],
        });
        this.props.saveFileTagData([]);
        window.location.reload();
    }
}
